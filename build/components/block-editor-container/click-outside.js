"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _element = require("@wordpress/element");
var _withFocusOutside = _interopRequireDefault(require("./with-focus-outside.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } } /**
                                                                                                                                                                                                                                                                                                                                           * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                           */ /**
                                                                                                                                                                                                                                                                                                                                               * Internal dependencies
                                                                                                                                                                                                                                                                                                                                               */
var ClickOutsideWrapper = (0, _withFocusOutside["default"])(
/*#__PURE__*/
// @ts-ignore
function (_Component) {
  (0, _inherits2["default"])(_class, _Component);
  var _super = _createSuper(_class);
  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    return _super.apply(this, arguments);
  }
  (0, _createClass2["default"])(_class, [{
    key: "handleFocus",
    value: function handleFocus(ev) {
      this.props.onFocus();
    }

    // Clicks in the media modal or popup components are considered in the editor
  }, {
    key: "isInspectorElement",
    value: function isInspectorElement(element) {
      // Inside a colour picker popover
      if (element.closest('.components-color-picker')) {
        return true;
      }

      // Inside the inspector
      if (element.closest('.block-editor-block-inspector') || element.closest('.iso-inspector')) {
        return true;
      }

      // In the media modal
      if (element.classList.contains('media-modal')) {
        return true;
      }
      return false;
    }
  }, {
    key: "handleFocusOutside",
    value: function handleFocusOutside(ev) {
      var target = ev.relatedTarget || ev.target;
      if (target && this.isInspectorElement(target)) {
        return;
      }
      this.props.onOutside();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return _class;
}(_element.Component));
var _default = exports["default"] = ClickOutsideWrapper;
//# sourceMappingURL=click-outside.js.map