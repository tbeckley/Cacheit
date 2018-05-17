import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class TBIcon extends Component {
    getIcon = (name, style) => (<View><Icon style={style} name={name} /></View>);

    render() {
        const { name, style, onPress } = this.props;
        const iconView = this.getIcon(name, style || defaultStyles.iconStyle);

        if(onPress) return (<TouchableOpacity onPress={onPress}>{iconView}</TouchableOpacity>);
        else return iconView;
    }
}

TBIcon.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func,
};

const defaultStyles = {
    iconStyle: {
        fontSize: 24
    }
};
