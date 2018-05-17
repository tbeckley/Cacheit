import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


const capitalizeFirst = word =>  word.charAt(0).toUpperCase() + word.slice(1);

export default class FullColour extends Component {
    _getColour(key, colour) {
        return (
            <View key={key} style={[styles.container, { backgroundColor: colour }]}>
                <Text style={styles.text}>{capitalizeFirst(colour)}</Text>
            </View>
        );
    }
    render() {
        const { colours } = this.props;
        const isArray = (typeof colours) === 'array';
        return (
            <View style={styles.container}>
            {
                isArray ? colours.map(this._getColour) : this._getColour(0, this.props.colours)
            }
            </View>
        );
    }
}

FullColour.propTypes = {
    colours: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

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
