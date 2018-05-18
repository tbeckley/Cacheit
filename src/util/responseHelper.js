import R from 'ramda';

// Properties to take from the repsonse. Simplfies stored objects
// POSTS AND COMMENTS
const postdesiredProperties = ['id', 'title', 'author', 'selftext', 'score', 'created_utc', 'subreddit'];
const getDataFromResponse = R.path(['data', 'children']); // Get from top level response
const extractPostData = R.map(R.pipe(R.prop('data'), R.pick(postdesiredProperties))); // Get properties I want out of the post

// POST ONLY
const filterOnlySelf = R.filter(R.path(['data', 'is_self'])); // Strip out text and x posts
export const parseSubreddit = R.pipe(getDataFromResponse, filterOnlySelf, extractPostData);


// COMMENT
const commentDesiredProperties = ['author', 'score', 'id', 'body', 'created_utc', 'depth', 'distinguished'];
const generateChildren = replies => R.map(cleanComments, R.pathOr([], ['data','children'], replies));

const cleanComments = comment => R.assoc('comments', generateChildren(comment.data.replies), R.pick(commentDesiredProperties, comment.data));
const getNewPost = R.pipe(R.head, getDataFromResponse, extractPostData, R.head);
const getComments = R.pipe(R.last, getDataFromResponse, R.map(cleanComments));
export const parseComments = val => R.assoc('comments', getComments(val), getNewPost(val));
