import style from './Range.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'
import { debounce } from 'debounce'

export default class Range extends Component {
  beforeRender (props) {
    this.handleInput = props.debounce
      ? debounce(this.handleInput.bind(this), props.debounce)
      : this.handleInput.bind(this)

    this.state = {
      label: ensure(writable)(props['store-label'], props.label),
      title: ensure(writable)(props['store-title'], props.title),

      value: ensure(writable)(props['store-value'], props.value),
      min: ensure(writable)(props['store-min'], props.min),
      max: ensure(writable)(props['store-max'], props.max),
      step: ensure(writable)(props['store-step'], props.step),

      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.range, props.class)}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
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
          tabIndex={props.tabindex}
          type='range'
          store-min={state.min}
          store-max={state.max}
          store-step={state.step}
          store-title={state.title}
          store-value={state.value}
          store-disabled={state.disabled}
          event-input={this.handleInput}
        />
        <label class={style.range__label} store-innerHTML={state.label} />
      </div>
    )
  }

  async handleInput (e) {
    this.state.value.set(+this.refs.input.value)
    await (this.props['event-input'] ?? noop)(e, this)
  }
}
