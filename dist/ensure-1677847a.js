function c(i, t, e, s) {
  this.fn = t, this.ctx = e || null, this.owner = i, this.once = !!s;
}
function u(i, t) {
  t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.ctx = t.fn = t.owner = null, t === i._first && (i._first = t.next), t === i._last && (i._last = t.prev);
}
class l {
  constructor() {
    this._first = this._last = null;
  }
  dispatch(t, e, s, r, a) {
    let n = this._first;
    for (; n; )
      n.fn.call(n.ctx, t, e, s, r, a), n.once && this.unsubscribe(n), n = n.next;
  }
  subscribe(t, e, s) {
    const r = new c(this, t, e, s);
    return this._first ? (this._last.next = r, r.prev = this._last, this._last = r) : (this._first = r, this._last = r), r;
  }
  subscribeOnce(t, e) {
    return this.subscribe(t, e, !0);
  }
  unsubscribe(t, e) {
    if (t instanceof c)
      return u(this, t);
    e || (e = null);
    let s = this._first;
    for (; s; )
      s.fn === t && s.ctx === e && u(this, s), s = s.next;
  }
  unsubscribeAll() {
    let t = this._first;
    for (this._first = this._last = null; t; )
      u(this, t), t = t.next;
  }
}
function o() {
  return new l();
}
class h extends l {
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
function b(i) {
  return new h(i);
}
class f extends h {
  set(t, e) {
    if (!e && this.current === t)
      return;
    this.previous = this.current, this.current = t;
    let s = this._first;
    for (; s; )
      s.fn.call(s.ctx, this.current, this.previous), s.once && this.unsubscribe(s), s = s.next;
  }
  update(t, e) {
    const s = t(this.current);
    this.set(s !== void 0 ? s : this.current, e);
  }
}
function _(i) {
  return new f(i);
}
const x = (i) => (...t) => {
  for (const e of t) {
    if (e instanceof l)
      return e;
    if (e !== void 0)
      return i(e);
  }
  return i(null);
};
export {
  f as W,
  x as e,
  b as r,
  o as s,
  _ as w
};
