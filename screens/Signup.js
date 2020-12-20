import * as React from 'react';
import {connect} from "react-redux";
import { View, Text,Button ,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Field,reduxForm} from "redux-form";
import InputText from  "../components/InputText";
import { compose } from 'redux';
import {createNewUser} from "../actions/auth.action";
import Loader from "../components/loader";


class Signup extends React.Component {
 
    LoginScreen(){
        Actions.pop();
    }

    createNewUser =(values)=>{
        this.props.dispatch(createNewUser(values))
    }

    onSubmit =(values)=>{
      this.createNewUser(values);
    }

    renderTextInput = (field) => {
      const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
      return (
          <View>
            <InputText
                onChangeText={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                keyboardType={keyboardType} 
                secureTextEntry={secureTextEntry}
                label={label}
                {...restInput} 
                {...field.input}
                />
          {(touched && error) && <Text style={{fontSize:10,fontWeight:"100",color:"#ffbfbf"}}>{error}</Text>}
          </View>
      );
}

    render(){

      const {handleSubmit, createUser} = this.props;
      
      return(
        
      <ScrollView style={styles.container}>
        {createUser.isLoading && <Loader/>}
        <View>
          
          <View style={{marginTop:60,alignItems:"center",justifyContent:"center"}}>

          <Image source={require("../assets/welcome.png")} 
          style={{
            height: 110,
            width: 220,
            marginTop:60
          }}></Image>
           
            <Text style={[styles.text,{fontsize:16,alignSelf:"flex-start", marginTop:0,fontWeight:"600"}]}></Text>
          </View>
  

            <Field
            name="name"
            placeholder="Full Name"
            component={this.renderTextInput} />

          <Field  
            name="email"
            placeholder="Email"
            component={this.renderTextInput} />

          <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={this.renderTextInput} />

            <Field
            name="DOB"
            placeholder="Date of Birth"
            component={this.renderTextInput} />
       

       <TouchableOpacity style={[styles.submitContainer,{fontsize:20}]} onPress={handleSubmit(this.onSubmit)}>
              <Text style={[styles.text,{color:"#fff",fontWeight:"700",fontsize:30}]}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={[styles.text,{fontsize:18,color:"#ABB4BD",textAlign:"center",marginTop:24}]}>Already Have an account? 
            <Text style={[styles.text,styles.link,{fontSize:16}]} onPress={this.LoginScreen}> Login</Text></Text>
            
          </View>
  
        </ScrollView>
    );  
  }
  
  }

  
  
  const styles = StyleSheet.create({
    text:{
      color:"#1D2029",
    },
  
    link:{
      color:"#FF1654",
     // fontSize:14,
      fontWeight: "500",
    },
  
    submitContainer:{
      backgroundColor:"#1262c9",
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

 const validate=(values)=>{
    const errors={};
    if(!values.name){
      errors.name = "Name is Required";
    }

    if(!values.email){
      errors.email = "Email is Required";
    }

    if(!values.password){
      errors.password  = "Password is Required";
    }
    return errors;
  }

const mapStateToProps = (state)=>({
  createUser: state.authreducer.createUser
});

const mapDispatchToProps = (dispatch)=>({
    dispatch
});

export default compose(
  connect(mapStateToProps,mapDispatchToProps),reduxForm({
    form:"signup",
    validate
  })
  )(Signup);

 

  