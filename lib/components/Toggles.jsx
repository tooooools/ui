import style from './Toggles.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

import Button from './Button'

export default class Toggles extends Component {
  beforeRender (props) {
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      title: ensure(writable)(props['store-title'], props.title),

      value: ensure(writable)(props['store-value'], props.value),
      options: ensure(writable)(props['store-options'], props.options ?? []),

      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.toggles, props.class)}
        store-title={state.title}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      />
    )
  }

  afterRender () {
    this.state.value.subscribe(this.update)
    this.state.options.subscribe(this.update)
    this.update()
  }

  clear () {
    if (!this.refs.buttons) return
    this.refs.buttons.forEach(button => button?.destroy())
    delete this.refs.buttons
  }

  update () {
    this.clear()

    const options = this.state.options.get()
    if (!options) return

    this.render((
      options.map(({ icon, value, label, disabled, hidden } = {}, index) => (
        <Button
          ref={this.refArray('buttons')}
          icon={icon}
          store-label={label ?? value ?? index}
          store-active={(value ?? index) === this.state.value.current}
          store-disabled={disabled}
          store-hidden={hidden}
          event-click={this.handleChange(value ?? index)}
        />
      ))
    ), this.base)
  }

  handleChange (value) {
    return e => {
      this.state.value.set(value)
      ;(this.props['event-change'] || noop)(e, this)
    }
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
    this.state.options.unsubscribe(this.update)
  }
}
