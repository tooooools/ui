import style from './Backdrop.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

export default class Backdrop extends Component {
  static props = {
    locked: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  }

  $locked = $(this.props.locked)

  #lastActiveElement = document.activeElement

  captureEscapeKey = e => {
    if (this.$locked.value) return
    if (e.key !== 'Escape') return
    this.close()
  }

  afterMount () {
    if (this.#lastActiveElement) this.#lastActiveElement.blur()
    window.addEventListener('keyup', this.captureEscapeKey)
    ;(this.props['event-open'] ?? noop)(null, this)
  }

  beforeDestroy () {
    if (this.destroyed) return

    ;(this.props['event-close'] || noop)(null, this)
    window.removeEventListener('keyup', this.captureEscapeKey)

    if (this.#lastActiveElement) {
      // Store element inside the closure so that there is no reference error
      // when calling the timeout after having destroyed the component
      const el = this.#lastActiveElement
      window.setTimeout(() => el.focus(), 0)
    }
  }

  close () {
    if (this.$locked.value) return
    this.destroy()
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style.backdrop,
          props.class
        ]}
        style={props.style}
        event-click={e => (props['event-click'] ?? noop)(e, this)}
      >
        {props.children}
      </div>
    )
  }
}
