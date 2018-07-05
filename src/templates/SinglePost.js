import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Layout from '../components/Layout'
import Content from '../components/Content'
import BackgroundImage from '../components/BackgroundImage'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  dateFormatted,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <Layout>
    <article
      className="SinglePost section light"
      itemscope
      itemtype="http://schema.org/BlogPosting"
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
                itemprop="dateCreated pubdate datePublished"
                date={date}
              >
                {dateFormatted}
              </time>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemprop="title">
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
  </Layout>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data, pageContext }) => {
  const { post } = data
  const { previous, next } = pageContext
  return (
    <SinglePostTemplate
      body={post.rawMarkdownBody}
      nextPostURL={_get(next, 'fields.slug')}
      prevPostURL={_get(previous, 'fields.slug')}
      {...post.frontmatter}
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
      rawMarkdownBody
      frontmatter {
        title
        template
        subtitle
        featuredImage
        date
        dateFormatted: date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
