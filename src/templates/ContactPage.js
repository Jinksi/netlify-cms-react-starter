import React from 'react'
import { graphql } from 'gatsby'
import { MapPin, Smartphone, Mail } from 'react-feather'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import EnquiryFormSimpleAjax from '../components/EnquiryFormSimpleAjax'
import Content from '../components/Content'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email
}) => (
  <Layout>
    <main className="Contact">
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      <div className="section Contact--Section1">
        <div className="container Contact--Section1--Container">
          <div>
            <Content source={body} />

            <div className="Contact--Details">
              {address && (
                <a
                  className="Contact--Details--Item"
                  href={`https://www.google.com.au/maps/search/${encodeURI(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin /> {address}
                </a>
              )}
              {phone && (
                <a className="Contact--Details--Item" href={`tel:${phone}`}>
                  <Smartphone /> {phone}
                </a>
              )}
              {email && (
                <a className="Contact--Details--Item" href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              )}
            </div>
          </div>

          <div>
            <EnquiryFormSimpleAjax name="Simple Form Ajax" />
          </div>
        </div>
      </div>
    </main>
  </Layout>
)

const ContactPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <ContactPageTemplate
      body={page.rawMarkdownBody}
      // inject all page frontmatter props
      {...page.frontmatter}
    />
  )
}

export default ContactPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        template
        subtitle
        featuredImage
      }
    }
  }
`
