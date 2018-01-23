import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeader from '../components/PageHeader'
import './Home.css'

export default ({ page }) => {
  const { title, subtitle } = page
  return (
    <main className='Home'>
      <PageHeader title={title} subtitle={subtitle} />
      <div className='Section thin'>
        <div className='Container'>
          <Content source={page.content} />
        </div>
      </div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </main>
  )
}
