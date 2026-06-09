import style from './Tabs.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import Toggles from './Toggles'

export default class Tabs extends Component {
  static props = {
    value: [Props.number, Props.Signal],
    tabs: [Props.array, Props.Signal],
    id: Props.string
  }

  static panel (children, props = {}) {
    return (
      <div
        {...props}
        class={[
          style.tabs__panel,
          props.class
        ]}
      >
        {children}
      </div>
    )
  }

  $value = $(this.props.value ?? 0)
  $tabs = $(this.props.tabs)

  update = () => {
    const value = this.$value.value

    for (let index = 0; index < this.refs.panels.children.length; index++) {
      const panel = this.refs.panels.children[index]
      if (!panel) continue
      panel.classList.toggle('is-hidden', index !== value)
    }
  }

  afterRender () {
    this.watch([this.$value, this.$tabs], this.update, { immediate: true })
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style.tabs,
          props.class
        ]}
      >
        <Toggles
          class={style.tabs__toggles}
          value={this.$value}
          options={this.$tabs}
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
}
