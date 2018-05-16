import React from 'react'

import '../src/globalStyles.css'
import data from '../src/data.json'
import Home from '../src/views/Home'
import About from '../src/views/About'
import SinglePost from '../src/views/SinglePost'
import Contact from '../src/views/Contact'

console.log('React version', React.version)

const CMS = window.CMS
CMS.registerPreviewStyle(
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css'
)
CMS.registerPreviewStyle('/admin/cms.bundle.css')

const getDocument = (collection, name) =>
  data[collection] && data[collection].filter(page => page.name === name)[0]
const globalSettings = getDocument('settings', 'global')

// Preview Templates
CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <Home page={entry.toJS().data} />
))
CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <About page={entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <Contact page={entry.toJS().data} siteTitle={globalSettings.siteTitle} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePost singlePost={entry.toJS().data} />
))

window.netlifyIdentity.on('logout', function () {
  document.location.href = '/'
})
