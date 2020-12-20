import * as React from 'react';
import {Router,Stack,Scene, Drawer} from 'react-native-router-flux';
import Login from './Login';
import Signup from './Signup';
import Dashboard from "./Dashboard"
import Profile from "./Profile";
import SideBar from "./SideBar";
import Fitness from "./Fitness";

export default class Routes extends React.Component{
    render(){
        return(
            <Router>
            <Scene>
                        <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
                            <Scene key="login" component={Login} initial={true} />
                            <Scene key="signup" component={Signup} title="Register" />
                        </Scene>
                        <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>

                        <Scene key="root" hideNavBar={true} initial={this.props.isLoggedIn}>
                    <Drawer
                        open={true}
                        type="overlay"
                        key="drawer"
                        contentComponent={SideBar}
                        drawerWidth={250}
                    >
                        <Scene key="rootScene" hideNavBar>
                            <Scene key="dashboard" component={Dashboard} initial={true} />
                            <Scene key="profile" component={Profile} />
                            <Scene key="fitness" component={Fitness} />
                        </Scene>
                    </Drawer>
                </Scene>
                        </Scene>

                        <Scene key="sidebar" component={SideBar} />

                </Scene>


                         
         </Router>
        )
    }
}