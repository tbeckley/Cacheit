import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TBIcon extends Component {
    getIcon = (name, style) => (<View><Icon style={style} name={name} /></View>);

    render() {
        const { name, style, onPress } = this.props;
        const iconView = this.getIcon(name, style || defaultStyles.iconStyle);

        if(onPress) return (<TouchableOpacity onPress={onPress}>{iconView}</TouchableOpacity>);
        else return iconView;
    }
}

const defaultStyles = {
    iconStyle: {
        fontSize: 16
    }
};
