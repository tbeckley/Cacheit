import { keys } from '../constants';
import R from 'ramda';
import { AsyncStorage } from 'react-native';
import _ from 'underscore';

const stateKey = keys.STATE;
const writeDelay = 1000;

export function loadStateFromMemory (cb, err) {
    AsyncStorage.getItem(stateKey).then(cb).catch(err);
}

export function writeStateToMemory (state, rush = false) {
    const writeFunction = rush ? writeToAsyncStorage : intermediateWrite;
    writeFunction(state);
}

const intermediateWrite = _.debounce(writeToAsyncStorage, writeDelay);

function writeToAsyncStorage (state) {
    AsyncStorage.setItem(stateKey, state);
}
