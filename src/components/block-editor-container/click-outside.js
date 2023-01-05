/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import withFocusOutside from './with-focus-outside.js';

const ClickOutsideWrapper = withFocusOutside(
	// @ts-ignore
	class extends Component {
		handleFocus( ev ) {
			this.props.onFocus();
		}

		// Clicks in the media modal or popup components are considered in the editor
		isInspectorElement( element ) {
			// Inside a colour picker popover
			if ( element.closest( '.components-color-picker' ) ) {
				return true;
			}

			// Inside the inspector
			if ( element.closest( '.block-editor-block-inspector' ) || element.closest( '.iso-inspector' ) ) {
				return true;
			}

			// In the media modal
			if ( element.classList.contains( 'media-modal' ) ) {
				return true;
			}

			return false;
		}

		handleFocusOutside( ev ) {
			const target = ev.relatedTarget || ev.target;

			if ( target && this.isInspectorElement( target ) ) {
				return;
			}

			this.props.onOutside();
		}

		render() {
			return this.props.children;
		}
	}
);

export default ClickOutsideWrapper;
