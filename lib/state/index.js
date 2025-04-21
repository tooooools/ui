import derived from './derived'
import writable from './writable'

export { writable }
export { derived }

export { default as readable } from './readable'
export { default as not } from './not'
export { default as signal } from './signal'
export { default as persist } from './persist'
export { default as placeholder } from './placeholder'
export { default as ensure } from './utils/ensure'

/**
 * Syntactic sugar to implicitly cast writable/derived signals
 * @param {<Signal|mixed>, <Array>[<Signal|mixed>]} value - Input value or Signal
 * @param  {function} derivation - Function returning the derived value. If input is an array, derivation parameter is an array
 * @param  {function} signal - Function returning a <Signal>. Default to writable, can be readable, persist etc or a custom implementation
 * @return {<Signal>}
 * @example
 *   const a = $(1)
 *   const b = $(2)
 *   const twiceA = $($one, v => v + 1)
 *   const sum = $([$a, $b], ([a, b]) => a + b)
 */
export function $ (value, derivation, signal = writable, ...params) {
  const hasDerivation = typeof derivation === 'function'
  const isSignal = String(value?._symbol) === 'Symbol(signal)'

  if (hasDerivation) {
    const signals = Array.isArray(value) ? value.map(v => $(v, null, signal)) : $(value, null, signal)
    return derived(signals, derivation)
  } else if (isSignal) {
    return value
  } else {
    return signal(value, ...params)
  }
}
