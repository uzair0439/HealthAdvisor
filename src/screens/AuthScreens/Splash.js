import { ThemeProvider } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../global/Constants";

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ height: 200, width: "80%" }}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Welcome to Health Advisor</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, color: Colors.orange, fontWeight: "500" }}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={styles.authLine}>
        <View style={styles.line}></View>
        <Text style={{ fontWeight: "500", color: Colors.white, fontSize: 17 }}>
          OR
        </Text>
        <View style={styles.line}></View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.button2}
      >
        <Text style={{ fontSize: 20, color: Colors.white, fontWeight: "500" }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 55,
    width: 250,
    borderRadius: 55 / 2,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  button2: {
    height: 55,
    width: 250,
    borderRadius: 55 / 2,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  titleContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 21,
    fontWeight: "500",
    color: Colors.white,
  },
  authLine: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 80,
    height: 2,
    backgroundColor: Colors.white,
    margin: 10,
  },
});
