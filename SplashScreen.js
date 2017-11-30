import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TakeInput,
  Image,
  Dimensions,
  TextInput,
  Picker,
  BackHandler,
  Modal,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { PulseIndicator } from 'react-native-indicators';

var{width,height}=Dimensions.get('window');

export default class SplashScreen extends Component {
    static navigationOptions = {
        header : null
    };
kk
    constructor(props) {
        super(props);
        this.state = {
        username : '',
        password : ''
      };
    }

    render() {
      const { navigate } = this.props.navigation;
        return (
          <View style={{alignItems : 'center',backgroundColor : "rgba(74, 140, 246, 0.2)", position : 'absolute', top : 0, left : 0, right : 0, bottom : 0}}>
            
            <View style={{position :"absolute", bottom : height/2.6, width : width,}}>
              <Image style={{height : 170, width : 150, alignSelf : "center"}} source={require('./kost.png')} />
            </View>
    
            <View style={{marginTop : 200}}>
              <PulseIndicator color='gray' size={30} />
            </View>
    
          </View>
        );
      }
    }

