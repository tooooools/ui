import { S as Signal, n as noop, i as isSignal } from "./signal-DpLAi1GD.js";
import { b, s } from "./signal-DpLAi1GD.js";
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
    this.#previous = this.#value, this.#value = value, this.#value !== this.#previous && this.dispatch(this.#value, this.#previous);
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
  #connect = (signal) => signal.subscribe(this.#derive);
  #derive = () => {
    const value = Array.isArray(this.#source) ? this.#source.map((signal) => signal.value) : this.#source.value;
    this.#previous = this.#value, this.#value = this.#callback(value, this.#previous), this.#value !== this.#previous && this.dispatch(this.#value, this.#previous);
  };
}
function derived(signals, callback) {
  return new Derived(signals, callback);
}
class Slot extends Writable {
  #source = void 0;
  #onSourceChange = (value) => {
    this.value = value;
  };
  fill(source) {
    this.#source && this.#source.unsubscribe(this.#onSourceChange), this.#source = source, this.value = source.value, source.subscribe(this.#onSourceChange);
  }
}
function slot() {
  return new Slot();
}
const not = (signal) => derived(signal, (value) => !value);
function persist(key, value, {
  encode = JSON.stringify,
  decode = (value2) => {
    try {
      return JSON.parse(value2);
    } catch {
      return value2;
    }
  }
} = {}) {
  const NS = window.location.pathname + "__", item = localStorage.getItem(NS + key), signal = writable(item ? decode(item) : value);
  return item === null && localStorage.setItem(NS + key, encode(signal.value)), signal.persist = (value2) => localStorage.setItem(NS + key, encode(value2)), signal.subscribe(signal.persist), signal;
}
const $ = function(value, derivation, signal = writable, ...params) {
  if (typeof derivation == "function") {
    const signals = Array.isArray(value) ? value.map((v) => $(v, null, signal)) : $(value, null, signal);
    return derived(signals, derivation);
  } else return isSignal(value) ? value : signal(value, ...params);
};
export {
  $,
  Derived,
  Slot,
  Writable,
  b as batch,
  derived,
  isSignal,
  not,
  persist,
  s as signal,
  slot,
  writable
};
//# sourceMappingURL=state.js.map
