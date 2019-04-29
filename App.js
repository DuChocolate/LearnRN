/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.firstRow}>
          <View style={styles.test1} />
          <View style={styles.test2} />
          <View style={styles.test3} />
        </View>
        <View style={styles.testPosition} />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstRow: {
    height: 40,
    top: 40,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  test1: {
    width: 68,
    height: 24,
    backgroundColor: 'white',
  },
  test2: {
    width: 40,
    height: 24,
    backgroundColor: 'white',
  },
  test3: {
    width: 100,
    height: 24,
    backgroundColor: 'white',
  },
  testPosition: {
    backgroundColor: 'grey',
    height: 60,
    width: 60,
    position: 'absolute',
    top: 150,
    right: 50
  }
})