import actionTypes from './actionTypes';
import { addUniqueByProp, removeByProp } from '../util/reducerHelpers';
import R from 'ramda';

export function subreddits (state = [], action) {
    switch(action.type) {
        case actionTypes.ADD_SUBREDDIT:
            return addUniqueByProp('name', action.payload, state);
        case actionTypes.REMOVE_SUBREDDIT:
            return removeByProp('name', action.payload, state);
        default:
            return state;
    }
}
