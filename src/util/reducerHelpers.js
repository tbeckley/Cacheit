import R from 'ramda';

// Add to array unless one with specified prop already exists then modify
export const addUniqueByProp = (prop, toAdd, existing) => R.uniqBy(R.prop(prop), R.concat(toAdd, R.defaultTo([], existing)));

// Remove by prop
export const removeByProp = (prop, toRemove, existing) => R.filter(R.pipe(R.prop(prop), R.complement(R.equals(toRemove))), existing);
