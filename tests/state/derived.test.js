import { describe, it, expect, vi } from 'vitest'
import { Derived } from '../../lib/state/derived.js'
import writable from '../../lib/state/writable.js'
import derived from '../../lib/state/derived.js'

describe('derived', () => {
  it('computes initial value immediately', () => {
    expect(derived(writable(3), v => v * 2).value).toBe(6)
  })

  it('recomputes when source changes', () => {
    const w = writable(1)
    const d = derived(w, v => v + 10)
    w.value = 4
    expect(d.value).toBe(14)
  })

  it('dispatches to subscribers on change', () => {
    const w = writable(1)
    const d = derived(w, v => v * 2)
    const fn = vi.fn()
    d.subscribe(fn)
    w.value = 5
    expect(fn).toHaveBeenCalledWith(10, 2)
  })

  it('does not dispatch when derived value is unchanged', () => {
    const w = writable(1)
    const fn = vi.fn()
    derived(w, () => 'constant').subscribe(fn)
    w.value = 2
    expect(fn).not.toHaveBeenCalled()
  })

  it('tracks previous value', () => {
    const w = writable(1)
    const d = derived(w, v => v * 2)
    expect(d.previous).toBeUndefined()
    w.value = 5
    expect(d.value).toBe(10)
    expect(d.previous).toBe(2)
    w.value = 10
    expect(d.value).toBe(20)
    expect(d.previous).toBe(10)
  })

  it('passes previous derived value to callback', () => {
    const w = writable(1)
    const seen = []
    derived(w, (v, prev) => { seen.push({ v, prev }); return v * 2 })
    w.value = 5
    w.value = 10
    expect(seen).toEqual([
      { v: 1, prev: undefined },
      { v: 5, prev: 2 },
      { v: 10, prev: 10 },
    ])
  })

  it('throws on value assignment', () => {
    expect(() => { derived(writable(1), v => v).value = 2 }).toThrow()
  })

  it('accepts multiple sources as array', () => {
    const a = writable(2)
    const b = writable(3)
    const d = derived([a, b], ([av, bv]) => av + bv)
    expect(d.value).toBe(5)
    a.value = 10
    expect(d.value).toBe(13)
    b.value = 7
    expect(d.value).toBe(17)
  })

  it('is an instance of Derived', () => {
    expect(derived(writable(1), v => v)).toBeInstanceOf(Derived)
  })
})
