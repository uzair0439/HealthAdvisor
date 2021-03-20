import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  CompareResetToken,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Splash,
} from "../screens/AuthScreens";
import HomeScreen from "../screens/AppScreens/HomeScreen";
import { authState } from "../global/Global";
import { Colors } from "../global/Constants";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ProfileScreen from "../screens/AppScreens/ProfileScreen";
import DietScreen from "../screens/AppScreens/DietScreen";
import Excercise from "../screens/AppScreens/Excercise";
import ExcerciseDetail from "../screens/AppScreens/ExcerciseDetail";
import CustomDrawer from "./CustomDrawer";
import Dashboard from "../screens/AppScreens/Dashboard";
import Pedometer from "../screens/AppScreens/Pedometer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Register"} component={Register} />
      <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
      <Stack.Screen name={"CompareResetToken"} component={CompareResetToken} />
      <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
    </Stack.Navigator>
  );
};
const excercise = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"ExcersiseScreen"} component={Excercise} />
      <Stack.Screen name={"ExcerciseDetail"} component={ExcerciseDetail} />
    </Stack.Navigator>
  );
};
const DrawerStack = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerStyle={{ backgroundColor: Colors.orange }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name={"Dashboard"} component={Dashboard} />
      <Drawer.Screen name={"HomeScreen"} component={HomeScreen} />
      <Drawer.Screen name={"Excercise"} component={excercise} />
      <Drawer.Screen name={"ProfileScreen"} component={ProfileScreen} />
      <Drawer.Screen name={"DietScreen"} component={DietScreen} />
      <Drawer.Screen name={"Pedo"} component={Pedometer} />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  const [auth, setAuth] = authState.use();
  console.log(auth);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!auth ? (
          <Stack.Screen name={"Auth"} component={AuthStack} />
        ) : (
          <Stack.Screen name={"Home"} component={DrawerStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
