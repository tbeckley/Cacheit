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
            Reactotron.log({ message: 'Restoring from async storage.', value: state });
            return action;
        case actionTypes.WIPE_STATE:
            Reactotron.log({ message: 'Wiping State' }); // Debug only
            return defaultState;
        default:
            return appReducer(state, action);
    }
}

const storeFunc = __DEV__ ? Reactotron.createStore : createStore;
export default () => storeFunc(rootReducer, defaultState, middlewares);

