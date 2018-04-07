import R from 'ramda';
import { makeRequest } from './networkHelper';
import { parseSubreddit } from './responseHelper';
import failureTypes from '../constants';
import actions from '../store/actions';

const defaultCount = 100;
const getURL = (subredditName, count = defaultCount) => `https://www.reddit.com/r/${subredditName}.json?count=${count}`

export function fetchSubreddit(subreddit, dispatch) {
    const { name, fetchedUTC } = subreddit;

    function onSuccess (data) {
        // null ? true : greater
        const newerThanFetched = R.ifElse(R.isNull, R.T, R.gte(dateCreated));
        const parsedData = parseSubreddit(data);
        const validData = R.filter(newerThanFetched, R.map(R.prop('dateCreated'), parsedData));
        dispatch(actions.ADD_SUBREDDIT_DATA(validData));
    }
    function onFailure(reason) { 
        // TODO: Handle intelligent error reporting
        switch (reason) {
            case failureTypes.OFFLINE:      console.log(`Offline at: ${new Date()}`);
                                            break;
            case failureTypes.SITE_DOWN:    console.log(`Site is down at: ${new Date()}`);
                                            break;
            case failureTypes.OTHER:
            default:                        console.log('Other Error');
        }
    }

    makeRequest(getURL(name), onSuccess, onFailure);
}


