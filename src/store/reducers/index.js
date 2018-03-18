import constants from '../constants/index';
import R from 'ramda';

const initialState = {
    posts: [],
    subreddits: [],
    settings: [],
};

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case constants.ADD_SUBREDDIT:
            return { ...state, subreddits: addLatest('name', [action.payload], state.subreddits) }
        default:
            return state;
    }
}

//Adds to an array, uses toAdd based on param prop
addLatest = (param, toAdd, existing) => {
    //ls(toAdd);
    alert("ToAdd: "+s(toAdd) + " | existing: "+s(existing));
    ///R.sortBy(R.prop(param), (R.uniqBy(R.prop(param), R.concat([toAdd], existing))));
}

ls = obj => alert(JSON.stringify(obj));
s = o => JSON.stringify(o);