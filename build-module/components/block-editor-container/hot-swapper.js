import storeHotSwapPlugin from '../../store/plugins/store-hot-swap';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

function HotSwapper(_ref) {
  let {
    isEditing,
    hotSwap
  } = _ref;
  useEffect(() => {
    hotSwap(isEditing);
  }, [isEditing]);
  return null;
}

export default compose([withSelect(select => {
  const {
    isEditing
  } = select('isolated/editor');
  return {
    isEditing: isEditing()
  };
}), withDispatch((dispatch, ownProps, _ref2) => {
  let {
    select
  } = _ref2;
  return {
    hotSwap: isEditing => {
      storeHotSwapPlugin.resetEditor();

      if (isEditing) {
        storeHotSwapPlugin.setEditor(select, dispatch);
      }
    }
  };
})])(HotSwapper);
//# sourceMappingURL=hot-swapper.js.map