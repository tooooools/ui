import { W as o } from "./ensure-1677847a.js";
import { e as A, r as g, r as m, s as p, w as x, w as W } from "./ensure-1677847a.js";
function f(e, i) {
  const r = new o(), u = r.set.bind(r);
  delete r.set;
  const a = Array.isArray(e);
  let n = a ? new Array(e.length) : null;
  if (a)
    for (let t = 0, c = e.length; t < c; t++)
      n[t] = e[t].current, e[t].subscribe(function(l) {
        n[t] = l, s();
      });
  else
    n = e.current, e.subscribe(function(t) {
      n = t, s();
    });
  s();
  function s() {
    const t = i(n);
    t && t.then ? t.then(u) : u(t);
  }
  return r;
}
const w = (e) => f(e, (i) => !i);
export {
  f as d,
  f as derived,
  A as ensure,
  w as n,
  w as not,
  g as r,
  m as readable,
  p as signal,
  x as w,
  W as writable
};
