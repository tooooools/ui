import style from './Button.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'

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
        {...this.dataProps}
        type={props.type}
        id={props.id}
        tabIndex={props.tabindex}
        class={[
          style.button,
          {
            'has-click': Boolean(this.props['event-click']),
            'has-icon': state.icon,
            'is-active': state.active,
            'is-disabled': state.disabled,
            'is-hidden': state.hidden,
            'is-waiting': state.waiting
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
        store-title={state.title}
        store-disabled={state.disabled}
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
        {props.children}
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
