import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import withFocusOutside from './with-focus-outside.js';
var ClickOutsideWrapper = withFocusOutside( /*#__PURE__*/function (_Component) {
  _inherits(_class, _Component);

  var _super = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "handleFocus",
    value: function handleFocus(ev) {
      this.props.onFocus();
    }
  }, {
    key: "handleFocusOutside",
    value: function handleFocusOutside(ev) {
      var target = ev.relatedTarget || ev.target;
      var clearSelectedBlock = this.props.clearSelectedBlock; // Ignore clicks in the media modal - consider it inside the editor

      if (target && target.classList.contains('media-modal')) {
        return;
      }

      this.props.onOutside();
      clearSelectedBlock();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return _class;
}(Component));
export default compose([withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch.clearSelectedBlock;

  return {
    clearSelectedBlock: clearSelectedBlock
  };
})])(ClickOutsideWrapper);
//# sourceMappingURL=click-outside.js.map