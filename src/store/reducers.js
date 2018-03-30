import actionTypes from './actions';
import { addUniqueByProp, removeByProp } from '../util/reducerHelpers';
import R from 'ramda';

export function subreddits (state = [], action) {
    debugger;
    switch(action.type) {
        case actionTypes.ADD_SUBREDDIT:
            return addUniqueByProp('name', action.payload, state);
        case actionTypes.REMOVE_SUBREDDIT:
            const x =  removeByProp('name', action.payload, state);
            debugger;
            return x;
        default:
            return state;
    }
}
