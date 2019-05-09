import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export default class AppWaitingIndicator extends Component{
    render(){
        return (
            <View style={{top:40}}>
                <ActivityIndicator animating={true} color={'blue'} size={'large'}/>
                <ActivityIndicator animating={true} color={'blue'} size={'small'}/>
            </View>
        );
    }
}