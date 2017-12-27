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
  AsyncStorage,
  Image,
  Dimensions,
  TextInput,
  Picker,
  BackHandler
} from 'react-native';
var{width,height}=Dimensions.get('window');

import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

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
    gender    : 'Male'
  };
}

signUp=()=>{
  if ( this.state.email == '' || this.state.password == '' ||  this.state.username == '' ||  this.state.nama == '' ||  this.state.ttl == '' ) {
    alert("Pastikan seuma data sudah terisi");
}
  else{ 
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(() => {
        var userId = firebase.auth().currentUser.uid;

        // AsyncStorage.multiSet([
        //     ["email", this.state.email],
        //     ["password", this.state.password],
        //     ["userId", userId]
        // ]);

        this.writeToDatabase(userId);
        
        
        }).catch((error) => {
          alert("error " + error.message );
        });
  }
 
}

writeToDatabase = (userId) => {
  var database = firebase.database().ref("users").child(userId);
  database.set({
    userId : userId,
    email : this.state.email,
    username :this.state.username,
    nama : this.state.nama,
    ttl : this.state.ttl,
    gender : this.state.gender
  }).then((snapshot)=>{

     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
     
        // AsyncStorage.multiSet([
        //   ["email", this.state.email],
        //   ["password", this.state.password],
        //   ["userId", userId],
        //   ["username", this.state.username]
        // ]);

      /** Set AsyncStorage START **/
      const { navigate } = this.props.navigation;
      navigate('Dashboard');
      alert("Login berhasil");
      }).catch((error) => {
          alert("error " + error.message );
         
      });

  });

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

          <View style={{width : width, height: 3, backgroundColor : '#004d4d'}}> </View>
      </View>
      <Image source = {require('./kost.png')} style ={{height : 100, width : 145, marginBottom :40, marginBottom: 3 }} ></Image> 
       
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

        <TouchableOpacity onPress={()=>this.signUp()} style={{marginTop : 20}}>
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
