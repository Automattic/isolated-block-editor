/**
 * External dependencies
 */
import * as yjs from 'yjs';

/**
 * @typedef WPBlockSelection
 * @property {string} [clientId]
 * @property {string} [attributeKey]
 * @property {number} [offset]
 */

export class RelativePosition {
	/**
	 * @param {() => {start: WPBlockSelection, end: WPBlockSelection}} getSelection - Function to get block editor selection.
	 * @param {(clientId: string, attributeKey: string, startOffset: number, endOffset: number) => void} selectionChange - Function to set block editor selection.
	 */
	constructor( getSelection, selectionChange ) {
		this.getSelection = getSelection;
		this.selectionChange = selectionChange;
	}

	/**
	 * Get the current block editor selection and convert it to a Y.RelativePosition.
	 *
	 * Does not mutate the Y.Doc.
	 *
	 * @param {yjs.Doc} doc
	 */
	saveRelativePosition( doc ) {
		const { start, end } = this.getSelection();
		const { clientId, attributeKey } = start ?? {};
		const richTexts = doc.getMap( 'post' )?.get( 'blocks' )?.get( 'richTexts' );

		if (
			richTexts?.get( clientId )?.has( attributeKey ) &&
			typeof start.offset === 'number' &&
			typeof end.offset === 'number'
		) {
			const xmlText = richTexts.get( clientId ).get( attributeKey ).get( 'xmlText' );
			this.relPos = {
				clientId,
				attributeKey,
				startOffset: yjs.createRelativePositionFromTypeIndex( xmlText, start.offset, -1 ),
				endOffset: yjs.createRelativePositionFromTypeIndex( xmlText, end.offset, -1 ),
			};
		} else {
			this.relPos = undefined;
		}
	}

	/**
	 * If a saved Y.RelativePosition exists, convert it to an absolute position and
	 * dispatch it as a selection change to the block editor.
	 *
	 * @param {yjs.Doc} doc
	 */
	setAbsolutePosition( doc ) {
		if ( ! this.relPos?.clientId || ! this.relPos?.attributeKey ) {
			return;
		}

		const { clientId, attributeKey, startOffset, endOffset } = this.relPos;
		const absStartOffset = yjs.createAbsolutePositionFromRelativePosition( startOffset, doc )?.index;
		const absEndOffset = yjs.createAbsolutePositionFromRelativePosition( endOffset, doc )?.index;

		if ( typeof absStartOffset !== 'number' || typeof absEndOffset !== 'number' ) {
			return;
		}

		this.selectionChange( clientId, attributeKey, absStartOffset, absEndOffset );
	}
}
