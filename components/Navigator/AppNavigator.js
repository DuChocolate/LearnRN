import React, {Component} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components'
import {PixelRatio} from 'react-native';
let pixelRatio = PixelRatio.get();
import ImageDisplayer from './ImageDisplayer';
import NavigationBarRouteMapper from './NavigationBarRouteMapper';
export default class AppNavigator extends Component {
    constructor(props){
        super(props);
        this.touchtime=0;
        this.switchSceneStyle = Navigator.SceneConfigs.PushFromRight;
        this.initialRoute = {
            UIIndex: 0,
            cbForLeftButton: this.callbackforLeftButton
        };
        this.state = {textPrompt: '', UIIndex: 0};
    }
    renderScene = (router, navigator) => {
        return(
            <ImageDisplayer
                navigator={navigator}
                textForLeftButton={'新文字'}
                cbForLeftButton={this.callbackforLeftButton}
                UIIndex={this.state.UIIndex}
                textPrompt={this.state.textPrompt}
                callback={this.changeStateVarBeforeRoute}
            />
        );
    }
    callbackforLeftButton = (aNumber) => {
        console.log('call back function received number:' + aNumber);
    }
    configureScene = (route) => {
        return this.switchSceneStyle;   //设置当前切换使用何种效果
    }
    render() {
        return(
            <Navigator
                initialRoute={this.initialRoute}
                configureScene={this.state.switchSceneStyle}
                navigatorBar={<Navigator.navigatorBar routeMapper={NavigationBarRouteMapper}/>}
                renderScene={this.renderScene}
            >
            </Navigator>
        );
    }
    changeStateVarBeforeRoute = () => {   //子组件用这个函数通知父组件准备切换场景，
        this.touchtime++;   //点击次数成员变量加1
        let textPrompt;
        switch(this.touchtime % 12){    //通过点击次数模12来达到每次切换效果的不同
            case 0:
                textPrompt = 'PushFromRight';
                this.switchSceneStyle = Navigator.SceneConfigs.PushFromRight;
                break;
            case 1:
                textPrompt = 'FloatFromRight';
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromRight;
                break;
            case 2:
                textPrompt = 'FloatFromLeft';
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromLeft;
                break;
            case 3:
                textPrompt = 'FloatFromBottom';
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromBottom;
                break;
            case 4:
                textPrompt = 'FloatFromBottomAndroid';
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromBottomAndroid;
                break;
            case 5:
                textPrompt = 'FadeAndroid';
                this.switchSceneStyle = Navigator.SceneConfigs.FadeAndroid;
                break;
            case 6:
                textPrompt = 'SwipeFromLeft';
                this.switchSceneStyle = Navigator.SceneConfigs.SwipeFromLeft;
                break;
            case 7:
                textPrompt = 'HorizontalSwipeJump';
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJump;
                break;
            case 8:
                textPrompt = 'HorizontalSwipeJumpFromRight';
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                break;
            case 9:
                textPrompt = 'HorizontalSwipeJumpFromLeft';
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
                break;
            case 10:
                textPrompt = 'VerticalUpSwipeJump';
                this.switchSceneStyle = Navigator.SceneConfigs.VerticalUpSwipeJump;
                break;
            case 11:
                textPrompt = 'VerticalDownSwipeJump';
                this.switchSceneStyle = Navigator.SceneConfigs.VerticalDownSwipeJump;
                break;
        }
        this.setState({textPrompt, UIIndex: this.state.UIIndex+1});
    }
}