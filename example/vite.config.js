import path from 'path'
import { defineConfig } from 'vite'
import stringHash from 'string-hash'

export default defineConfig({
  root: path.resolve(__dirname, '..'),

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '/lib/style/_helpers' as *;
          @use '/lib/style/reset';
          @use '/lib/style/variables';
        `
      }
    },
    modules: {
      generateScopedName: function (name, filename, css) {
        if (/^(is-|has-)/.test(name)) return name
        const i = css.indexOf(`.${name}`)
        const lineNumber = css.substr(0, i).split(/[\r\n]/).length
        const hash = stringHash(css).toString(36).substr(0, 5)
        return `ui-${name}-${hash}${lineNumber}`
      }
    }
  },

  esbuild: {
    jsxInject: "import { h, Fragment } from '/lib/jsx'",
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    minifyIdentifiers: false
  }
})
