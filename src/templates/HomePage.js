import React from 'react'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  content
}) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <div className="section">
      <div className="container">
        <Content source={content} />
      </div>
    </div>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <HomePageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      featuredImage={page.frontmatter.featuredImage}
      content={page.rawMarkdownBody}
    />
  )
}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
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
