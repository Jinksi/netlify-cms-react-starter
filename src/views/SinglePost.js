import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import Content from '../components/Content'
import BackgroundImage from '../components/BackgroundImage'
import { dateFormatted } from '../util/date'

import './SinglePost.css'

export default ({ singlePost, nextPostURL, prevPostURL }) => {
  const { body, categories, postFeaturedImage, title, date } = singlePost
  return (
    <article className='SinglePost section light'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {postFeaturedImage && (
        <BackgroundImage
          className='SinglePost--BackgroundImage'
          src={postFeaturedImage}
          alt={title}
        />
      )}

      <div className='container skinny'>
        <div className='SinglePost--Content relative'>
          <div className='SinglePost--Meta'>
            {!!categories &&
              categories.map(obj => (
                <span key={obj.category} className='SinglePost--Meta--Category'>
                  {obj.category}
                </span>
              ))}
            {date && (
              <span className='SinglePost--Meta--Date'>
                {dateFormatted(date)}
              </span>
            )}
          </div>

          {title && <h1 className='SinglePost--Title'>{title}</h1>}

          <div className='SinglePost--InnerContent'>
            <Content source={body} />
          </div>

          <div className='SinglePost--Pagination Flex alignStretch justifyBetween flexWrap'>
            {nextPostURL && (
              <Link className='SinglePost--Pagination--Link' to={nextPostURL}>
                Next Post
              </Link>
            )}
            {prevPostURL && (
              <Link className='SinglePost--Pagination--Link' to={prevPostURL}>
                Previous Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
