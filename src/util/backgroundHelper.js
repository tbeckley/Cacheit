import R from 'ramda';

const getSubredditsToFetch = (subreddits, toTake) => R.map(R.prop('name'), R.take(toTake,R.sortBy(R.prop('lastFetched'), subreddits)));

export function doTheThing (state) {
    const x = getSubredditsToFetch(state.subreddits, 3);
    return;
}
