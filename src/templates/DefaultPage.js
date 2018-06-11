import React from 'react'

import PageHeader from '../components/PageHeader'
// import Content from '../components/Content'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  content
}) => (
  <main className="DefaultPage">
    {/* <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    /> */}

    <div className="section">
      <div className="container">{/* <Content source={content} /> */}</div>
    </div>
  </main>
)

// Export Default DefaultPage for front-end
const DefaultPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <DefaultPageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      featuredImage={page.frontmatter.featuredImage}
      content={page.htmlAst}
    />
  )
}

export default DefaultPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      htmlAst
      frontmatter {
        title
        template
        subtitle
        featuredImage
      }
      fields {
        slug
      }
    }
  }
`
