/**
 * External dependencies
 */
import * as yjs from 'yjs';

/**
 * Internal dependencies
 */
import { updateBlocksDoc, blocksDocToArray } from '../yjs';

jest.mock( 'uuid', () => {
	let i = 0;
	// This ensures nonces are generated in a consistent way.
	return { v4: () => i-- };
} );

function applyYjsTransaction( yDoc, callback, origin ) {
	return new Promise( ( resolve ) => {
		yDoc.on( 'update', () => {
			resolve();
		} );
		yDoc.transact( callback, origin );
	} );
}
function applyYjsUpdate( yDoc, update ) {
	return new Promise( ( resolve ) => {
		yDoc.on( 'update', () => {
			resolve();
		} );
		yjs.applyUpdate( yDoc, update );
	} );
}

/** @typedef {import('../../..').RichTextHint} RichTextHint */

/**
 * @param {Object} [richTextHints]
 * @param {RichTextHint} [richTextHints.original]
 * @param {RichTextHint} [richTextHints.updateLocal]
 * @param {RichTextHint} [richTextHints.updateRemote]
 */
async function getUpdatedBlocksUsingYjsAlgo(
	originalBlocks,
	updatedLocalBlocks,
	updatedRemoteBlocks,
	richTextHints = {}
) {
	// Local doc.
	const localYDoc = new yjs.Doc();
	const localYBlocks = localYDoc.getMap( 'blocks' );

	// Remote doc.
	const remoteYDoc = new yjs.Doc();
	const remoteYBlocks = remoteYDoc.getMap( 'blocks' );

	// Initialize both docs to the original blocks.
	await applyYjsTransaction(
		localYDoc,
		() => {
			updateBlocksDoc( localYBlocks, originalBlocks, richTextHints.original );
		},
		1
	);
	await applyYjsUpdate( remoteYDoc, yjs.encodeStateAsUpdate( localYDoc ) );

	// Local edit.
	if ( originalBlocks !== updatedLocalBlocks ) {
		await applyYjsTransaction(
			localYDoc,
			() => {
				updateBlocksDoc( localYBlocks, updatedLocalBlocks, richTextHints.updateLocal );
			},
			1
		);
	}

	// Remote edit.
	if ( originalBlocks !== updatedRemoteBlocks ) {
		await applyYjsTransaction(
			remoteYDoc,
			() => {
				updateBlocksDoc( remoteYBlocks, updatedRemoteBlocks, richTextHints.updateRemote );
			},
			2
		);

		// Merging remote edit into local edit.
		await applyYjsUpdate( localYDoc, yjs.encodeStateAsUpdate( remoteYDoc ) );
	}

	return blocksDocToArray( localYBlocks );
}

jest.useRealTimers();

const syncAlgorithms = [ { name: 'yjs', algo: getUpdatedBlocksUsingYjsAlgo } ];
syncAlgorithms.forEach( ( { name, algo } ) => {
	describe( name + ': Conflict Resolution', () => {
		test( 'Remote update to single block.', async () => {
			const originalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];
			const updatedLocalBlocks = originalBlocks;

			const updateRemoteBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			expect( await algo( originalBlocks, updatedLocalBlocks, updateRemoteBlocks ) ).toEqual(
				updateRemoteBlocks
			);
		} );

		test( 'New local block and remote update to single block.', async () => {
			const originalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];
			const updatedLocalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'new',
					},
					innerBlocks: [],
				},
			];

			const updateRemoteBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			const expectedMerge = [
				{
					clientId: '1',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'new',
					},
					innerBlocks: [],
				},
			];

			expect( await algo( originalBlocks, updatedLocalBlocks, updateRemoteBlocks ) ).toEqual( expectedMerge );
		} );

		test( 'Local deletion of multiple blocks and update to single block.', async () => {
			const originalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '3',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];
			const updatedLocalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			const updateRemoteBlocks = originalBlocks;

			const expectedMerge = [
				{
					clientId: '1',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			expect( await algo( originalBlocks, updatedLocalBlocks, updateRemoteBlocks ) ).toEqual( expectedMerge );
		} );

		test( 'Moving a block locally while updating it remotely.', async () => {
			const originalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];
			const updatedLocalBlocks = [
				{
					clientId: '2',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];

			const updateRemoteBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			const expectedMerge = [
				{
					clientId: '2',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];

			expect( await algo( originalBlocks, updatedLocalBlocks, updateRemoteBlocks ) ).toEqual( expectedMerge );
		} );

		test( 'Moving a block to inner blocks while updating it remotely.', async () => {
			const originalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
			];
			const updatedLocalBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [
						{
							clientId: '2',
							attributes: {
								content: 'original',
							},
							innerBlocks: [],
						},
					],
				},
			];

			const updateRemoteBlocks = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [],
				},
				{
					clientId: '2',
					attributes: {
						content: 'updated',
					},
					innerBlocks: [],
				},
			];

			const expectedMerge = [
				{
					clientId: '1',
					attributes: {
						content: 'original',
					},
					innerBlocks: [
						{
							clientId: '2',
							attributes: {
								content: 'updated',
							},
							innerBlocks: [],
						},
					],
				},
			];

			expect( await algo( originalBlocks, updatedLocalBlocks, updateRemoteBlocks ) ).toEqual( expectedMerge );
		} );
	} );

	describe( name + ' RichText Handling', () => {
		const blockWithContent = ( content ) => ( {
			clientId: '1',
			attributes: { content },
			innerBlocks: [],
		} );
		const richTextHint = { clientId: '1', attributeKey: 'content' };

		it( 'should merge intelligently when known RichText attribute gets updated simultaneously', async () => {
			const originalBlocks = [ blockWithContent( 'two' ) ];
			const updatedLocalBlocks = [ blockWithContent( 'one two' ) ];
			const updatedRemoteBlocks = [ blockWithContent( 'two three' ) ];

			expect(
				await algo( originalBlocks, updatedLocalBlocks, updatedRemoteBlocks, { original: richTextHint } )
				// Without RichText handling, this would simply converge on either 'one two' or 'two three'
			).toEqual( [ blockWithContent( 'one two three' ) ] );
		} );

		it( 'should converge on either update when previously unknown RichText attribute gets updated simultaneously', async () => {
			const originalBlocks = [ blockWithContent( 'two' ) ];
			const updatedLocalBlocks = [ blockWithContent( 'one two' ) ];
			const updatedRemoteBlocks = [ blockWithContent( 'two three' ) ];

			// Both clients discovered this RichText simultaneously so the updates can't be merged intelligently,
			// but it should still converge on either of the updates
			expect( [ updatedLocalBlocks, updatedRemoteBlocks ] ).toContainEqual(
				await algo( originalBlocks, updatedLocalBlocks, updatedRemoteBlocks, {
					updateLocal: richTextHint,
					updateRemote: richTextHint,
				} )
			);
		} );
	} );
} );
