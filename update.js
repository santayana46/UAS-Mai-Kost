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
  BackHandler,
  ListView,
  Animated,
  Button,
  AsyncStorage,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import { Container, Header, Icon, Fab, Item } from 'native-base';
import {responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'; 
var{width,height}=Dimensions.get('window');

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

  };
}


render() { 
const {navigate} = this.props.navigation;
return (
  
  <View>
    {/* Header tampilan */}
    <View style={{backgroundColor: "#0066cc", height: 40, width: 500}}>
        <Icon onPress={()=>this.openControlPanel()} name="menu" style={{color : 'black'}}/>
          <View style={{position: "absolute", marginTop: 10}}>
            <Text style ={{ marginLeft: width/3.1,marginBottom: 60,fontWeight: "bold",fontSize: 20,color: "black",textAlign: 'center'}}>
              UPDATE KOST </Text>
          </View>      
    </View>
<View style = {{ height: height,  marginTop : 0, backgroundColor : '#a5c7ff'}}>
    
  {/* Untuk edit status dan delete kost */}
  <View style = {{ }}> 
    <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
      Nama Pemilik
        </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="nama pemilik"
            style={styles.nama}
            onChangeText={(nama) => this.setState({nama})}
            value={this.state.nama}/>
    <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
      Status (sisa)
        </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="sisa kamar"
            style={styles.status}
            onChangeText={(status) => this.setState({status})}
            value={this.state.status}/>

    <Text style = {{marginLeft: width/25,marginTop: 15,marginBottom: -22 ,fontSize : 17, color:'black'}}>
      Harga Kost
        </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="update harga"
            style={styles.harga}
            onChangeText={(harga) => this.setState({harga})}
            value={this.state.harga}/>
  </View>{/*View untuk yg di update*/}

  <TouchableOpacity style={{marginTop : 20}}>
      <View style={{marginLeft: width/14, height:40, width:300, backgroundColor:"#193C75", marginTop:15, borderRadius:7}}>
        <Text style={{color:"white", textAlign:"center", marginTop:8,}}>UPDATE</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={{marginTop : 15}}>
      <View style={{marginLeft: width/14, height:40, width:300, backgroundColor:"#022051", marginTop:15, borderRadius:7}}>
        <Text style={{color:"white", textAlign:"center", marginTop:8,}}>HAPUS DATA KOST</Text>
      </View>
    </TouchableOpacity>
  </View>
    
</View>

    

);
}

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "white",
    height : height,
    width : width 
  },
  status : {height: 50, 
    borderColor: 'gray', 
    width:200, 
    borderWidth: 1, 
    textAlign:"left", 
    borderRadius: 8, 
    marginTop : 27,
    marginLeft : 8,
    backgroundColor : "#eff2f7"
  },
  harga : {height: 50, 
      borderColor: 'gray', 
      width:200, 
      borderWidth: 1, 
      textAlign:"left", 
      borderRadius: 8, 
      marginTop : 27,
      marginLeft : 8,
      backgroundColor : "#eff2f7"
  },
  nama : {height: 50, 
    borderColor: 'gray', 
    width:200, 
    borderWidth: 1, 
    textAlign:"left", 
    borderRadius: 8, 
    marginTop : 27,
    marginLeft : 8,
    backgroundColor : "#eff2f7"
},

});
