import React from 'react'
import PropTypes from 'prop-types'

import BackgroundImage from './BackgroundImage'
import './PageHeader.css'

const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <div className='section PageHeader relative'>
    {backgroundImage && <BackgroundImage src={backgroundImage} opacity={0.5} />}
    <div className='container relative'>
      <h1 className='PageHeader--Title'>{title}</h1>
      {subtitle ? <h2 className='PageHeader--Subtitle'>{subtitle}</h2> : ''}
    </div>
  </div>
)

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
