import React from 'react'
import Helmet from 'react-helmet'

import './NoMatch.css'

export default ({ siteUrl }) => (
  <div className='Page'>
    <section className='Section thick'>
      <div className='Container taCenter'>
        <h1>404 - Page Not Found</h1>
        <p>
          We can't find the page you are looking for!<br />Head back to{' '}
          <a href={siteUrl}>
            {siteUrl.replace(/(^https?:\/\/)/, '').replace(/\/$/, '')}
          </a>
        </p>
      </div>
    </section>
    <Helmet>
      <title>404 – Page Not Found</title>
      <body className='body--NoMatch' />
    </Helmet>
  </div>
)
