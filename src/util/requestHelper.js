import R from 'ramda';
import { makeRequest, connectivityCheck } from './networkHelper';
import { parseSubreddit } from './responseHelper';
import { networkConnectivityTypes } from '../constants';
import actions from '../store/actions';

const defaultCount = 25;
const getURL = (subredditName, count = defaultCount) => `https://www.reddit.com/r/${subredditName}/hot.json?limit=${count - 2}`;

function onSuccess (lastFetched) {
    return function (data) {
        const getValidData = R.filter(R.propSatisfies(R.lte(lastFetched), 'created_utc')); // Get posts submitted since I last requested
        return getValidData(parseSubreddit(data)); // Get proper data from body
    };
}

// TODO
function onFailure(reason, url) {
    // TODO: Handle intelligent error reporting
    switch (reason) {
        case networkConnectivityTypes.OFFLINE:      console.log(`Offline at: ${new Date()}`); // eslint-disable-line
                                        break;
        case networkConnectivityTypes.SITE_DOWN:    console.log(`Site ${url} is down at: ${new Date()}`); // eslint-disable-line
                                        break;
        case networkConnectivityTypes.OTHER:
        default:                        console.log('Other Error'); // eslint-disable-line
    }
}

function addData(dispatch, subreddit) {
    return function(posts) {
        dispatch(actions.addSubredditData(subreddit, posts));
    };
}

export function fetchSubreddit(dispatch, subredditData) {
    if(Array.isArray(subredditData)) {
        return subredditData.map(sub => _fetchSubreddit(dispatch, sub));
    }
    else {
        return _fetchSubreddit(dispatch, subredditData);
    }
}

function _fetchSubreddit(dispatch, subreddit) {
    const { name, lastFetched } = subreddit;
    return makeRequest(getURL(name), onFailure)
            .then(onSuccess(lastFetched))
            .then(addData(dispatch, name))
            .then(R.always(subreddit.name))
            .catch(R.F);
             // PROMISE - Resolves to name if success or false if failure
}

