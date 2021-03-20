import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerRouter } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { Colors } from "../global/Constants";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserDataFromDB } from "../res/services";
import { authState } from "../global/Global";
const CustomDrawer = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    _getUser();
  }, []);
  const _getUser = () => {
    getUserDataFromDB()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.nav}>
          <View
            style={{
              marginTop: 20,
              height: 60,
              width: 60,
              borderColor: Colors.white,
              borderWidth: 1,
              borderRadius: 60 / 2,
            }}
          >
            <Image
              source={{ uri: user && user.photo }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <View style={{ margin: 20 }}>
            <Text
              style={{ color: Colors.white, fontSize: 17, fontWeight: "500" }}
            >
              {user && user.name}
            </Text>
            <Text style={{ color: Colors.white, fontWeight: "500" }}>
              {user && user.email}
            </Text>
          </View>
        </View>
        <Drawer.Section style={styles.drawerAbove}>
          <Text style={{ color: Colors.white, marginLeft: 10, fontSize: 16 }}>
            Navigation
          </Text>
          <DrawerItem
            onPress={() => props.navigation.navigate("Dashboard")}
            label={"Dashboard"}
            labelStyle={{ color: Colors.white }}
            icon={(color, size) => (
              <Icon name="speedometer" color={Colors.white} size={25} />
            )}
          />
          <DrawerItem
            onPress={() => props.navigation.navigate("HomeScreen")}
            label={"Home"}
            labelStyle={{ color: Colors.white }}
            icon={(color, size) => (
              <Icon name="home" color={Colors.white} size={25} />
            )}
          />
          <DrawerItem
            onPress={() => props.navigation.navigate("ProfileScreen")}
            label={"Profile"}
            labelStyle={{ color: Colors.white }}
            icon={(color, size) => (
              <Icon name="person" color={Colors.white} size={25} />
            )}
          />
          <DrawerItem
            label={"Diet"}
            labelStyle={{ color: Colors.white }}
            icon={(color, size) => (
              <Icon name="fast-food" color={Colors.white} size={25} />
            )}
            onPress={() => props.navigation.navigate("DietScreen")}
          />
          <DrawerItem
            onPress={() => props.navigation.navigate("Excercise")}
            label={"Exercises"}
            labelStyle={{ color: Colors.white }}
            icon={(color, size) => (
              <Icon name="man" color={Colors.white} size={25} />
            )}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          label={"Sign Out"}
          labelStyle={{ color: Colors.white }}
          icon={(color, size) => (
            <Icon name="exit" color={Colors.white} size={25} />
          )}
          onPress={() => authState.set(false)}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  nav: { padding: 10, flexDirection: "row" },
  drawerAbove: { marginTop: 10, borderBottomColor: Colors.white },
  bottomSection: { marginBottom: 15, borderTopColor: Colors.white },
});
