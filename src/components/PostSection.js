import React from 'react'
import _sortBy from 'lodash/sortBy'

import PostCard from '../components/PostCard'
import './PostSection.css'

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () => {
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))
  }

  render () {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props
    const { limit } = this.state

    const visiblePosts = _sortBy(posts, ['date'])
      .reverse()
      // show all unlesss you set a limit.
      .slice(0, limit || posts.length)

    return (
      <div className='PostSection'>
        <div className='container'>
          {title && <h2 className='PostSection--Title'>{title}</h2>}
          {!!visiblePosts.length && (
            <div className='PostSection--Grid'>
              {visiblePosts.map((postItem, index) => (
                <PostCard key={postItem.title + index} postItem={postItem} />
              ))}
            </div>
          )}
          {showLoadMore &&
            visiblePosts.length < posts.length && (
            <div className='taCenter'>
              <button className='button' onClick={this.increaseLimit}>
                {loadMoreTitle}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PostSection
