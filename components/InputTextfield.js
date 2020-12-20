import * as React from 'react';
import { render } from 'react-dom';
import { View, Text,Button ,StyleSheet,Image,TouchableOpacity,ScrollView,TextInput} from 'react-native';


export default class InputTextField extends React.Component{
    render(){
       return (
           <View style ={this.props.style}>
               <Text style={[styles.inputTitle,{fontSize:16}]}>
                    {this.props.title}
               </Text>

               <TextInput 
               placeholder={this.props.placeholder} 
               secureTextEntry={this.props.secureTextEntry}
               style={[styles.input,{fontSize:14}]}
               >
               </TextInput>

               <View style={{borderBottomWidth:1,borderBottomColor:"#D8D8D8"}}></View>
           </View>
       )
    }
}


const styles = StyleSheet.create({
    inputTitle:{
        color:"#ABB4BD",
    },

    input:{
        paddingVertical:12,
        color:"#1D2029",
    },
})