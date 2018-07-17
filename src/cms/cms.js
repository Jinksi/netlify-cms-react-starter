import React from 'react'
import CMS from 'netlify-cms'

import { HomePageTemplate } from '../templates/HomePage'

if (process.env.NETLIFY_SITE_URL && typeof window !== 'undefined') {
  window.localStorage.setItem('netlifySiteURL', process.env.NETLIFY_SITE_URL)
}

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('home-page', ({ entry }) => <HomePageTemplate />)
