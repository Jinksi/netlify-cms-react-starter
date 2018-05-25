import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import _findIndex from 'lodash/findIndex'

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
import data from './data.json'
import { slugify } from './util/url'
import { documentHasTerm, getCollectionTerms } from './util/collection'

class App extends Component {
  state = {
    data
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

    const posts = this.getDocuments('posts').filter(
      post => post.status !== 'Draft'
    )
    const categoriesFromPosts = getCollectionTerms(posts, 'categories')
    const postCategories = this.getDocuments('postCategories').filter(
      category => categoriesFromPosts.indexOf(category.name.toLowerCase()) >= 0
    )

    return (
      <Router>
        <div className='React-Wrap'>
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
                if (!categoryPosts.length) return <NoMatch siteUrl={siteUrl} />
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
                  item => slugify(item.title) === slug
                )
                const singlePost = posts[singlePostID]
                const nextPost = posts[singlePostID + 1]
                const prevPost = posts[singlePostID - 1]
                if (!singlePost) return <NoMatch siteUrl={siteUrl} />
                return (
                  <SinglePost
                    singlePost={singlePost}
                    nextPostURL={
                      nextPost && `/blog/${slugify(nextPost.title)}/`
                    }
                    prevPostURL={
                      prevPost && `/blog/${slugify(prevPost.title)}/`
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
