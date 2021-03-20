import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import CommonButton from "../../components/CommonButton";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import { sendForgotRequest } from "../../res/services";
import { emailValidator } from "../../res/utills";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const sendRequest = () => {
    const emailError = emailValidator(email.value);
    if (emailError)
      return setEmail({ ...email, error: "Provide a valid email" });
    setLoading(true);
    const data = {
      email: email.value,
    };
    sendForgotRequest(data)
      .then((res) => {
        setLoading(false);
        navigation.navigate("CompareResetToken", email.value);
      })
      .catch((err) => {
        setLoading(false);
        alert("Error Please try again");
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
        <Text style={{ ...MainStyles.title, textAlign: "center" }}>
          Please enter your email to get the password reset code
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder={"Email"}
          label="Email"
          error={email.error}
          onChange={(text) => setEmail({ ...email, value: text })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton
          title="Submit"
          color={Colors.secondary}
          onPress={() => sendRequest()}
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
        <CommonButton
          color={Colors.white}
          title={"Cancel"}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
  },
  title: { flex: 0.2, justifyContent: "center", paddingHorizontal: 20 },
  inputContainer: { flex: 0.3, width: "100%", justifyContent: "center" },
  buttonContainer: {
    flex: 0.4,
    justifyContent: "space-around",
    alignItems: "center",
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
