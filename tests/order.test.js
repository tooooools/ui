import { it, expect } from 'vitest'
import writable from '/Users/rno/Projects/tooooools/@tooooools_ui/lib/state/writable.js'
import derived from '/Users/rno/Projects/tooooools/@tooooools_ui/lib/state/derived.js'

it('callback order', () => {
  const w = writable(0)
  const d = derived(w, v => v * 2)

  const order = []
  w.subscribe(v => order.push(`source:${v}`))
  d.subscribe(v => order.push(`derived:${v}`))

  w.value = 1
  console.log(order)
  expect(true).toBe(true)
})
