import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/style/commonStyle';
import FullColour from '../util/dev/FullColour';

export default class BottomView extends Component {

    render() {
        let colours = ['red','green','blue'];
        return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <FullColour colours={colours}/>
        </View>);
    }
}