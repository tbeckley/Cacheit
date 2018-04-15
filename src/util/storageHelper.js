import { keys, limits } from '../constants';
import { AsyncStorage } from 'react-native';
import _ from 'underscore';
import R from 'ramda';
import Reactotron from 'reactotron-react-native';

const stateKey = keys.STATE;

export function loadStateFromMemory (cb, err) {
    AsyncStorage.getItem(stateKey).then(R.pipe(JSON.parse, cb)).catch(err);
};

export function writeStateToMemory (state, rush = false) {
    const writeFunction = rush ? writeToAsyncStorage : intermediateWrite;
    writeFunction(state);
}

const intermediateWrite = _.debounce(writeToAsyncStorage, limits.ASYNC_STORAGE_LIMIT);

function writeToAsyncStorage (state) {
    AsyncStorage.setItem(stateKey, JSON.stringify(state));
}
