import R from 'ramda';

const equalCaseInsensitive = R.curry((val1, val2) => R.equals(R.toUpper(val1), R.toUpper(val2)));
const notEqualCaseInsensitive = R.complement(equalCaseInsensitive);

const equalByProp = R.curry((prop, r1, r2) => equalCaseInsensitive(R.prop(prop, r1), R.prop(prop, r2)));

// Add to array unless one with specified prop already exists then modify
export const addUniqueByProp = R.curry((prop, toAdd, existing) => R.unionWith(equalByProp(prop), existing, toAdd));

// Remove by prop
export const removeByProp = (prop, toRemove, existing) => R.filter(R.pipe(R.prop(prop), notEqualCaseInsensitive(toRemove), existing));

// Add posts to subreddit
export const addPostsForSubreddit = (sub, postsIn, state) => {
    const index = R.findIndex(R.propSatisfies(equalCaseInsensitive(sub), 'name'), state);
    const replaced = R.evolve({
        posts: addUniqueByProp('id', postsIn),
        lastFetched: R.always(Date.now()),
    }, state[index]);
    return R.update(index, replaced, state);
};
