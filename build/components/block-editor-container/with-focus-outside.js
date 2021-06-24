"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = require("lodash");

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

import { createElement } from "@wordpress/element";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Input types which are classified as button types, for use in considering
 * whether element is a (focus-normalized) button.
 *
 * @type {string[]}
 */
var INPUT_BUTTON_TYPES = ['button', 'submit'];
/**
 * Returns true if the given element is a button element subject to focus
 * normalization, or false otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
 *
 * @param {Element} element Element to test.
 *
 * @return {boolean} Whether element is a button.
 */

function isFocusNormalizedButton(element) {
  switch (element.nodeName) {
    case 'A':
    case 'BUTTON':
      return true;

    case 'INPUT':
      return (0, _lodash.includes)(INPUT_BUTTON_TYPES, element.type);
  }

  return false;
}

var _default = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  return /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(_class, _Component);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      (0, _classCallCheck2["default"])(this, _class);
      _this = _super.apply(this, arguments);
      _this.bindNode = _this.bindNode.bind((0, _assertThisInitialized2["default"])(_this));
      _this.cancelBlurCheck = _this.cancelBlurCheck.bind((0, _assertThisInitialized2["default"])(_this));
      _this.queueBlurCheck = _this.queueBlurCheck.bind((0, _assertThisInitialized2["default"])(_this));
      _this.normalizeButtonFocus = _this.normalizeButtonFocus.bind((0, _assertThisInitialized2["default"])(_this));
      return _this;
    }

    (0, _createClass2["default"])(_class, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.blurCheckTimeout);
      }
    }, {
      key: "bindNode",
      value: function bindNode(node) {
        if (node) {
          this.node = node;
        } else {
          delete this.node;
          this.cancelBlurCheck();
        }
      }
    }, {
      key: "queueBlurCheck",
      value: function queueBlurCheck(event) {
        var _this2 = this;

        // React does not allow using an event reference asynchronously
        // due to recycling behavior, except when explicitly persisted.
        event.persist(); // Skip blur check if clicking button. See `normalizeButtonFocus`.

        if (this.preventBlurCheck) {
          return;
        }

        this.blurCheckTimeout = setTimeout(function () {
          // If document is not focused then focus should remain
          // inside the wrapped component and therefore we cancel
          // this blur event thereby leaving focus in place.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus.
          if (!document.hasFocus()) {
            event.preventDefault();
            return;
          }

          if ('function' === typeof _this2.node.handleFocusOutside) {
            _this2.node.handleFocusOutside(event);
          }
        }, 0);
      }
    }, {
      key: "cancelBlurCheck",
      value: function cancelBlurCheck() {
        clearTimeout(this.blurCheckTimeout);

        if (typeof this.node !== 'undefined' && 'function' === typeof this.node.handleFocus) {
          this.node.handleFocus(event);
        }
      }
      /**
       * Handles a mousedown or mouseup event to respectively assign and
       * unassign a flag for preventing blur check on button elements. Some
       * browsers, namely Firefox and Safari, do not emit a focus event on
       * button elements when clicked, while others do. The logic here
       * intends to normalize this as treating click on buttons as focus.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
       *
       * @param {MouseEvent} event Event for mousedown or mouseup.
       */

    }, {
      key: "normalizeButtonFocus",
      value: function normalizeButtonFocus(event) {
        var type = event.type,
            target = event.target;
        var isInteractionEnd = (0, _lodash.includes)(['mouseup', 'touchend'], type);

        if (isInteractionEnd) {
          this.preventBlurCheck = false;
        } else if (isFocusNormalizedButton(target)) {
          this.preventBlurCheck = true;
        }
      }
    }, {
      key: "render",
      value: function render() {
        // Disable reason: See `normalizeButtonFocus` for browser-specific
        // focus event normalization.

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return createElement("div", {
          onFocus: this.cancelBlurCheck,
          onMouseDown: this.normalizeButtonFocus,
          onMouseUp: this.normalizeButtonFocus,
          onTouchStart: this.normalizeButtonFocus,
          onTouchEnd: this.normalizeButtonFocus,
          onBlur: this.queueBlurCheck
        }, createElement(WrappedComponent, (0, _extends2["default"])({
          ref: this.bindNode
        }, this.props)));
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      }
    }]);
    return _class;
  }(_element.Component);
}, 'withFocusOutside');

exports["default"] = _default;
//# sourceMappingURL=with-focus-outside.js.map