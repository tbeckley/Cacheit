import Reactotron from 'reactotron-react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { subreddits, settings, navigation } from './reducers';
import { crashReporter, storeWriter } from './middlewares';

const defaultState = {
    subreddits: [],
    settings: {},
    navigation: {},
};

const rootReducer = combineReducers({ subreddits, settings, navigation }, defaultState);

const middlewares = [crashReporter, storeWriter];

const storeFunc = __DEV__ ? Reactotron.createStore : createStore;
export default (initState) => storeFunc(rootReducer, initState ? initState : defaultState, compose(applyMiddleware(...middlewares)));

