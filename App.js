import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, } from 'react-native';
import createStore from './src/store/configureStore';
import { Provider } from 'react-redux';

import TopView from './src/components/TopView';
import BottomView from './src/components/BottomView';

const store = createStore();

export default class App extends Component {

  render() {
    return (
      <View style={{ flex:1 }}>
        <Provider store={store}>
          <View style={{ flex:1 }}>
            <TopView />
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
