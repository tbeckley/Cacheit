import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import TBIcon from './TBIcon';
import { RouteNames } from '../nav/routes';

class SettingsButton extends Component {

    navToSettings = () => {
        const { navigation: { navigate } } = this.props;
        navigate({ routeName: RouteNames.SETTINGS });
    }

    render() {
        return (<TBIcon style={styles} name={'gear'} onPress={this.navToSettings} />);
    }
}

const styles = {
    marginRight: 15,
    fontSize: 24,
};

export default withNavigation(SettingsButton);
