import { StackNavigator, TabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import React from 'react';

import SubredditsView from '../components/views/SubredditsView';
import PostsView from '../components/views/PostsView';
import CommentsView from '../components/views/CommentsView';
import SettingsView from '../components/views/SettingsView';

export const RouteNames = {
    SUBREDDITS: 'SUBREDDITS',
    POSTS: 'POSTS',
    COMMENTS: 'COMMENTS',
    SETTINGS: 'SETTINGS',
    MAINVIEW: 'MAINVIEW',
};

export const stackNavRoutes = {
    [RouteNames.SUBREDDITS]: { screen: SubredditsView },
    [RouteNames.POSTS]: { screen: PostsView },
    [RouteNames.COMMENTS]: { screen: CommentsView },
};

const stackNavigator = StackNavigator(
    stackNavRoutes,
    {
        initialRouteName: RouteNames.SUBREDDITS
    }
);

const baseNavigator = TabNavigator({
    [RouteNames.MAINVIEW]: stackNavigator,
    [RouteNames.SETTINGS]: { screen: SettingsView },
    },
    {
        // OPTIONS GO HERE
    }
);

export default baseNavigator;
