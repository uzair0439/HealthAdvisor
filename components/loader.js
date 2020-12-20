// In App.js in a new project

import * as React from 'react';
import { View, Text ,StyleSheet,ActivityIndicator} from 'react-native';




export default class Loader extends React.Component {
  
  signupScreen(){
      Actions.signup();
  }

  render(){
    return(
    
      <View style={styles.container}>

       <ActivityIndicator color="#2822d8" size="large"/>

      </View>

      
  );  
}

}

const styles = StyleSheet.create({
  container:{
   
    position:"absolute",
    width:"100%",
    height:"100%",
    zIndex:99,
    justifyContent:"center",
  },

  

});
