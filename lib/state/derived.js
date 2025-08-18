import { Writable } from './writable'
import noop from '../utils/noop'

class Derived extends Writable {
  #value = undefined
  #previous = undefined

  #source = undefined
  #callback = noop

  #listening = true

  /**
   * @param {<Signal>|<Signal>[]} source - either a Signal or an array of Signal
   */
  constructor (source, callback) {
    super()

    this.#source = source
    this.#callback = callback

    if (Array.isArray(this.#source)) this.#source.forEach(this.#connect)
    else this.#connect(this.#source)

    this.#derive()
  }

  get value () { return this.#value }
  set value (v) { throw new Error('Cannot set value of a derived Signal') }

  #connect = signal => signal.subscribe(this.#derive)

  #derive = () => {
    if (!this.#listening) return

    const value = Array.isArray(this.#source)
      ? this.#source.map(signal => signal.value)
      : this.#source.value

    const setValue = v => {
      // TODO dispatch only once by microtask
      this.#value = v
      this.dispatch(this.value, this.previous)
    }

    const result = this.#callback(value)
    if (result?.then) result.then(setValue)
    else setValue(result)
  }


  // Wait for the callback to finish before applying derivation
  // Useful when needing to change multiple signals and trigger only once
  batch = callback => {
    this.#listening = false
    callback()

    this.#listening = true
    this.#derive()
  }
}

export { Derived }
export default function derived (signals, callback) {
  return new Derived(signals, callback)
}
