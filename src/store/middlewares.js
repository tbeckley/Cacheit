import { writeStateToMemory } from '../util/storageHelper';

// Gracefully handle crashes
export const crashReporter = store => next => action => {

    try {
         next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err); // eslint-disable-line
    }
};

// Intelligently cache state
export const storeWriter = store => next => action => {
    next(action);
    writeStateToMemory(store.getState());
};
