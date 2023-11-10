import style from './Backdrop.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

export default class Backdrop extends Component {
  beforeRender (props) {
    this.close = this.close.bind(this)
    this.captureEscapeKey = this.captureEscapeKey.bind(this)

    this.state = {
      lastActiveElement: document.activeElement,
      locked: ensure(writable)(props['store-locked'], props.locked)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.backdrop, props.class)}
        event-click={e => (props['event-click'] ?? noop)(e, this)}
      >
        {props.children}
      </div>
    )
  }

  afterMount () {
    if (this.state.lastActiveElement) this.state.lastActiveElement.blur()
    window.addEventListener('keyup', this.captureEscapeKey)
    ;(this.props['event-open'] ?? noop)(null, this)
  }

  captureEscapeKey (e) {
    if (e.key !== 'Escape') return
    this.close()
  }

  close () {
    if (this.state.locked.get()) return
    ;(this.props['event-close'] || noop)(null, this)
    this.destroy()
  }

  beforeDestroy () {
    if (this.destroyed) return
    window.removeEventListener('keyup', this.captureEscapeKey)

    if (this.state && this.state.lastActiveElement) {
      // Store element inside the closure so that there is no reference error
      // when calling the timeout after having destroyed the component
      const el = this.state.lastActiveElement
      window.setTimeout(() => el.focus(), 0)
    }
  }
}
