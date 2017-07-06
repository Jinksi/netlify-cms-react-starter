import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import ScrollToTop from './components/ScrollToTop'
import Home from './views/Home'
import About from './views/About'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import NavLink from './components/NavLink'
import Logo from './components/Logo'
import GithubCorner from './components/GithubCorner'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import globalStyles from './globalStyles'

const siteTitle = 'HyperStatic'
const routes = [
  {
    title: 'Home',
    path: '/',
    comp: Home,
    exact: true
  }, {
    title: 'About',
    path: '/about/',
    comp: About,
    exact: true
  }
]

class App extends Component {
  componentWillMount () {
    globalStyles()
  }

  render () {
    return (
      <Router>
        <div>
          <ScrollToTop />
          <ServiceWorkerNotifications />
          <GithubCorner url='https://github.com/Jinksi/hyperstatic' />
          <Helmet titleTemplate={`${siteTitle} | %s`} />
          <Nav>
            <Logo>
              <span role='img' aria-label='Watermelon'>🍉</span>
            </Logo>
            {routes.map((route, i) => (
              <NavLink key={i} {...route} />
            ))}
          </Nav>
          <Switch>
            {routes.map((route, i) => (
              <Route
                {...route}
                key={i}
                render={() => <route.comp {...route} />}
              />
            ))}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
