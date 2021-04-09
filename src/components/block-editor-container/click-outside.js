/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import withFocusOutside from './with-focus-outside.js';

const ClickOutsideWrapper = withFocusOutside(
	class extends Component {
		handleFocus( ev ) {
			this.props.onFocus();
		}

		handleFocusOutside( ev ) {
			const target = ev.relatedTarget || ev.target;
			const { clearSelectedBlock } = this.props;

			// Ignore clicks in the media modal - consider it inside the editor
			if ( target && target.classList.contains( 'media-modal' ) ) {
				return;
			}

			this.props.onOutside();
			clearSelectedBlock();
		}

		render() {
			return this.props.children;
		}
	}
);

export default compose( [
	withDispatch( ( dispatch ) => {
		const {
			clearSelectedBlock,
		} = dispatch( 'core/block-editor' );

		return {
			clearSelectedBlock,
		};
	} ),
] )( ClickOutsideWrapper );
