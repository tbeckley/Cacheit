import R from 'ramda';

const equalCaseInsensitive = R.curry((val1, val2) => R.equals(R.toUpper(val1),R.toUpper(val2)));
const notEqualCaseInsensitive = R.complement(equalCaseInsensitive);

// Add to array unless one with specified prop already exists then modify
export const addUniqueByProp = R.curry((prop, toAdd, existing) => R.uniqBy(R.prop(prop), R.concat(toAdd, existing)));

// Remove by prop
export const removeByProp = (prop, toRemove, existing) => R.filter(R.pipe(R.prop(prop), notEqualCaseInsensitive(toRemove), existing));

export const addPostsForSubreddit = (sub, postsIn, state) => {
    const index = R.findIndex(R.propSatisfies(equalCaseInsensitive(sub), 'name'), state);
    const replaced = R.evolve({ posts: addUniqueByProp('name', postsIn) }, state[index]);
    return R.update(index, replaced, state);
};
