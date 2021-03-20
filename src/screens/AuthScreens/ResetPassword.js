import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import CommonButton from "../../components/CommonButton";
import Input from "../../components/Input";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import { passwordValidator } from "../../res/utills";
import { changePasswordAtDB } from "../../res/services";
import Loader from "../../components/Loader";
import { Dimensions } from "react-native";
const ResetPassword = ({ route, navigation }) => {
  const [password, setPassword] = useState({
    value: "",
    confirm: "",
    valueError: "",
    confirmError: "",
  });
  const [loading, setLoading] = useState(false);
  const changePassword = () => {
    const passwordError = passwordValidator(password.value);
    const confirmError = passwordValidator(password.value, password.confirm);

    if (passwordError || confirmError) {
      return setPassword({
        ...password,
        valueError: passwordError,
        confirmError: confirmError,
      });
    }
    setLoading(true);
    const data = {
      resetToken: route.params,
      password: password.value,
    };
    changePasswordAtDB(data)
      .then((res) => {
        setLoading(false);
        navigation.navigate("Login");
      })
      .catch((err) => {
        setLoading(false);
        alert("Error");
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
      <View style={styles.title}>
        <Text style={MainStyles.title}>
          Enter your password to complete the password reset process
        </Text>
      </View>
      <View style={styles.input}>
        <Input
          placeholder={"Password"}
          label={"Password"}
          error={password.valueError}
          secureTextEntry={true}
          onChange={(text) => setPassword({ ...password, value: text })}
        />
        <Input
          placeholder={"Confirm Password"}
          label={"Confirm Password"}
          error={password.confirmError}
          secureTextEntry={true}
          onChange={(text) => setPassword({ ...password, confirm: text })}
        />
      </View>
      <View style={styles.button}>
        <CommonButton
          color={Colors.secondary}
          title="Submit"
          onPress={() => changePassword()}
        />
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange,
  },
  title: { flex: 0.2, justifyContent: "center" },
  input: { flex: 0.3, width: "100%", justifyContent: "space-around" },
  button: { flex: 0.3, alignItems: "center", justifyContent: "center" },
});
