import { describe, it, expect, vi } from 'vitest'
import signal, { batch, isSignal } from '../../lib/state/signal.js'
import writable from '../../lib/state/writable.js'
import derived from '../../lib/state/derived.js'
import slot from '../../lib/state/slot.js'

describe('signal', () => {
  it('dispatches to subscribers', () => {
    const s = signal()
    const fn = vi.fn()
    s.subscribe(fn)
    s.dispatch('a')
    expect(fn).toHaveBeenCalledWith('a')
  })

  it('unsubscribes by function reference', () => {
    const s = signal()
    const fn = vi.fn()
    s.subscribe(fn)
    s.unsubscribe(fn)
    s.dispatch('a')
    expect(fn).not.toHaveBeenCalled()
  })

  it('unsubscribes by node reference', () => {
    const s = signal()
    const fn = vi.fn()
    const node = s.subscribe(fn)
    s.unsubscribe(node)
    s.dispatch('a')
    expect(fn).not.toHaveBeenCalled()
  })

  it('subscribeOnce fires exactly once', () => {
    const s = signal()
    const fn = vi.fn()
    s.subscribeOnce(fn)
    s.dispatch('a')
    s.dispatch('b')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')
  })

  it('unsubscribeAll removes all listeners', () => {
    const s = signal()
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    s.subscribe(fn1)
    s.subscribe(fn2)
    s.unsubscribeAll()
    s.dispatch('a')
    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).not.toHaveBeenCalled()
  })

  it('unsubscribe throws without argument', () => {
    expect(() => signal().unsubscribe()).toThrow()
  })
})

describe('isSignal', () => {
  it('recognizes a plain signal', () => {
    expect(isSignal(signal())).toBe(true)
  })

  it('recognizes signal subclasses', () => {
    expect(isSignal(writable(1))).toBe(true)
    expect(isSignal(derived(writable(1), v => v))).toBe(true)
    expect(isSignal(slot())).toBe(true)
  })

  it('rejects non-signals', () => {
    expect(isSignal(undefined)).toBe(false)
    expect(isSignal(null)).toBe(false)
    expect(isSignal(1)).toBe(false)
    expect(isSignal({})).toBe(false)
  })

  it('recognizes structurally-tagged objects across realms/bundle duplicates', () => {
    // Symbol.for() uses the global registry, so a signal instance from a
    // separate copy of this library (e.g. a duplicated dependency) is still
    // recognized as long as it carries the same registered symbol.
    expect(isSignal({ _symbol: Symbol.for('signal') })).toBe(true)
  })
})

describe('batch', () => {
  it('coalesces dispatches — only the last fires per signal', () => {
    const s = writable(0)
    const calls = []
    s.subscribe(v => calls.push(v))
    batch(() => {
      s.value = 1
      s.value = 2
      s.value = 3
    })
    expect(calls).toEqual([3])
  })
})
