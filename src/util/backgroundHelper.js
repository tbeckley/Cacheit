import R from 'ramda';
import actions from '../store/actions';
import { Platform, NetInfo } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const getSubredditsToFetch = (subreddits, toTake) => R.map(R.pick('name', 'lastFetched'), R.take(toTake,R.sortBy(R.prop('lastFetched'), subreddits)));

async function backgroundTask(store) {
    const { dispatch, getState } = store;
    const { settings: { backgroundTask }, subreddits } = getState();

    const canRunCell = backgroundTask.fetchOverCellular || (await NetInfo.getConnectionInfo()).type === 'wifi';
    const canRunPower = backgroundTask.fetchOnBattery || await DeviceInfo.getBatteryLevel().then(R.prop('charging')).catch(R.F);

    if (__DEV__ || (canRunCell && canRunPower)) {
        const subredditsToFetch = getSubredditsToFetch(subreddits, backgroundTask.subredditsToFetch);
    }
}

export default backgroundTask;
