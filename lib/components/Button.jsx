import style from './Button.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

export default class Button extends Component {
  beforeRender (props) {
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      label: ensure(writable)(props['store-label'], props.label),
      title: ensure(writable)(props['store-title'], props.title),

      active: ensure(writable)(props['store-active'], props.active),
      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden),
      waiting: ensure(writable)(props['store-waiting'], props.waiting)
    }
  }

  template (props, state) {
    return (
      <button
        type={props.type}
        id={props.id}
        class={classnames(style.button, props.class)}
        store-title={state.title}
        store-class-is-active={state.active}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        store-class-is-waiting={state.waiting}
        event-click={this.handleClick}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        {props.icon && (
          <span
            ref={this.ref('icon')}
            class={style.button__icon}
            innerHTML={props.icon}
          />
        )}
        <label class={style.button__label} store-text={state.label} />
      </button>
    )
  }

  async handleClick (e) {
    this.base.blur()

    if (this.state.waiting.get()) return e.preventDefault()

    this.state.waiting.set(true)
    await (this.props['event-click'] ?? noop)(e, this)

    // Testing for mounted because event-click may have destroyed this component
    if (!this.mounted) return
    this.state.waiting.set(false)

    // Trigger animation on .button__icon if any
    if (this && this.refs && this.refs.icon) {
      this.refs.icon.style.animation = 'none'
      void this.refs.icon.offsetHeight // eslint-disable-line no-void
      this.refs.icon.style.animation = null
    }
  }
}
