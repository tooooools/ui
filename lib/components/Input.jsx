import style from './Input.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

export default class Input extends Component {
  beforeRender (props) {
    this.update = this.update.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)

    this.state = {
      placeholder: ensure(writable)(props['store-placeholder'], props.placeholder),
      title: ensure(writable)(props['store-title'], props.title),
      before: ensure(writable)(props['store-before'], props.before),
      after: ensure(writable)(props['store-after'], props.after),
      icon: ensure(writable)(props['store-icon'], props.icon),

      value: ensure(writable)(props['store-value'], props.value),
      min: ensure(writable)(props['store-min'], props.min),
      max: ensure(writable)(props['store-max'], props.max),
      step: ensure(writable)(props['store-step'], props.step),

      active: ensure(writable)(props['store-active'], props.active),
      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden),
      waiting: ensure(writable)(props['store-waiting'], props.waiting)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        tabIndex={props.tabindex}
        class={classnames(style.input, props.class)}
        store-title={state.title}
        store-class-has-icon={state.icon}
        store-class-is-active={state.active}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        store-class-is-waiting={state.waiting}
        event-click={e => this.refs.input.focus()}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        <span
          ref={this.ref('icon')}
          class={style.input__icon}
          store-innerHTML={state.icon}
        />
        <label class={style.input__before} store-innerHTML={state.before} />
        <input
          ref={this.ref('input')}
          type={props.type}
          store-value={state.value}
          store-min={state.min}
          store-max={state.max}
          store-step={state.step}
          store-placeholder={state.placeholder}
          store-disabled={state.disabled}
          event-input={this.handleInput}
          event-focus={this.handleFocus}
        />
        <label class={style.input__after} store-innerHTML={state.after} />
      </div>
    )
  }

  afterRender () {
    this.state.value.subscribe(this.update)
    this.update()
  }

  update () {
    if (this.props.autoSize) {
      const length = (String(this.refs.input.value) ?? '').length || (this.state.placeholder.current ?? '').length || 1
      this.refs.input.style.width = (length + 1) + 'ch'
    }
  }

  async handleInput (e) {
    if (this.state.waiting.get()) return e.preventDefault()

    const value = this.refs.input.value

    this.state.waiting.set(true)
    this.state.value.set(this.props.type === 'number' ? +value : value)
    await (this.props['event-input'] ?? noop)(e, this)

    // Testing for mounted because event-click may have destroyed this component
    if (!this.mounted) return
    this.state.waiting.set(false)
  }

  handleFocus () {
    if (this.props.autoSelectAll) this.refs.input.select()
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
  }
}
