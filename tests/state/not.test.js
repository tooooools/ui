import { describe, it, expect } from 'vitest'
import { Derived } from '../../lib/state/derived.js'
import writable from '../../lib/state/writable.js'
import not from '../../lib/state/not.js'

describe('not', () => {
  it('inverts boolean value', () => {
    const w = writable(true)
    const n = not(w)
    expect(n.value).toBe(false)
    w.value = false
    expect(n.value).toBe(true)
  })

  it('is a derived signal', () => {
    expect(not(writable(false))).toBeInstanceOf(Derived)
  })
})
