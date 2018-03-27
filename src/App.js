import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import _merge from 'lodash/merge'
import _findIndex from 'lodash/findIndex'
import _kebabCase from 'lodash/kebabCase'

import ScrollToTop from './components/ScrollToTop'
import Meta from './components/Meta'
import Home from './views/Home'
import About from './views/About'
import Blog from './views/Blog'
import SinglePost from './views/SinglePost'
import Contact from './views/Contact'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import Footer from './components/Footer'
import GithubCorner from './components/GithubCorner'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import AOS from './components/AOS'
import Spinner from './components/Spinner'
import data from './data.json'
import { documentHasTerm } from './util/collection'

class App extends Component {
  state = {
    data,
    loading: false
  }

  componentDidMount = () => {
    this.fetchPreviewContent()
  }

  fetchPreviewContent = () => {
    if (
      !window.netlifyIdentity ||
      !window.netlifyIdentity.currentUser() ||
      process.env.NODE_ENV === 'development'
    ) {
      return false
    }
    import('./util/fetch-content').then(({ fetchContent }) => {
      this.setState({ loading: true })
      fetchContent()
        .then(newData => {
          this.setState(prevState => {
            const data = _merge(prevState.data, newData)
            return { data, loading: false }
          })
        })
        .catch(() => this.setState({ loading: false }))
    })
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection]

  render () {
    const globalSettings = this.getDocument('settings', 'global')
    const {
      siteTitle,
      siteUrl,
      siteDescription,
      socialMediaCard,
      headerScripts
    } = globalSettings

    const posts = this.getDocuments('posts')
    const postCategories = this.getDocuments('postCategories')

    return (
      <Router>
        <div className='React-Wrap'>
          {this.state.loading && <Spinner />}
          <AOS options={{ duration: 250 }} />
          <ScrollToTop />
          <ServiceWorkerNotifications reloadOnUpdate />
          <GithubCorner url='https://github.com/Jinksi/netlify-cms-react-starter' />
          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`${siteTitle} | %s`}
          />
          <Meta
            title={siteTitle}
            url={siteUrl}
            description={siteDescription}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
            twitterCreatorAccount={
              socialMediaCard && socialMediaCard.twitterCreatorAccount
            }
            twitterSiteAccount={
              socialMediaCard && socialMediaCard.twitterSiteAccount
            }
            headerScripts={headerScripts}
          />
          <Nav />
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <Home page={this.getDocument('pages', 'home')} {...props} />
              )}
            />
            <Route
              path='/about/'
              exact
              render={props => (
                <About page={this.getDocument('pages', 'about')} {...props} />
              )}
            />
            <Route
              path='/contact/'
              exact
              render={props => (
                <Contact
                  page={this.getDocument('pages', 'contact')}
                  siteTitle={siteTitle}
                  {...props}
                />
              )}
            />

            {/* Blog Routes */}
            <Route
              path='/blog/'
              exact
              render={props => (
                <Blog
                  posts={posts}
                  postCategories={postCategories}
                  {...props}
                />
              )}
            />
            <Route
              path='/blog/category/:slug/'
              render={props => {
                //  help needed
                const slug = props.match.params.slug
                const categoryPosts = posts.filter(post =>
                  documentHasTerm(post, 'categories', slug)
                )
                return (
                  <Blog
                    posts={categoryPosts}
                    postCategories={postCategories}
                    showFeatured={false}
                    {...props}
                  />
                )
              }}
            />
            <Route
              path='/blog/:slug/'
              render={props => {
                const slug = props.match.params.slug
                const singlePostID = _findIndex(
                  posts,
                  item => _kebabCase(item.title) === slug
                )
                const singlePost = posts[singlePostID]
                const nextPost = posts[singlePostID + 1]
                const prevPost = posts[singlePostID - 1]
                return (
                  <SinglePost
                    singlePost={singlePost}
                    nextPostURL={
                      nextPost && `/blog/${_kebabCase(nextPost.title)}/`
                    }
                    prevPostURL={
                      prevPost && `/blog/${_kebabCase(prevPost.title)}/`
                    }
                    {...props}
                  />
                )
              }}
            />

            <Route render={() => <NoMatch siteUrl={siteUrl} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
