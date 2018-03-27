import React from 'react'
import Helmet from 'react-helmet'
import _sortBy from 'lodash/sortBy'

import PageHeader from '../components/PageHeader'
import PostCategoriesNav from '../components/PostCategoriesNav'
import PostSection from '../components/PostSection'

import './Blog.css'

export default ({ page, posts, postCategories, showFeatured = true }) => {
  posts = _sortBy(posts, ['date']).reverse()

  return (
    <main className='Blog'>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <PageHeader title='Blog' />

      <PostCategoriesNav categories={postCategories} />
      {!!posts.length && <PostSection posts={posts} />}
    </main>
  )
}
