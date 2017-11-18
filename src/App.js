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

class App extends Component {
  state = {
    data
  }

  componentWillMount () {
    globalStyles()
    import('./netlifyIdentity')
  }

  getDocument = (collection, name) =>
    this.state.data[collection] && this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = (collection) => this.state.data[collection]

  render () {
    const site = this.getDocument('settings', 'global')
    return (
      <Router>
        <div>
          <ScrollToTop />
          <ServiceWorkerNotifications />
          <GithubCorner url='https://github.com/Jinksi/netlify-cms-react-starter' />
          <Helmet titleTemplate={`${site.siteTitle} | %s`} />
          <Nav />
          <Switch>
            <Route path='/' exact
              render={(props) => <Home page={this.getDocument('pages', 'home')} {...props} />}
            />
            <Route path='/about/' exact
              render={(props) => <About page={this.getDocument('pages', 'about')} {...props} />}
            />
            <Route path='/contact/' exact
              render={(props) => <Contact page={this.getDocument('pages', 'contact')} site={site} {...props} />}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
