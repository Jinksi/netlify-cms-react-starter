import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import ScrollToTop from './components/ScrollToTop'
import Home from './views/Home'
import About from './views/About'
import Contact from './views/Contact'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import GithubCorner from './components/GithubCorner'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import globalStyles from './globalStyles'

import data from './data.json'

export const siteTitle = 'HyperStatic'

class App extends Component {
  componentWillMount () {
    globalStyles()
    import('./netlifyIdentity')
  }

  render () {
    return (
      <Router>
        <div>
          <ScrollToTop />
          <ServiceWorkerNotifications />
          <GithubCorner url='https://github.com/Jinksi/hyperstatic' />
          <Helmet titleTemplate={`${siteTitle} | %s`} />
          <Nav />
          <Switch>
            <Route path='/' exact
              render={(props) => <Home page={data.pages.home} {...props} />}
            />
            <Route path='/about/' exact
              render={(props) => <About page={data.pages.about} {...props} />}
            />
            <Route path='/contact/' exact
              render={(props) => <Contact page={data.pages.contact} {...props} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
