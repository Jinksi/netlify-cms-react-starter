import React from 'react'
import Link from 'gatsby-link'

import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories }) => (
  <div className="container">
    <div className="PostCategoriesNav">
      <NavLink className="NavLink" exact to={`/blog/`}>
        All
      </NavLink>
      {categories.map((category, index) => (
        <NavLink
          className="NavLink"
          key={category.title + index}
          to={`/blog/category/${category.title}/`}
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  </div>
)

export default PostCategoriesNav
