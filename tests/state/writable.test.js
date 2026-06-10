import { describe, it, expect, vi } from 'vitest'
import writable from '../../lib/state/writable.js'

describe('writable', () => {
  it('holds an initial value', () => {
    expect(writable(42).value).toBe(42)
  })

  it('updates value and dispatches with previous', () => {
    const w = writable(1)
    const fn = vi.fn()
    w.subscribe(fn)
    w.value = 2
    expect(w.value).toBe(2)
    expect(fn).toHaveBeenCalledWith(2, 1)
  })

  it('does not dispatch when value is unchanged', () => {
    const w = writable(1)
    const fn = vi.fn()
    w.subscribe(fn)
    w.value = 1
    expect(fn).not.toHaveBeenCalled()
  })

  it('updates previous even when value is unchanged', () => {
    const w = writable('a')
    w.value = 'a'
    expect(w.previous).toBe('a')
  })

  it('tracks previous value', () => {
    const w = writable('a')
    expect(w.previous).toBeUndefined()
    w.value = 'b'
    expect(w.previous).toBe('a')
    w.value = 'c'
    expect(w.previous).toBe('b')
  })

  it('reset restores initial value', () => {
    const w = writable(10)
    w.value = 99
    w.reset()
    expect(w.value).toBe(10)
  })

  it('toggle flips boolean value', () => {
    const w = writable(false)
    w.toggle()
    expect(w.value).toBe(true)
    w.toggle()
    expect(w.value).toBe(false)
  })

  it('throws on direct previous/initial assignment', () => {
    const w = writable(1)
    expect(() => { w.previous = 0 }).toThrow()
    expect(() => { w.initial = 0 }).toThrow()
  })
})
