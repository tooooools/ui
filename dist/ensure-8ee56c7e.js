function f(i, t, s, e) {
  this.fn = t, this.ctx = s || null, this.owner = i, this.once = !!e;
}
function c(i, t) {
  t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.ctx = t.fn = t.owner = null, t === i._first && (i._first = t.next), t === i._last && (i._last = t.prev);
}
class h {
  constructor() {
    this._first = this._last = null;
  }
  dispatch(t, s, e, r, l) {
    let u = this._first;
    for (; u; )
      u.fn.call(u.ctx, t, s, e, r, l), u.once && this.unsubscribe(u), u = u.next;
  }
  subscribe(t, s, e) {
    const r = new f(this, t, s, e);
    return this._first ? (this._last.next = r, r.prev = this._last, this._last = r) : (this._first = r, this._last = r), r;
  }
  subscribeOnce(t, s) {
    return this.subscribe(t, s, !0);
  }
  unsubscribe(t, s) {
    if (t instanceof f)
      return c(this, t);
    s || (s = null);
    let e = this._first;
    for (; e; )
      e.fn === t && e.ctx === s && c(this, e), e = e.next;
  }
  unsubscribeAll() {
    let t = this._first;
    for (this._first = this._last = null; t; )
      c(this, t), t = t.next;
  }
}
function b() {
  return new h();
}
class a extends h {
  constructor(t) {
    super(), this.initial = t, this.current = t;
  }
  set() {
    throw new Error("Cannot set a different value for a Readable Signal. Use Writable instead");
  }
  get() {
    return this.current;
  }
}
function d(i) {
  return new a(i);
}
class o extends a {
  set(t, s) {
    if (!s && this.current === t)
      return;
    this.previous = this.current, this.current = t;
    let e = this._first;
    for (; e; )
      e.fn.call(e.ctx, this.current, this.previous), e.once && this.unsubscribe(e), e = e.next;
  }
  reset() {
    this.set(this.initial);
  }
  toggle() {
    this.set(!this.current);
  }
  update(t, s) {
    const e = t(this.current);
    this.set(e !== void 0 ? e : this.current, s);
  }
}
function w(i) {
  return new o(i);
}
function p(i, t) {
  const s = new o(), e = s.set.bind(s);
  delete s.set;
  const r = Array.isArray(i);
  let l = r ? new Array(i.length) : null;
  if (r)
    for (let n = 0, _ = i.length; n < _; n++)
      l[n] = i[n].current, i[n].subscribe(function(x) {
        l[n] = x, u();
      });
  else
    l = i.current, i.subscribe(function(n) {
      l = n, u();
    });
  u();
  function u() {
    const n = t(l);
    n && n.then ? n.then(e) : e(n);
  }
  return s;
}
const v = (i) => (...t) => {
  for (const s of t) {
    if (s instanceof h)
      return s;
    if (s !== void 0)
      return i(s);
  }
  return i(null);
};
export {
  p as d,
  v as e,
  d as r,
  b as s,
  w
};
//# sourceMappingURL=ensure-8ee56c7e.js.map
