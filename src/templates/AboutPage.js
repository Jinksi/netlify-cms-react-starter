import React from 'react'

import PageHeader from '../components/PageHeader'
// import LazyImage from '../components/LazyImage'
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
  <main className="About">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <div className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </div>
    <div className="section">
      <div className="container">
        <Content source={section2} />
        <p>The image below is a {'<LazyImage />'}</p>
        {/* <LazyImage src={featuredImage} alt="LazyImage" /> */}
      </div>
    </div>
  </main>
)

const AboutPage = ({ data }) => {
  const { markdownRemark: page } = data

  return <AboutPageTemplate {...page.frontmatter} />
}

export default AboutPage

// Query for DefaultPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1
        section2
      }
    }
  }
`
