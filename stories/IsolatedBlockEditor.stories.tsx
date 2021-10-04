/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { DocumentSection } from '../src/index';

export default {
	title: 'Isolated Block Editor',
	component: IsolatedBlockEditor,
};

export const Default = () => {
	return <IsolatedBlockEditor settings={ {} } />;
};

export const ToolbarSettings = ( toolbarSettings ) => {
	return (
		<IsolatedBlockEditor settings={ { iso: { toolbar: toolbarSettings } } }>
			<DocumentSection>Arbitrary content can go here.</DocumentSection>
		</IsolatedBlockEditor>
	);
};
ToolbarSettings.args = {
	inserter: true,
	inspector: true,
	navigation: true,
	toc: true,
	documentInspector: 'Document',
};

export const MoreMenu = ( moreMenuSettings ) => {
	return <IsolatedBlockEditor settings={ { iso: { moreMenu: moreMenuSettings, toolbar: { inspector: true } } } } />;
};
MoreMenu.args = {
	editor: true,
	fullscreen: true,
	preview: true,
	topToolbar: true,
};

export const MultipleEditors = ( { count } ) => {
	const arr = Array( count ).fill( null );
	return (
		<>
			{ arr.map( ( _, idx ) => (
				<div style={ { marginBottom: 16 } } key={ idx }>
					<IsolatedBlockEditor settings={ {} } />
				</div>
			) ) }
		</>
	);
};
MultipleEditors.args = { count: 2 };
