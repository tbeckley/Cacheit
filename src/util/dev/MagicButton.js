import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class MagicButton extends Component {
    handlePress(event) {
        if(this.props && this.props.onPress) {
            this.props.onPress();
        }
        else {
            console.log("Magic!");
        }

    }

    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.text}>♫ Do you believe in magic? ♫</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'pink',
        borderWidth: 3,
        borderRadius: 2,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    }
});