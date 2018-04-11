import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class GrassButton extends Component {
    handlePressDefault(event) {
        console.log('Magic! pressed'); // eslint-disable-line
    }

    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={event => { this.props.onPress ?
                            this.props.onPress(event) :
                            this.handlePressDefault(event); }}>
                    <Text style={styles.text}> 🌲 A pretty green button! 🌲</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        borderWidth: 3,
        borderRadius: 2,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'lightgreen'
    }
});
