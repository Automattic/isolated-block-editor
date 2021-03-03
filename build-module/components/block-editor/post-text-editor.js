import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import Textarea from 'react-autosize-textarea';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { withInstanceId, compose } from '@wordpress/compose';
import { parse, serialize } from '@wordpress/blocks';
export var PostTextEditor = /*#__PURE__*/function (_Component) {
  _inherits(PostTextEditor, _Component);

  var _super = _createSuper(PostTextEditor);

  function PostTextEditor() {
    var _this;

    _classCallCheck(this, PostTextEditor);

    _this = _super.apply(this, arguments);
    _this.edit = _this.edit.bind(_assertThisInitialized(_this));
    _this.stopEditing = _this.stopEditing.bind(_assertThisInitialized(_this));
    _this.state = {};
    return _this;
  }

  _createClass(PostTextEditor, [{
    key: "edit",
    value:
    /**
     * Handles a textarea change event to notify the onChange prop callback and
     * reflect the new value in the component's own state. This marks the start
     * of the user's edits, if not already changed, preventing future props
     * changes to value from replacing the rendered value. This is expected to
     * be followed by a reset to dirty state via `stopEditing`.
     *
     * @see stopEditing
     *
     * @param {Event} event Change event.
     */
    function edit(event) {
      var value = event.target.value;
      this.props.onChange(value);
      this.setState({
        value: value,
        isDirty: true
      });
    }
    /**
     * Function called when the user has completed their edits, responsible for
     * ensuring that changes, if made, are surfaced to the onPersist prop
     * callback and resetting dirty state.
     */

  }, {
    key: "stopEditing",
    value: function stopEditing() {
      if (this.state.isDirty) {
        this.props.onPersist(this.state.value);
        this.setState({
          isDirty: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var instanceId = this.props.instanceId;
      return createElement(Fragment, null, createElement("label", {
        htmlFor: "post-content-".concat(instanceId),
        className: "screen-reader-text"
      }, __('Type text or HTML')), createElement(Textarea, {
        autoComplete: "off",
        dir: "auto",
        value: value,
        onChange: this.edit,
        onBlur: this.stopEditing,
        className: "editor-post-text-editor",
        id: "post-content-".concat(instanceId),
        placeholder: __('Start writing with text or HTML')
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.isDirty) {
        return null;
      }

      return {
        value: props.value,
        isDirty: false
      };
    }
  }]);

  return PostTextEditor;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      getBlocks = _select.getBlocks;

  return {
    value: serialize(getBlocks())
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;

  return {
    onChange: function onChange(content) {
      var blocks = parse(content);
      updateBlocksWithoutUndo(blocks);
    },
    onPersist: function onPersist(content) {
      var blocks = parse(content);
      updateBlocksWithoutUndo(blocks);
    }
  };
}), withInstanceId])(PostTextEditor);
//# sourceMappingURL=post-text-editor.js.map