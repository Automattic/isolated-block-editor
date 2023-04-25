/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { BlockEditorSettings, CollaborativeEditing } from '../../src/index';
import mockTransport, { resetPeers, setUpForceRemount } from './mock-transport';
import { CollaborationSettings } from '../../src/components/collaborative-editing';

/**
 * External dependencies
 */
import { random, sample } from 'lodash';
import { Story } from '@storybook/react';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

export default {
	title: 'Collaboration',
	component: IsolatedBlockEditor,
};

type Props = {
	settings: BlockEditorSettings;
	collabSettings: CollaborationSettings;
};

const username = `${ sample( [ 'Pink', 'Yellow', 'Blue', 'Green' ] ) } ${ sample( [
	'Panda',
	'Zeebra',
	'Unicorn',
] ) } ${ random( 1, 9 ) }`;

const Template: Story< Props > = ( { collabSettings, ...isoEditorProps } ) => {
	const [ forceRemountCounter, setForceRemountCounter ] = useState( 0 );

	useEffect( () => {
		setUpForceRemount( () => setForceRemountCounter( Date.now() ), collabSettings.channelId );
	}, [] );

	return (
		<>
			<IsolatedBlockEditor key={ forceRemountCounter } { ...isoEditorProps }>
				<CollaborativeEditing settings={ collabSettings } />
			</IsolatedBlockEditor>

			{ collabSettings?.enabled && (
				<>
					<p>My name: { username }</p>

					<button
						onClick={ () => {
							resetPeers( collabSettings.channelId );
							setForceRemountCounter( Date.now() );
						} }
					>
						Reset peers
					</button>

					<hr />

					<h2>How to test</h2>
					<p>Open this page in another window to test real-time collaborative editing.</p>
					<p>
						This local demo depends on shared Local Storage (instead of network) to pass messages across
						tabs. It will not work:
					</p>
					<ul>
						<li>across browsers</li>
						<li>across private browsing windows</li>
						<li>
							in Safari, until the fix to{ ' ' }
							<a href="https://bugs.webkit.org/show_bug.cgi?id=225344">this bug</a> has shipped
						</li>
					</ul>

					<h2>Dev tips</h2>
					<p>
						Click the "Reset peers" button when peer counts start to inflate while developing. Hot module
						reloading can mess up our localStorage state because components don't fully remount.
					</p>
					<p>
						To view logging messages, open DevTools console and enter{ ' ' }
						<code>localStorage.debug = 'iso-editor:*'</code>.
					</p>
				</>
			) }
		</>
	);
};

export const Default = Template.bind( {} );
Default.args = {
	settings: {
		iso: {
			moreMenu: false,
			toolbar: {
				inspector: true,
			},
		},
	},
	collabSettings: {
		enabled: true,
		channelId: 'default',
		transport: mockTransport( 'default' ),
		username,
		avatarUrl: `https://i.pravatar.cc/64?cacheBust=${ Math.random() }`,
	},
};

export const WithOnLoad = Template.bind( {} );
WithOnLoad.args = {
	...Default.args,
	collabSettings: {
		...Default.args.collabSettings,
		channelId: 'withonload',
		transport: mockTransport( 'withonload' ),
	},
	onLoad: ( parse ) =>
		parse( `<!-- wp:paragraph -->
			<p>This initial content was loaded in an <code>onLoad</code> handler.</p>
			<!-- /wp:paragraph -->` ),
};

export const CollabDisabled = Template.bind( {} );
CollabDisabled.args = {
	...Default.args,
	collabSettings: {
		enabled: false,
	},
};
