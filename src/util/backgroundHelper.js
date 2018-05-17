import R from 'ramda';
import actions from '../store/actions';
import { Platform, NetInfo } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fetchSubreddit } from '../util/requestHelper';

const getSubredditsToFetch = (toTake, subreddits) => R.map(R.pick('name', 'lastFetched'), R.take(toTake,R.sortBy(R.prop('lastFetched'), subreddits)));

function canInvokeBackgroundTask(backgroundTask) {
    const canRunCell = backgroundTask.fetchOverCellular || NetInfo.getConnectionInfo().then(R.pipe(R.prop('type'), R.equals('wifi'))).catch(R.F);
    const canRunPower = backgroundTask.fetchOnBattery || DeviceInfo.getBatteryLevel().then(R.prop('charging')).catch(R.F);
    return Promise.all([canRunCell, canRunPower]).then(R.all(Boolean)).catch(R.F); // Pair of promises
}

async function backgroundTask(state, dispatch) {
    if (state.subreddits.length && __DEV__ || await canInvokeBackgroundTask(state.settings.backgroundTask)) {
        const toFetch = getSubredditsToFetch(3, state.subreddits);
        const subreddits = await Promise.all(fetchSubreddit(dispatch, state.subreddits)); // Update subreddits, END BACKGRUND TASK HERE OR WHATEVER
    }
}

export default backgroundTask;
