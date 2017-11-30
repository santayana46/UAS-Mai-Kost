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
  TouchableOpacity,
  TakeInput,
  Image,
  Dimensions,
  TextInput,
  Picker,
  BackHandler
} from 'react-native';
var{width,height}=Dimensions.get('window');
import { StackNavigator } from 'react-navigation';

export default class signup extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    nama      : '',
    username  : '',
    password  : '',
    email     : '',
    ttl       : '',
    kelamin   : '',
    gender    : 'Male '
  };
}
  render() {
    const {navigate} = this.props.navigation;
    return (
      
      <View style={styles.container}>
       
      <View style={{width : width, height : 26, position : 'absolute', top : 10}}>
        <Text  
           style = {{color: "#004d4d", marginTop: 5,  marginBottom: 9, fontSize : 25}}> 
           SIGN UP
        </Text>

        <View style={{width : width, height: 3, backgroundColor : '#004d4d'}}>
        </View>

      </View>
      <Image source = {require('./kost.png')} style ={{height : 105, width : 105, marginBottom :70, marginBottom: 7 }} ></Image> 
       
      <TextInput
          underlineColorAndroid="transparent"
          placeholder="Nama Lengkap"
          style={styles.nama}
          onChangeText={(nama) => this.setState({nama})}
          value={this.state.nama}
          />

      <TextInput
          underlineColorAndroid="transparent"
          placeholder="username"
          style={styles.user}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          />

      <TextInput
          underlineColorAndroid="transparent"
          placeholder="password"
          secureTextEntry={true}
          style={styles.pass}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />

        <TextInput
          underlineColorAndroid="transparent"
          placeholder="email"
          style={styles.email}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Tempat & Tanggal Lahir"
          style={styles.ttl}
          onChangeText={(ttl) => this.setState({ttl})}
          value={this.state.ttl}
          />


        <View style={{flexDirection : 'row', marginLeft : 10}}>
        <Text style={{color : 'gray', fontSize : 15, marginTop : 20}}>Gender : </Text>
        <View style={{width : width/1.8, borderWidth: 1, borderColor: 'gray', marginTop: 8, height: 40, borderRadius: 8}}>
        <Picker
          mode = {'dropdown'}
          selectedValue={this.state.gender}
          onValueChange={(itemValue) => this.setState({gender: itemValue})}
          style={{color : 'gray', borderWidth: 1, borderColor: 'gray', backgroundColor: "rgba(74, 140, 246, 0.2)" }}     
          >
          <Picker.Item label = "Male" value="Male"/>
          <Picker.Item label = "Female" value="Female"/>
        </Picker>

        </View>
        </View>

        <TouchableOpacity onPress={()=>navigate('dashboard')}>
          <View style={{height:40, width:300, backgroundColor:"#193C75", marginTop:15, borderRadius:7}}>
            <Text style={{color:"white", textAlign:"center", marginTop:8}}>SIGN UP</Text>
          </View>
        </TouchableOpacity>

      </View> 

    );
  }
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "white",
    height : height,
    width : width 
  },
  
  nama : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:8, 
            marginTop : 27,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},

  user : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:8,
            marginTop : 3,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},
 
  pass : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:8, 
            marginTop : 3,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},

  email : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:8, 
            marginTop : 3,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},

  ttl : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:8, 
            marginTop : 3,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},
  gendre : { height: 40,
              borderColor: 'gray',
              width: 200,
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 3,
              backgroundColor: "rgba(74, 140, 246, 0.2)"}
});

AppRegistry.registerComponent('pbm', () => pbm);
