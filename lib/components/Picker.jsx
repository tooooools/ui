import style from './Picker.module.scss'

import { Component } from '../jsx'
import { derived, ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

import IconOpen from 'iconoir/icons/nav-arrow-right.svg?raw'
import IconClose from 'iconoir/icons/nav-arrow-left.svg?raw'
import Button from './Button'
import Toolbar from './Toolbar'

export default class Picker extends Component {
  beforeRender (props) {
    this.handleToggle = this.handleToggle.bind(this)

    // Setup a ref for all children <Button> and decorate their event-click
    const buttons = props.children.filter(child => child.type === Button)
    for (const button of buttons) {
      button.props.ref = this.refArray('buttons')
      button.props['event-click'] = this.handleChange(
        buttons.indexOf(button),
        button.props['event-click'] || noop
      )
    }

    this.state = {
      label: ensure(writable)(props['store-label'], props.label),
      title: ensure(writable)(props['store-title'], props.title),

      open: ensure(writable)(props['store-open'], props.open),
      disabled: ensure(writable)(props['store-disabled'], props.disabled),
      hidden: ensure(writable)(props['store-hidden'], props.hidden)
    }

    this.state.toggleIcon = derived(this.state.open, () => {
      return this.state.open.current ? IconOpen : IconClose
    })
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
        <Toolbar
          class={style.picker__toolbar}
          compact
        >
          {props.children}
        </Toolbar>

        <Button
          class={style.picker__toggle}
          store-icon={state.toggleIcon}
          store-label={state.label}
          store-title={state.title}
          event-click={this.handleToggle}
        />
      </div>
    )
  }

  handleToggle () {
    this.state.open.update(s => !s)
  }

  handleChange (i, callback) {
    return async e => {
      // Update all buttons active state
      for (let index = 0; index < this.refs.buttons.length; index++) {
        this.refs.buttons[index].state.active.set(index === i)
      }

      this.state.open.set(false)
      ;(this.props['event-change'] ?? noop)(null, this)

      await callback(e, this.refs.buttons[i])
    }
  }
}