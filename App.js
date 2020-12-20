// In App.js in a new project

import * as React from 'react';
import { View, Text,Button ,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';


import {Provider} from "react-redux";
import Main from "./screens/main";
import persist from './config/store';
import {PersistGate} from "redux-persist/integration/react";

const persistStore  = persist();

export default function App() {
 
  return(
  <Provider store={persistStore.store}>
    <PersistGate loading={null} persistor={persistStore.persistor}>
    <Main/>
    </PersistGate>
    
  </Provider>
   
  );

}

const styles = StyleSheet.create({
  text:{
    fontFamily:"Iowan Old Style",
    color:"#1D2029",
  },

  link:{
    color:"#FF1654",
   // fontSize:14,
    fontWeight: "500",
  },

  submitContainer:{
    backgroundColor:"#ee7213",
    //fontsize:16,,
    borderRadius:4,
    paddingVertical:12,
    marginTop:30,
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"rgba(255,22,84,0.24)",
    shadowOffset:{width:0,height:9},
    shadowOpacity:1,
    shadowRadius:20,
  },

  container:{
    flex:1,
    backgroundColor:"#fff",
    paddingHorizontal:30,
  }

});


//export default App1;