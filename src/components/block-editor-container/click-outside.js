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

			if ( target ) {
				if ( target.classList.contains( 'media-modal' ) || target.classList.contains( 'iso-editor' ) ) {
					return;
				}
			}

			if ( ! target || target.closest( '.iso-editor' ) === null ) {
				this.props.onOutside();
				clearSelectedBlock();
			}
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
