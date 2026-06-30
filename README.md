# @tooooools/ui [<img src="https://github.com/tooooools.png?size=100" size="100" align="right">](http://github.com/tooooools/)

> JSX ui kit built for Toools™

<br>

## Installation

```console
$ npm install @tooooools/ui
```

Configure JSX in [Vite](https://vitejs.dev):

```js
// vite.config.js
export default {
  esbuild: {
    jsxInject: "import { h } from '@tooooools/ui'",
    jsxFactory: 'h'
  }
}
```

<br>

## Signals

### Writable

```js
import { $ } from '@tooooools/ui/state'

const $count = $(0)
$count.value     //=> 0
$count.value = 1
$count.value     //=> 1
```

### Derived

Recomputes automatically when the source changes.

```js
import { $ } from '@tooooools/ui/state'

const $count = $(0)
const $double = $($count, n => n * 2)
$count.value = 3
$double.value    //=> 6
```

### Derived from multiple sources

```js
import { $ } from '@tooooools/ui/state'

const $count = $(0)
const $done = $(false)
const $label = $([$count, $done], ([n, done]) => `${n} item${n === 1 ? '' : 's'}${done ? ' ✓' : ''}`)

$count.value = 1
$label.value    //=> '1 item'
$done.value = true
$label.value    //=> '1 item ✓'
```

### Signal passthrough

`$()` accepts a signal or a plain value and always returns a signal.

```js
import { $ } from '@tooooools/ui/state'

const a = $(existingSignal)   // returns existingSignal as-is
const b = $(42)               // new writable with value 42
```

### Subscribing

```js
import { $ } from '@tooooools/ui/state'

const $count = $(0)
$count.subscribe(n => console.log('count:', n))
$count.value = 5   // logs: count: 5
```

### `not()`

Boolean inversion of a signal.

```js
import { $, not } from '@tooooools/ui/state'

const $count = $(0)
const $empty = not($count)
$count.value = 0
$empty.value   //=> true
$count.value = 1
$empty.value   //=> false
```

### `persist()`

localStorage-backed writable. Survives page reload.

```js
import { persist } from '@tooooools/ui/state'

const $count = persist('counter', 0)
$count.value = 3
// reload page
$count.value   //=> 3
```

### `batch()`

Defers all signal dispatches until the end of the block. Derived signals fire once with final values.

```js
import { $, batch } from '@tooooools/ui/state'

const $count = $(0)
const $done = $(false)
const $label = $([$count, $done], ([n, done]) => `${n} / ${done}`)

$label.subscribe(console.log)

// Without batch: $label fires twice
$count.value = 5    // logs: '5 / false'
$done.value = true  // logs: '5 / true'

// With batch: $label fires once
batch(() => {
  $count.value = 5
  $done.value = true
})
// logs: '5 / true'
```

<br>

## Components

### Minimal component

```jsx
import { Component, render } from '@tooooools/ui'

class Counter extends Component {
  template () {
    return <div>Count: 0</div>
  }
}

render(<Counter />)
render(<Counter />, document.querySelector('#app'))
```

### Props

Declare a `static props` schema for validation. Mismatches log a warning; required props throw.

```jsx
import { Component, Props, render } from '@tooooools/ui'

class Counter extends Component {
  static props = {
    // optional — warns if wrong type
    label: Props.string,
    initial: Props.number,

    // required — throws if absent or wrong type
    id: Props.required(Props.string),

    // union — value must match one of the types
    count: [Props.number, Props.Signal],

    // enum — throws if value is not one of the listed values
    size: Props.enum('sm', 'md', 'lg')
  }

  template ({ label, initial }) {
    return <div>{label}: {initial}</div>
  }
}

render(<Counter label='Score' initial={0} />)
```

Available types:
- `Props.string`, `Props.number`, `Props.boolean`, `Props.function`
- `Props.array`, `Props.object`
- `Props.Element`, `Props.SVGElement`, `Props.Component`, `Props.Signal`

### Internal reactive state

Signals declared as class fields update the DOM automatically.

```jsx
import { Component, Props } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class Counter extends Component {
  static props = {
    label: Props.string,
    initial: Props.number
  }

  $count = $(this.props.initial ?? 0)

  template ({ label }) {
    return <div>{label}: <span textContent={this.$count} /></div>
  }
}
```

### Event handlers

Use `event-*` attributes on any element. Arrow class fields preserve `this`.

```jsx
import { Component } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class Counter extends Component {
  $count = $(this.props.initial ?? 0)

  handleIncrement = () => { this.$count.value++ }
  handleDecrement = () => { this.$count.value-- }

  template ({ label }) {
    return (
      <div>
        <button event-click={this.handleDecrement}>-</button>
        {label}: <span textContent={this.$count} />
        <button event-click={this.handleIncrement}>+</button>
      </div>
    )
  }
}
```

### Reactive class names

Pass a signal or plain value. Use objects for conditional classes.

```jsx
import { Component } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class TodoItem extends Component {
  $done = $(false)

  template ({ label }) {
    return (
      <div class={['item', { 'is-done': this.$done }]}>
        <span textContent={label} />
        <button event-click={() => { this.$done.value = !this.$done.value }}>
          Toggle
        </button>
      </div>
    )
  }
}
```

### Accepting a signal or value as prop

`$()` normalises either, so callers can pass a plain value or an external signal.

```jsx
import { Component, Props } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class Counter extends Component {
  static props = {
    count: [Props.number, Props.Signal]
  }

  $count = $(this.props.count ?? 0)  // count={3} and count={$signal} both work
}
```

### `ref`

Access DOM elements or child components directly via `this.refs`.

```jsx
import { Component } from '@tooooools/ui'

class TodoList extends Component {
  handleAdd = () => {
    const label = this.refs.input.value.trim()
    if (!label) return
    this.refs.input.value = ''
  }

  template () {
    return (
      <div>
        <input ref={this.ref('input')} type='text' placeholder='New item' />
        <button event-click={this.handleAdd}>Add</button>
      </div>
    )
  }
}
```

### `watch()`

Subscribe to a signal inside a component. Subscription is cleaned up automatically on destroy.

```jsx
import { Component } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class Counter extends Component {
  $count = $(0)

  afterRender () {
    this.watch(this.$count, n => {
      document.title = `Count: ${n}`
    }, { immediate: true })
  }
}
```

### `watch()` with multiple signals

Pass an array of signals. The callback receives an array of their current values.

```jsx
import { Component } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class TodoItem extends Component {
  $count = $(0)
  $done = $(false)

  afterRender () {
    this.watch([this.$count, this.$done], ([n, done]) => {
      document.title = `${n} item${n === 1 ? '' : 's'}${done ? ' ✓' : ''}`
    }, { immediate: true })
  }
}
```

### `render()`

Render vnodes into a container after initial mount. Rendered content is tracked and cleaned up on destroy.

```jsx
import { Component, render } from '@tooooools/ui'

class TodoList extends Component {
  handleAdd = label => {
    this.render(<TodoItem label={label} />, this.refs.list)
  }

  template () {
    return (
      <div>
        <ul ref={this.ref('list')} />
        <button event-click={() => this.handleAdd('New item')}>Add</button>
      </div>
    )
  }
}
```

### Lifecycle

```jsx
import { Component } from '@tooooools/ui'

class TodoList extends Component {
  afterRender () {
    // DOM exists but not yet in document — safe for attribute reads, not layout
    this.watch(this.$items, this.syncTitle)
  }

  afterMount () {
    // DOM is in document — safe for layout reads, focus, measurements
    this.refs.input.focus()
  }

  beforeDestroy () {
    // called before DOM removal and signal unsubscription
  }
}
```

<br>

## Built-in components

See [documentation](https://tooooools.github.io/ui/).

<br>

## Development

```console
$ yarn start        # Storybook on :6006
$ yarn example      # Vite dev server for example/
$ yarn build        # Library build to dist/
```

## Credits

JSX and state utils heavily based on [**pqml**](https://github.com/pqml)’s work.

## License

[MIT.](https://tldrlegal.com/license/mit-license)
