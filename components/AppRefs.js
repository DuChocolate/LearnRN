import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
export default class AppRefs extends Component{
    constructor(props){
        super(props);
        this.state ={textInputValue: ''};
        this.buttonPressed = this.buttonPressed.bind(this);
    } 
    buttonPressed = () => {    //当按钮被按下时执行此函数
        let textInputValue = 'new Value';
        this.setState({textInputValue});
        this.refs.textInputRefer.setNativeProps({   //修改文本输入框的属性值，使文本输入框变为不可编辑
            editeble: false
        });
        this.refs.text2.setNativeProps({    //通过指向Text组件的引用，修改该组件的颜色和字体大小
            style: {color: 'blue', fontSize: 30}
        })
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.buttonStyle} onPress={this.buttonPressed}>Press me genterly</Text>
                <Text style={styles.textPromptStyle} ref={'text2'}>文字提示</Text>
                <View>
                    <TextInput style={styles.textInputStyle} ref={'textInputRefer'} value={this.state.textInputValue} onChangeText={(textInputValue)=>this.setState({textInputValue})}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonStyle: {
        fontSize: 20,
        backgroundColor: 'grey'
    },
    textPromptStyle:{
        fontSize: 20
    },
    textInputStyle: {
        width: 150,
        height: 50,
        fontSize: 20,
        backgroundColor:'grey'
    }
})