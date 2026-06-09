import { n as noop } from "./noop-JwH-KCvh.js";
function SignalListener(owner, fn, ctx, once) {
  this.fn = fn, this.ctx = ctx || null, this.owner = owner, this.once = !!once;
}
function removeNode(owner, node) {
  node.prev && (node.prev.next = node.next), node.next && (node.next.prev = node.prev), node.ctx = node.fn = node.owner = null, node === owner._first && (owner._first = node.next), node === owner._last && (owner._last = node.prev);
}
let batchDepth = 0;
const batchQueue = /* @__PURE__ */ new Map();
class Signal {
  constructor() {
    this._first = this._last = null, this._symbol = Symbol.for("signal");
  }
  dispatch(...values) {
    if (batchDepth > 0) {
      batchQueue.set(this, values);
      return;
    }
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
    if (!fn) throw new Error("unsubscribe() called without a handler");
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
function batch(fn) {
  batchDepth++;
  try {
    fn();
  } finally {
    if (batchDepth--, batchDepth === 0) {
      const queue = [...batchQueue];
      batchQueue.clear();
      for (const [signal2, values] of queue) signal2.dispatch(...values);
    }
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
}
function writable(v) {
  return new Writable(v);
}
class Derived extends Writable {
  #value = void 0;
  #previous = void 0;
  #source = void 0;
  #callback = noop;
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
    const value = Array.isArray(this.#source) ? this.#source.map((signal2) => signal2.value) : this.#source.value, previous = this.#previous, result = this.#callback(value, previous);
    result !== previous && (this.#previous = result, this.#value = result, this.dispatch(result, previous));
  };
}
function derived(signals, callback) {
  return new Derived(signals, callback);
}
const not = (signal2) => derived(signal2, (value) => !value);
function persist(value, key, {
  encode = JSON.stringify,
  decode = (value2) => {
    try {
      return JSON.parse(value2);
    } catch {
      return value2;
    }
  }
} = {}) {
  const NS = window.location.pathname + "__", item = localStorage.getItem(NS + key), signal2 = writable(item ? decode(item) : value);
  return item === null && localStorage.setItem(NS + key, encode(signal2.value)), signal2.persist = (value2) => localStorage.setItem(NS + key, encode(value2)), signal2.subscribe(signal2.persist), signal2;
}
const ensure = (signal2) => (...values) => {
  for (const value of values) {
    if (value instanceof Signal)
      return value;
    if (value !== void 0)
      return signal2(value);
  }
  return signal2(null);
}, $ = function(value, derivation, signal2 = writable, ...params) {
  const hasDerivation = typeof derivation == "function", isSignal = String(value?._symbol) === "Symbol(signal)";
  if (hasDerivation) {
    const signals = Array.isArray(value) ? value.map((v) => $(v, null, signal2)) : $(value, null, signal2);
    return derived(signals, derivation);
  } else return isSignal ? value : signal2(value, ...params);
};
export {
  $,
  Derived,
  Writable,
  batch,
  derived,
  ensure,
  not,
  persist,
  signal,
  writable
};
//# sourceMappingURL=state.js.map
