import style from './Picker.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

import Button from './Button'
import Toolbar from './Toolbar'

export default class Picker extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    iconOpen: [Props.string, Props.Signal],
    iconClose: [Props.string, Props.Signal],
    open: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    autoClose: Props.boolean,
    autoOrder: Props.boolean,
    id: Props.string
  }

  $label = $(this.props.label)
  $title = $(this.props.title)
  $iconOpen = $(this.props.iconOpen)
  $iconClose = $(this.props.iconClose)
  $open = $(this.props.open)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  $toggleIcon = $([this.$open, this.$iconClose, this.$iconOpen],
    ([open, iconClose, iconOpen]) => open ? iconClose : iconOpen
  )

  handleOpen = () => {
    if (this.$open.value) (this.props['event-open'] ?? noop)(null, this)
    else (this.props['event-close'] ?? noop)(null, this)
  }

  handleToggle = e => {
    e.stopPropagation()
    this.$open.value = !this.$open.value
  }

  handleClick = (i, callback) => async e => {
    // Only open Picker if closed
    if (!this.$open.value) {
      e.stopPropagation()
      this.$open.value = true
      return
    }

    // Update all buttons active state
    for (let index = 0; index < this.refs.buttons.length; index++) {
      this.refs.buttons[index].$active.value = index === i
    }

    if (this.props.autoClose) this.$open.value = false
    ;(this.props['event-change'] ?? noop)(null, this)

    await callback(e, this.refs.buttons[i])
  }

  beforeRender (props) {
    // Setup a ref for all children <Button> and decorate their event-click
    const buttons = props.children.filter(child => child.type === Button)
    for (const button of buttons) {
      button.props.ref = this.refArray('buttons')
      button.props['event-click'] = this.handleClick(
        buttons.indexOf(button),
        button.props['event-click'] || noop
      )
    }
  }

  afterRender () {
    this.watch(this.$open, this.handleOpen)
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style.picker,
          {
            'has-auto-order': props.autoOrder,
            'is-open': this.$open,
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        <Button
          class={style.picker__toggle}
          icon={this.$toggleIcon}
          label={this.$label}
          title={this.$title}
          active={this.$open}
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
}
