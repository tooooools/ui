import { describe, it, expect, vi } from 'vitest'
import signal, { batch } from '../../lib/state/signal.js'
import writable from '../../lib/state/writable.js'

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
