import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
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
      return includes(INPUT_BUTTON_TYPES, element.type);
  }

  return false;
}

export default createHigherOrderComponent(function (WrappedComponent) {
  return /*#__PURE__*/function (_Component) {
    _inherits(_class, _Component);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.apply(this, arguments);
      _this.bindNode = _this.bindNode.bind(_assertThisInitialized(_this));
      _this.cancelBlurCheck = _this.cancelBlurCheck.bind(_assertThisInitialized(_this));
      _this.queueBlurCheck = _this.queueBlurCheck.bind(_assertThisInitialized(_this));
      _this.normalizeButtonFocus = _this.normalizeButtonFocus.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(_class, [{
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
        var isInteractionEnd = includes(['mouseup', 'touchend'], type);

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
        }, createElement(WrappedComponent, _extends({
          ref: this.bindNode
        }, this.props)));
        /* eslint-enable jsx-a11y/no-static-element-interactions */
      }
    }]);

    return _class;
  }(Component);
}, 'withFocusOutside');
//# sourceMappingURL=with-focus-outside.js.map