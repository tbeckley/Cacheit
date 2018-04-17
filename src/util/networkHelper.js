import { Platform } from 'react-native';
import { failureTypes, limits } from '../constants';
import _ from './underscoreExtension';

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

//export const makeRequest = _makeRequest;
export const makeRequest = _makeRequest;
async function _makeRequest (url, onFailure) {
    let failure = failureTypes.OFFLINE;
    try {
        await fetch(always_on_url);
        failure = failureTypes.SITE_DOWN;
        return fetch(url).then(response => response.json());
    }
    catch(err) {
        onFailure(failure, url);
    }
}
