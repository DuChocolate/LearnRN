import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
export default class AppPosition extends Component{
    componentDidMount(){
        var aref = this.tempfunc.bind(this);
        window.setTimeout(aref, 1);    //在componentDidMount指向完后才可以获取位置，因此指定一个1毫秒后超时的定时器
    }
    tempfunc = () => {
        this.refs.aTextInputRef.measure(this.getTextInputPosition);   //获取位置
    }
    //位置信息通过毁掉函数传递给开发者
    getTextInputPosition = (fx, fy, width, height, px, py) => {
        console.log('getTextInputPosition');
        console.log('Component width is:' + width);
        console.log('Component height is:' + height);
        console.log('X offset to frame:' + fx);
        console.log('Y offset to frame:' + fy);
        console.log('X offset to page:' + px);
        console.log('Y offset to page:' + py);
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{borderWidth: 1}}>
                    <TextInput style={styles.textInputStyle} ref='aTextInputRef' defaultValue='Ajfg你好' underlineColorAndroid='white'/>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInputStyle: {
        width: 200,
        height: 55,
        fontSize: 50,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0
    }
})