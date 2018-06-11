import React from 'react'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'

// Export Template for use in CMS preview
export const BlogIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = [],
  postCategories = []
}) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    {!!postCategories.length && (
      <PostCategoriesNav categories={postCategories} />
    )}

    {!!posts.length && <PostSection posts={posts} />}
  </main>
)

// Export Default BlogIndex for front-end
const BlogIndex = ({ data }) => {
  const { markdownRemark: page, allMarkdownRemark: posts } = data
  return (
    <BlogIndexTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      featuredImage={page.frontmatter.featuredImage}
      // pull frontmatter to root of post
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query BlogIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage
      }
    }

    allMarkdownRemark(filter: { fields: { contentType: { eq: "posts" } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
            categories {
              category
            }
          }
        }
      }
    }
  }
`
