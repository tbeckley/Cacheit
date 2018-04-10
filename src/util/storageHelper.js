import { keys } from '../constants';
import R from 'ramda';
import { AsyncStorage } from 'react-native';
import _ from 'underscore';
import Reactotron from 'reactotron-react-native';

const stateKey = keys.STATE;
const writeDelay = 1000;

export function loadStateFromMemory (cb, err) {
    AsyncStorage.getItem(stateKey).then(R.pipe(JSON.parse, cb)).catch(err);
};

export function writeStateToMemory (state, rush = false) {
    const writeFunction = rush ? writeToAsyncStorage : intermediateWrite;
    writeFunction(state);
}

const intermediateWrite = _.debounce(writeToAsyncStorage, writeDelay);

function writeToAsyncStorage (state) {
    AsyncStorage.setItem(stateKey, JSON.stringify(state));
}
