import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
class AutoExpandingTextInput extends Component{
    constructor(props){
        super(props);
        this.state = {text: '', height: 0};
        this._onChange = this._onChange.bind(this);
    }
    _onChange = (event) => {
        this.setState({
            text: event.nativeEvent.text,
        });
    }
    _onContentSizeChange = (event) => {
        this.setState({
            height: event.nativeEvent.contentSize.height
        });
    }
    render(){
        return(
            <TextInput {...this.props}   //将自定义组件的所有属性交给TextInput
                multiline={true}
                onContentSizeChange={this._onContentSizeChange}
                onChange={this._onChange}
                style={[styles.textInputStyle,{height:Math.max(35, this.state.height)}]}
                value={this.state.text}/>
        );
    }
}
export default class AppAutoHeight extends Component{
    _onChangeText = (newText) => {
        console.log('inputed text:' + newText);
    }
    render(){
        return (
            <View style={styles.container}>
            {/* <Text>哈哈哈哈</Text> */}
                <AutoExpandingTextInput style={styles.textInputStyle} onChangeText={this._onChangeText} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textInputStyle: {
        fontSize: 20,
        width: 300,
        height: 30,
        backgroundColor: 'grey',
        paddingTop: 0,
        paddingBottom: 0
    }
});