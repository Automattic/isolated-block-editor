import IsolatedBlockEditor, { BlockEditorSettings } from '../../src/index';
import mockTransport from './mock-transport';

import { random, sample } from 'lodash';
import type { Story } from '@storybook/react';

export default {
	title: 'Collaboration',
	component: IsolatedBlockEditor,
};

type Props = {
	settings: BlockEditorSettings;
};

const username = `${ sample( [ 'Pink', 'Yellow', 'Blue', 'Green' ] ) } ${ sample( [
	'Panda',
	'Zeebra',
	'Unicorn',
] ) } ${ random( 1, 9 ) }`;

const Template: Story< Props > = ( args ) => {
	return (
		<>
			<IsolatedBlockEditor { ...args } />

			{ args.settings.collab?.enabled && (
				<>
					<p>My name: { username }</p>

					<hr />

					<h2>How to test</h2>
					<p>Open this page in another window to test real-time collaborative editing.</p>

					<p>
						To view logging messages, open DevTools console and enter{ ' ' }
						<code>localStorage.debug = 'iso-editor:*'</code>.
					</p>

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
		},
		collab: {
			enabled: true,
			channelId: 'storybook-collab-editor',
			transport: mockTransport,
			username,
		},
	},
};

export const CollabDisabled = Template.bind( {} );
CollabDisabled.args = {
	...Default.args,
	settings: {
		...Default.args.settings,
		collab: undefined,
	},
};
