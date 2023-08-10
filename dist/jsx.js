import { h as o, e as r } from "./Component-91875d4d.js";
import { C as l, r as u } from "./Component-91875d4d.js";
function m(e, n) {
  return function(t) {
    e[n] = t;
  };
}
function s(e, n) {
  return o(
    e.nodeName,
    r(r({}, e.props), n),
    arguments.length > 2 ? [].slice.call(arguments, 2) : e.children
  );
}
export {
  l as Component,
  m as addRef,
  s as cloneElement,
  o as h,
  m as ref,
  u as render
};
//# sourceMappingURL=jsx.js.map
