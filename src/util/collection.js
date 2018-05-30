import _uniq from 'lodash/uniq'
import _kebabCase from 'lodash/kebabCase'
import _values from 'lodash/values'
import _includes from 'lodash/includes'

export const getCollectionTerms = (
  collection = [],
  taxonomyName,
  orderBy = 'asc'
) => {
  // collection: array of items in a collection
  // taxonomyName: taxonomy field title, comma-separated string form each collection item
  // orderBy: ['asc', 'desc'] capitals are allowed

  if (!collection.length) return []
  let terms = collection
    .filter(collectionItem => collectionItem[taxonomyName])
    .reduce((acc, collectionItem) => {
      const termField = collectionItem[taxonomyName]
      const collectionItemTerms =
        typeof termField === 'string'
          ? termField.split(',').map(term => _kebabCase(term.trim()))
          : termField.map(term => _kebabCase(_values(term)[0]))
      return _uniq([...acc, ...collectionItemTerms])
    }, [])
    .sort()
  terms = orderBy.toLowerCase() === 'asc' ? terms : terms.reverse()
  return terms
}

export const documentHasTerm = (doc, taxonomyName, term) => {
  const termField = doc[taxonomyName]
  if (!termField) return false
  const terms =
    typeof termField === 'string'
      ? termField.split(',').map(term => _kebabCase(term))
      : termField.map(term => _kebabCase(_values(term)[0]))

  return _includes(terms, _kebabCase(term))
}
