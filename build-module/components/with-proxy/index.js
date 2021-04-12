import { createElement } from "@wordpress/element";
import { useRegistry } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
export var withProxiedDispatch = function withProxiedDispatch(WrappedComponent, from, to) {
  return function (props) {
    var registry = useRegistry();
    useEffect(function () {
      registry.addDispatchProxy(from, to);
      return function () {
        registry.removeDispatchProxy(from);
      };
    }, []);
    return createElement(WrappedComponent, props);
  };
};
export var withProxiedSelect = function withProxiedSelect(WrappedComponent, from, to) {
  return function (props) {
    var registry = useRegistry();
    useEffect(function () {
      registry.addSelectProxy(from, to);
      return function () {
        registry.removeSelectProxy(from);
      };
    }, []);
    return createElement(WrappedComponent, props);
  };
};
//# sourceMappingURL=index.js.map