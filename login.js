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
  TextInput
} from 'react-native';
var{width,height}=Dimensions.get('window');
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB-HBij2LXwwwjBGzcYXTF_w_v6TXsK7Z4",
  authDomain: "mai-kost.firebaseapp.com",
  databaseURL: "https://mai-kost.firebaseio.com",
  projectId: "mai-kost",
  storageBucket: "mai-kost.appspot.com",
  messagingSenderId: "952962522835"
};
const app = firebase.initializeApp(config);

export default class login extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    username : '',
    password : ''
  };
}
async login(email,password){
  try {
    const {navigate} = this.props.navigation;
    await app.auth().signInWithEmailAndPassword(email,password);
    alert("login sukses");
    navigate('dashboard');
  } catch (error) {
      alert(error);
  }
}

//sesuatu yang mau ditampilkan
  render() {
    const {navigate} = this.props.navigation;
    
    return (

      /* background login*/
      <Image source = {require('./blur1.png')} style={styles.container} >

      <Image source = {require('./kost.png')} style ={{height : 105, width : 105, marginBottom :62}} ></Image> 
       
       <TextInput
          underlineColorAndroid="transparent"
          placeholder="email"
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

        <TouchableOpacity onPress={()=>
          this.login(this.state.username,this.state.password)
        }>
          <View style={{height:40, width:300, backgroundColor:"#193C75", marginTop:10, borderRadius:7, borderColor: "#009999"}}>
            <Text style={{color:"white", textAlign:"center", marginTop:8}}>LOGIN</Text>
          </View>
        </TouchableOpacity>

        <Text 
          style = {{color: "#ccffff", marginTop: 40}}> 
          Tidak Punya akun? signup.

        </Text>


        <TouchableOpacity onPress={()=>navigate('signup')}>
          <View style={{height:30, width:100, backgroundColor:"transparent", marginTop:10, borderRadius:6, borderWidth: 1, borderColor: "#95a6ea" }}>
            <Text style={{color:"#ccffff", textAlign:"center", marginTop:3}}>SIGN UP</Text>
          </View>
        </TouchableOpacity>

       </Image> 
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode : "stretch",
    height : height,
    width : width 
  },
  
  user : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:5,
            backgroundColor : "rgba(74, 140, 246, 0.2)",
            },
 
  pass : {height: 40, 
            borderColor: 'gray', 
            width:300, 
            borderWidth: 1, 
            textAlign:"center", 
            borderRadius:5, 
            marginTop : 7,
            backgroundColor : "rgba(74, 140, 246, 0.2)",
            }
});


AppRegistry.registerComponent('pbm', () => pbm);