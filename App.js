/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';

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
    this.state = {
      inputedNum: '',
      inputedPW: ''
    }
    this.updatePW = this.updatePW.bind(this);
  }
  updateNum = (newText) => {
    this.setState({
      inputedNum: newText
    });
  }
  updatePW = (newText) => {
    this.setState({
      inputedPW: newText
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInputStyle} placeholder={'请输入手机号'} onChangeText={(newText) => this.updateNum(newText)}/>
        <Text style={styles.textPromptStyle}>您输入的手机号：{this.state.inputedNum}</Text>
        <TextInput style={styles.textInputStyle} placeholder={'请输入密码'} secureTextEntry={true} onChangeText={this.updatePW}/>
        <Text style={styles.bigTextPrompt}>确定</Text>



        {/* <Text style={styles.welcome}>Welcome to React Native!,你好34</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputStyle: {
    margin: widthOfMargin,
    backgroundColor: 'gray',
    fontSize: 20
  },
  textPromptStyle: {
    margin: widthOfMargin,
    fontSize: 20
  },
  bigTextPrompt: {
    margin: widthOfMargin,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  }
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
