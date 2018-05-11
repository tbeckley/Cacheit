// Dependancies
import { StackNavigator, TabNavigator } from 'react-navigation';

// Views
import SubredditsView from '../components/views/SubredditsView';
import PostsView from '../components/views/PostsView';
import CommentsView from '../components/views/CommentsView';
import SettingsView from '../components/views/SettingsView';
import DevView from '../components/MarkupView';

// Route Names - Eventually move to separate file
export const RouteNames = {
    SUBREDDITS: 'SUBREDDITS',
    POSTS: 'POSTS',
    COMMENTS: 'COMMENTS',
    SETTINGS: 'SETTINGS',
    DEV: 'DEV',
};

// Navigation
const stackNavRoutes = {
    [RouteNames.SUBREDDITS]: { screen: SubredditsView },
    [RouteNames.POSTS]: { screen: PostsView },
    [RouteNames.COMMENTS]: { screen: CommentsView },
    [RouteNames.SETTINGS]: { screen: SettingsView },
    [RouteNames.DEV]: { screen: DevView },
};

const stackNavOptions = {
    initialRouteName: RouteNames.SUBREDDITS,
};

const baseNavigator = StackNavigator(stackNavRoutes, stackNavOptions);

export default baseNavigator;
