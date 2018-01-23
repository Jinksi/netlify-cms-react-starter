import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import Content from '../components/Content.js'
import './About.css'

export default ({ page }) => (
  <div className='About'>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
    <PageHeader
      title={page.title}
      subtitle={page.subtitle}
      backgroundImage={page.featuredImage}
    />
    <div className='Section thin'>
      <div className='Container'>
        <Content source={page.section1} />
      </div>
    </div>
    <div className='Seciton thin'>
      <div className='Container'>
        <Content source={page.section2} />
        <p>The image below is a {'<LazyImage />'}</p>
        <LazyImage src={page.featuredImage} alt='LazyImage' />
      </div>
    </div>
  </div>
)
