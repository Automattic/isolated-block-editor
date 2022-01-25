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

/**
 * @typedef RelativePositionManager
 * @property {(doc: yjs.Doc) => void} saveRelativePosition
 * @property {(doc: yjs.Doc) => void} setAbsolutePosition
 */

/**
 * Handle the conversion between a Yjs relative position and a Gutenberg absolute position.
 *
 * This is used to maintain a user's caret position so it doesn't look like it's pushed around by remote changes.
 * For example, if my caret is at `ab|c` and a remote user changes the text to `aabc`, I want my
 * caret to "stay" relative to the `b` (`aab|c`) instead of staying at the same absolute index (`aa|bc`).
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
	 * Get the current block editor selection, convert it to a Y.RelativePosition, and remember it.
	 *
	 * Call this method _before_ the Y.Doc is mutated.
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
	 * Call this method _after_ the Y.Doc is mutated.
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
