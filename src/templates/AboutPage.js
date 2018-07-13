import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Image from '../components/Image'
import Content from '../components/Content.js'
import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2
}) => (
  <Layout>
    <main className="About">
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      <section className="section">
        <div className="container">
          <Content source={section1} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Content source={section2} />
          <p>The image below is a {'<Image />'}</p>
          <Image src={featuredImage} alt="Image" />
        </div>
      </section>
    </main>
  </Layout>
)

const AboutPage = ({ data: { page } }) => (
  <AboutPageTemplate {...page} {...page.frontmatter} />
)

export default AboutPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1800, maxHeight: 1200) {
              src
              srcWebp
              srcSet
            }
          }
        }
        section1
        section2
      }
    }
  }
`
