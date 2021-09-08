/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import withFocusOutside from './with-focus-outside.js';
const ClickOutsideWrapper = withFocusOutside(class extends Component {
  handleFocus(ev) {
    this.props.onFocus();
  } // Clicks in the media modal or popup components are considered in the editor


  isInspectorElement(element) {
    if (element.closest('.components-color-picker')) {
      return true;
    }

    if (element.closest('.block-editor-block-inspector')) {
      return true;
    }

    if (element.classList.contains('media-modal')) {
      return true;
    }

    return false;
  }

  handleFocusOutside(ev) {
    const target = ev.relatedTarget || ev.target;

    if (target && this.isInspectorElement(target)) {
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