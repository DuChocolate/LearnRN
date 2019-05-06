import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Keyboard} from 'react-native';
let totalHeight = Dimensions.get('window').height;
export default class AppKeyBoard extends Component{
    constructor(props){
        super(props);
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.state = {
            KeyboardShown: false
        };
        this.onDismissKeyboard = this.onDismissKeyboard.bind(this);
    }
    keyboardDidShowHandler = (event) => {
        this.setState({KeyboardShown: true});
    }
    keyboardDidHideHandler = (event) => {
        this.setState({KeyboardShown: false});
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));
    }
    componentWillUnmount() {
        if(this.keyboardDidShowListener !== null){
            this.keyboardDidShowListener.remove();
        }
        if(this.keyboardDidHideListener !== null){
            this.keyboardDidHideListener.remove();
        }
    }
    onDismissKeyboard = () => {
        Keyboard.dismiss();
        console.log('is it get focus?' + this.refs.bottomInput.isFocused());
    }
    render() {
        return(
            <View style={[styles.container, this.state.KeyboardShown && styles.bumpedContainer]}>
                <Text style={styles.buttonStyle} onPress={this.onDismissKeyboard}>Dismiss Keyboard</Text>
                <TextInput style={styles.textInputStyles} ref='bottomInput' 
                    onFocus={()=>this.setState({bumpedUp:1})}
                    onEndEditing={()=>this.setState({bumpedUp:0})} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bumpedContainer: {   //用来让父容器整体上移的样式
        marginBottom: 250,
        marginTop: -250,
    },
    buttonStyle: {
        top: 250,
        fontSize: 30,
        backgroundColor: 'grey',
    },
    textInputStyles: {
        position: 'absolute',
        top: totalHeight-130,
        left: 20,
        width: 200,
        height: 50,
        fontSize: 20,
        backgroundColor: 'grey'
    }
});