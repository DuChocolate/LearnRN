## 问题总结
react-native版本：0.59.5,

1、Q：'Navigator is deprecated and has been removed from this package. It can now be installed and imported from `react-native-deprecated-custom-components` instead of `react-native`...'
A：自0.43后起，Navigator已从react-native中移除，需安装react-native-deprecated-custom-components，并从中引入Navigator。
安装：npm install react-native-deprecated-custom-components --save
引入：import {Navigator} from 'react-native-deprecated-custom-components'

2、Q：'Warning: BackAndroid is deprecated. Please use BackHandler instead'
A：使用 BackHandler 替换 BackAndroid。

