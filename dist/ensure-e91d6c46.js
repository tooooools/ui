function f(i, t, e, s) {
  this.fn = t, this.ctx = e || null, this.owner = i, this.once = !!s;
}
function c(i, t) {
  t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.ctx = t.fn = t.owner = null, t === i._first && (i._first = t.next), t === i._last && (i._last = t.prev);
}
class h {
  constructor() {
    this._first = this._last = null, this._symbol = Symbol("signal");
  }
  dispatch(t, e, s, r, l) {
    let u = this._first;
    for (; u; )
      u.fn.call(u.ctx, t, e, s, r, l), u.once && this.unsubscribe(u), u = u.next;
  }
  subscribe(t, e, s) {
    const r = new f(this, t, e, s);
    return this._first ? (this._last.next = r, r.prev = this._last, this._last = r) : (this._first = r, this._last = r), r;
  }
  subscribeOnce(t, e) {
    return this.subscribe(t, e, !0);
  }
  unsubscribe(t, e) {
    if (t instanceof f)
      return c(this, t);
    e || (e = null);
    let s = this._first;
    for (; s; )
      s.fn === t && s.ctx === e && c(this, s), s = s.next;
  }
  unsubscribeAll() {
    let t = this._first;
    for (this._first = this._last = null; t; )
      c(this, t), t = t.next;
  }
}
function x() {
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
  constructor(t) {
    super(t), this.toggle = this.toggle.bind(this), this.reset = this.reset.bind(this);
  }
  set(t, e) {
    if (!e && this.current === t)
      return;
    this.previous = this.current, this.current = t;
    let s = this._first;
    for (; s; )
      s.fn.call(s.ctx, this.current, this.previous), s.once && this.unsubscribe(s), s = s.next;
  }
  reset() {
    this.set(this.initial);
  }
  toggle() {
    this.set(!this.current);
  }
  update(t, e) {
    const s = t(this.current);
    this.set(s !== void 0 ? s : this.current, e);
  }
}
function g(i) {
  return new o(i);
}
function p(i, t) {
  const e = new o(), s = e.set.bind(e);
  delete e.set;
  const r = Array.isArray(i);
  let l = r ? new Array(i.length) : null;
  if (r)
    for (let n = 0, _ = i.length; n < _; n++)
      l[n] = i[n].current, i[n].subscribe(function(b) {
        l[n] = b, u();
      });
  else
    l = i.current, i.subscribe(function(n) {
      l = n, u();
    });
  u();
  function u() {
    const n = t(l);
    n && n.then ? n.then(s) : s(n);
  }
  return e;
}
const w = (i) => (...t) => {
  for (const e of t) {
    if (e instanceof h)
      return e;
    if (e !== void 0)
      return i(e);
  }
  return i(null);
};
export {
  p as d,
  w as e,
  d as r,
  x as s,
  g as w
};
//# sourceMappingURL=ensure-e91d6c46.js.map
