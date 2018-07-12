import _get from 'lodash/get'

export const extractChildImageSharp = (src = '', format) => {
  if (typeof src === 'string') return src
  // const srcSet = _get(src, 'childImageSharp.fluid.srcSet')
  // const srcWebp = _get(src, 'childImageSharp.fluid.srcWebp')
  src = _get(src, 'childImageSharp.fluid.src')
  return src
}
