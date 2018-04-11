import { writeStateToMemory } from '../util/storageHelper';
import { compose, applyMiddleware } from 'redux';

// Gracefully handle crashes # NOT IMPLEMENTED
const crashReporter = store => next => action => {
    try {
         next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err); // eslint-disable-line
    }
};

const debugReporter = store => next => action => {
    let stateBefore = store.getState();
    let returned = next(action);
    let stateAfter = store.getState();
};

// Store state for offline
const storeWriter = store => next => action => {
    next(action);
    const state = store.getState();
    writeStateToMemory(state);
};

const middlewares = [storeWriter];

export default compose(applyMiddleware(...middlewares));
