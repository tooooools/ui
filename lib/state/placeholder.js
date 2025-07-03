import { Writable } from './writable'

export default function () {
  const placeholder = new Writable()
  const setValue = placeholder.set.bind(placeholder)
  delete placeholder.set

  placeholder.fill = function (signal, dispatch = false) {
    if (placeholder.filled) throw new Error('This placeholder has already been filled')
    placeholder.filled = signal
    signal.subscribe(value => setValue(value, true))
    if (dispatch) setValue(signal.get(), true)
  }

  return placeholder
}
