import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity, Image, StatusBar, SectionList, FlatList} from 'react-native';
let happyMood = require('../../images/happy.jpg');
import MCV from './MCV';
export default class DiaryList extends Component{
    constructor(props){
        super(props);
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    }
    updateSearchKeyword = (newText) => {
        this.props.searchKeyWord(newText);
        //将用户输入的搜索关键字交给上层组件，由上层组件对日记列表进行处理，只显示日记标题中包含关键字的日记
    }
    renderListItem = ({item,index}) => {
        return (
            <TouchableOpacity onPress={()=>this.props.selectLististItem(index)}>
                <View style={MCV.secondRow}>
                    <Image style={MCV.moodStyle} source={item.mood} />
                    <View style={MCV.subViewInReader}>
                        <Text style={MCV.textInReader}>{item.title}</Text>
                        <Text style={MCV.textInReader}>{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={MCV.container}>
                <StatusBar hidden={true} />
                <View style={MCV.firstRow}>
                    <View style={{borderWidth:1}}>
                        <TextInput autoCapitalize='none' placeholder='请输入搜索关键字' clearButtonMode='while-editing' onChangeText={this.updateSearchKeyword} style={MCV.searchBarTextInput}/>
                    </View>
                    <TouchableOpacity onPress={this.props.writeDiary}>
                        <Text style={MCV.middleButton}>写日记</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.props.diaryList.length !== 0 ?
                    (
                        <FlatList data={this.props.diaryList} renderItem={this.renderListItem} keyExtractor={(item, index) => index.toString()}/>
                    ):
                    (
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 18}}>您还没有写日记哦。</Text>
                        </View>
                    )
                }

            </View>
        )
    }
}
