import actionTypes from './actionTypes.js';

const actions = {
    addSubreddit: (name, comments = false) => ({
        type: actionTypes.ADD_SUBREDDIT,
        payload: [{ name, comments, posts: [] }]
    }),
    removeSubreddit: (name) => ({
        type: actionTypes.REMOVE_SUBREDDIT,
        payload: name,
    }),
    addSubredditData: (subreddit, posts) => ({
        type: actionTypes.ADD_SUBREDDIT_POSTS,
        payload: { subreddit, posts }
    }),
};

export default actions;
