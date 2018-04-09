import actionTypes from './actionTypes';
import { addUniqueByProp, removeByProp, addPostsForSubreddit } from '../util/reducerHelpers';
import R from 'ramda';

export function subreddits (state = [], action) {
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
