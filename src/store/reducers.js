import actionTypes from './actions';
import { newaddUniqueByProp, addUniqueByProp, removeByProp } from '../util/reducerHelpers';
import R from 'ramda';

export const initialState = {
    content: {
        posts: [],
        subreddits: [],
    },
    app: {
        settings: {},
        navigation: {},
    }
}

export function subreddits (state = initialState, action) {
    switch(action.type) {
        case actionTypes.ADD_SUBREDDIT:
            return R.evolve({ content: { subreddits: addUniqueByProp('name', action.payload) } }, state);;
        case actionTypes.REMOVE_SUBREDDIT:
            return R.evolve({ content: { subreddits: removeByProp('name', action.payload) } }, state);
        default:
            return state;
    }
}