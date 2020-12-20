// In App.js in a new project

import * as React from 'react';
import { View, Text,Button ,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import {Field,reduxForm} from "redux-form";
import {Actions} from 'react-native-router-flux';
import { compose } from 'redux';
import {connect} from "react-redux";
import InputText from  "../components/InputText";
import {loginUser} from "../actions/auth.action";
import Loader from "../components/loader";


class Login extends React.Component {
  
  signupScreen(){
      Actions.signup();
  }

  loginUser =(values)=>{
    this.props.dispatch(loginUser(values))
}

onSubmit =(values)=>{
  this.loginUser(values);
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

    const { handleSubmit, loginUser} = this.props;
    console.log(loginUser);

    return(
   
   <ScrollView style={styles.container}>

   {(loginUser && loginUser.isLoading) && <Loader />}
      <View>

        <View style={{marginTop:45,alignItems:"center",justifyContent:"center"}}>
          <Image source={require("../assets/logo.png")} 
          style={{
            height: 110,
            width: 220,
            marginTop:60
          }}></Image>
          <Text style={[styles.text,{fontsize:16,alignSelf:"flex-start", marginTop:5,fontWeight:"600"}]}></Text>
        </View>

         
        <Field  
            name="email"
            placeholder="Email"
            component={this.renderTextInput} />

          <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={this.renderTextInput} />


          <TouchableOpacity style={[styles.submitContainer,{fontsize:20}]} onPress={handleSubmit(this.onSubmit)} >
            <Text style={[styles.text,{color:"#fff",fontWeight:"700",fontsize:30}]}>Login</Text>
          </TouchableOpacity>


        
          <Text style={[styles.text,{fontsize:18,color:"#ABB4BD",textAlign:"center",marginTop:24}]}>Dont Have an Account? 
          <Text style={[styles.text,styles.link,{fontSize:16}]} onPress={this.signupScreen}> Register</Text></Text>
          
          <Text style={[styles.text,styles.link,{textAlign:"center",marginTop:30}]}>Forgot Password</Text>

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

const validate=(values)=>{
  const errors={};

  if(!values.email){
    errors.email = "Email is Required";
  }

  if(!values.password){
    errors.password  = "Password is Required";
  }

  else if(values.password.length <8){
    errors.password = "Password should be 8 characters long";
  }
  return errors;
}

const mapStateToProps = (state) => ({
  loginUser: state.authreducer.loginUser
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
connect(mapStateToProps, mapDispatchToProps),
reduxForm({
  form: "login",
  validate
})
)(Login);
