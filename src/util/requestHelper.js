import R from 'ramda';
import { makeRequest } from './networkHelper';
import { parseSubreddit } from './responseHelper';
import { failureTypes } from '../constants';
import actions from '../store/actions';

const defaultCount = 25;
const getURL = (subredditName, count = defaultCount) => `https://www.reddit.com/r/${subredditName}/hot.json?limit=${count - 2}`;

export function fetchSubreddit(subreddit, dispatch) {
    const name = (typeof subreddit === 'string') ? subreddit : subreddit.name;
    const fetchedUTC = subreddit.fetchedUTC || null;

    function onSuccess (data) {
        const parsedData = parseSubreddit(data); // Get unfiltered data out of response
        const validData = R.filter(R.propSatisfies(R.lte(fetchedUTC), 'created_utc'), parsedData); // Get posts submitted since I last requested
        dispatch(actions.addSubredditData(subreddit, validData));
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

    makeRequest(getURL(name), onSuccess, onFailure);
}
