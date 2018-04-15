import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import TBIcon from './TBIcon';
import { RouteNames } from '../nav/routes';

class SettingsButton extends Component {

    navToSettings = () => {
        this.props.navigation.navigate({ routeName: RouteNames.SETTINGS });
    }

    render() {
        return (<TBIcon style={styles} name={'gear'} onPress={this.navToSettings} />);
    }
}

const styles = {
    marginRight: 10,
    fontSize: 24,
};

export default SettingsButton;
