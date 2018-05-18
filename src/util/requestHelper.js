import R from 'ramda';
import { makeRequest } from './networkHelper';
import { parseSubreddit, parseComments } from './responseHelper';
import { networkConnectivityTypes } from '../constants';
import actions from '../store/actions';

const defaultCount = 25;
const _subredditURL = (subredditName, count = defaultCount) => `https://www.reddit.com/r/${subredditName}/hot.json?limit=${count - 2}`;
const _onSubredditSuccess = lastFetched => data => R.filter(R.propSatisfies(R.lte(lastFetched), 'created_utc'), parseSubreddit(data));
const _addSubredditData = (dispatch, subreddit) => posts => dispatch(actions.addSubredditData(subreddit, posts));
function _fetchSubreddit(dispatch, subreddit) {
    const { name, lastFetched } = subreddit;
    return makeRequest(_subredditURL(name))
            .then(_onSubredditSuccess(lastFetched))
            .then(val => _addSubredditData(dispatch, name)(val))
            .then(R.always(subreddit.name))
            .catch(R.F);
             // PROMISE - Resolves to name if success or false if failure
}
export function fetchSubreddit(dispatch, subredditData) {
    if(Array.isArray(subredditData)) {
        return subredditData.map(sub => _fetchSubreddit(dispatch, sub));
    }
    else {
        return _fetchSubreddit(dispatch, subredditData);
    }
}

const _fetchCommentsURL = (post) => `https://www.reddit.com/r/${post.subreddit}/${post.id}.json`;
export function fetchComments(dispatch, post) {
    return makeRequest(_fetchCommentsURL(post)).then(val => {
        const x = parseComments(val);
        debugger;
    });
}