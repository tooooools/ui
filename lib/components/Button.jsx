import style from './Button.module.scss'

import { Component } from '../jsx'
import { writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

export default class Button extends Component {
  beforeRender (props) {
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      label: props['store-label'] ?? writable(props.label),
      title: props['store-title'] ?? writable(props.title),

      active: props['store-active'] ?? writable(props.active),
      disabled: props['store-disabled'] ?? writable(props.disabled),
      hidden: props['store-hidden'] ?? writable(props.hidden),
      waiting: props['store-waiting'] ?? writable(props.waiting)
    }
  }

  template (props, state) {
    return (
      <button
        type={props.type}
        class={classnames(style.button, props.class)}
        store-title={state.title}
        store-class-has-label={state.label}
        store-class-is-active={state.active}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        store-class-is-waiting={state.waiting}
        event-click={this.handleClick}
        event-mouseenter={props['event-mouseenter'] ?? noop}
        event-mouseleave={props['event-mouseleave'] ?? noop}
      >
        {props.icon && (
          <span
            ref={this.ref('icon')}
            class={style.button__icon}
            innerHTML={props.icon}
          />
        )}
        <span class={style.button__label} store-text={state.label} />
      </button>
    )
  }

  async handleClick (e) {
    this.base.blur()

    if (this.state.waiting.get()) return e.preventDefault()

    this.state.waiting.set(true)
    await (this.props['event-click'] ?? noop)(e)

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
