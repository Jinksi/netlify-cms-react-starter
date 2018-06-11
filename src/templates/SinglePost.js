import React from 'react'
import _get from 'lodash/get'
import Link from 'gatsby-link'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import BackgroundImage from '../components/BackgroundImage'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <article className="SinglePost section light">
    {featuredImage && (
      <BackgroundImage
        className="SinglePost--BackgroundImage"
        src={featuredImage}
        alt={title}
      />
    )}

    <div className="container skinny">
      <Link className="SinglePost--BackButton" to="/blog/">
        <ChevronLeft /> BACK
      </Link>
      <div className="SinglePost--Content relative">
        <div className="SinglePost--Meta">
          {!!categories.length &&
            categories.map(obj => (
              <span key={obj.category} className="SinglePost--Meta--Category">
                {obj.category}
              </span>
            ))}
          {date && <span className="SinglePost--Meta--Date">{date}</span>}
        </div>

        {title && <h1 className="SinglePost--Title">{title}</h1>}

        <div className="SinglePost--InnerContent">
          <Content source={body} />
        </div>

        <div className="SinglePost--Pagination">
          {prevPostURL && (
            <Link
              className="SinglePost--Pagination--Link prev"
              to={prevPostURL}
            >
              Previous Post
            </Link>
          )}
          {nextPostURL && (
            <Link
              className="SinglePost--Pagination--Link next"
              to={nextPostURL}
            >
              Next Post
            </Link>
          )}
        </div>
      </div>
    </div>
  </article>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data, pathContext }) => {
  const { markdownRemark: page } = data
  const { previous, next } = pathContext
  return (
    <SinglePostTemplate
      body={page.rawMarkdownBody}
      nextPostURL={_get(next, 'fields.slug')}
      prevPostURL={_get(previous, 'fields.slug')}
      {...page.frontmatter}
    />
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        template
        subtitle
        featuredImage
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
