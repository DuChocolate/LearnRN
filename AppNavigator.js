/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, BackHandler, StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import LoginLeaf from './components/LoginLeaf';
import WaitingLeaf from './components/WaitingLeaf';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let widthOfMargin = Dimensions.get('window').width * 0.05;
// type Props = {};
export default class App extends Component {
  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.handleBackAndroid = this.handleBackAndroid.bind(this);
  }
  componentDidMount() {
    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);
    }
  }
  componentWillUnmount() {
    if(Platform.OS === 'android'){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackAndroid);
    }
  }
  configureScene = (route) => {
    return Navigator.SceneConfigs.FadeAndroid;
  }
  renderScene = (router, navigator) => {
    this.navigator = navigator;
    switch(router.name){
      case 'login':
        return <LoginLeaf navigator={navigator}/>;
      case 'waiting':
        return <WaitingLeaf phoneNumber={router.phoneNumber} userPW={router.userPW} navigator={navigator}/>;
    }
  }
  handleBackAndroid = () =>{
    if(this.navigator.getCurrentRoutes().length > 1){
      this.navigator.pop();
      return true;
    }
    return false;
  }
  render() {
    return (
      <Navigator initialRoute={{name: 'login'}} configureScene={this.configureScene} renderScene={this.renderScene}/>
    );
  }
}