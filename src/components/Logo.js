import React from 'react'

import logo from '../images/logo.svg'
import './Logo.css'

export default ({ inverted }) => (
  <div
    className="Logo"
    style={{
      backgroundImage: `url(${logo})`
    }}
  />
)
