// In App.js in a new project

import * as React from 'react';
import { View, Text,TextInput ,StyleSheet,Image,TouchableOpacity,ScrollView,ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';


class Profile extends React.Component {
   
    constructor (props) {
        super(props);
       
      }
    
  render() {

	return(

        <ImageBackground  source={require("../assets/fitnessFull.png")}
        style={{width:"100%",height:"100%",justifyContent:"center",alignItems:'center'}}>

        </ImageBackground>

    );
    }
}

export default Profile;