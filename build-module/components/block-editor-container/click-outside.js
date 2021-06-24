/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withFocusOutside } from '@wordpress/components';
const ClickOutsideWrapper = withFocusOutside(class extends Component {
  handleFocus(ev) {
    this.props.onFocus();
  }

  handleFocusOutside(ev) {
    const target = ev.relatedTarget || ev.target; // Ignore clicks in the media modal - consider it inside the editor

    if (target && target.classList.contains('media-modal')) {
      return;
    }

    this.props.onOutside();
  }

  render() {
    return this.props.children;
  }

});
export default ClickOutsideWrapper;
//# sourceMappingURL=click-outside.js.map