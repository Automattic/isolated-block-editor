/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { DocumentSection } from '../src/index';

/**
 * WordPress dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { useMemo, useEffect, useState } from '@wordpress/element';

export default {
	title: 'Isolated Block Editor',
	component: IsolatedBlockEditor,
};

export const Default = () => {
	return <IsolatedBlockEditor settings={ {} } />;
};

export const Controlled = ( { onInput, onChange, onUndo, onRedo } ) => {
	const [ blocks, setBlocks ] = useState( [] );
	const [ log, setLog ] = useState( [] );

	const handleOnInput = ( newBlocks ) => {
		onInput( newBlocks );
		setBlocks( newBlocks );
	};

	const handleOnChange = ( newBlocks ) => {
		onChange( newBlocks );
		setBlocks( newBlocks );
	};

	const undoManager = useMemo( () => {
		return {
			undo: onUndo,
			redo: onRedo,
			undoStack: [ {} ],
			redoStack: [ {} ],
		};
	}, [ onUndo, onRedo ] );

	return (
		<>
			<IsolatedBlockEditor
				blocks={ blocks }
				onInput={ handleOnInput }
				onChange={ handleOnChange }
				undoManager={ undoManager }
				settings={ {} }
			/>
			<div className="log">{ log.join( ',' ) }</div>
		</>
	);
};

Controlled.args = {
	inserter: true,
	inspector: true,
	navigation: true,
	toc: true,
	documentInspector: 'Document',
};

Controlled.argTypes = {
	onInput: { action: 'input' },
	onChange: { action: 'change' },
	onUndo: { action: 'undo' },
	onRedo: { action: 'redo' },
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
