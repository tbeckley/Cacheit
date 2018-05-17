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
    setBackgroundProperty: (key, value) => ({
        type: actionTypes.SET_BACKGROUND_TASK_PROPERTY,
        payload: { key, value }
    }),
    setAutoLoadProperty: (key, value) => ({
        type: actionTypes.SET_AUTO_LOAD_PROPERTY,
        payload: { key, value }
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
