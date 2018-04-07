import { NetInfo } from 'react-native';

const always_on_url = 'www.google.ca';

export async function makeRequest (url, onSuccess, onFailure) {
    if(!NetInfo.isConnected()) return onFailure(failureTypes.OFFLINE); // Sanity check
    if((await fetch(always_on_url)).status !== 200) return onFailure(failureTypes.OFFLINE); // Internet check
    fetch(url).then(onSuccess).error((error) => onFailure(failureTypes.SITE_DOWN)); // Site down or not
}