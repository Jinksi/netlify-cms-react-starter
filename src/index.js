import 'core-js/es6'
import React from 'react'
import { render } from 'react-snapshot'
import 'normalize.css'
import './globalStyles.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootEl = document.getElementById('root')
render(<App />, rootEl)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp />, rootEl)
  })
}

registerServiceWorker()

if (process.env.REACT_APP_SITE_URL && 'localStorage' in window) {
  window.localStorage.setItem('netlifySiteURL', process.env.REACT_APP_SITE_URL)
}
