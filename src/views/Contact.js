import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import EnquiryFormControlled from '../components/EnquiryFormControlled'
import EnquiryFormSimple from '../components/EnquiryFormSimple'
import Content from '../components/Content'
import './Contact.css'

export default ({ page, siteTitle }) => (
  <div className='Contact'>
    <PageHeader title={page.title} subtitle='<Contact />' />
    <div className='Section thin'>
      <div className='Container'>
        <Content source={page.content} />
        <br />
        <h3>{'<EnquiryFormControlled />'}</h3>
        <EnquiryFormControlled siteTitle={siteTitle} name={'Controlled Form'} />
        <br />
        <h3>{'<EnquiryFormSimple />'}</h3>
        <EnquiryFormSimple siteTitle={siteTitle} name='Simple Form' />
        <em>Note: these will only work when deployed on Netlify</em>
        <br />
        <em>Also, they are active and I will receive submissions</em> 😉
      </div>
    </div>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
  </div>
)
