import { W as o } from "./writable-e21d6212.js";
import { r as A, r as g, s as m, w as p, w as x } from "./writable-e21d6212.js";
function f(n, i) {
  const r = new o(), u = r.set.bind(r);
  delete r.set;
  const c = Array.isArray(n);
  let e = c ? new Array(n.length) : null;
  if (c)
    for (let t = 0, a = n.length; t < a; t++)
      e[t] = n[t].current, n[t].subscribe(function(l) {
        e[t] = l, s();
      });
  else
    e = n.current, n.subscribe(function(t) {
      e = t, s();
    });
  s();
  function s() {
    const t = i(e);
    t && t.then ? t.then(u) : u(t);
  }
  return r;
}
const w = (n) => f(n, (i) => !i);
export {
  f as d,
  f as derived,
  w as n,
  w as not,
  A as r,
  g as readable,
  m as signal,
  p as w,
  x as writable
};
