import React from 'react'
import { render } from 'react-snapshot'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './netlifyIdentity'

const rootEl = document.getElementById('root')
render(<App />, rootEl)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp />, rootEl)
  })
}

registerServiceWorker()
