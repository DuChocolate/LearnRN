/**
 * My Common Variable
 * 公共样式文件
 */
import {StyleSheet, Dimensions} from 'react-native';
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let textSize = totalWidth / 18;
let readingUITitleHeight = textSize * 6;
let diaryBodyLine = totalHeight / textSize -6;
let returnButtonHeight = textSize * 5;
let MCV = StyleSheet.create({
    container: {
        top: 2,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderColor: 'black',
        borderWidth: 1
    },
    firstRow: {
        height: textSize * 1.4 + 2,
        flexDirection: 'row',
        width: totalWidth -4,
        justifyContent: 'space-around',
        margin: 2,
        backgroundColor: 'grey'
    },
    longButton: {
        height: textSize * 1.4,
        backgroundColor: 'grey',
        width: textSize * 10,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: textSize
    },
    middleButton: {
        height: textSize * 1.4,
        backgroundColor: 'grey',
        width: textSize * 5,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: textSize
    },
    diaryAbstractList: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        // margin: 4,
        width: totalWidth-4,
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    diaryBodyStyle: {
        flex: 1,
        width: totalWidth - 8,
        fontSize: textSize,
        backgroundColor: 'grey',
        margin: 4
    },
    smallButton: {
        height: textSize * 1.4,
        backgroundColor: 'grey',
        width: textSize * 3,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: textSize
    },
    moodStyle: {
        height: textSize * 3.2,
        width: textSize * 3.2,
        borderRadius: textSize * 1.6
    },
    subViewInReader: {
        width: totalWidth - 5 - textSize * 3.2
    },
    textInReader: {
        height: textSize * 1.4,
        fontSize: textSize,
        backgroundColor: 'grey',
        margin: 2
    },
    secondRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleInputStyle: {
        fontSize: textSize,
        backgroundColor: 'grey',
        height: textSize * 2.4,
        color: 'black',
        margin: 4,
        borderWidth: 2,
        width: totalWidth - 12,
        borderColor: 'black',
    },
    searchBarTextInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        height: textSize * 1.4,
        width: textSize * 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 14,
    }
});
export {MCV as default};