/**
 * Ensure the returned value is always a Signal instance:
 * - by trying to return the first found Signal instance
 * - by creating a Signal from the first defined value
 * - by creating an empty Signal
 *
 * IMPORTANT: the first found Signal will always be returned even if its
 * signature does not match the curried signal signature: this allows
 * interesting replacement patterns (ie forcing a writable in place of a readable)
 */

import { Signal } from '../signal'

export default signal => (...values) => {
  for (const value of values) {
    if (value instanceof Signal) {
      return value
    }

    if (value !== undefined) {
      return signal(value)
    }
  }

  return signal(null)
}
