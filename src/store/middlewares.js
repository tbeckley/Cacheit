import { writeStateToMemory } from '../util/storageHelper';
import { compose, applyMiddleware } from 'redux';

// Gracefully handle crashes
const crashReporter = store => next => action => {
    try {
         next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err); // eslint-disable-line
    }
};

// Store state for offline
const storeWriter = store => next => action => {
    writeStateToMemory(next(action));
};

const middlewares = [crashReporter, storeWriter];

export default compose(applyMiddleware(...middlewares));
