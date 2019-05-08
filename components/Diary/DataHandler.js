// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
let angryMood = require('../../images/angry.jpg');
let peaceMood = require('../../images/peace.jpg');
let happyMood = require('../../images/happy.jpg');
let sadMood = require('../../images/sad.jpg');
let miseryMood = require('../../images/misery.jpg');
export default class DataHandler{
    static realDairyList = [];
    static listIndex = 0;
    static getAllTheDiary() {    // 获取存储中所有的日记数据
        return new Promise(function(resolve, reject){
            AsyncStorage.getAllKeys().then((keys)=>{    //获取存储中所有的key
                if(keys.length===0){    //判断存储总是否有数据
                    let returnValue = {
                        diaryTime: '没有历史日记',
                        diaryTitle: '没有历史日记',
                        diaryBody: ''
                    };
                    resolve(returnValue);    //Promise机制中的成功返回
                    console.log('注意，resolve后的语句还会被执行，因此resolve后如果有代码，结束处理必须要跟return语句');
                    return;
                }
                AsyncStorage.multiGet(keys).then((results)=>{    //通过keys获取所有数据
                    let resultsLength = results.length;
                    for(let counter = 0; counter < resultsLength; counter++){
                        //取得数据并利用JSON类的parse方法生成对象，插入日记列表
                        DataHandler.realDairyList[counter] = JSON.parse(results[counter][1]);
                    }
                    DataHandler.bubleSortDiaryList();    //日记列表排序
                    if(resultsLength > 0){       //日记列表中有数据，取出最后一条数据
                        resultsLength--;
                        DataHandler.listIndex = resultsLength;
                        let newMoodIcon;
                        switch(DataHandler.realDairyList[resultsLength].mood){
                            case 2:
                                newMoodIcon = angryMood;
                                break;
                            case 3:
                                newMoodIcon = sadMood;
                                break;
                            case 4:
                                newMoodIcon = happyMood;
                                break;
                            case 5:
                                newMoodIcon = miseryMood;
                                break;
                            default:
                                newMoodIcon = peaceMood;
                        }
                        let newtitle = DataHandler.realDairyList[resultsLength].title;
                        let newbody = DataHandler.realDairyList[resultsLength].body;
                        //利用Date的构造函数，从字符串中得到Date类型数据
                        let ctime = new Date(DataHandler.realDairyList[resultsLength].time);
                        let timeString = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + '日  星期' + (ctime.getDay() + 1) + '  ' + ctime.getHours() + ':' + ctime.getMinutes();
                        let rValue = {
                            diaryMood: newMoodIcon,
                            diaryTime: timeString,
                            diaryTitle: newtitle,
                            diaryBody: newbody
                        };
                        resolve(rValue);   //Promise机制中的成功返回
                    }else{     //日记列表中没有数据
                        let returnValue = {
                            diaryTime: '没有历史日记',
                            diaryTitle: '没有历史日记',
                            diaryBody: ''
                        }
                        resolve(returnValue);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error)=>{
                console.log('A error happens while read all the diary.');
                console.log(error);
                AsyncStorage.clear();
                let aValue = {
                    diaryTime: '没有历史日记',
                    diaryTitle: '没有历史日记',
                    diaryBody: ''
                };
                resolve(aValue);
            })
        });
    }
    static bubleSortDiaryList() {   //因为AsyncStorage API不能保证读取的顺序
        let tempObj;     //使用冒泡排序对日记列表进行排序
        for(let i = 0; i < DataHandler.realDairyList.length; i++){
            for(let j = 0; j < DataHandler.realDairyList.length - i - 1; j++){
                if(DataHandler.realDairyList[j].index > DataHandler.realDairyList[j+1].index){
                    tempObj = DataHandler.realDairyList[j];
                    DataHandler.realDairyList[j] = DataHandler.realDairyList[j + 1];
                    DataHandler.realDairyList[j + 1] = tempObj;
                }
            }
        }
    }
    static getPreviousDiary(){    //请求上一篇日记数据的处理函数
        if(DataHandler.listIndex === 0){
            return null;    //已经显示的是第一篇日记
        }
        DataHandler.listIndex--;
        let resultsLength = DataHandler.listIndex;
        let newMoodIcon;
        switch(DataHandler.realDairyList[resultsLength].mood){
            case 2:
                newMoodIcon = angryMood;
                break;
            case 3:
                newMoodIcon = sadMood;
                break;
            case 4:
                newMoodIcon = happyMood;
                break;
            case 5:
                newMoodIcon = miseryMood;
                break;
            default:
                newMoodIcon = peaceMood;
        }
        let newtitle = DataHandler.realDairyList[resultsLength].title;
        let newbody = DataHandler.realDairyList[resultsLength].body;
        let ctime = new Date(DataHandler.realDairyList[resultsLength].time);
        let timeString = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + '日  星期' + (ctime.getDay() + 1) + '  ' + ctime.getHours() + ':' + ctime.getMinutes();
        return {
            diaryMood: newMoodIcon,
            diaryTime: timeString,
            diaryTitle: newtitle,
            diaryBody: newbody
        };
    }
    static getNextDiary(){     //请求下一篇日记数据的处理函数
        if(DataHandler.listIndex === (DataHandler.realDairyList.length - 1)){
            return null;
        }
        DataHandler.listIndex++;
        let resultsLength = DataHandler.listIndex;
        let newMoodIcon;
        switch(DataHandler.realDairyList[resultsLength].mood){
            case 2:
                newMoodIcon = angryMood;
                break;
            case 3:
                newMoodIcon = sadMood;
                break;
            case 4:
                newMoodIcon = happyMood;
                break;
            case 5:
                newMoodIcon = miseryMood;
                break;
            default:
                newMoodIcon = peaceMood;
        }
        let newtitle = DataHandler.realDairyList[resultsLength].title;
        let newbody = DataHandler.realDairyList[resultsLength].body;
        let ctime = new Date(DataHandler.realDairyList[resultsLength].time);
        let timeString = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + '日  星期' + (ctime.getDay() + 1) + '  ' + ctime.getHours() + ':' + ctime.getMinutes();
        return {
            diaryMood: newMoodIcon,
            diaryTime: timeString,
            diaryTitle: newtitle,
            diaryBody: newbody
        };
    }
    static saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle){
        return new Promise(function(resolve, reject){
            let currentTime = new Date();
            let timeString = '' + currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月' + currentTime.getDate() + '日  星期' + (currentTime.getDay() + 1) + '  ' + currentTime.getHours() + ':' + currentTime.getMinutes();
            let aDiary = {
                title: newDiaryTitle,
                body: newDiaryBody,
                mood: newDiaryMood,
                time: currentTime,
                sectionID: '' + currentTime.getFullYear() + ' 年 ' + (currentTime.getMonth() + 1) + '月',    //sectionID用来对日记列表进行分段显示
                index: Date.parse(currentTime),   //从当前时间生成唯一值，用来索引日记列表，这个值精确到毫秒，可以认为它是唯一的
            }
            AsyncStorage.setItem('' + aDiary.index, JSON.stringify(aDiary)).then(()=>{
                let totalLength = DataHandler.realDairyList.length;
                DataHandler.realDairyList[totalLength] = aDiary;
                DataHandler.listIndex = totalLength;
                let newMoodIcon;
                switch(newDiaryMood){
                    case 2:
                        newMoodIcon = angryMood;
                        break;
                    case 3:
                        newMoodIcon = sadMood;
                        break;
                    case 4:
                        newMoodIcon = happyMood;
                        break;
                    case 5:
                        newMoodIcon = miseryMood;
                        break;
                    default:
                        newMoodIcon = peaceMood;
                }
                let aValue = {
                    uiCode: 1,
                    diaryTime: timeString,
                    diaryTitle: newDiaryTitle,
                    diaryMood: newMoodIcon,
                    diaryBody: newDiaryBody
                };
                resolve(aValue);
            }).catch((error) => {
                console.log('Save failed, error:' + error.message);
            })
        })
    }
}
