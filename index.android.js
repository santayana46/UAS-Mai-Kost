/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import login from './login';
import signup from './signup';
import SplashScreen from './SplashScreen';
import Dashboard from './dashboard';
import * as firebase from 'firebase';

const pbmNavigation = StackNavigator({
  
  
  login : {screen : login},
  signup : {screen : signup},
  SplashScreen : {screen : SplashScreen},
  dashboard : {screen : Dashboard}
  
}); 

export default class pbm extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props){
    super(props);
    
  }
  render() {
     const { navigation } = this.props;
     const { navigate } = this.props.navigation;
    return (
      <View style={{height: "100%", width: "100%", backgroundColor:"green", flex:1,alignItems:'center', justifyContent:'center'}}> 
      <Splashscreen navigation={navigation}/>
      </View>
    );
  }
}


AppRegistry.registerComponent('pbm', () => pbmNavigation);