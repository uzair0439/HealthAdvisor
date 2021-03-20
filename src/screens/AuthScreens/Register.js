import React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CommonButton from "../../components/CommonButton";
import Input from "../../components/Input";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import {
  confirmValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  setUser,
} from "../../res/utills";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { registerUserToDB } from "../../res/services";
import { authState } from "../../global/Global";
import Loader from "../../components/Loader";

const Register = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [isDatePickerVisible, setIsDatePickerVidible] = useState(false);
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    dobError: "",
  });
  const [loading, setLoading] = useState(false);
  const signupUser = () => {
    const emailError = emailValidator(userData.email);
    const passwordError = passwordValidator(userData.password);
    const nameError = nameValidator(userData.name);
    const dobError = nameValidator(userData.dob);
    const confirmPasswordError = confirmValidator(
      userData.password,
      userData.confirmPassword
    );
    if (
      emailError ||
      passwordError ||
      nameError ||
      dobError ||
      confirmPasswordError
    ) {
      return setErrors({
        ...errors,
        emailError: emailError,
        passwordError: passwordError,
        nameError: nameError,
        dobError: dobError,
        confirmPasswordError: confirmPasswordError,
      });
    }
    setLoading(true);
    const data = {
      name: userData.name,
      email: userData.email,
      dateOfBirth: userData.dob,
      password: userData.password,
    };
    registerUserToDB(data)
      .then(async (res) => {
        await setUser("Bearer " + res.data.token);
        authState.set(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const hideDatePicker = () => {
    setIsDatePickerVidible(false);
  };

  const handleConfirm = (date) => {
    setUserData({ ...userData, dob: date });
    hideDatePicker();
  };
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.orange,
        paddingVertical: 20,
      }}
    >
      <View style={styles.container}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Loader visible={loading} />
        <Image
          source={require("../../assets/Logo.png")}
          style={{ height: 200, width: "80%" }}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <Text style={MainStyles.title}>
            Please enter your data to Sign up
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder={"Full Name"}
            value={userData.name}
            label={"Full Name"}
            error={errors.nameError}
            onChange={(text) => setUserData({ ...userData, name: text })}
          />
          <Input
            placeholder={"Email"}
            value={userData.email}
            error={errors.emailError}
            label={"Email"}
            onChange={(text) => setUserData({ ...userData, email: text })}
          />
          <Input
            placeholder={"Password"}
            value={userData.password}
            error={errors.passwordError}
            label={"Password"}
            secureTextEntry={true}
            onChange={(text) => setUserData({ ...userData, password: text })}
          />
          <Input
            placeholder={"Confirm Password"}
            value={userData.confirmPassword}
            label={"Confirm Password"}
            secureTextEntry={true}
            error={errors.confirmPasswordError}
            onChange={(text) =>
              setUserData({ ...userData, confirmPassword: text })
            }
          />
          <TouchableOpacity
            style={styles.dobButton}
            onPress={() => setIsDatePickerVidible(true)}
          >
            <Text style={{ color: "grey" }}>Date of Birth</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            title={"Signup"}
            color={Colors.secondary}
            onPress={() => signupUser()}
          />
        </View>
      </View>
      <View style={styles.authLine}>
        <View style={styles.line}></View>
        <Text style={{ fontWeight: "500", color: Colors.white, fontSize: 17 }}>
          OR
        </Text>
        <View style={styles.line}></View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 10, alignSelf: "center" }}
      >
        <Text style={{ color: Colors.white }}>Already Registered? Signin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: { flex: 0.1, paddingTop: 10 },
  inputContainer: { flex: 0.6, width: "100%", justifyContent: "space-around" },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  dobButton: {
    height: 45,
    backgroundColor: "#f6f6f6",
    width: "80%",
    alignSelf: "center",
    borderRadius: 45 / 2,
    borderWidth: 0.5,
    justifyContent: "center",
    paddingLeft: 15,
  },
  authLine: {
    // marginTop: 10,
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
