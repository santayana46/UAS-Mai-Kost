
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

import RNFetchBlob from 'react-native-fetch-blob';
import { Container, Header, Icon, Fab, Item, ListItem, Content } from 'native-base';

var ImagePicker = require("react-native-image-picker");
// window.XMLHttpRequest = polyfill.XMLHttpRequest;
// window.Blob = polyfill.Blob;

export default class properti extends Component {
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
    gender   : '',
    imagePath : '',
    imageUploadPath : '',
    profileUri : '',
    Uid : ''
    };
  }
  componentWillMount() {
   // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    AsyncStorage.multiGet(['userId','username','nama', 'gender', 'email']).then((data) => {
      //alert(JSON.stringify(data));
      this.setState({
        Uid : data[0][1],
        username : data[1][1],
        nama : data[2][1],
        gender : data[3][1],
        email : data[4][1]
      });

          let storage = firebase.storage().ref("users/"+data[0][1]+"/PhotoProfile/").child(data[0][1]);
          storage.getDownloadURL().then((url)=>{
            this.setState({profileUri:url, tempUri : url});
          }).catch((error)=>{
            this.setState({profileUri:"https://firebasestorage.googleapis.com/v0/b/mazi-bb5cd.appspot.com/o/default%2FdefaultUser.png?alt=media&token=7ca3d666-8293-4192-a421-dd64d7f03459",
                            tempUri : "https://firebasestorage.googleapis.com/v0/b/mazi-bb5cd.appspot.com/o/default%2FdefaultUser.png?alt=media&token=7ca3d666-8293-4192-a421-dd64d7f03459"
          });
          });
     });

}

editPrifile=()=>{
  AsyncStorage.multiGet(["userId"]).then((data)=>{
    if(this.state.tempUri == this.state.profileUri){
        var database = firebase.database().ref("users/"+data[0][1]+"");
        database.update({
          username : this.state.username,
          nama : this.state.nama,
          gender : this.state.gender,
          email : this.state.email
          
        });
    }
    else{
      //blob
      Blob.build(RNFetchBlob.wrap(this.state.profileUri), { type : 'image/jpeg' })
          .then((blob) => firebase.storage().ref("users/"+data[0][1]+"/PhotoProfile/").child(data[0][1])         
          .put(blob, { contentType : 'image/png', }).then(()=>{
            var storage = firebase.storage().ref("users/"+data[0][1]+"/PhotoProfile/").child(data[0][1]);    
            storage.getDownloadURL().then((url)=>{
                var database = firebase.database().ref("users/"+data[0][1]+"");
                database.update({
                  PhotoProfile : url,
                  username : this.state.username,
                  nama : this.state.nama,
                  gender : this.state.gender,
                  email : this.state.email
                  
                }).then(()=>{
                  alert("sad");
                });
            });
          
         })//blob endclosing
      );
      //blob end
    }
  });

  AsyncStorage.multiSet([
    ["username", this.state.username],
    ["nama", this.state.nama],
    ["gender", this.state.gender],
    ["email", this.state.email]
  ]);
}

  GetImagePath=()=>{
    ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
        }
        else if (response.error) {
          alert("An Error Occurred During Open Library"); // jika terjadi kesalahan saat menggunakan image picker
        }
        else if (response.customButton) {
        }
        else {
          let source = { uri: response.uri };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            imagePath : source, //simpan alamat gambar untuk ditampilkan pada aplikasi --obj--
            imageUploadPath : source.uri //simpan alamat gambar untuk di upload ke firebase storage --url--
          });
        }
      });
  }


  logout=()=>{
    const {navigate} = this.props.navigation;
    let keys = ["email", "password"];
    AsyncStorage.multiRemove(keys, (err) => {
        
     });

    firebase.auth().signOut();
    navigate("Dashboard");
   }

  render(){
  const { navigate } = this.props.navigation;
    return(
      
      <Image source = {require('./city.png')} >

    {/*photo profile user*/}
    <Content>
      <View style = {{width : width, height: 36,flexDirection :'row', backgroundColor: 'rgba(74, 140, 246, 0.6)'}}>
      <Icon onPress={()=>this.openControlPanel()} name="paper" style={{color : 'black', marginLeft: 1}}/>
      {/* <Image source = {require('./kost.png')} style={{ width : 30, height : 30, marginLeft : 5,flexDirection :'row'}}></Image> */}
        

        {/* menampilkan icon logout  */}

        <View style={{marginTop: 3, marginLeft : 235, width : 97,flexDirection :'row', backgroundColor :'#80dfff', borderRadius:9}}>
              <Icon onPress={()=>this.openControlPanel()} name="settings" style={{color : 'black', marginLeft: 5}}/>
                <TouchableOpacity onPress={()=>this.logout()}>
                  <Text style={{color:"black", marginLeft : 10, marginTop:5}}>Logout</Text>
                </TouchableOpacity>
        </View>
      </View>

      {/* menampilkan Profile dan my profile   */}

      <View style={{height: 50, borderColor: 'transparent',width:150, marginLeft : width/3.5, borderWidth : 5, marginTop : 10,textAlign:"center", borderRadius:10,backgroundColor : "rgba(74, 140, 246, 0.2)"}}>
          <Text style = {{color: "#004d4d", marginTop: 5,  marginBottom: 9, fontSize : 19,textAlign : 'center',fontWeight: "bold"}}> PROFILE </Text>
      </View>
      
      {/* upload gambar profile */}

      <View style={{marginTop: 10, marginBottom:10, marginLeft : width/2.9,width :200, height:150, backgroundColor: 'transparent'}}>
        <TouchableOpacity onPress={()=>this.GetImagePath()}>
          <View style={{ height:110, width:110, backgroundColor:"#193C75", marginTop:10, borderRadius:70, borderColor: "#95a6ea" }}>        
              <Image source={{uri : this.state.imagePath.uri}} style={{width : 110, height : 110, borderRadius : 70,flexDirection : 'row'}}/>
          </View>
          <View style={{position : 'absolute', width : 35, height:35, borderRadius:17,marginLeft:75,marginTop: 3, backgroundColor: 'grey' }}>
              <Icon onPress={()=>this.openControlPanel()} name="camera" style={{alignSelf: 'center', color : 'black',marginTop: 2, fontSize: 30}}/>
          </View>
         </TouchableOpacity> 
      </View>

      
      {/* menampilkan data dalam kotak */}
      
      <View style={{ height: 40,marginTop: 20, backgroundColor : 'grey'}}>
        <Text style={{color : 'black', fontSize : 17, marginLeft : width/2.6, marginTop: 5}}> My Profile</Text>
      </View>
      
      <View style={{height: 300, width : width, backgroundColor:'rgba(74, 140, 246, 0.8)'}}>
      
        <TextInput onChangeText={(title)=>this.setState({title})}
                onChangeText={(text)=>this.setState({username : text})}
                underlineColorAndroid = 'transparent'
                value={this.state.username}
                style={{ alignSelf : 'center', borderWidth : 1, borderRadius : 8, height:40, width : width-10, color : 'black', fontSize : 16,borderColor : 'grey',marginTop : 10}}/>
        
        <TextInput onChangeText={(title)=>this.setState({title})}
                onChangeText={(text)=>this.setState({nama : text})}
                underlineColorAndroid = 'transparent'
                value={this.state.nama}
                style={{ alignSelf : 'center', borderWidth : 1, borderRadius : 8, height:40, width : width-10, color : 'black', fontSize : 16,borderColor : 'grey',marginTop : 10}}/>

        <View style={{flexDirection : 'row', marginLeft : 5}}>
            <View style={{ width: width-10, borderWidth : 1, borderColor : 'grey', marginTop : 10, height : 40, borderRadius : 10}}>
                <Picker
                  mode = {'dropdown'}
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue) => this.setState({gender: itemValue})}
                  style={{color : 'black', borderWidth : 1, borderColor : 'white'}}
                  >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
        </View>

        <TextInput onChangeText={(title)=>this.setState({title})}
                onChangeText={(text)=>this.setState({email : text})}
                underlineColorAndroid = 'transparent'
                value={this.state.email}
                style={{ alignSelf : 'center', borderWidth : 1, borderRadius : 8, height:40, width : width-10, color : 'black', fontSize : 16,borderColor : 'grey',marginTop : 10}}/>
        
      </View>
    </Content>

      </Image>

    );
  }

  

}