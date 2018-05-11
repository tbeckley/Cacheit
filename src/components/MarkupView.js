import data from '../assets/data/sample_post';
import R from 'ramda';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, WebView } from 'react-native';
import TBIcon from './TBIcon';

const bold = (key, txt) => <Text key={key} style={{ fontWeight:'bold' }}>{txt}</Text>;
const underline = (key, txt) => <Text key={key} style={{ textDecorationLine: 'underline' }}>{txt}</Text>;
const italics = (key, txt) => <Text key={key} style={{ fontStyle: 'italic' }}>{txt}</Text>;
const strike = (key, txt) => <Text key={key} style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{txt}</Text>;
const link = (key, txt, url) => <Text key={key} style={{ color: 'blue' }} onPress={() => Linking.openURL(url)}>{txt}</Text>;
const quote = (key, txt) => <Text key={key} style={{ color: 'grey' }}>  |  {txt}</Text>;
const li = (key, txt) => <View key={key} style={{ paddingLeft: 20, marginVertical: 2, flexDirection: 'row', alignItems: 'center' }}><TBIcon name="circle" style={{ fontSize: 8, paddingRight: 8 }} /><Text>{txt}</Text></View>;
const numlist = (key, txt) => <Text style={{ marginLeft: 20 }} key={key}>1.  {txt}</Text>;
const plain = (key, txt) => <Text key={key} >{txt}</Text>;

function doTheThing (value, key) {
    if(R.isEmpty(value)) {
        return;
    }
    else if(value.match(/\*{2}(.*?)\*{2}/)) { // BOLD
        return bold(key, value.match(/\*{2}(.*?)\*{2}/)[1]);
    }
    else if(value.match(/\*(.*?)\*/)) { // ITALICS
        return italics(key, value.match(/\*(.*?)\*/)[1]);
    }
    else if(value.match(/~{2}(.*?)~{2}/)) { // STRIKE
        return strike(key, value.match(/~{2}(.*?)~{2}/)[1]);
    }
    else if(value.match(/\[(.*?)\]\((.*?)\)/)) { // HYPERLINK
        const values = value.match(/\[(.*?)\]\((.*?)\)/);
        return link(key, values[1], values[2]);
    }
    else if(value.match(/&gt; (.*)/)) { // QUOTES
        return quote(key, value.match(/&gt; (.*)/)[1]);
    }
    else if(value.match(/\* (.*)/)) { // BULLET
        return li(key, value.match(/\* (.*)/)[1]);
    }
    else if(value.match(/[0-9]*\. (.*)/)) { // NUM
        return numlist(key, value.match(/[0-9]*\. (.*)/)[1]);
    }
    else {
        return plain(key, value);
    }
}
export default class MarkupView extends Component {
    render() {
        const dataHtml = data.selftext_html
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/\n/g, '');
        return <WebView style={{ flex: 1 }} source={{ html: dataHtml }} />;
    }
}
