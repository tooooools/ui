# tooooools/ui [<img src="https://github.com/tooooools.png?size=100" size="100" align="right">](http://github.com/tooooools/)
> JSX ui kit built for Toools™

<br>

## Installation

```console
$ npm install @tooooools/ui
```

###### Configuring JSX rendering in [vitejs](https://vitejs.dev)

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  esbuild: {
    jsxInject: "import { h } from '@tooooools/ui'",
    jsxFactory: 'h'
  }
})
```

## Available components

See [documentation](https://tooooools.github.io/ui/?path=/docs/layout-backdrop--documentation).

## Usage

###### Basic usage

```jsx
import { render } from '@tooooools/ui'
import { Button } from '@tooooools/ui/components'

render(<Button label='Hello world' />)
render(<Button label='Hello world' />, parent)
render(<Button label='Hello world' />, { insertBefore: el })
```

###### Using signals

```jsx
import { render } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'
import { Button } from '@tooooools/ui/components'

const $label = $('Click me')

render((
  <Button
    label={$label}
    event-click={e => {
      $label.value = 'Thank you'
    }}
  />
))
```

###### Batching signal updates

```jsx
import { $, batch } from '@tooooools/ui/state'

const $todos = $([])
const $filter = $('all')

const $filtered = $([$todos, $filter], ([todos, filter]) => {
  if (filter === 'all') return todos
  return todos.filter(t => t.done === (filter === 'done'))
})

// Without batch: $filtered fires twice
$todos.value = [{ text: 'Buy milk', done: true }]
$filter.value = 'done'

// With batch: $filtered fires once, with final values
batch(() => {
  $todos.value = [{ text: 'Buy milk', done: true }]
  $filter.value = 'done'
})
```

###### Creating components

```jsx
import { render, Component } from '@tooooools/ui'
import { $ } from '@tooooools/ui/state'

class MyComponent extends Component {
  $count = $(0)

  handleClick = () => {
    this.$count.value++
  }

  template (props) {
    return (
      <div event-click={this.handleClick}>
        {props.text}: <span text={this.$count} />
      </div>
    )
  }
}

render(<MyComponent text='Click count' />)
```


## Developement

```bash
# Local development
$ yarn start 

# Linked local developement
$ yarn link
$ yarn build:watch

# Build, deploy, publish
$ yarn version
```

## Credits

JSX and state utils heavily based on [**pqml**](https://github.com/pqml)’s work.

## License
[MIT.](https://tldrlegal.com/license/mit-license)



