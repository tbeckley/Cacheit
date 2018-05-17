import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { withNavigation } from 'react-navigation';
import { RouteNames } from '../nav/routes';

import TBIcon from './TBIcon';

class SettingsButton extends Component {

    navToSettings = () => {
        const { navigation } = this.props;
        navigation.navigate({ routeName: RouteNames.SETTINGS });
    }

    render() {
        return (<TBIcon style={styles} name={'gear'} onPress={this.navToSettings} />);
    }
}

SettingsButton.propTypes = {
    navigation: PropTypes.object,
};

const styles = {
    marginRight: 15,
    fontSize: 24,
};

export default SettingsButton;
