import './src/conf/ReactotronConfig';
import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Provider } from 'react-redux';

import TopView from './src/components/views/TopView';
import BottomView from './src/components/views/BottomView';

import BaseNavigator from './src/nav/routes';

import configureStore from './src/store/configureStore';
const store = configureStore();

import './src/util/dev/testCode';

export default class App extends Component {

  render() {
    return (
      <View style={{ flex:1 }}>
        <Provider store={store}>
          <View style={{ flex:1 }}>
            <BaseNavigator />
          </View>
        </Provider>
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
