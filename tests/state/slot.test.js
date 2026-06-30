import { describe, it, expect, vi } from 'vitest'
import slot, { Slot } from '../../lib/state/slot.js'
import writable from '../../lib/state/writable.js'

describe('slot', () => {
  it('is undefined until filled', () => {
    expect(slot().value).toBeUndefined()
  })

  it('is an instance of Slot', () => {
    expect(slot()).toBeInstanceOf(Slot)
  })

  it('adopts the value of the filled signal', () => {
    const s = slot()
    const w = writable(42)
    s.fill(w)
    expect(s.value).toBe(42)
  })

  it('dispatches when filled with a non-undefined value', () => {
    const s = slot()
    const fn = vi.fn()
    s.subscribe(fn)
    s.fill(writable('hello'))
    expect(fn).toHaveBeenCalledWith('hello', undefined)
  })

  it('forwards subsequent updates from the source signal', () => {
    const s = slot()
    const w = writable(1)
    s.fill(w)
    const fn = vi.fn()
    s.subscribe(fn)
    w.value = 2
    expect(s.value).toBe(2)
    expect(fn).toHaveBeenCalledWith(2, 1)
  })

  it('stops forwarding from a previous source after being refilled', () => {
    const s = slot()
    const a = writable(1)
    const b = writable(100)
    s.fill(a)
    s.fill(b)
    expect(s.value).toBe(100)
    a.value = 2
    expect(s.value).toBe(100)
    b.value = 200
    expect(s.value).toBe(200)
  })
})
