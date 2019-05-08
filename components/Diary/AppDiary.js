import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import DiaryList from './DiaryList';
import DiaryWriter from './DiaryWriter';
import DiaryReader from './DiaryReader';
import DataHandler from './DataHandler';
export default class AutoExpandingTextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            uiCode: 1,
            diaryMood: null,
            diaryTime: '读取中......',
            diaryTitle: '读取中......',
            diaryBody: '读取中......',
        };
        this.bindAllMyFunction();    //执行回调函数绑定操作
        DataHandler.getAllTheDiary().then((result) => {    //获取所有的日志数据，日记数据保存在DataHandler中
            this.setState(result);    //返回值是最后一篇日记的数据
        }).catch((error) => {
            console.log(error);
        })
    }
    bindAllMyFunction = () => {   //将所有的绑定回调函数放在这个函数中，让构造函数方便阅读
        this.selectLististItem = this.selectLististItem.bind(this);
        this.writeDiary = this.writeDiary.bind(this);
        this.returnPressed = this.returnPressed.bind(this);
        this.saveDiaryAndReturn = this.saveDiaryAndReturn.bind(this);
        this.readingPreviousPressed = this.readingPreviousPressed.bind(this);
        this.readingNextPressed = this.readingNextPressed.bind(this);
    }
    readingPreviousPressed = () => {    //阅读日记界面请求读上一篇日记的处理函数
        let previousDiary = DataHandler.getPreviousDiary();
        if(previousDiary === null) return;    //已经显示的是第一篇日记
        this.setState(previousDiary);   // 显示上一篇日记
    }
    readingNextPressed = () => {    //阅读日记界面请求读下一篇日记的处理函数
        let nextDiary = DataHandler.getNextDiary();
        if(nextDiary === null) return;    //已经显示的是最后一篇日记
        this.setState(nextDiary);   // 显示下一篇日记
    }
    returnPressed = () => {    //阅读日记界面、写日记界面返回日记列表界面的处理函数
        this.setState({uiCode: 1});
    }
    //写日记界面保存日记并返回日记列表界面的处理函数
    saveDiaryAndReturn = (newDiaryMood, newDiaryBody, newDiaryTitle) => {
        DataHandler.saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle).then((result)=>{
            this.setState(result);
        }).catch((error)=>{
            console.log(error);
        })
    }
    writeDiary = () => {     //写日记按钮被按下时的处理函数
        this.setState({uiCode:3});
    }
    searchKeyword = (keyword) => {    //搜索框中有输入时的处理函数，仅实现原型
        console.log('search keyword is:' + keyword);
    }
    selectLististItem = () => {     //日记列表中某条记录被选中时的处理函数
        this.setState({uiCode: 2});
    }
    showDiaryList = () => {
        return(    //注意，如何将状态机常量作为属性向下层React Native组件传递
            <DiaryList fakeListTitle={this.state.diaryTitle}
                fakeListTime={this.state.diaryTime}
                fakeListMood={this.state.diaryMood}
                selectLististItem={this.selectLististItem}
                searchKeyword={this.searchKeyword}
                writeDiary={this.writeDiary} />
        );
    }
    showDiaryWriter = () => {
        return (    //注意，如何将上层组价的某些函数作为回调函数利用属性向下层传递
            <DiaryWriter
                returnPressed={this.returnPressed}
                saveDiary={this.saveDiaryAndReturn}
            />
        );
    }
    showDiaryReader = () => {
        return (
            <DiaryReader
                returnToDiaryList={this.returnPressed}
                diaryTitle={this.state.diaryTitle}
                diaryMood={this.state.diaryMood}
                diaryTime={this.state.diaryTime}
                readingPreviousPressed={this.readingPreviousPressed}
                returnPressed={this.returnPressed}
                readingNextPressed={this.readingNextPressed}
                diaryBody={this.state.diaryBody}
            />
        );
    }
    render(){
        if(this.state.uiCode === 1) return this.showDiaryList();
        if(this.state.uiCode === 2) return this.showDiaryReader();
        if(this.state.uiCode === 3) return this.showDiaryWriter();
    }
}