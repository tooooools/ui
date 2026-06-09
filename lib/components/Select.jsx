import style from './Select.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'
import groupBy from '../utils/array-group-by'

import IconDown from 'iconoir/icons/nav-arrow-down.svg?raw'

export default class Select extends Component {
  static props = {
    value: Props.Signal,
    options: [Props.array, Props.Signal],
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    placeholder: Props.string,
    name: Props.string,
    id: Props.string,
    tabindex: Props.number
  }

  static get separator () {
    return { label: '', disabled: true }
  }

  $title = $(this.props.title)
  $label = $(this.props.label)
  $value = $(this.props.value)
  $options = $(this.props.options)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  $selectedIndex = $([this.$value, this.$options],
    () => {
      const compare = this.props.compare ?? ((a, b) => a === b)
      const options = this.$options.value
      return options?.findIndex(option => compare(option.value ?? option, this.$value.value)) ?? -1
    }
  )

  update = () => {
    this.clear()

    const options = this.$options.value
    if (!options) return

    const selectedIndex = this.$selectedIndex.value

    if (this.props.placeholder) {
      this.render(
        <option
          value=''
          disabled
          {...(this.$value.value === undefined || selectedIndex < 0 ? { selected: true } : {})}
        >
          {this.props.placeholder}
        </option>,
        this.refs.select
      )
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

  handleChange = e => {
    const index = +e.target.value
    const selected = (this.$options.value ?? [])[index]

    this.refs.select.blur()
    this.$value.value = selected ? (selected.value ?? selected) : null

    ;(this.props['event-change'] || noop)(e, this)
  }

  afterRender () {
    this.watch(this.$value, this.update)
    this.watch(this.$options, this.update)
    this.update()
  }

  clear () {
    this.refs.select.innerHTML = ''
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style.select,
          {
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
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

        <div class={style.select__label} innerHTML={this.$label} />

        <select
          ref={this.ref('select')}
          name={props.name}
          required={props.required}
          tabIndex={props.tabindex}
          title={this.$title}
          disabled={this.$disabled}
          event-change={this.handleChange}
        />
        <span class={style.select__arrow} innerHTML={props.dropdown ?? IconDown} />
      </div>
    )
  }
}
