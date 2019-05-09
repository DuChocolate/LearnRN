import React, {Component} from 'react';
import {StyleSheet, View, Switch} from 'react-native';
export default class AppSwitch extends Component{
    constructor(props){
        super(props);
        this.state = {aSwitch: true};
        this.progressTimer = null;
    }
    onSwitchChanged = () => {
        this.setState({
            aSwitch: !this.state.aSwitch
        });
    }
    render() {
        return (
            <View>
                <Switch style={{margin: 20}} onValueChange={this.onSwitchChanged} value={this.state.aSwitch}/>
                <Switch style={{margin: 20}} onValueChange={this.onSwitchChanged} value={!this.state.aSwitch}/>
            </View>
        );
    }

}