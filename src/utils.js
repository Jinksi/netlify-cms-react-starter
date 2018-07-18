import _get from 'lodash/get'

export const extractChildImageSharp = (src = '', format) => {
  if (!format) {
    if (typeof src === 'string' && !format) return src
    const childImageSharp = _get(src, 'childImageSharp')
    if (!childImageSharp) return _get(src, 'publicURL')
  }
  if (format === 'sizes' || format === 'resolutions')
    return _get(src, `childImageSharp.${format}`)
  return src
}
