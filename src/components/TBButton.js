import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class TBButton extends Component {
    constructor(props) {
        super(props);
    }

    getText = (children, text) => {
        if(children)
            return (typeof children === 'string' ? children : JSON.stringify(children));
        else if(text)
            return text;
        else
            return "Press Me!";
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}> { this.getText(this.props.children, this.text) } </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create(
    {
        viewStyle: {
            backgroundColor: 'orange',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 5,
        },
        textStyle: {
            color: 'black',
            fontSize: 16,
        }
    }
);