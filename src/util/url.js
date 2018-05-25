import _kebabCase from 'lodash/kebabCase'

export const slugify = (string = '') =>
  // keeps forward slashes
  string
    .split('/')
    .map(_kebabCase)
    .join('/')
