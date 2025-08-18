import { Signal } from './signal'

class Writable extends Signal {
  #value = undefined
  #initial = undefined
  #previous = undefined

  constructor (value) {
    super()
    this.#initial = value
    this.#value = value
  }

  get value () { return this.#value }
  set value (value) {
    if (value === this.#value) return

    this.#previous = this.value
    this.#value = value

    this.dispatch(this.value, this.previous)
  }

  get previous () { return this.#previous }
  set previous (value) { throw new Error('Cannot manually set previous value') }

  get initial () { return this.#initial }
  set initial (value) { throw new Error('Cannot manually set initial value') }

  reset = () => { this.value = this.#initial }
  toggle = () => { this.value = !this.value }
  force = value => {
    if (value === this.value) this.dispatch(this.value, this.previous)
    else {
      this.value = value
    }
  }

  /** Type coercion **/

  valueOf () { return Number(this.value) }
  toString () { return JSON.stringify(this.value) }
  toJSON () { return this.value }

  /** Backward compatibility */

  // Prefer using Writable.value and Writable.force()
  update (callback, force) {
    const value = callback(this.value)
    if (force) this.force(value)
    else this.value = value
  }

  // Prefer using Writable.value
  get () { return this.value }
  set (value, force) {
    if (force) this.force(value)
    else this.value = value
  }

  // Prefer using Writable.value
  get current () { return this.value }
  set current (v) { throw new Error('Cannot manually set current value. Use Writable.value instead') }
}

// const $a = $({ foo: 'bar' })
// $a = { foo: 'bar' }
// $a.value.foo = 'baz'
// $a.pause()
// $a.resume()

export { Writable }
export default function writable (v) {
  return new Writable(v)
}
