import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
var NavigationBarRouterMapper = {   //定义设置导航栏的变量
    LeftButton(route, navigator, index, navState){   //定义左侧区域如何显示
        let pString;
        if(route.textForLeftButton !== undefined){
            pString = route.textForLeftButton;
        }else{
            pString = '上一个';
        }
        if(index > 0){
            return (
                <Text
                    style={styles.buttonStyle}
                    onPress={()=>{
                        try{
                            route.cbForLeftButton(route.UIIndex);
                            navigator.jumpBack();
                        }catch(error){
                            //用户退回到尽头后还企图退回，这里catch的error不需要处理
                        }
                    }}
                >
                    {pString}
                </Text>
            );
        }else{
            return (
                <Text style={[styles.buttonStyle, {color:'red'}]}>{pString}</Text>
            );
        }
    },
    Title(route, navigator, index, navState){   //定义导航栏中部区域如何显示
        return (
            <Text style={styles.titleStyle}>第{route.UIIndex}个界面</Text>
        )
    },
    RightButton(route, navigator, index, navState){   //定义导航栏右侧区域如何显示
        if(navState.sceneConfigStack.length === index + 1){
            console.log('no onPress for right button');
            return (
                <Text style={[styles.buttonStyle,{color:'red'}]}>下一个</Text>
            );
        }
        return (
            <Text style={styles.buttonStyle}
                onPress={()=>{
                    if(navState.sceneConfigStack.length === index + 1){
                        console.log('Can not jump forward');
                    }else{
                        navigator.jumpForward();
                    }
                }}>下一个</Text>
        );
    }
};
var style = StyleSheet.create({
    buttonStyle: {
        fontSize: 20,
        margin: 10,
        backgroundColor: 'grey',
        width: 70,
    },
    titleStyle: {
        fontSize: 20,
        margin: 10,
        left: 10,
        textAlign: 'center'
    }
})