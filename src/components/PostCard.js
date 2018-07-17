import React from 'react'
import Link from 'gatsby-link'

import BackgroundImage from './BackgroundImage'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <BackgroundImage src={featuredImage} alt={title} />
      </div>
    )}
    {/* {category && (
      <div className='PostCard--Category'>{category}</div>
    )} */}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default PostCard
