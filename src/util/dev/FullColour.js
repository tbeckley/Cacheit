import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const capitalizeFirst = word =>  word.charAt(0).toUpperCase() + word.slice(1);

export default class FullColour extends Component {
    render() {
        return (
            <View style={styles.container}>
            {
                this.props.colours.map((colour, key) => {
                    return (
                        <View key={key} style={[styles.container, { backgroundColor: colour }]}>
                            <Text style={styles.text}>{capitalizeFirst(colour)}</Text>
                        </View>
                    );
                })
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        color: 'white',
        fontSize: 18,
    }
});
