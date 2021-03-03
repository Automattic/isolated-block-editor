/**
 * Internal dependencies
 */
import useBlockSync from './use-block-sync';

function BlockEditorProvider(props) {
  var children = props.children; // Syncs the entity provider with changes in the block-editor store.

  useBlockSync(props);
  return children;
}

export default BlockEditorProvider;
//# sourceMappingURL=index.js.map