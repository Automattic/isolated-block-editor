import IsolatedBlockEditor, { BlockEditorSettings } from '../index';

import type { Story } from '@storybook/react';

export default {
	title: 'Collaboration',
	component: IsolatedBlockEditor,
};

type Props = {
	settings: BlockEditorSettings;
};

const Template: Story< Props > = ( args ) => {
	return (
		<>
			<p>Open this page in another window to test real time collaborative editing.</p>
			<IsolatedBlockEditor { ...args } />
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
