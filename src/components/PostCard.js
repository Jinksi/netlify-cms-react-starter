import React from 'react'
import { Link } from 'react-router-dom'

import { slugify } from '../util/url'
import BackgroundImage from './BackgroundImage'
import './PostCard.css'

const PostCard = ({ postItem, className = '', ...props }) => (
  <Link
    to={slugify(`/blog/${postItem.title}/`)}
    className={`PostCard ${className}`}
    {...props}
  >
    {postItem.postFeaturedImage && (
      <div className='PostCard--Image relative'>
        <BackgroundImage
          src={postItem.postFeaturedImage}
          alt={postItem.title}
        />
      </div>
    )}
    {postItem.category && (
      <div className='PostCard--Category'>{postItem.category}</div>
    )}
    <div className='PostCard--Content'>
      {postItem.title && <h3 className='PostCard--Title'>{postItem.title}</h3>}
      {postItem.excerpt && (
        <div className='PostCard--Excerpt'>
          {postItem.excerpt.length > 160
            ? postItem.excerpt.slice(0, 157) + '...'
            : postItem.excerpt}
        </div>
      )}
    </div>
  </Link>
)

export default PostCard
