import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'Prop-Types';

export default class Well extends Component {
    render() {
        const { children, title } = this.props;
        return (
            <View style={styles.wellContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.divider} />
                <View style={styles.childContainer}>
                    {children}
                </View>
            </View>
        );
    }
}

Well.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
};

const styles = StyleSheet.create({
    wellContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 2,
        padding: 10,
        marginVertical: 3,
        marginHorizontal: 2,
        width: '90%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5,
        marginBottom: 3,
    },
    divider: {
        height: 0,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    childContainer: {
        marginLeft: 10,
    }
});
