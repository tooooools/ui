/* global localStorage */
import writable from './writable'

export default function (key, value, {
  encode = JSON.stringify,
  decode = value => { try { return JSON.parse(value) } catch { return value } }
} = {}) {
  const NS = window.location.pathname + '__'
  const item = localStorage.getItem(NS + key)
  const signal = writable(item ? decode(item) : value)

  if (item === null) localStorage.setItem(NS + key, encode(signal.value))

  signal.persist = value => localStorage.setItem(NS + key, encode(value))
  signal.subscribe(signal.persist)

  return signal
}
