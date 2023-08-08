function h(s, t, i, e) {
  this.fn = t, this.ctx = i || null, this.owner = s, this.once = !!e;
}
function c(s, t) {
  t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.ctx = t.fn = t.owner = null, t === s._first && (s._first = t.next), t === s._last && (s._last = t.prev);
}
class a {
  constructor() {
    this._first = this._last = null;
  }
  dispatch(t, i, e, r, l) {
    let u = this._first;
    for (; u; )
      u.fn.call(u.ctx, t, i, e, r, l), u.once && this.unsubscribe(u), u = u.next;
  }
  subscribe(t, i, e) {
    const r = new h(this, t, i, e);
    return this._first ? (this._last.next = r, r.prev = this._last, this._last = r) : (this._first = r, this._last = r), r;
  }
  subscribeOnce(t, i) {
    return this.subscribe(t, i, !0);
  }
  unsubscribe(t, i) {
    if (t instanceof h)
      return c(this, t);
    i || (i = null);
    let e = this._first;
    for (; e; )
      e.fn === t && e.ctx === i && c(this, e), e = e.next;
  }
  unsubscribeAll() {
    let t = this._first;
    for (this._first = this._last = null; t; )
      c(this, t), t = t.next;
  }
}
function w() {
  return new a();
}
class f extends a {
  constructor(t) {
    super(), this.current = t;
  }
  set() {
    throw new Error("Cannot set a different value for a Readable Signal. Use Writable instead");
  }
  get() {
    return this.current;
  }
}
function p(s) {
  return new f(s);
}
class o extends f {
  set(t, i) {
    if (!i && this.current === t)
      return;
    this.previous = this.current, this.current = t;
    let e = this._first;
    for (; e; )
      e.fn.call(e.ctx, this.current, this.previous), e.once && this.unsubscribe(e), e = e.next;
  }
  update(t, i) {
    const e = t(this.current);
    this.set(e !== void 0 ? e : this.current, i);
  }
}
function d(s) {
  return new o(s);
}
function b(s, t) {
  const i = new o(), e = i.set.bind(i);
  delete i.set;
  const r = Array.isArray(s);
  let l = r ? new Array(s.length) : null;
  if (r)
    for (let n = 0, _ = s.length; n < _; n++)
      l[n] = s[n].current, s[n].subscribe(function(x) {
        l[n] = x, u();
      });
  else
    l = s.current, s.subscribe(function(n) {
      l = n, u();
    });
  u();
  function u() {
    const n = t(l);
    n && n.then ? n.then(e) : e(n);
  }
  return i;
}
const v = (s) => b(s, (t) => !t);
export {
  b as d,
  b as derived,
  v as n,
  v as not,
  p as r,
  p as readable,
  w as signal,
  d as w,
  d as writable
};
