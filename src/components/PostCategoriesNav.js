import React from 'react'
import Link from 'gatsby-link'

import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories }) => (
  <div className="container">
    <div className="PostCategoriesNav">
      <Link className="NavLink" exact to={`/blog/`}>
        All
      </Link>
      {categories.map((category, index) => (
        <Link
          className="NavLink"
          key={category.title + index}
          to={`/blog/category/${category.title}/`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  </div>
)

export default PostCategoriesNav
