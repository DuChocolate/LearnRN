/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
let nativeImagSource = require('nativeImageSource');
export default class App extends Component {
  constructor(props){
    super(props);
  }
 
  render() {
    let ades = {
      android: 'android_search_white',
      width: 96,
      height: 96,
    }
    return (
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={nativeImagSource(ades)} />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'grey'
  },
  imageStyle: {
    margin: 2, backgroundColor: 'white',
    height: 100,
    width: 100,
  },
  icon: {
    width: 100,
    height:100,
  },
  sButtonStyle: {
    fontSize: 20,
    left: 130,
    top: 50,
    width: 150,
    height: 35,
    backgroundColor: 'grey'
  },
  bButtonStyle: {
    fontSize: 20,
    left: 130,
    top: 130,
    width: 150,
    height: 70,
    backgroundColor: 'grey'
  },
})