import { Writable } from './writable'

export default function () {
  const placeholder = new Writable()
  const setValue = placeholder.set.bind(placeholder)
  delete placeholder.set

  placeholder.fill = function (signal) {
    if (placeholder.filled) throw new Error('This placeholder has already been filled')
    placeholder.filled = signal
    signal.subscribe(value => setValue(value, true))
  }

  return placeholder
}
