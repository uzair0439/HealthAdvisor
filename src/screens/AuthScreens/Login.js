import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import CommonButton from "../../components/CommonButton";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { Colors } from "../../global/Constants";
import { authState } from "../../global/Global";
import { MainStyles } from "../../global/GlobalStyles";
import { loginUserToDB } from "../../res/services";
import { emailValidator, passwordValidator, setUser } from "../../res/utills";

const Login = ({ navigation }) => {
  const [userData, setuserData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwrodError: "",
  });
  const [loading, setLoading] = useState(false);
  const loginUser = () => {
    const emailError = emailValidator(userData.email);
    const passwrodError = passwordValidator(userData.password);
    if (emailError || passwrodError) {
      return setuserData({
        ...userData,
        emailError: emailError,
        passwrodError: passwrodError,
      });
    }
    setLoading(true);
    const data = {
      email: userData.email,
      password: userData.password,
    };
    loginUserToDB(data)
      .then(async (res) => {
        await setUser("Bearer " + res.data.token);
        authState.set(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR" + err);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ height: 200, width: "80%" }}
        resizeMode="contain"
      />
      <Loader visible={loading} />
      <View style={styles.titleContainer}>
        <Text style={MainStyles.title}>
          Please Enter your Email and Password
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder={"Email"}
          label={"Email"}
          value={userData.email}
          onChange={(text) =>
            setuserData({ ...userData, email: text, emailError: "" })
          }
          error={userData.emailError}
        />
        <Input
          placeholder={"Password"}
          label={"Password"}
          secureTextEntry={true}
          value={userData.password}
          onChange={(text) =>
            setuserData({ ...userData, password: text, passwrodError: "" })
          }
          error={userData.passwrodError}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton
          title={"Login"}
          onPress={() => loginUser()}
          color={Colors.secondary}
        />
        <View style={styles.authLine}>
          <View style={styles.line}></View>
          <Text
            style={{ fontWeight: "500", color: Colors.white, fontSize: 17 }}
          >
            OR
          </Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.otherOptions}>
          <TouchableOpacity
            style={{ width: "70%" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>
              Not Registered? Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
  },
  inputContainer: { flex: 0.3, width: "100%", justifyContent: "space-around" },
  titleContainer: { flex: 0.15 },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "space-around",
    alignItems: "center",
  },
  otherOptions: { flexDirection: "row", justifyContent: "space-between" },
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
