import actionTypes from './actionTypes.js';

const actions = {
    addSubreddit: (name, comments = false) => ({
        type: actionTypes.ADD_SUBREDDIT,
        payload: [{ name, comments }]
    }),
    removeSubreddit: (name) => ({
        type: actionTypes.REMOVE_SUBREDDIT,
        payload: name,
    }),
};

export default actions;
