import { createRegistrySelector } from '@wordpress/data';

export function getYDoc( state ) {
	return state.collab.yDoc;
}

export function getUndoManager( state ) {
	return state.collab.undoManager;
}

// TODO: Unsolved problem
/**
 * Whether the selection is in a RichText attribute.
 *
 * Caution: This won't return false positives, but it will return false negatives.
 * Currently the only way of telling whether a given block attribute is associated with a `<RichText>`
 * in the editor is for it to be passed an `identifier` prop with the block attribute key,
 * e.g. `<RichText identifier="myAttributeKey" />`. If the block developer has neglected to do this,
 * the selection.attributeKey will fall back to a `number`, and we can't tell which attribute it's
 * actually associated with. This happens a lot because the `identifier` prop is undocumented.
 */
export const selectionIsInRichText = createRegistrySelector( ( select ) => ( state ) => {
	const selectionStart = select( 'core/block-editor' ).getSelectionStart();

	// If the selection has an attribute key that is a string, we can deduce that the attribute is a RichText
	return typeof selectionStart.attributeKey === 'string';
} );
