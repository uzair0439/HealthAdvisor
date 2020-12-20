import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import {connect} from "react-redux";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {logoutUser} from "../actions/auth.action";
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
  },
  textStyle: {    
      fontSize: 18
  },
  submitContainer: {
    width:150,
    height:40,
    borderWidth: 0.5,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor:"#ee7213",
    paddingVertical:12,
    alignItems:"center",
    justifyContent:"center",
    shadowColor:"rgba(255,22,84,0.24)",
    shadowOffset:{width:0,height:9},
    shadowOpacity:1,
    shadowRadius:20,
    flexDirection: 'row',
    alignItems: 'center',

  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonImageIconStyle: {
    padding: 5,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
}

  profilePage = (values) => {
    Actions.profile({username:values.name,DOB:values.DOB,email:values.email,weight:values.weight,height:values.height,ID:values._id});
}

  logoutUser = () => {
      this.props.dispatch(logoutUser());
  }

  FitnessPage=()=>{
    Actions.fitness();
  }

	render() {
   
    const {getUser: {userDetails}} = this.props;
		return(

      <ImageBackground 
      source={require("../assets/background.png")}
      style={{width:"100%",height:"100%",justifyContent:"center",alignItems:'center'}}
      >


      <Image source={require("../assets/dashboard.png")} 
          style={{
            height: 130,
            width: 300,
            marginTop:70,
            marginLeft:20,
          }}></Image>
   
			<View style={styles.container}>
			     <Text style={styles.textStyle}>This is a profile page for {userDetails ? userDetails.DOB: ""}</Text>

           <View style={{flexDirection:'row',margin:40,marginLeft:70, width:"95%",justifyContent:'space-between'}}>

           <TouchableOpacity style={[styles.submitContainer,{fontsize:20,marginLeft:10}]}>
             <Image source={require("../assets/icons/doctor.png")} style={styles.buttonImageIconStyle}/>

                <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Consultant</Text>  
              </TouchableOpacity>

             <TouchableOpacity style={[styles.submitContainer,{fontsize:20}]}>
             <Image source={require("../assets/icons/shoes.png")} style={styles.buttonImageIconStyle}/>

                <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Footsteps</Text>
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',margin:40,marginLeft:70, width:"95%",justifyContent:'space-between'}}>

             <TouchableOpacity style={[styles.submitContainer,{fontsize:20,marginLeft:10}]}>
             <Image source={require("../assets/icons/meal.png")} style={styles.buttonImageIconStyle}/>

                <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Diet Planner</Text>  
              </TouchableOpacity>

             <TouchableOpacity style={[styles.submitContainer,{fontsize:20}]}  onPress={()=>this.FitnessPage()}>
             <Image source={require("../assets/icons/dumbbell.png")} style={styles.buttonImageIconStyle}/>

                <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Fitness Trainer</Text>
              </TouchableOpacity>

          </View>

          <View style={{flexDirection:'row',margin:20,marginLeft:50, width:"95%",justifyContent:'space-between'}}>

            <TouchableOpacity style={[styles.submitContainer,{fontsize:20,marginLeft:10}]} onPress={()=>this.profilePage(userDetails)}>
            <Image source={require("../assets/icons/user.png")} style={styles.buttonImageIconStyle}/>

                  <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.submitContainer,{fontsize:20,backgroundColor:"#b11d19"}]} onPress={this.logoutUser}>
            <Image source={require("../assets/icons/logout.png")} style={styles.buttonImageIconStyle}/>

                  <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Logout</Text>
            </TouchableOpacity>

          </View>

			</View>

      </ImageBackground>
			)
	}
}


const mapStateToProps = (state)=>({
    getUser: state.userreducer.getUser
  });

const mapDispatchToProps = (dispatch) => ({
    dispatch
});



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);