import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Home from './views/Home'
import About from './views/About'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import NavLink from './components/NavLink'
import Logo from './components/Logo'
import globalStyles, { loadFonts } from './globalStyles'

const siteTitle = 'HyperStatic'
const routes = [
  {
    title: 'Home',
    path: '/',
    component: Home,
    exact: true
  }, {
    title: 'About',
    path: '/about',
    component: About
  }
]

class App extends Component {
  componentDidMount () {
    globalStyles()
    loadFonts()
  }
  render () {
    return (
      <Router>
        <div>
          <Helmet titleTemplate={`${siteTitle} | %s`} />
          <Nav>
            <Logo>🍉</Logo>
            {routes.map((route, i) => (
              <NavLink key={i} {...route} />
            ))}
          </Nav>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
