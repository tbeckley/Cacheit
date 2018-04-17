import R from 'ramda';
import { makeRequest } from './networkHelper';
import { parseSubreddit } from './responseHelper';
import { failureTypes } from '../constants';
import actions from '../store/actions';

import _ from 'underscore';

const defaultCount = 25;
const getURL = (subredditName, count = defaultCount) => `https://www.reddit.com/r/${subredditName}/hot.json?limit=${count - 2}`;

export function fetchSubreddit(subreddit, dispatch) {
    _fetchSingleSubreddit(subreddit, dispatch).then(posts => {
        dispatch(actions.addSubredditData(subreddit, posts));
    });
}

export function fetchMultipleSubreddits (subreddits, dispatch) {

    const promises = subreddits.map(name => _fetchSingleSubreddit(name));

    Promise.all(promises).then(values => {
        const a = values;
        debugger;
    });
}

const myFunc = async val => {
    return setTimeout(() => `${val}Finished`, 100);
};

function _fetchSingleSubreddit(subreddit) {
    const name = (typeof subreddit === 'string') ? subreddit : subreddit.name;
    const fetchedUTC = subreddit.fetchedUTC || null;

    function onSuccess (data) {
        const getValidData = R.filter(R.propSatisfies(R.lte(fetchedUTC), 'created_utc')); // Get posts submitted since I last requested
        return getValidData(parseSubreddit(data)); // Get proper data from body
    }

    function onFailure(reason, url) {
        // TODO: Handle intelligent error reporting
        switch (reason) {
            case failureTypes.OFFLINE:      console.log(`Offline at: ${new Date()}`); // eslint-disable-line
                                            break;
            case failureTypes.SITE_DOWN:    console.log(`Site ${url} is down at: ${new Date()}`); // eslint-disable-line
                                            break;
            case failureTypes.OTHER:
            default:                        console.log('Other Error'); // eslint-disable-line
        }
    }

    return makeRequest(getURL(name), onFailure).then(onSuccess);
}
