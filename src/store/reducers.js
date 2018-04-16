import actionTypes from './actionTypes';
import { addUniqueByProp, removeByProp, addPostsForSubreddit } from '../util/reducerHelper';
import R from 'ramda';

import { defaultState } from './configureStore';

export function subreddits (state = defaultState.subreddits, action) {
    switch(action.type) {
        case actionTypes.ADD_SUBREDDIT:
            return addUniqueByProp('name', action.payload, state);
        case actionTypes.REMOVE_SUBREDDIT:
            return removeByProp('name', action.payload, state);
        case actionTypes.ADD_SUBREDDIT_POSTS:
            return addPostsForSubreddit(action.payload.subreddit, action.payload.posts, state);
        default:
            return state;
    }
}

export function settings (state = defaultState.settings, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_BACKGROUND_TASK:
            return R.assocPath(['backgroundTask', 'isEnabled'], action.payload, state);
        default:
            return state;
    }
    return state;
}
