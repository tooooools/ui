import style from './Select.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

import IconDown from 'iconoir/icons/nav-arrow-down.svg?raw'

const PLACEHOLDER_VALUE = Symbol('select-placeholder-value')

export default class Select extends Component {
  static get separator () {
    return { value: Symbol('separator'), label: '', disabled: true }
  }

  static placeholder (label = 'select') {
    return { value: PLACEHOLDER_VALUE, label, disabled: true }
  }

  beforeRender (props) {
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      title: ensure(writable)(props['store-title'], props.title),

      value: ensure(writable)(props['store-value'], props.value ?? PLACEHOLDER_VALUE),
      options: ensure(writable)(props['store-options'], props.options),

      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.select, props.class)}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        {props.icon && (
          <span
            ref={this.ref('icon')}
            class={style.select__icon}
            innerHTML={props.icon}
          />
        )}
        <select
          ref={this.ref('select')}
          store-title={state.title}
          store-disabled={state.disabled}
          event-change={this.handleChange}
        />
        <span class={style.select__arrow} innerHTML={IconDown} />
      </div>
    )
  }

  afterRender () {
    this.state.value.subscribe(this.update)
    this.state.options.subscribe(this.update)
    this.update()
  }

  clear () {
    this.refs.select.innerHTML = ''
  }

  update () {
    this.clear()

    const options = this.state.options.get()
    if (!options) return

    this.render((
      options.map(({ value, label, disabled } = {}) => (
        <option
          value={value}
          disabled={disabled}
          selected={value === this.state.value.current}
        >
          {label ?? value}
        </option>
      ))
    ), this.refs.select)
  }

  handleChange (e) {
    this.state.value.set(e.target.value)
    ;(this.props['event-change'] || noop)(e, this)
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
    this.state.options.unsubscribe(this.update)
  }
}
