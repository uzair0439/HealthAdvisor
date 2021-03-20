import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import CharacterInput from "react-native-character-input";
import CommonButton from "../../components/CommonButton";
import { compareTokensAtDB } from "../../res/services";
import Loader from "../../components/Loader";

const CompareResetToken = ({ route, navigation }) => {
  const [email, setEmail] = useState(route.params);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitRequest = () => {
    if (!value) return alert("Please enter the code from your email");
    setLoading(true);
    const data = {
      resetToken: value,
    };
    compareTokensAtDB(data)
      .then((res) => {
        setLoading(false);
        navigation.navigate("ResetPassword", data.resetToken);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occured");
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
          Enter the reset code from the email we sent at {email}
        </Text>
      </View>
      <View style={styles.input}>
        <CharacterInput
          placeHolder="000---000"
          showCharBinary="111000111"
          handleChange={(value) => setValue(value)}
          inputType="outlined"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.button}>
        <CommonButton
          title="Submit"
          color={Colors.secondary}
          onPress={() => submitRequest()}
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
          title="Cancel"
          color={Colors.white}
          onPress={() => navigation.navigate("Splash")}
        />
      </View>
    </View>
  );
};

export default CompareResetToken;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
  },
  title: { flex: 0.2, justifyContent: "center" },
  input: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  button: { flex: 0.5, justifyContent: "space-around", alignItems: "center" },
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
