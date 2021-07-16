import IsolatedBlockEditor from '../index';

export default {
	title: 'Collaboration',
	component: IsolatedBlockEditor,
};

const Template = ( args ) => <IsolatedBlockEditor { ...args } />;

export const Default = Template.bind( {} );
Default.args = {
	settings: {
		iso: {
			moreMenu: false,
		},
	},
};
