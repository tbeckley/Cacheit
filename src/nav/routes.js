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

const stackNavRoutes = {
    [RouteNames.SUBREDDITS]: { screen: SubredditsView },
    [RouteNames.POSTS]: { screen: PostsView },
    [RouteNames.COMMENTS]: { screen: CommentsView },
};

const stackNavOptions = {
    initialRouteName: RouteNames.SUBREDDITS,
};

const stackNavigator = StackNavigator(stackNavRoutes, stackNavOptions);

const baseNavOptions = {
    initialRouteName: RouteNames.MAINVIEW,
};

const baseNavRoutes = {
    [RouteNames.MAINVIEW]: stackNavigator,
    [RouteNames.SETTINGS]: { screen: SettingsView },
};

const baseNavigator = TabNavigator(baseNavRoutes, baseNavOptions);


export default baseNavigator;
