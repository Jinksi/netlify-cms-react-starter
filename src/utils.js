import _get from 'lodash/get'

export const extractChildImageSharp = (src = '', format) => {
  if (typeof src === 'string') return src
  if (format === 'srcSet') return _get(src, 'childImageSharp.fluid.srcSet')
  if (format === 'webp') return _get(src, 'childImageSharp.fluid.srcWebp')
  return _get(src, 'childImageSharp.fluid.src')
}
