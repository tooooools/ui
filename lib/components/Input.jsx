import style from './Input.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

export default class Input extends Component {
  static props = {
    value: [Props.string, Props.number, Props.Signal],
    placeholder: [Props.string, Props.Signal],
    label: [Props.string, Props.Signal],
    before: [Props.string, Props.Signal],
    after: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    active: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    waiting: [Props.boolean, Props.Signal],
    type: Props.string,
    name: Props.string,
    id: Props.string,
    tabindex: Props.number
  }

  $value = $(this.props.value)
  $files = $(this.props.files)
  $placeholder = $(this.props.placeholder)
  $title = $(this.props.title)
  $label = $(this.props.label)
  $before = $(this.props.before)
  $after = $(this.props.after)
  $icon = $(this.props.icon)
  $accept = $(this.props.accept ?? '*')
  $multiple = $(this.props.multiple ?? '*')
  $min = $(this.props.min)
  $max = $(this.props.max)
  $step = $(this.props.step)
  $active = $(this.props.active)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)
  $waiting = $(this.props.waiting)

  update = () => {
    const value = this.$value.value

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
      const length = (String(this.refs.input.value) ?? '').length || (this.$placeholder.value ?? '').length || 1
      if (this.props.type === 'number') {
        this.refs.input.style.width = (length + 1) + 'ch'
      } else {
        this.refs.input.size = Math.max(1, length)
      }
    }
  }

  handleClick = e => {
    if (this.props.type === 'file') this.refs.input.click()
    else if (!this.props.editOnDblClick) this.refs.input.focus()

    ;(this.props['event-click'] ?? noop)(e, this)
  }

  handleDblClick = async e => {
    this.refs.input.focus()
    await (this.props['event-dblclick'] ?? noop)(e, this)
  }

  handleInput = async e => {
    if (this.$waiting.value) return e.preventDefault()

    this.$waiting.value = true

    switch (this.props.type) {
      case 'number': this.$value.value = +this.refs.input.value; break
      case 'file': this.$value.value = this.refs.input.files; break
      default: this.$value.value = this.refs.input.value
    }

    await (this.props['event-input'] ?? noop)(e, this)

    // Testing for mounted because event-input may have destroyed this component
    if (!this.mounted) return
    this.$waiting.value = false
  }

  handleFocus = e => {
    if (this.props.autoSelectAll) this.refs.input.select()
    ;(this.props['event-focus'] ?? noop)(e, this)
  }

  afterRender () {
    this.watch(this.$value, this.update)
    this.update()
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        {...this.eventProps}
        id={props.id}
        tabIndex={props.tabindex}
        class={[
          style.input,
          {
            'is-edited-on-dblclick': Boolean(props.editOnDblClick),
            'has-icon': this.$icon,
            'is-active': this.$active,
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden,
            'is-waiting': this.$waiting
          },
          props.class
        ]}
        data-type={props.type}
        title={this.$title}
        event-click={this.handleClick}
        event-dblclick={this.handleDblClick}
      >
        <span
          ref={this.ref('icon')}
          class={style.input__icon}
          innerHTML={this.$icon}
        />
        <label class={style.input__label} innerHTML={this.$label} />
        <label class={style.input__before} innerHTML={this.$before} />
        <input
          ref={this.ref('input')}
          type={props.type}
          name={props.name}
          autofocus={props.autofocus}
          autocomplete={props.autocomplete ?? 'off'}
          size={props.type !== 'number' ? (props.size === 'auto' ? '' : props.size) : undefined}
          min={props.type === 'number' ? this.$min : undefined}
          max={props.type === 'number' ? this.$max : undefined}
          step={props.type === 'number' ? this.$step : undefined}
          placeholder={this.$placeholder}
          accept={props.type === 'file' ? this.$accept : undefined}
          multiple={props.type === 'file' ? this.$multiple : undefined}
          disabled={this.$disabled}
          event-click={e => e.stopPropagation()}
          event-input={this.handleInput}
          event-focus={this.handleFocus}
          event-blur={props['event-blur']}
        />
        <label class={style.input__after} innerHTML={this.$after} />
      </div>
    )
  }
}
