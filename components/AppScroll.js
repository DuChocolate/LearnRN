import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
export default class AppScroll extends Component{
    constructor(props){
        super(props);
        // this.onScrollBeginDarg = this._onScrollBeginDarg.bind(this);
        // this.onScrollEndDrag = this._onScrollEndDrag.bind(this);
        // this.onMomentumScrollBegin = this._onMomentumScrollBegin.bind(this);
        // this.onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        // this.onRefresh = this._onRefresh.bind(this);
        // this.onScroll = this.onScroll.bind(this);
    }
    _onScrollBeginDarg = () => {
        console.log('begin drag');
    }
    _onScrollEndDrag = () => {
        console.log('end drag');
    }
    _onMomentumScrollBegin = () => {
        console.log('----_onMomentumScrollBegin');
    }
    _onMomentumScrollEnd = () => {
        console.log('----_onMomentumScrollEnd');
    }
    _onRefresh = () => {
        console.log('_onRefresh is called');
    }
    onScroll = (aEvent) => {
        console.log('on scroll is called.');
        console.log(aEvent.nativeEvent);
    }
    render() {
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onScrollBeginDrag={this._onScrollBeginDarg}
                    onScroll={this.onScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={true}
                            onRefresh={this._onRefresh}
                            tintColor='#ff0000'
                            title='Loading...'
                            colors={['#ff0000','#00ff00','#0000ff']}
                            progressBackgroundColor='#ffff00'/>}
                    onScrollEndDrag={this._onScrollEndDrag}>
                    <View style={styles.aView}/>
                    <ScrollView horizontal={true} style={styles.midScrollView}>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                    </ScrollView>
                    <View style={styles.aView}/>
                </ScrollView>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'grey'
    },
    scrollView: {
        backgroundColor: 'grey',
    },
    midScrollView: {
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
    },
    aView: {
        margin: 1,
        padding: 0,
        backgroundColor: 'red',
        height: 375,
    },
    bView: {
        flex: 1,
        height: 148,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'grey'
    }
})
