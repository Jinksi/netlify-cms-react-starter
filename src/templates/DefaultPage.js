import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  content
}) => (
  <Layout>
    <main className="DefaultPage">
      <PageHeader
        large
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      <section className="section">
        <div className="container">
          <Content source={content} />
        </div>
      </section>
    </main>
  </Layout>
)

const DefaultPage = ({ data: { page } }) => (
  <DefaultPageTemplate {...page.frontmatter} content={page.rawMarkdownBody} />
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
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
      }
    }
  }
`
