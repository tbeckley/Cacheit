const R = require('ramda');

const desiredProperties = ['id', 'title', 'author', 'selftext', 'score']; // Add more attributes later if need be
const filterOnlySelf = R.filter(post => post.data.is_self);
const getDesiredProperties = R.pick(desiredProperties);
const extractData = R.map(post => getDesiredProperties(post.data));
const parseFilter = R.pipe(filterOnlySelf, extractData);

export const parseSubreddit = subredditData => parseFilter(subredditData.data.children);
