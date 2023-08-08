function u(i, t, e, s) {
  this.fn = t, this.ctx = e || null, this.owner = i, this.once = !!s;
}
function l(i, t) {
  t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.ctx = t.fn = t.owner = null, t === i._first && (i._first = t.next), t === i._last && (i._last = t.prev);
}
class h {
  constructor() {
    this._first = this._last = null;
  }
  dispatch(t, e, s, r, a) {
    let n = this._first;
    for (; n; )
      n.fn.call(n.ctx, t, e, s, r, a), n.once && this.unsubscribe(n), n = n.next;
  }
  subscribe(t, e, s) {
    const r = new u(this, t, e, s);
    return this._first ? (this._last.next = r, r.prev = this._last, this._last = r) : (this._first = r, this._last = r), r;
  }
  subscribeOnce(t, e) {
    return this.subscribe(t, e, !0);
  }
  unsubscribe(t, e) {
    if (t instanceof u)
      return l(this, t);
    e || (e = null);
    let s = this._first;
    for (; s; )
      s.fn === t && s.ctx === e && l(this, s), s = s.next;
  }
  unsubscribeAll() {
    let t = this._first;
    for (this._first = this._last = null; t; )
      l(this, t), t = t.next;
  }
}
function b() {
  return new h();
}
class c extends h {
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
function _(i) {
  return new c(i);
}
class f extends c {
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
function o(i) {
  return new f(i);
}
export {
  f as W,
  _ as r,
  b as s,
  o as w
};
