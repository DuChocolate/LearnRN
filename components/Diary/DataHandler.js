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
                    resolve(DataHandler.realDairyList);    //Promise机制中的成功返回
                    return;
                }
                AsyncStorage.multiGet(keys).then((results)=>{    //通过keys获取所有数据
                    let resultsLength = results.length;
                    for(let counter = 0; counter < resultsLength; counter++){
                        //取得数据并利用JSON类的parse方法生成对象，插入日记列表
                        DataHandler.realDairyList[counter] = JSON.parse(results[counter][1]);
                        switch(DataHandler.realDairyList[counter].mood){
                            case 2:
                                DataHandler.realDairyList[counter].mood = angryMood;
                                break;
                            case 3:
                                DataHandler.realDairyList[counter].mood = sadMood;
                                break;
                            case 4:
                                DataHandler.realDairyList[counter].mood = happyMood;
                                break;
                            case 5:
                                DataHandler.realDairyList[counter].mood = miseryMood;
                                break;
                            default:
                                DataHandler.realDairyList[counter].mood = peaceMood;
                        }
                        let atime = new Date(DataHandler.realDairyList[counter].time);
                        DataHandler.realDairyList[counter].time = '' + atime.getFullYear() + '年' + (atime.getMonth() + 1) + '月' + atime.getDate() + '日  星期' + (atime.getDay() + 1) + '  ' + atime.getHours() + ':' + atime.getMinutes();
                    }
                    DataHandler.bubleSortDiaryList();    //日记列表排序
                    resolve(DataHandler.realDairyList);               
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error)=>{
                console.log('A error happens while read all the diary.');
                console.log(error);
                AsyncStorage.clear();
                resolve(DataHandler.realDairyList);
            })
        });
    }
    static clearStorage() {
        AsyncStorage.clear();
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
        if(DataHandler.listIndex < 1){
            return null;    //已经显示的是第一篇日记
        }
        DataHandler.listIndex--;
        return {
            uiCode: 2,
            diaryTime: DataHandler.realDairyList[DataHandler.listIndex].time,
            diaryTitle: DataHandler.realDairyList[DataHandler.listIndex].title,
            diaryMood: DataHandler.realDairyList[DataHandler.listIndex].mood,
            diaryBody: DataHandler.realDairyList[DataHandler.listIndex].body,
        }
    }
    static getDiaryAtIndex = (aIndex) => {   //获取第aIndex篇日记
        DataHandler.listIndex = aIndex;
        return {
            uiCode: 2,
            diaryTime: DataHandler.realDairyList[aIndex].time,
            diaryTitle: DataHandler.realDairyList[aIndex].title,
            diaryMood: DataHandler.realDairyList[aIndex].mood,
            diaryBody: DataHandler.realDairyList[aIndex].body,
        }
    }
    static getNextDiary(){     //请求下一篇日记数据的处理函数
        if(DataHandler.listIndex >= (DataHandler.realDairyList.length - 1)){
            return null;
        }
        DataHandler.listIndex++;
        return {
            uiCode: 2,
            diaryTime: DataHandler.realDairyList[DataHandler.listIndex].time,
            diaryTitle: DataHandler.realDairyList[DataHandler.listIndex].title,
            diaryMood: DataHandler.realDairyList[DataHandler.listIndex].mood,
            diaryBody: DataHandler.realDairyList[DataHandler.listIndex].body,
        }
    }
    static saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle){
        return new Promise(function(resolve, reject){
            let currentTime = new Date();
            let timeString = '' + currentTime.getFullYear() + '年' + (currentTime.getMonth() + 1) + '月' + currentTime.getDate() + '日  星期' + (currentTime.getDay() + 1) + '  ' + currentTime.getHours() + ':' + currentTime.getMinutes();
            let aDiary = {
                title: newDiaryTitle,
                body: newDiaryBody,
                mood: newDiaryMood,
                time: timeString,
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
                DataHandler.realDairyList[totalLength].mood = newMoodIcon;
                let rValue = {
                    diaryList: DataHandler.realDairyList,
                    uiCode: 1,
                };
                resolve(rValue);
            }).catch((error) => {
                console.log('Save failed, error:' + error.message);
            })
        })
    }
}
