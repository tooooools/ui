import style from './Toggles.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

import Button from './Button'

export default class Toggles extends Component {
  static props = {
    value: [Props.string, Props.number, Props.Signal],
    options: [Props.array, Props.Signal],
    title: [Props.string, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    id: Props.string,
    style: [Props.string, Props.object]
  }

  $title = $(this.props.title)
  $value = $(this.props.value)
  $options = $(this.props.options ?? [])
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  update = () => {
    this.clear()

    const options = this.$options.value
    if (!options) return

    this.render(
      options.map(({ icon, value, label, disabled, hidden } = {}, index) => (
        <Button
          ref={this.refArray('buttons')}
          icon={icon}
          label={label ?? value ?? index}
          active={(value ?? index) === this.$value.value}
          disabled={disabled}
          hidden={hidden}
          event-click={this.handleChange(value ?? index)}
        />
      )),
      this.base
    )
  }

  handleChange = value => e => {
    this.$value.value = value
    ;(this.props['event-change'] || noop)(e, this)
  }

  afterRender () {
    this.watch([this.$value, this.$options], this.update, { immediate: true })
  }

  clear () {
    if (!this.refs.buttons) return
    this.refs.buttons.forEach(button => button?.destroy())
    delete this.refs.buttons
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        {...this.eventProps}
        id={props.id}
        class={[
          style.toggles,
          {
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden
          },
          props.class
        ]}
        style={props.style}
        title={this.$title}
      />
    )
  }
}
