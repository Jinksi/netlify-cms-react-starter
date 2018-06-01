import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeader from '../components/PageHeader'
import './Home.css'

export default ({ page }) => {
  const { title, subtitle, featuredImage, body } = page
  return (
    <main className='Home'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        large
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <div className='section'>
        <div className='container'>
          <Content source={body} />
        </div>
      </div>
    </main>
  )
}
