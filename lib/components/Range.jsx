import style from './Range.module.scss'

import { Component } from '../jsx'
import { ensure, derived, writable } from '../state'

import noop from '../utils/noop'
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
        {...this.dataProps}
        id={props.id}
        class={[
          style.range,
          {
            'is-dual': props.dual,
            'is-disabled': state.disabled,
            'is-hidden': state.hidden
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
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
        <div class={style.range__inputs}>
          <input
            ref={this.refArray('inputs')}
            tabIndex={props.tabindex}
            type='range'
            store-min={state.min}
            store-max={state.max}
            store-step={state.step}
            store-title={state.title}
            store-value={derived(state.value, value => props.dual ? (value ?? [])[0] : value)}
            store-disabled={state.disabled}
            event-input={this.handleInput}
          />
          {props.dual && (
            <input
              ref={this.refArray('inputs')}
              tabIndex={props.tabindex}
              type='range'
              store-min={state.min}
              store-max={state.max}
              store-step={state.step}
              store-title={state.title}
              store-value={derived(state.value, value => props.dual ? (value ?? [])[1] : value)}
              store-disabled={state.disabled}
              event-input={this.handleInput}
            />
          )}
        </div>
        <label class={style.range__label} store-innerHTML={state.label} />
      </div>
    )
  }

  async handleInput (e) {
    if (this.props.dual) this.state.value.set([+this.refs.inputs[0].value, +this.refs.inputs[1].value])
    else this.state.value.set(+this.refs.inputs[0].value)

    await (this.props['event-input'] ?? noop)(e, this)
  }
}
