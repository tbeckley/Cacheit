import React, { Component } from 'react';
import { View } from 'react-native';
import FullColour from '../util/dev/FullColour';

export default class BottomView extends Component {

    render() {
        const colours = ['red','green','blue'];
        return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <FullColour colours={colours}/>
        </View>);
    }
}
