import R from 'ramda';

// Properties to take from the repsonse. Simplfies stored objects
const desiredProperties = ['name', 'title', 'author', 'selftext', 'score', 'created_utc'];

const getDataFromResponse = R.pipe(R.prop('_bodyText'), JSON.parse, R.path(['data', 'children']));
const filterOnlySelf = R.filter(R.path(['data', 'is_self'])); // Strip out text and link posts
const getDesiredProperties = R.pick(desiredProperties); // Only get properties I want
const extractData = R.map(R.pipe(R.prop('data'), getDesiredProperties));
export const parseSubreddit = R.pipe(getDataFromResponse, filterOnlySelf, extractData);
