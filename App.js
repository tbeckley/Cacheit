import './src/config/ReactotronConfig';
import React, { Component } from 'react';
import { AsyncStorage, View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider, connect } from 'react-redux';

import BaseNavigator from './src/nav/routes';
import configureStore from './src/store/configureStore';
import { loadStateFromMemory } from './src/util/storageHelper';
import actions from './src/store/actions.js';

const store = configureStore();
loadStateFromMemory(state => store.dispatch(actions.writeState(state)));

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
