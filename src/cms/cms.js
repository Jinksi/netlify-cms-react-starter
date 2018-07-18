import React from 'react'
import CMS from 'netlify-cms'

import { HomePageTemplate } from '../templates/HomePage'

if (process.env.NETLIFY_SITE_URL && typeof window !== 'undefined') {
  window.localStorage.setItem('netlifySiteURL', process.env.NETLIFY_SITE_URL)
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => <HomePageTemplate />)

// Log netlifySiteURL if editing on localhost
if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  console.log(
    `%cnetlifySiteURL: ${window.localStorage.getItem('netlifySiteURL')}`,
    'color: hotpink; font-size: 15px'
  )
}
