import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class DevButton extends Component {
    constructor(props) {
        super(props);
        this.preset = presets[props.theme] || presets.default;
    }
    handlePressDefault(event) {
        console.log(`Button theme: ${this.preset.theme} pressed`); // eslint-disable-line
    }

    render() {
        const { style, buttonText } = this.preset;
        return (
            <View style={[globalStyle.obj, style.button]}>
                <TouchableOpacity onPress={event => { this.props.onPress ?
                            this.props.onPress(event) :
                            this.handlePressDefault(event); }}>
                    <Text style={style.text}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const globalStyle = StyleSheet.create({
    obj: {
        width: '80%',
        paddingVertical: 10,
        marginTop: 2,
    }
});

const presets = {
    nuke: {
        style: StyleSheet.create({
            button: {
                backgroundColor: 'orange',
                borderWidth: 3,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
            },
            text: {
                color: 'red'
            }
        }),
        buttonText: '☢ The big orange button ☢',
    },
    grass: {
        style: StyleSheet.create({
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
        }),
        buttonText: '🌲 A pretty green button! 🌲',
    },
    magic: {
        style: StyleSheet.create({
            button: {
                backgroundColor: 'pink',
                borderWidth: 3,
                borderRadius: 2,
                padding: 3,
                alignItems: 'center',
                justifyContent: 'center',
            }
        }),
        buttonText: '♫ Do you believe in magic? ♫',
    },
    default: {
        style: {},
        buttonText: 'A plain jane button',
    }
};
