import React, {Component} from 'react';
import {StyleSheet, View, ProgressBarAndroid} from 'react-native';

export default class AppProgress extends Component{
    constructor(props){
        super(props);
        this.state = {progress: 0};
        this.progressTimer = null;
    }
    componentDidMount(){
        this.updateProgress();
    }
    updateProgress = () => {
        var progress = (this.state.progress + 0.0025) % 1;
        this.setState({progress});
        this.progressTimer = window.requestAnimationFrame(()=>this.updateProgress());    //每1/60秒执行一次
    }
    componentWillUnmount() {
        window.cancelAnimationFrame(this.progressTimer);
    }
    render(){
        return (
            <View>
                {/* <ProgressBarAndroid styleAttr="Horizontal" />
                <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
                <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={true}
                progress={1}
                /> */}
                <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.progress}
                />
            </View>
        );
    }
}