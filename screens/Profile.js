// In App.js in a new project

import * as React from 'react';
import { View, Text,TextInput ,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from "axios";
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';



class Profile extends React.Component {
   
    constructor (props) {
        super(props);
        this.state = {
            updatable: false,
            usrname: props.username,
            DOB: props.DOB,
            email: props.email,
            height: props.height,
            weight: props.weight,
            ID:props.ID,
            TextInputDisableStatus:false
        };
      }
    
  dashboardScreen(){
      Actions.dashboard();
  }

  check(){

   
    if(this.state.email.length<5 || this.state.usrname.length<3){
        alert("Enter Valid Details");
    }

    else{
       
      axios.put("http://192.168.100.108:3333/user/update",
      {id:this.state.ID, 
        name:this.state.usrname,
        DOB:this.state.DOB,
        email:this.state.email,
        weight:this.state.weight,
        height:this.state.height
    }).then((response)=>{
            alert("Updation Successful");
        }).catch((err)=>{
            alert(err);
        });


        this.setState({
            TextInputDisableStatus:false
          })

        }
  }

  enableTextBox(){
    
    this.setState({
            TextInputDisableStatus:true     
        })
  }

  onNameChange(value){
    this.setState({
         usrname: value
    });
}
  onEmailChange(value){
    this.setState({
         email: value
    });
}

onDOBChange(value){
    this.setState({
         DOB: value
    });
}

onWeightChange(value){
    this.setState({
         weight: value
    });
}

onHeightChange(value){
    this.setState({
         height: value
    });
}




  render() {

	return(

            <View style={styles.container,{marginTop:150,justifyContent:'center',alignItems:'center'}}>
        <View style={styles.internalContents}>
          <Text style={styles.text}>User Profile</Text>
          <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                value={this.state.usrname}
                onChangeText={text => this.onNameChange(text)}
                placeholder ="Name"   
                editable={this.state.TextInputDisableStatus}
                />
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                value={this.state.email}
                onChangeText={text => this.onEmailChange(text)}
                placeholder= "Email"
                editable={this.state.TextInputDisableStatus}
                />
        </View>
        <View style={styles.inputContainer}>
        <TextInput 
                style={styles.textInput}
                value={this.state.DOB}
                onChangeText={text => this.onDOBChange(text)}
                placeholder= "Date of Birth"
                editable={this.state.TextInputDisableStatus}
                />
        </View>

        <View style={styles.inputContainer}>
        <TextInput 
                style={styles.textInput}
                value={this.state.height}
                onChangeText={text => this.onHeightChange(text)}
                placeholder= "Height"  
                editable={this.state.TextInputDisableStatus}      
                />
        </View>

        <View style={styles.inputContainer}>
        <TextInput 
                style={styles.textInput}
                value={this.state.weight}
                onChangeText={text => this.onWeightChange(text)}
                placeholder= "Weight"   
                editable={this.state.TextInputDisableStatus}        
                />
        </View>
        </View>

        <View style={{...styles.button, marginBottom: -5, flexDirection: 'row', marginLeft: 5, justifyContent: "space-between", width: "60%"}}>
           
        </View>
        <View style={{flexDirection:'row',marginRight:80, width:"70%",justifyContent:'space-between'}}>

            <TouchableOpacity style={[styles.submitContainer,{fontsize:20,marginLeft:10}]} onPress={()=>this.enableTextBox()}>
                  <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.submitContainer,{fontsize:20,marginLeft:50,backgroundColor:"#1262c9"}]} onPress={()=>this.check()}>
                  <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Save</Text>
            </TouchableOpacity>

            

          </View>

          <TouchableOpacity style={[styles.submitContainer,{fontsize:20,backgroundColor:"#b11d19",marginRight:210}]} onPress={this.dashboardScreen}>
                  <Text style={[styles.buttonText,{color:"#fff",fontWeight:"700",fontsize:30}]} >Cancel</Text>
            </TouchableOpacity>

      </View>

			);
    }
}

const styles = StyleSheet.create({
    label:{
      fontSize: 16,
      color: 'red',
      //alignSelf:'center'
  },
  internalContents:{
    width: "85%", 
  }
  ,container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
     // justifyContent: 'center',
     //paddingTop: 40,
  },
  ImagesSty:{
    width: 200,
    height: 60,
    marginTop: 100,
    marginBottom: 50,
    //justifyContent: "center"
  },
  textInput:{
      borderColor: "grey",
      //borderWidth: 2,
      borderBottomWidth: 2,
      width: '95%',
      //borderRadius: 50,
      fontSize: 16,
      padding: 10,
    },
    inputContainer:{
      flexDirection: "row",
      width: '100%',
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingBottom: 10,
      paddingTop: 0,
    },
    text:{
      fontSize: 30,
      color: 'black',
      marginBottom: 5,
    },button:{
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    Hitext:{
      fontStyle:"italic",
      color: "lightgrey",
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
    },
    textStyle: {    
        fontSize: 18
    },

    submitContainer: {
      width:100,
      height:40,
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
      backgroundColor:"#ee7213",
      borderRadius:4,
      paddingVertical:12,
      alignItems:"center",
      shadowColor:"rgba(255,22,84,0.24)",
      shadowOffset:{width:0,height:9},
      shadowOpacity:1,
      shadowRadius:20,
  
    },
  });




export default Profile;