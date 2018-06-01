import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import Content from '../components/Content.js'
import './About.css'

export default ({ page }) => {
  const { title, subtitle, featuredImage, section1, section2 } = page
  return (
    <div className='About'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <div className='section'>
        <div className='container'>
          <Content source={section1} />
        </div>
      </div>
      <div className='section'>
        <div className='container'>
          <Content source={section2} />
          <p>The image below is a {'<LazyImage />'}</p>
          <LazyImage src={featuredImage} alt='LazyImage' />
        </div>
      </div>
    </div>
  )
}
