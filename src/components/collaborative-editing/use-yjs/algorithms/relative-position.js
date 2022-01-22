/**
 * External dependencies
 */
import * as yjs from 'yjs';

export class RelativePosition {
	/** @param {Object} registry - Redux data registry. */
	constructor( registry ) {
		this.getSelection = () => ( {
			start: registry.select( 'core/block-editor' ).getSelectionStart(),
			end: registry.select( 'core/block-editor' ).getSelectionEnd(),
		} );
		this.selectionChange = registry.dispatch( 'core/block-editor' ).selectionChange;
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
		const { clientId, attributeKey } = start || {};
		const richTexts = doc.getMap( 'post' )?.get( 'blocks' )?.get( 'richTexts' );

		if ( richTexts?.get( clientId )?.has( attributeKey ) ) {
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
		if ( this.relPos ) {
			const { clientId, attributeKey, startOffset, endOffset } = this.relPos;
			this.selectionChange(
				clientId,
				attributeKey,
				yjs.createAbsolutePositionFromRelativePosition( startOffset, doc )?.index,
				yjs.createAbsolutePositionFromRelativePosition( endOffset, doc )?.index
			);
		}
	}
}
