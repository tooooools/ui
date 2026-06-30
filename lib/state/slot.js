import { Writable } from './writable'

class Slot extends Writable {
  #source = undefined
  #onSourceChange = value => { this.value = value }

  fill (source) {
    if (this.#source) this.#source.unsubscribe(this.#onSourceChange)
    this.#source = source
    this.value = source.value
    source.subscribe(this.#onSourceChange)
  }
}

export { Slot }
export default function slot () {
  return new Slot()
}
