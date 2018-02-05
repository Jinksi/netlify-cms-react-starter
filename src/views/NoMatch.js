import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './NoMatch.css'

const NoMatch = ({ siteUrl }) => (
  <div className='NoMatch'>
    <section className='section thick'>
      <div className='container taCenter'>
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

NoMatch.propTypes = {
  siteUrl: PropTypes.string.isRequired
}

export default NoMatch
