import R from 'ramda';

const debug = val => { debugger; };

function queue (fn, limit) {
    let queueArr = [];
    let busy = false;
    const a = function(args) {
        debugger;
        if(busy) {
            queueArr = R.append(args, queueArr);
        }
        else {
            busy = true;
            setTimeout(() => {
                busy = false;
                const val = R.head(queueArr);
                queueArr = R.drop(1, queueArr);
                debugger;
                a(val);
            }, limit);
            return delayedPromise(args);
        }
    };

    return a;
}

// Dummy action to do things
const delayedPromise = time => new Promise((resolve, reject) => {
    console.log('Delayed promise called with time: ' + time);
    setTimeout(() => resolve('Resolving with time: ' + time), time);
});

const queuedDelayPromise = queue(delayedPromise, 15000);


export default function doTheThing() {
    queuedDelayPromise(10000).then(debug);
    // queuedDelayPromise(5000).then(debug);
}
