import { NetInfo } from 'react-native';
import { failureTypes } from '../constants';

const always_on_url = 'https://www.httpbin.org/ip';

export async function makeRequest (url, onSuccess, onFailure) {
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
