import style from './Toolbar.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'

export default class Toolbar extends Component {
  beforeRender (props) {
    this.state = {
      compact: ensure(writable)(props['store-compact'], props.compact),
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
          style.toolbar,
          {
            'is-compact': state.compact,
            'is-disabled': state.disabled,
            'is-hidden': state.hidden
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        {props.children}
      </div>
    )
  }
}
