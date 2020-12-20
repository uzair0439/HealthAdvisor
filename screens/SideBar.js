import React, {Component} from 'react';
import {Text, SafeAreaView, View,Image} from 'react-native';
import { Left, Right, List, ListItem, Icon } from 'native-base';
import {logoutUser} from "../actions/auth.action";
import {connect} from "react-redux";


class SideBar extends Component {

    constructor(props) {
        super(props);
    }

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    }


    render() {

        const {getUser: {userDetails}} = this.props;


        return (
            <SafeAreaView style={{backgroundColor:'#fff', height:'100%'}}>
                 <Image source={require("../assets/logo.png")} 
          style={{
            height: 110,
            width: 220,
            marginTop:60
          }}></Image>
                <List style={{marginTop:50}}>
                    <ListItem icon="menu">
                        <Left>
                            <Text>Home</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Profile</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>

                    <ListItem>
                        <Left>
                            <Text  onPress={this.logoutUser}>Logout</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state)=>({
    getUser: state.userreducer.getUser
  });

const mapDispatchToProps = (dispatch) => ({
    dispatch
});



export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
