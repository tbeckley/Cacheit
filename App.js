import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, } from 'react-native';

import { parseResponse } from './src/util/responseHelper';

import TBButton from './src/components/TBButton';
import DefaultScreen from './src/components/DefaultScreen';
import SubredditPostView from './src/components/SubredditPostView';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      resp: 'No text here yet',
    };
  }

  onPress = (event) => {
    const that = this;

    /*fetch('./src/assets/mixed_response.json')
      .then((resp) => that.handleResponse(resp))
      .catch((error) => that.handleError(error));*/

    var json = require('./src/assets/mixed_response.json');
    this.handleResponse(parseResponse(json));
  }

  handleResponse = (response) => this.setState({resp: response});
  handleError = (error) => alert("Error retrieving data: "+error);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, styles.bottom]} >
          <SubredditPostView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  top: {
    width: '100%',
  },
  bottom: {
    flex: 1,
  }
});