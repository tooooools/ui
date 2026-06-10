import { describe, it, expect, vi } from 'vitest'
import writable from '../../lib/state/writable.js'
import { $ } from '../../lib/state/index.js'

describe('$', () => {
  it('wraps a plain value in a writable', () => {
    const s = $(5)
    expect(s.value).toBe(5)
    s.value = 10
    expect(s.value).toBe(10)
  })

  it('returns an existing signal unchanged', () => {
    const w = writable(1)
    expect($(w)).toBe(w)
  })

  it('creates a derived when given a signal + derivation', () => {
    const w = $(3)
    const d = $(w, v => v * 2)
    expect(d.value).toBe(6)
    w.value = 5
    expect(d.value).toBe(10)
  })

  it('creates a derived from an array of signals', () => {
    const a = $(2)
    const b = $(3)
    const d = $([a, b], ([av, bv]) => av * bv)
    expect(d.value).toBe(6)
    a.value = 4
    expect(d.value).toBe(12)
  })

  it('wraps plain values in array derivation', () => {
    expect($([1, 2], ([a, b]) => a + b).value).toBe(3)
  })

  it('accepts a custom signal factory', () => {
    const factory = vi.fn(v => writable(v))
    $(99, null, factory)
    expect(factory).toHaveBeenCalledWith(99)
  })
})
