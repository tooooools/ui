import writable, { Writable } from './writable'
import derived, { Derived } from './derived'
import slot, { Slot } from './slot'
import { isSignal } from './signal'

export { default as signal, batch, isSignal } from './signal'
export { writable, Writable }
export { derived, Derived }
export { slot, Slot }

export { default as not } from './not'
export { default as persist } from './persist'

/**
 * Syntactic sugar to implicitly cast Writable/Derived signals
 * @param {<Signal>, <Array>[<Signal>]} value - Input Signals
 * @param {function} derivation - Function returning the derived value. If input is an array, derivation parameter is an array
 * @param {function} signal - Function returning a <Signal>. Default to Writable, a custom implementation
 * @return {<Signal>}
 * @example
 *   const a = $(1)
 *   const b = $(2)
 *   const twiceA = $($one, v => v + 1)
 *   const sum = $([$a, $b], ([a, b]) => a + b)
 */
export const $ = function (value, derivation, signal = writable, ...params) {
  const hasDerivation = typeof derivation === 'function'

  if (hasDerivation) {
    const signals = Array.isArray(value) ? value.map(v => $(v, null, signal)) : $(value, null, signal)
    return derived(signals, derivation)
  } else if (isSignal(value)) {
    return value
  } else {
    return signal(value, ...params)
  }
}
