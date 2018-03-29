import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/style/commonStyle';

import { reducer, initialState } from '../store/reducers.js';
import actionTypes from '../store/actions';

export default class TopView extends Component {
    constructor() {
        super();
    }

    do_shit() {
        console.log("Hello!");
        const cs = console.log;
        let state = initialState;
        const addpf = {
            type: actionTypes.ADD_SUBREDDIT,
            payload: [{
                name: 'personalfinance',
                comments: true,
            }]
        }
        state = reducer(state, addpf);
        const addla = {
            type: actionTypes.ADD_SUBREDDIT,
            payload: [{
                name: 'legaladvice',
                comments: true,
            }]
        }
        state = reducer(state, addla);
        const addp2 = {
            type: actionTypes.ADD_SUBREDDIT,
            payload: [{
                name: 'personalfinance',
                comments: false,
            }]
        }
        state = reducer(state, addp2);
        const removela = {
            type: actionTypes.REMOVE_SUBREDDIT,
            payload: 'legaladvice',
        }
        state = reducer(state, removela);
        cs(state.content.subreddits);
    }

    render() {
        this.do_shit();
        alert("Hello World!");
        return(
            <View style={[styles.container, styles.red]}>
                <Text> Top </Text>
            </View>
        );
    }
}