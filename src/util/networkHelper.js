import { Platform } from 'react-native';
import { failureTypes, limits } from '../constants';
import _ from 'underscore';

const always_on_url = 'https://www.httpbin.org/ip';

const requestOptions = {
    cache: 'no-cache',
    credentials: 'omit',
    // eslint-disable-next-line
    headers: new Headers({
        'Content-Type': 'application/json',
        'User-Agent': `${Platform.OS}/Cacheit/1.0.0`,
    })
};

// Since I'm only fetching to reddit, I don't have to exclude other sites!
export const makeRequest = _.throttle(_makeRequest, limits.REDDIT_API_DELAY);

async function _makeRequest (url, onSuccess, onFailure) {

    let failure = failureTypes.OFFLINE;
    try {
        await fetch(always_on_url);
        failure = failureTypes.SITE_DOWN;
        const result = await fetch(url);
        failure = failureTypes.OTHER;
        onSuccess(result);
    }
    catch(err) {
        onFailure(failure, url);
    }
}
