import constants from '../constants/index'

export const addSubreddit = subreddit => ({ type: constants.ADD_SUBREDDIT, payload: subreddit });