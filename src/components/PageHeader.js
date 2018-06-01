import React from 'react'
import PropTypes from 'prop-types'

import Content from './Content'
import BackgroundImage from './BackgroundImage'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <BackgroundImage src={backgroundImage} opacity={0.4} />
      )}
      <div className='container relative'>
        <h1 className='PageHeader--Title'>{title}</h1>
        {subtitle && (
          <Content className='PageHeader--Subtitle' src={subtitle} />
        )}
      </div>
    </div>
  )
}
PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
