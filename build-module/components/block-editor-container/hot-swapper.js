import storeHotSwapPlugin from '../../store/plugins/store-hot-swap';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

function HotSwapper(_ref) {
  var isEditing = _ref.isEditing,
      hotSwap = _ref.hotSwap;
  useEffect(function () {
    hotSwap(isEditing);
  }, [isEditing]);
  return null;
}

export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      isEditing = _select.isEditing;

  return {
    isEditing: isEditing()
  };
}), withDispatch(function (dispatch, ownProps, _ref2) {
  var select = _ref2.select;
  return {
    hotSwap: function hotSwap(isEditing) {
      storeHotSwapPlugin.resetEditor();

      if (isEditing) {
        storeHotSwapPlugin.setEditor(select, dispatch);
      }
    }
  };
})])(HotSwapper);
//# sourceMappingURL=hot-swapper.js.map