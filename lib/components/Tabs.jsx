import style from './Tabs.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import classnames from 'classnames'

import Toggles from './Toggles'

export default class Tabs extends Component {
  static panel (children, props = {}) {
    return <div {...props} class={classnames(style.tabs__panel, props.class)}>{children}</div>
  }

  beforeRender (props) {
    this.update = this.update.bind(this)

    this.state = {
      value: ensure(writable)(props['store-value'], props.value ?? 0),
      tabs: ensure(writable)(props['store-tabs'], props.tabs)
    }
  }

  template (props, state) {
    return (
      <div
        id={props.id}
        class={classnames(style.tabs, props.class)}
      >
        <Toggles
          class={style.tabs__toggles}
          store-value={state.value}
          store-options={state.tabs}
          event-change={props['event-change']}
        />
        <div
          ref={this.ref('panels')}
          class={style.tabs__panels}
        >
          {props.children}
        </div>
      </div>
    )
  }

  afterRender () {
    this.state.value.subscribe(this.update)
    this.state.tabs.subscribe(this.update)
    this.update()
  }

  update () {
    const value = this.state.value.get()

    for (let index = 0; index < this.refs.panels.children.length; index++) {
      const panel = this.refs.panels.children[index]
      if (!panel) continue
      panel.classList.toggle('is-hidden', index !== value)
    }
  }

  beforeDestroy () {
    this.state.value.unsubscribe(this.update)
    this.state.tabs.unsubscribe(this.update)
  }
}
