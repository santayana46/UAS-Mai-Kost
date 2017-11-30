
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
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import { Container, Header, Icon, Fab, Item } from 'native-base';
import {responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'; 
var{width,height}=Dimensions.get('window');

export default class Dashboard extends Component {
    static navigationOptions = {
        header : null
    };
    
    constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        user1: 'Useless placeholder' ,
        username  : '',
        password  : '',
        search    : '',
        dataSource: ds.cloneWithRows(['List 1', 'List 2','List 3']),
      };
    }
    closeControlPanel = () => {
      this._drawer.close();
    };
    openControlPanel = () => {
      this._drawer.open();
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={
            <View style={{width : width-100, height : height, backgroundColor : '#99d6ff'}}>
                <View style={{backgroundColor: "#0066cc", height: 40, width: 500}} >
                  <Text style={{marginLeft: width/5, fontWeight: "bold",fontSize: 25,color: "black"}}> MAI KOST</Text>
                </View>
                <Image source = {require('./kost.png')} style ={{height : 60, width : 60, marginBottom :5,marginTop: 5, alignSelf : "center"}} ></Image>  
                <View style={{marginTop : 20}}>
                  <Item> 
                    <Icon onPress={()=>this.openControlPanel()} name="search" style={{color : 'black'}}/>
                      <TextInput
                        placeholder="Cari Kost"
                        style={{color : "black", height: 40, width : 250,fontSize: 19,marginLeft: 30,}} 
                      /> 
                  </Item>                
                </View>
               
                  
                    <View style={{marginTop: 20, flexDirection:'row', backgroundColor :'transparent'}}>
                      <Icon onPress={()=>this.openControlPanel()} name="add" style={{color : 'black'}}/>
                        <TouchableOpacity>
                          <View style={{width: width-100, backgroundColor:"transparent"}}>
                            <Text style={{color:"black", marginLeft : 30}}>Tambah Properti</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                               
               
                <View style={{marginTop : 20, flexDirection :'row', backgroundColor :'transparent'}}>
    
                    <Icon onPress={()=>this.openControlPanel()} name="ios-person" style={{color : 'black'}}/>
                    <TouchableOpacity>
                       
                          <Text style={{color:"black", marginLeft : 30}}>LOGIN</Text>
                        
                      </TouchableOpacity>
                                
                </View>    
            </View>
          }
          tapToClose={true}
          openDrawerOffset={0.2} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
        >

        <View style={{backgroundColor : 'white',height: height, width: width}}>

        <View >
          <View style={{backgroundColor: "#0066cc", height: 40, width: 500}}>
            <Icon onPress={()=>this.openControlPanel()} name="menu" style={{color : 'black'}}/>
              <View style={{position: "absolute", marginTop: 10}}>
                <Text style ={{ marginLeft: width/2.6,marginBottom: 50,fontWeight: "bold",fontSize: 20,color: "black"}}>
                   MAI KOST </Text>
              </View>
            
          </View>
         
            <Image source = {require('./kost.png')} style ={{height : 60, width : 60, marginBottom :5,marginTop: 5, alignSelf : "center"}} ></Image>  
            <Item>
              <Icon onPress={()=>this.openControlPanel()} name="search" style={{color : 'black'}}/>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="search"
                style={styles.search}
                onChangeText={(search) => this.setState({search})}
                value={this.state.search}
              />
            </Item>
        </View>
      
        <ListView
          style={{width : width, height : 100}}
          dataSource={this.state.dataSource}
          renderRow={(data) =>
          <View style={{backgroundColor : 'white', borderBottomColor : 'black', borderBottomWidth : 1}}>
            <Text>{data}</Text>
            <View>
              <Image source = {require('./contoh.png')} style={{height : responsiveHeight(20), width : responsiveWidth(45), marginBottom :30, marginLeft: responsiveWidth(2)}} />
                <View style={{position: "absolute", right : 0, width: responsiveWidth(50),marginLeft: responsiveWidth(3)}}>
                  <Text>
                    600rb/bln
                  </Text>
                  <Text>
                    Jalan Raya Kampus Unud No 32
                  </Text>
                  <Text style={{color: "red"}}>
                    Campur
                  </Text>
              </View>
            </View>
          </View>}
        />
        </View>
      </Drawer>

       
      );
  }
    
};

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},


};
const styles = StyleSheet.create({
    search : {height: 40, 
      borderColor: 'gray', 
      width:width, 
      borderWidth: 1, 
      textAlign:"center", 
      borderRadius:5, 
      marginTop : 0,
      backgroundColor : "rgba(74, 140, 246, 0.2)",
      borderColor: "#004d4d"}
    });