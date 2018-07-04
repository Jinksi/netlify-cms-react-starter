import React from 'react'
import CMS from 'netlify-cms'

if (process.env.NETLIFY_SITE_URL && typeof window !== 'undefined') {
  window.localStorage.setItem('netlifySiteURL', process.env.NETLIFY_SITE_URL)
}

import { HomePageTemplate } from '../templates/HomePage'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('home-page', ({ entry }) => <HomePageTemplate />)
