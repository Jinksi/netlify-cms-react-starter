import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
// import NetlifyControlledForm from '../components/NetlifyControlledForm'
import EnquiryFormSimple from '../components/EnquiryFormSimple'
import Content from '../components/Content'
import './Contact.css'

export default ({ page }) => (
  <div className='Contact'>
    <PageHeader title={page.title} subtitle='<Contact />' />
    <div className='Section thin'>
      <div className='Container'>
        <Content source={page.content} />
        <br />
        <h3>{'<NetlifyControlledForm />'}</h3>
        {/* <NetlifyControlledForm name={'Controlled Form'} /> */}
        <br />
        <h3>{'<NetlifySimpleForm />'}</h3>
        <EnquiryFormSimple name='Simple Form' />
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
