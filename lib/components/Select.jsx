import style from './Select.module.scss'

import { Component } from '../jsx'
import { ensure, derived, writable } from '../state'

import noop from '../utils/noop'
import groupBy from '../utils/array-group-by'
import classnames from 'classnames'

import IconDown from 'iconoir/icons/nav-arrow-down.svg?raw'

export default class Select extends Component {
  static get separator () {
    return { label: '', disabled: true }
  }

  beforeRender (props) {
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      title: ensure(writable)(props['store-title'], props.title),
      label: ensure(writable)(props['store-label'], props.label),

      value: ensure(writable)(props['store-value'], props.value),
      options: ensure(writable)(props['store-options'], props.options),

      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }

    // Infer the selected option index from state.value and state.options
    const compare = props.compare ?? ((a, b) => a === b)
    this.state.selectedIndex = derived([this.state.value, this.state.options], () => {
      const options = this.state.options.get()
      return options.findIndex(({ value }) => compare(value, this.state.value.current))
    })
  }

  template (props, state) {
    return (
      <div
        {...this.dataProps}
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

        <div class={style.select__label} store-innerHTML={state.label} />

        <select
          ref={this.ref('select')}
          name={props.name}
          required={props.required}
          tabIndex={props.tabindex}
          store-title={state.title}
          store-disabled={state.disabled}
          event-change={this.handleChange}
        />
        <span class={style.select__arrow} innerHTML={props.dropdown ?? IconDown} />
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

    const selectedIndex = this.state.selectedIndex.get()

    if (this.props.placeholder) {
      this.render((
        <option
          value=''
          disabled
          {...(this.state.value.current === undefined || selectedIndex < 0 ? { selected: true } : {})}
        >
          {this.props.placeholder}
        </option>
      ), this.refs.select)
    }

    for (const [label, entries] of Object.entries(groupBy(options, 'group'))) {
      const children = entries.map(option => (
        <option
          value={options.indexOf(option)}
          {...(option.disabled ? { disabled: true } : {})}
          {...(options.indexOf(option) === selectedIndex ? { selected: true } : {})}
        >
          {option.label}
        </option>
      ))

      if (label !== 'undefined') this.render(<optgroup label={label}>{children}</optgroup>, this.refs.select)
      else this.render(children, this.refs.select)
    }
  }

  handleChange (e) {
    const index = +e.target.value
    this.state.selectedIndex.set(index)

    this.refs.select.blur()
    this.state.value.set((this.state.options.get() || [])[index]?.value)

    ;(this.props['event-change'] || noop)(e, this)
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
    this.state.options.unsubscribe(this.update)
  }
}
