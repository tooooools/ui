import { Writable } from './writable'
import noop from '../utils/noop'

class Derived extends Writable {
  #value = undefined
  #previous = undefined

  #source = undefined
  #callback = noop

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

  get previous () { return this.#previous }
  set previous (value) { throw new Error('Cannot manually set previous value') }

  #connect = signal => signal.subscribe(this.#derive)

  #derive = () => {
    const value = Array.isArray(this.#source)
      ? this.#source.map(signal => signal.value)
      : this.#source.value

    const previous = this.#previous
    const result = this.#callback(value, previous)
    if (result === previous) return
    this.#previous = result
    this.#value = result
    this.dispatch(result, previous)
  }
}

export { Derived }
export default function derived (signals, callback) {
  return new Derived(signals, callback)
}
