import style from './Range.module.scss'

import { Component } from '../jsx'
import { writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'
import { debounce } from 'debounce'

export default class Range extends Component {
  beforeRender (props) {
    this.handleInput = props.debounce
      ? debounce(this.handleInput.bind(this), props.debounce)
      : this.handleInput.bind(this)

    this.state = {
      label: props['store-label'] ?? writable(props.label),
      title: props['store-title'] ?? writable(props.title),
      value: props['store-value'] ?? writable(props.value),
      min: props['store-min'] ?? writable(props.min),
      max: props['store-max'] ?? writable(props.max),
      step: props['store-step'] ?? writable(props.step),

      disabled: props['store-disabled'] ?? writable(props.disabled),
      hidden: props['store-hidden'] ?? writable(props.hidden)
    }
  }

  template (props, state) {
    return (
      <div
        class={classnames(style.range, props.class)}
        store-class-has-label={state.label}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        event-mouseenter={props['event-mouseenter'] ?? noop}
        event-mouseleave={props['event-mouseleave'] ?? noop}
      >
        {props.icon && (
          <span
            ref={this.ref('icon')}
            class={style.range__icon}
            innerHTML={props.icon}
          />
        )}
        <input
          ref={this.ref('input')}
          type='range'
          store-min={state.min}
          store-max={state.max}
          store-step={state.step}
          store-title={state.title}
          store-value={state.value}
          store-disabled={state.disabled}
          event-input={this.handleInput}
        />
        <span class={style.range__text} store-text={state.label} />
      </div>
    )
  }

  async handleInput (e) {
    await (this.props['event-input'] ?? noop)(e)
    this.state.value.set(+this.refs.input.value)
  }
}
