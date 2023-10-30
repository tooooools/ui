import style from './Picker.module.scss'

import { Component } from '../jsx'
import { derived, ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

import Button from './Button'
import Toolbar from './Toolbar'

export default class Picker extends Component {
  beforeRender (props) {
    this.handleClick = this.handleClick.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    // Setup a ref for all children <Button> and decorate their event-click
    const buttons = props.children.filter(child => child.type === Button)
    for (const button of buttons) {
      button.props.ref = this.refArray('buttons')
      button.props['event-click'] = this.handleClick(
        buttons.indexOf(button),
        button.props['event-click'] || noop
      )
    }

    this.state = {
      iconOpen: ensure(writable)(props['store-iconOpen'], props.iconOpen),
      iconClose: ensure(writable)(props['store-iconClose'], props.iconClose),

      label: ensure(writable)(props['store-label'], props.label),
      title: ensure(writable)(props['store-title'], props.title),

      open: ensure(writable)(props['store-open'], props.open),
      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }

    this.state.toggleIcon = derived([
      this.state.open,
      this.state.iconClose,
      this.state.iconOpen
    ], () => this.state.open.current
      ? this.state.iconClose.current
      : this.state.iconOpen.current
    )
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.picker, props.class)}
        store-class-is-open={state.open}
        store-class-is-disabled={state.disabled}
        store-class-is-hidden={state.hidden}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        <Button
          class={style.picker__toggle}
          store-icon={state.toggleIcon}
          store-label={state.label}
          store-title={state.title}
          store-active={state.open}
          event-click={this.handleToggle}
        />

        <Toolbar
          class={style.picker__toolbar}
          compact
        >
          {props.children}
        </Toolbar>
      </div>
    )
  }

  afterRender () {
    this.state.open.subscribe(this.handleOpen)
  }

  handleOpen () {
    if (this.state.open.get()) (this.props['event-open'] ?? noop)(null, this)
    else (this.props['event-close'] ?? noop)(null, this)
  }

  handleToggle (e) {
    e.stopPropagation()
    this.state.open.update(s => !s)
  }

  handleClick (i, callback) {
    return async e => {
      // Only open Picker if closed
      if (!this.state.open.get()) {
        e.stopPropagation()
        this.state.open.set(true)
        return
      }

      // Update all buttons active state
      for (let index = 0; index < this.refs.buttons.length; index++) {
        this.refs.buttons[index].state.active.set(index === i)
      }

      if (this.props.autoClose) this.state.open.set(false)
      ;(this.props['event-change'] ?? noop)(null, this)

      await callback(e, this.refs.buttons[i])
    }
  }

  beforeDestroy () {
    this.state.open.unsubscribe(this.handleOpen)
  }
}
