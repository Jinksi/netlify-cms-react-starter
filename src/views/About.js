import React from 'react'

import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import Content from '../components/Content.js'
import './About.css'

export default ({ fields }) => {
  const { title, subtitle, featuredImage, section1, section2 } = fields
  return (
    <div className='About'>
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
