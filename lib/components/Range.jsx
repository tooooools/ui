import style from './Range.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'
import { debounce } from 'debounce'

export default class Range extends Component {
  static props = {
    value: [Props.number, Props.array, Props.Signal],
    min: [Props.number, Props.Signal],
    max: [Props.number, Props.Signal],
    step: [Props.number, Props.Signal],
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: Props.string,
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    dual: Props.boolean,
    debounce: Props.number,
    id: Props.string,
    tabindex: Props.number,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  }

  $label = $(this.props.label)
  $title = $(this.props.title)
  $value = $(this.props.value)
  $min = $(this.props.min)
  $max = $(this.props.max)
  $step = $(this.props.step)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  #onInput = async e => {
    if (this.props.dual) this.$value.value = [+this.refs.inputs[0].value, +this.refs.inputs[1].value]
    else this.$value.value = +this.refs.inputs[0].value

    await (this.props['event-input'] ?? noop)(e, this)
  }

  handleInput = this.props.debounce
    ? debounce(this.#onInput.bind(this), this.props.debounce)
    : this.#onInput

  template (props) {
    return (
      <div
        {...this.dataProps}
        {...this.eventProps}
        id={props.id}
        class={[
          style.range,
          {
            'is-dual': props.dual,
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden
          },
          props.class
        ]}
        style={props.style}
      >
        {props.icon && (
          <span
            ref={this.ref('icon')}
            class={style.range__icon}
            innerHTML={props.icon}
          />
        )}
        <div class={style.range__inputs}>
          <input
            ref={this.refArray('inputs')}
            tabIndex={props.tabindex}
            type='range'
            min={this.$min}
            max={this.$max}
            step={this.$step}
            title={this.$title}
            value={$(this.$value, value => props.dual ? (value ?? [])[0] : value)}
            disabled={this.$disabled}
            event-input={this.handleInput}
          />
          {props.dual && (
            <input
              ref={this.refArray('inputs')}
              tabIndex={props.tabindex}
              type='range'
              min={this.$min}
              max={this.$max}
              step={this.$step}
              title={this.$title}
              value={$(this.$value, value => props.dual ? (value ?? [])[1] : value)}
              disabled={this.$disabled}
              event-input={this.handleInput}
            />
          )}
        </div>
        <label class={style.range__label} innerHTML={this.$label} />
      </div>
    )
  }
}
