/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import AppKeyBoard from './components/AppKeyBoard';
import AppRefs from './components/AppRefs';
import AppPosition from './components/AppPosition';
import AppAutoHeight from './components/AppAutoHeight';
import AppDiary from './components/Diary/AppDiary';


export default class App extends Component {
  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }
  configureScene = (route) => {
    return Navigator.SceneConfigs.FadeAndroid;
  }
  renderScene = (router, navigator) => {
    switch(router.name){
      case 'Page1':
        return <Page1 navigator={navigator} />;
      case 'Page2':
        return <Page2 navigator={navigator} />;
      case 'Page3':
        return <Page3 navigator={navigator} />
      case 'Page4':
        return <Page4 navigator={navigator} />;
    }
  }
 
  render() {
    return (
      // <Text>呵呵</Text>
      <AppDiary />
      // <Navigator initialRoute={{name: 'Page1'}} configureScene={this.configureScene} renderScene={this.renderScene} />
    );
  }
}