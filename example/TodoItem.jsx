import { Component, Props } from '/lib/jsx'
import { $ } from '/lib/state'

import style from './TodoItem.module.scss'

export default class TodoItem extends Component {
  static props = {
    id: Props.number,
    done: [Props.boolean, Props.Signal],
    label: [Props.string, Props.Signal],
    'event-toggle': Props.function,
    'event-delete': Props.function
  }

  $done = $(this.props.done ?? false)

  afterRender () {
    this.watch(this.$done, this.syncCheckbox.bind(this), { immediate: true })
  }

  template (props) {
    return (
      <li class={[style.item, { 'is-done': this.$done }]}>
        <input
          ref={this.ref('checkbox')}
          type='checkbox'
          class={style.item__checkbox}
          event-change={e => {
            this.$done.value = e.target.checked
            props['event-toggle']?.(props.id, this.$done.value)
          }}
        />
        <span
          ref={this.ref('label')}
          class={style.item__label}
          textContent={props.label}
        />
        <button
          class={style.item__delete}
          event-click={() => props['event-delete']?.(props.id)}
        >
          ✕
        </button>
      </li>
    )
  }

  syncCheckbox (done) {
    if (this.refs?.checkbox) this.refs.checkbox.checked = done
  }
}
