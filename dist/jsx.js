import { h, e as extend } from "./Component-BMsNaW7w.js";
import { C, P, r } from "./Component-BMsNaW7w.js";
function addRef(obj, key) {
  return function(ref) {
    obj[key] = ref;
  };
}
function Fragment(props) {
  return props.children;
}
function cloneElement(vnode, props) {
  return h(
    vnode.nodeName,
    extend(extend({}, vnode.props), props),
    arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children
  );
}
export {
  C as Component,
  Fragment,
  P as Props,
  addRef,
  cloneElement,
  h,
  addRef as ref,
  r as render
};
//# sourceMappingURL=jsx.js.map
