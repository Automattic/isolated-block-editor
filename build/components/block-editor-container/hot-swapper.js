"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _element = require("@wordpress/element");

var _storeHotSwap = _interopRequireDefault(require("../../store/plugins/store-hot-swap"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function HotSwapper(_ref) {
  var isEditing = _ref.isEditing,
      hotSwap = _ref.hotSwap;
  (0, _element.useEffect)(function () {
    hotSwap(isEditing);
  }, [isEditing]);
  return null;
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
      isEditing = _select.isEditing;

  return {
    isEditing: isEditing()
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps, _ref2) {
  var select = _ref2.select;
  return {
    hotSwap: function hotSwap(isEditing) {
      _storeHotSwap["default"].resetEditor();

      if (isEditing) {
        _storeHotSwap["default"].setEditor(select, dispatch);
      }
    }
  };
})])(HotSwapper);

exports["default"] = _default;
//# sourceMappingURL=hot-swapper.js.map