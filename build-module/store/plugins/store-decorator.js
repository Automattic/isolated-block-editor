import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Swap any access to `core/block-editor` to the currently focussed editor store. This ensures that blocks that directly access
 * wp.data still work.
 *
 * Note that store plugins are currently marked as deprecated. It's unknown what will replace them, and this will need to be updated
 * once that happens.
 *
 * @param {object} registry
 * @param {object} pluginOptions
 */
function storeDecoratorPlugin(registry, pluginOptions) {
  // Switch select and dispatch
  return {
    select: function select(reducerKey) {
      if (pluginOptions && pluginOptions[reducerKey]) {
        var original = registry.select(reducerKey);
        return _objectSpread(_objectSpread({}, original), pluginOptions[reducerKey](original, registry));
      }

      return registry.select(reducerKey);
    }
  };
}

export default storeDecoratorPlugin;
//# sourceMappingURL=store-decorator.js.map