import * as React from 'react';
import { StyleSheet} from 'react-native';

import Routes from './Routes';
import {connect} from "react-redux";


class Main extends React.Component {
   
    render(){

      const {authData:{isLoggedIn}} = this.props;
      
      return(
      
        <Routes isLoggedIn={isLoggedIn} />
    );  
  }
  
  }
  
  const styles = StyleSheet.create({
    text:{
      color:"#1D2029",
    },
  
  });

 const mapStateToProps = state => ({
    authData: state.authreducer.authData
})

export default connect(mapStateToProps, null)(Main)
  