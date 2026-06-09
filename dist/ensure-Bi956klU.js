import { n as noop } from "./noop-JwH-KCvh.js";
function SignalListener(owner, fn, ctx, once) {
  this.fn = fn, this.ctx = ctx || null, this.owner = owner, this.once = !!once;
}
function removeNode(owner, node) {
  node.prev && (node.prev.next = node.next), node.next && (node.next.prev = node.prev), node.ctx = node.fn = node.owner = null, node === owner._first && (owner._first = node.next), node === owner._last && (owner._last = node.prev);
}
class Signal {
  constructor() {
    this._first = this._last = null, this._symbol = Symbol.for("signal");
  }
  dispatch(...values) {
    let node = this._first;
    for (; node; )
      node.fn.call(node.ctx, ...values), node.once && this.unsubscribe(node), node = node.next;
  }
  subscribe(fn, ctx, once) {
    const node = new SignalListener(this, fn, ctx, once);
    return this._first ? (this._last.next = node, node.prev = this._last, this._last = node) : (this._first = node, this._last = node), node;
  }
  subscribeOnce(fn, ctx) {
    return this.subscribe(fn, ctx, !0);
  }
  unsubscribe(fn, ctx) {
    if (fn instanceof SignalListener) return removeNode(this, fn);
    ctx || (ctx = null);
    let node = this._first;
    for (; node; )
      node.fn === fn && node.ctx === ctx && removeNode(this, node), node = node.next;
  }
  unsubscribeAll() {
    let node = this._first;
    for (this._first = this._last = null; node; )
      removeNode(this, node), node = node.next;
  }
}
function signal() {
  return new Signal();
}
class Writable extends Signal {
  #value = void 0;
  #initial = void 0;
  #previous = void 0;
  constructor(value) {
    super(), this.#initial = value, this.#value = value;
  }
  get value() {
    return this.#value;
  }
  set value(value) {
    value !== this.#value && (this.#previous = this.value, this.#value = value, this.dispatch(this.value, this.previous));
  }
  get previous() {
    return this.#previous;
  }
  set previous(value) {
    throw new Error("Cannot manually set previous value");
  }
  get initial() {
    return this.#initial;
  }
  set initial(value) {
    throw new Error("Cannot manually set initial value");
  }
  reset = () => {
    this.value = this.#initial;
  };
  toggle = () => {
    this.value = !this.value;
  };
  force = (value) => {
    value === this.value ? this.dispatch(this.value, this.previous) : this.value = value;
  };
  /** Type coercion **/
  valueOf() {
    return Number(this.value);
  }
  toString() {
    return JSON.stringify(this.value);
  }
  toJSON() {
    return this.value;
  }
  /** Backward compatibility */
  // Prefer using Writable.value and Writable.force()
  update(callback, force) {
    const value = callback(this.value);
    force ? this.force(value) : this.value = value;
  }
  // Prefer using Writable.value
  get() {
    return this.value;
  }
  set(value, force) {
    force ? this.force(value) : this.value = value;
  }
  // Prefer using Writable.value
  get current() {
    return this.value;
  }
  set current(v) {
    throw new Error("Cannot manually set current value. Use Writable.value instead");
  }
}
function writable(v) {
  return new Writable(v);
}
class Derived extends Writable {
  #value = void 0;
  #previous = void 0;
  #source = void 0;
  #callback = noop;
  #listening = !0;
  /**
   * @param {<Signal>|<Signal>[]} source - either a Signal or an array of Signal
   */
  constructor(source, callback) {
    super(), this.#source = source, this.#callback = callback, Array.isArray(this.#source) ? this.#source.forEach(this.#connect) : this.#connect(this.#source), this.#derive();
  }
  get value() {
    return this.#value;
  }
  set value(v) {
    throw new Error("Cannot set value of a derived Signal");
  }
  get previous() {
    return this.#previous;
  }
  set previous(value) {
    throw new Error("Cannot manually set previous value");
  }
  #connect = (signal2) => signal2.subscribe(this.#derive);
  #derive = () => {
    if (!this.#listening) return;
    const value = Array.isArray(this.#source) ? this.#source.map((signal2) => signal2.value) : this.#source.value, setValue = (v) => {
      this.#previous = v, this.#value = v, this.dispatch(this.value, this.previous);
    }, result = this.#callback(value, this.previous);
    result?.then ? result.then(setValue) : setValue(result);
  };
  // Wait for the callback to finish before applying derivation
  // Useful when needing to change multiple signals and trigger only once
  batch = (callback) => {
    this.#listening = !1, callback(), this.#listening = !0, this.#derive();
  };
}
function derived(signals, callback) {
  return new Derived(signals, callback);
}
const ensure = (signal2) => (...values) => {
  for (const value of values) {
    if (value instanceof Signal)
      return value;
    if (value !== void 0)
      return signal2(value);
  }
  return signal2(null);
};
export {
  Derived as D,
  Writable as W,
  derived as d,
  ensure as e,
  signal as s,
  writable as w
};
//# sourceMappingURL=ensure-Bi956klU.js.map
