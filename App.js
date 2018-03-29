import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, } from 'react-native';

import TopView from './src/components/TopView';
import BottomView from './src/components/BottomView';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    return (
      <View style={{flex:1}}>
        <TopView />
        <BottomView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    width: '100%',
  },
  bottom: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: '100%',
  }
});