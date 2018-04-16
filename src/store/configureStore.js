import Reactotron from 'reactotron-react-native';
import { createStore, combineReducers } from 'redux';
import { subreddits, settings, navigation } from './reducers';
import middlewares from './middlewares';
import actionTypes from './actionTypes';

export const defaultState = {
    subreddits: [],
    settings: {
        backgroundTask: {
            isEnabled: false,
            fetchComments: false,
            fetchOverCellular: false,
            fetchOnBattery: true,
            interval: 1500,
            toFetch: 3,
        }
    },
};

const appReducer = combineReducers({ subreddits, settings }, defaultState);

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

// Enable reactotron state
const storeFunc = __DEV__ ? Reactotron.createStore : createStore;
export default () => storeFunc(rootReducer, defaultState, middlewares);

