import style from './Input.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

export default class Input extends Component {
  beforeRender (props) {
    this.update = this.update.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDblClick = this.handleDblClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)

    this.state = {
      value: ensure(writable)(props['store-value'], props.value),
      files: ensure(writable)(props['store-files'], props.files),

      placeholder: ensure(writable)(props['store-placeholder'], props.placeholder),
      title: ensure(writable)(props['store-title'], props.title),
      label: ensure(writable)(props['store-label'], props.label),
      before: ensure(writable)(props['store-before'], props.before),
      after: ensure(writable)(props['store-after'], props.after),
      icon: ensure(writable)(props['store-icon'], props.icon),

      accept: ensure(writable)(props['store-accept'], props.accept ?? '*'),
      multiple: ensure(writable)(props['store-multiple'], props.multiple ?? '*'),
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
        {...this.dataProps}
        id={props.id}
        tabIndex={props.tabindex}
        class={classnames(style.input, props.class, { 'is-edited-on-dblclick': props.editOnDblClick })}
        data-type={props.type}
        store-title={state.title}
        store-class-has-icon={state.icon}
        store-class-is-active={state.active}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        store-class-is-waiting={state.waiting}
        event-click={this.handleClick}
        event-dblclick={this.handleDblClick}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        <span
          ref={this.ref('icon')}
          class={style.input__icon}
          store-innerHTML={state.icon}
        />
        <label class={style.input__label} store-innerHTML={state.label} />
        <label class={style.input__before} store-innerHTML={state.before} />
        <input
          ref={this.ref('input')}
          type={props.type}
          name={props.name}
          autofocus={props.autofocus}
          autocomplete={props.autocomplete ?? 'off'}
          size={props.size === 'auto' ? '' : props.size}
          store-min={props.type === 'number' ? state.min : undefined}
          store-max={props.type === 'number' ? state.max : undefined}
          store-step={props.type === 'number' ? state.step : undefined}
          store-placeholder={state.placeholder}
          store-accept={props.type === 'file' ? state.accept : undefined}
          store-multiple={props.type === 'file' ? state.multiple : undefined}
          store-disabled={state.disabled}
          event-click={e => e.stopPropagation()}
          event-input={this.handleInput}
          event-focus={this.handleFocus}
          event-blur={e => (props['event-blur'] ?? noop)(e, this)}
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
    const value = this.state.value.get()

    switch (this.props.type) {
      case 'number': {
        this.refs.input.value = +value
        break
      }

      case 'file': {
        this.refs.input.files = value
        break
      }

      default: {
        this.refs.input.value = value
      }
    }

    if (this.props.size === 'auto') {
      const length = (String(this.refs.input.value) ?? '').length || (this.state.placeholder.current ?? '').length || 1
      this.refs.input.size = Math.max(1, length)
    }
  }

  handleClick (e) {
    if (this.props.type === 'file') this.refs.input.click()
    else if (!this.props.editOnDblClick) this.refs.input.focus()

    ;(this.props['event-click'] ?? noop)(e, this)
  }

  async handleDblClick (e) {
    this.refs.input.focus()
    await (this.props['event-dblclick'] ?? noop)(e, this)
  }

  async handleInput (e) {
    if (this.state.waiting.get()) return e.preventDefault()

    this.state.waiting.set(true)

    switch (this.props.type) {
      case 'number': this.state.value.set(+this.refs.input.value); break
      case 'file': this.state.value.set(this.refs.input.files); break
      default: this.state.value.set(this.refs.input.value)
    }

    await (this.props['event-input'] ?? noop)(e, this)

    // Testing for mounted because event-click may have destroyed this component
    if (!this.mounted) return
    this.state.waiting.set(false)
  }

  handleFocus (e) {
    if (this.props.autoSelectAll) this.refs.input.select()
    ;(this.props['event-focus'] ?? noop)(e, this)
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
  }
}
