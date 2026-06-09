import { d as derived, w as writable, W as Writable } from "./ensure-Bi956klU.js";
import { D, e, s } from "./ensure-Bi956klU.js";
const not = (signal) => derived(signal, (value) => !value);
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
  const NS = window.location.pathname + "__", item = localStorage.getItem(NS + key), signal = writable(item ? decode(item) : value);
  return item === null && localStorage.setItem(NS + key, encode(signal.current)), signal.persist = (value2) => localStorage.setItem(NS + key, encode(value2)), signal.subscribe(signal.persist), signal;
}
function placeholder() {
  const placeholder2 = new Writable(), setValue = placeholder2.set.bind(placeholder2);
  return delete placeholder2.set, placeholder2.fill = function(signal, dispatch = !1) {
    if (placeholder2.filled) throw new Error("This placeholder has already been filled");
    placeholder2.filled = signal, signal.subscribe((value) => setValue(value, !0)), dispatch && setValue(signal.get(), !0);
  }, placeholder2;
}
const $ = function(value, derivation, signal = writable, ...params) {
  const hasDerivation = typeof derivation == "function", isSignal = String(value?._symbol) === "Symbol(signal)";
  if (hasDerivation) {
    const signals = Array.isArray(value) ? value.map((v) => $(v, null, signal)) : $(value, null, signal);
    return derived(signals, derivation);
  } else return isSignal ? value : signal(value, ...params);
};
export {
  $,
  D as Derived,
  Writable,
  derived,
  e as ensure,
  not,
  persist,
  placeholder,
  s as signal,
  writable
};
//# sourceMappingURL=state.js.map
