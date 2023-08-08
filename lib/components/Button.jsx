import style from './Button.module.scss'
import { Component } from '../jsx'
import noop from '../utils/noop'

export default class Button extends Component {
  beforeRender () {
    this.handleClick = this.handleClick.bind(this)
  }

  template (props) {
    return (
      <button
        class={style.button}
        event-click={this.handleClick}
      >
        <div class={style.button__content}>
          {props.label}
        </div>
      </button>
    )
  }

  handleClick (e) {
    this.log('Hello !')
    ;(this.props['event-click'] || noop)(e)
  }
}
