import { createStore, combineReducers } from 'redux';
import { subreddits } from './reducers';

const initialState = {
    content: {
        posts: [],
        subreddits: [],
    },
    settings: {},
    navigation: {},
};

// Dummy reducers for now
const settings = (state, action) => state || {};
const navigation = (state, action) => state || {};
const posts = (state, action) => state || [];

const content = combineReducers({ subreddits, posts });

const reducerObject = {
    content,
    settings,
    navigation
};

const rootReducer = combineReducers(reducerObject);

export default function configureStore() {
    return createStore(rootReducer, initialState);
};
