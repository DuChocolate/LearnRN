/**
 * 登录页
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class WaitingLeaf extends Component {
  constructor(props){
    super(props);
  }
  onGobackPressed = () => {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textPromptStyle}>登录使用手机号：{this.props.phoneNumber}</Text>
        <Text style={styles.textPromptStyle}>登录使用密码：{this.props.userPW}</Text>
        <Text style={styles.bigTextPrompt} onPress={()=>this.onGobackPressed()}>返回</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textPromptStyle: {
    fontSize: 20
  },
  bigTextPrompt: {
    width: 300,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  }
});
