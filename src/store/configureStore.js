import Reactotron from 'reactotron-react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { subreddits } from './reducers';

const initialState = {
    subreddits: [],
    settings: {},
    navigation: {},
};

// Dummy reducers for now
const settings = (state, action) => state || {};
const navigation = (state, action) => state || {};

const reducersMap = { subreddits, settings, navigation };

const rootReducer = combineReducers(reducersMap, initialState);

// Reactotron does not currently support creating store without middleware so I need some dummy middleware.
const crashReporter = store => next => action => {
    try {
         return next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err); // eslint-disable-line
    }
};

const middlewares = [crashReporter];

const storeFunc = __DEV__ ? Reactotron.createStore : createStore;
export default () => storeFunc(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

