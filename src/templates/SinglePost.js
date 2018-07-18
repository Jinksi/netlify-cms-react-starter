import React from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
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
  <article
    className="SinglePost section light"
    itemScope
    itemType="http://schema.org/BlogPosting"
  >
    {featuredImage && (
      <BackgroundImage
        className="SinglePost--BackgroundImage"
        src={featuredImage}
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
          {date && (
            <time
              className="SinglePost--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={date}
            >
              {_format(date, 'MMMM Do, YYYY')}
            </time>
          )}
        </div>

        {title && (
          <h1 className="SinglePost--Title" itemProp="title">
            {title}
          </h1>
        )}

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
  const { post } = data
  const { previous, next } = pathContext
  return (
    <SinglePostTemplate
      {...post}
      {...post.frontmatter}
      body={post.html}
      nextPostURL={_get(next, 'fields.slug')}
      prevPostURL={_get(previous, 'fields.slug')}
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
    post: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        subtitle
        date
        featuredImage {
          ...FluidImage
        }
      }
    }
  }
`
