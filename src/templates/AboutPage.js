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
  section2,
  body
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
  <AboutPageTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          ...LargeImage
        }
        section1
        section2
      }
    }
  }
`
