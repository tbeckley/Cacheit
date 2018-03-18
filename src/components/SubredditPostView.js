import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import store from '../store/store';
import { addSubreddit } from '../store/actions/index'

const words = ['hi', 'bye', 'hi', 'nope', 'lmao'];
const vals = [true, false, false, true, true];


let i = 0;

export default class SubredditPostView extends Component {

    lmao = () => {
        store.dispatch(addSubreddit({ name: words[i], comments: vals[i] }));
        i++;
    }

    render() {
        alert(JSON.stringify(store.getState()));
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={this.lmao}>
                        <Text>
                            TEMP
                        </Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.bottom}>
                    <Text>HI</Text>
                </View>
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    top: {
        height: 100,
        backgroundColor: 'purple',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
