import React from 'react'
import Helmet from 'react-helmet'
import { MapPin, Smartphone, Mail } from 'react-feather'

import PageHeader from '../components/PageHeader'
import EnquiryFormSimpleAjax from '../components/EnquiryFormSimpleAjax'
import Content from '../components/Content'
import './Contact.css'

export default ({ page }) => {
  const { title, subtitle, featuredImage, address, phone, email } = page
  return (
    <div className='Contact'>
      <Helmet>
        <title>{page.title}</title>
      </Helmet>

      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      <div className='section Contact--Section1'>
        <div className='container Contact--Section1--Container'>
          <div>
            <Content source={page.body} />

            <div className='Contact--Details'>
              {address && (
                <a
                  className='Contact--Details--Item'
                  href={`https://www.google.com.au/maps/search/${encodeURI(
                    address
                  )}`}
                  target='_blank'
                >
                  <MapPin /> {address}
                </a>
              )}
              {phone && (
                <a className='Contact--Details--Item' href={`tel:${phone}`}>
                  <Smartphone /> {phone}
                </a>
              )}
              {email && (
                <a className='Contact--Details--Item' href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              )}
            </div>
          </div>

          <div>
            <EnquiryFormSimpleAjax name='Simple Form Ajax' />
          </div>
        </div>
      </div>
    </div>
  )
}
