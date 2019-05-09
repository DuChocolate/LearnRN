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
            <Navigator>
            </Navigator>
        );
    }

}