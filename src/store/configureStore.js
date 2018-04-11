import Reactotron from 'reactotron-react-native';
import { createStore, combineReducers } from 'redux';
import { subreddits, settings, navigation } from './reducers';
import middlewares from './middlewares';
import actionTypes from './actionTypes';

const defaultState = {
    subreddits: [],
    settings: {},
    navigation: {},
};

const appReducer = combineReducers({ subreddits, settings, navigation }, defaultState);

// Handle global actions such as clear and saturate state
function rootReducer (state, action) {
    switch (action.type) {
        case actionTypes.REPLACE_STATE:
            return action.payload || defaultState;
        case actionTypes.RESET_STATE:
            return defaultState;
        default:
            return appReducer(state, action);
    }
}

const storeFunc = __DEV__ ? Reactotron.createStore : createStore;
export default () => storeFunc(rootReducer, defaultState, middlewares);

