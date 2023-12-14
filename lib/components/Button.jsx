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
      icon: ensure(writable)(props['store-icon'], props.icon),

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
        tabIndex={props.tabindex}
        class={classnames(style.button, props.class, { 'has-click': this.props['event-click'] })}
        store-title={state.title}
        store-disabled={state.disabled}
        store-class-has-icon={state.icon}
        store-class-is-active={state.active}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        store-class-is-waiting={state.waiting}
        event-click={this.handleClick}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        <span
          ref={this.ref('icon')}
          class={style.button__icon}
          store-innerHTML={state.icon}
        />
        <label class={style.button__label} store-innerHTML={state.label} />
      </button>
    )
  }

  async handleClick (e) {
    if (!this.props['event-click']) return
    if (this.state.disabled.get()) return

    this.base.blur()
    if (this.state.waiting.get()) return e.preventDefault()
    this.state.waiting.set(true)

    try {
      await this.props['event-click'](e, this)
    } finally {
      // Testing for mounted because event-click may have destroyed this component
      if (this.mounted) {
        this.state.waiting.set(false)

        // Trigger animation on .button__icon if any
        if (this && this.refs && this.refs.icon) {
          this.refs.icon.style.animation = 'none'
          void this.refs.icon.offsetHeight // eslint-disable-line no-void
          this.refs.icon.style.animation = null
        }
      }
    }
  }
}
