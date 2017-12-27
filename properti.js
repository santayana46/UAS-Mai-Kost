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
  AsyncStorage
} from 'react-native';

var{width,height}=Dimensions.get('window');
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import { StackNavigator } from 'react-navigation';
import { Container, Header, Icon, Fab, Item, Content } from 'native-base'

var ImagePicker = require("react-native-image-picker");
const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob;

export default class properti extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    alamat    : '',
    pemilik   : '',
    harga     : '',
    email     : '',
    jenis     : '',
    status    : '',
    no        : '',
    deskripsi : '',
    imagePath : '',
    imageUploadPath : ''

  };

}

componentWillMount(){ 
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

upload=()=>{
  let today = new Date();
  let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting

  var userId = firebase.auth().currentUser.uid;
  
  var path = this.state.imageUploadPath;
  try{
        Blob.build(RNFetchBlob.wrap(""+path+""), { type : 'image/jpeg' }).then((blob)=>{
          firebase.storage().ref("photos/").child(""+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
              var storage = firebase.storage().ref("photos/"+sortTime+""); 
              storage.getDownloadURL().then((url)=>{
                  var database = firebase.database().ref("postUser/"+userId+"");
                  database.push({
                    sortTime : sortTime,
                    uri : url,
                    dateUploaded : Times,
                    alamat : this.state.alamat,
                    namaPemilik : this.state.pemilik,
                    harga : this.state.harga,
                    email : this.state.email,
                    jenisPenghuni : this.state.jenis,
                    status : this.state.status,
                    noHp : this.state.no,
                    deskripsi : this.state.deskripsi
                  }).then(()=>{
                    database = firebase.database().ref("postTampil");
                    database.push({
                      sortTime : sortTime,
                      uri : url,
                      dateUploaded : Times,
                      alamat : this.state.alamat,
                      namaPemilik : this.state.pemilik,
                      harga : this.state.harga,
                      email : this.state.email,
                      jenisPenghuni : this.state.jenis,
                      status : this.state.status,
                      noHp : this.state.no,
                      deskripsi : this.state.deskripsi
                    }).then(()=>{
                      const {navigate} = this.props.navigation;
                      navigate('Dashboard');
                    });
                  });
              });
          });
        });
  }catch(e){
    alert("error");
  }
}

render() {
  const {navigate} = this.props.navigation;
  return (
    
    <Container>

      <View>
          <View style={{backgroundColor: "#0066cc", height: 40, width: 500}}>
            <Icon onPress={()=>this.openControlPanel()} name="menu" style={{color : 'black'}}/>
              <View style={{position: "absolute", marginTop: 10}}>
                <Text style ={{ marginLeft: width/2.9,marginBottom: 60,fontWeight: "bold",fontSize: 20,color: "black",textAlign: 'center'}}>
                   Tambah Properti </Text>
              </View>
            
          </View>
      </View>
      <Content>
      <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Alamat Kost
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Alamat"
              style={styles.alamat}
              onChangeText={(alamat) => this.setState({alamat})}
              value={this.state.alamat}/>
                <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Nama Pemilik
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.pemilik}
              onChangeText={(pemilik) => this.setState({pemilik})}
              value={this.state.pemilik}/>
     
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Harga Kost
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.harga}
              onChangeText={(harga) => this.setState({harga})}
              value={this.state.harga}/>
      
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Email
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.email}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}/>
    
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Jenis Penghuni Kost
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.jenis}
              onChangeText={(jenis) => this.setState({jenis})}
              value={this.state.jenis}/>
     
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Status Kost
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.status}
              onChangeText={(status) => this.setState({status})}
              value={this.state.status}/>
     
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            No Hanphone
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.no}
              onChangeText={(no) => this.setState({no})}
              value={this.state.no}/>
     
          <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
            Deskripsi Kost
          </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              style={styles.deskripsi}
              onChangeText={(deskripsi) => this.setState({deskripsi})}
              value={this.state.deskripsi}/>
          
          <Image style={{height:200,width:width, resizeMode:"cover",alignSelf:'center', marginTop : 10}} source={this.state.imagePath} />

        <View style={{marginTop: 10, marginBottom:10}}>
          <TouchableOpacity onPress={()=>this.GetImagePath()}>
            <View style={{ height:40, width:150, backgroundColor:"#193C75", marginTop:10, borderRadius:6, borderWidth: 1, borderColor: "#95a6ea" }}>
              <Text style={{color:"#ccffff", textAlign:"center", marginTop:9}}>Tambahkan Foto</Text>
            </View>
          </TouchableOpacity> 
        </View>

          
        <View style={{marginTop: 10, marginBottom:10}}>
          <TouchableOpacity onPress={()=>this.upload()}>
            <View style={{ height:40, width:width, backgroundColor:"#193C75", marginTop:10, borderRadius:6, borderWidth: 1, borderColor: "#95a6ea" }}>
              <Text style={{color:"#ccffff", textAlign:"center", marginTop:9}}>Tambahkan</Text>
            </View>
          </TouchableOpacity> 
        </View>
      </Content>
       
      </Container>

  );
}
}

const styles = StyleSheet.create({
  search : {height: 50, 
    borderColor: 'black', 
    width:width, 
    borderWidth: 1, 
    textAlign:"center", 
    borderRadius:5, 
    marginTop : 0,
    backgroundColor : "rgba(74, 140, 246, 0.2)",
    borderColor: "#004d4d"},
  alamat : {height: 50, 
      borderColor: 'gray', 
      width:350, 
      borderWidth: 1, 
      textAlign:"left", 
      borderRadius:5, 
      marginTop : 27,
      marginLeft : 8,
      backgroundColor : "rgba(74, 140, 246, 0.2)"},
  pemilik : {height: 30, 
        borderColor: 'gray', 
        width:300,
        height: 40, 
        borderWidth: 1, 
        textAlign:"left", 
        borderRadius:5, 
        marginTop : 27,
        marginLeft : 8,
        backgroundColor : "rgba(74, 140, 246, 0.2)"},
  harga : {height: 30, 
        borderColor: 'gray', 
        width:300,
        height: 40, 
        borderWidth: 1, 
        textAlign:"left", 
        borderRadius:5, 
        marginTop : 27,
        marginLeft : 8,
        backgroundColor : "rgba(74, 140, 246, 0.2)"},
  email : {height: 40, 
          borderColor: 'gray', 
          width:300,
          height: 40, 
          borderWidth: 1, 
          textAlign:"left", 
          borderRadius:5, 
          marginTop : 27,
          marginLeft : 8,
          backgroundColor : "rgba(74, 140, 246, 0.2)"},
  jenis : {height: 40, 
            borderColor: 'gray', 
            width:300,
            height: 40, 
            borderWidth: 1, 
            textAlign:"left", 
            borderRadius:5, 
            marginTop : 27,
            marginLeft : 8,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},
  status : {height: 40, 
              borderColor: 'gray', 
              width:300,
              height: 40, 
              borderWidth: 1, 
              textAlign:"left", 
              borderRadius:5, 
              marginTop : 27,
              marginLeft : 8,
              backgroundColor : "rgba(74, 140, 246, 0.2)"},
  no : {height: 40, 
          borderColor: 'gray', 
          width:300,
          height: 40, 
          borderWidth: 1, 
          textAlign:"left", 
          borderRadius:5, 
          marginTop : 27,
          marginLeft : 8,
          backgroundColor : "rgba(74, 140, 246, 0.2)"},
deskripsi : {height: 40, 
            borderColor: 'gray', 
            width:300,
            height: 50, 
            borderWidth: 1, 
            textAlign:"left", 
            borderRadius:5, 
            marginTop : 27,
            marginLeft : 8,
            backgroundColor : "rgba(74, 140, 246, 0.2)"},

  });
