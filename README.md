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
```

###### Using signals

```jsx
import { render } from '@tooooools/ui'
import { writable } from '@tooooools/ui/state'
import { Button } from '@tooooools/ui/components'

const label = writable('Click me')

render((
  <Button 
    store-label={label} 
    event-click={e => {
      label.set('Thank you')
    }}
  />
))

```

###### Creating components

```jsx
import { render, Component } from '@tooooools/ui'
import { writable } from '@tooooools/ui/state'

class MyComponent extends Component {
  beforeRender (props) {
    this.state = {
      count: writable(0)
    }
  }
  template (props, state) {
    return (
      <div 
        event-click={e => {
          state.count.update(count => count++)
        }}
      >
        {props.text}: <span store-text={state.count} />
      </div>
    )
  }

  afterRender () {}
  afterMount () {}
  beforeDestroy () {}
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



