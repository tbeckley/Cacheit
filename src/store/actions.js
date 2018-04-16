import actionTypes from './actionTypes.js';

const actions = {
    // SUBREDDIT
    addSubreddit: (name, comments = false) => ({
        type: actionTypes.ADD_SUBREDDIT,
        payload: [{ name: name.toLowerCase(), comments, posts: [], lastFetched: null }]
    }),
    removeSubreddit: (name) => ({
        type: actionTypes.REMOVE_SUBREDDIT,
        payload: name,
    }),
    addSubredditData: (subreddit, posts) => ({
        type: actionTypes.ADD_SUBREDDIT_POSTS,
        payload: { subreddit, posts }
    }),
    // SETTINGS
    toggleBackgroundTask: (value) => ({
        type: actionTypes.TOGGLE_BACKGROUND_TASK,
        payload: value
    }),
    // ADMIN
    replaceState: (state) => ({
        type: actionTypes.REPLACE_STATE,
        payload: state
    }),
    resetState: () => ({
        type: actionTypes.RESET_STATE,
    }),
};

export default actions;
