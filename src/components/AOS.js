import React from 'react'
import AOS from 'aos'
import Helmet from 'react-helmet'
import 'aos/dist/aos.css'

export default ({ options }) => {
  // See more: https://github.com/michalsnik/aos
  const defaultOptions = {
    offset: 300,
    duration: 300,
    easing: 'ease-out-sine',
    delay: 0,
    once: true
  }

  AOS.init({ ...defaultOptions, ...options })

  return (
    <Helmet>
      <noscript>{`
        <style>
          /* override AOS css if no JS */
          [data-aos] {
            opacity: 1 !important;
            transform: translate(0) scale(1) !important;
          }
        </style>
      `}</noscript>
    </Helmet>
  )
}
