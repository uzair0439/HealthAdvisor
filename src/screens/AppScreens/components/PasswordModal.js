import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../../../components/CommonButton";
import Input from "../../../components/Input";
import { Colors } from "../../../global/Constants";
import { MainStyles } from "../../../global/GlobalStyles";
import { changeUserPassword } from "../../../res/services";
import { confirmValidator, passwordValidator } from "../../../res/utills";
const PasswordModal = ({ visible, setmodal }) => {
  const [password, setPassword] = useState({
    value: "",
    re: "",
    error: "",
  });
  const changePassword = () => {
    const err = passwordValidator(password.value);
    const reErr = confirmValidator(password.value, password.re);
    if (err || reErr) {
      return alert("Please enter a valid password");
    }
    console.log("Modal" + password.value);
    changeUserPassword({ password: password.value })
      .then((res) => {
        setmodal(res.message);
      })
      .catch((err) => {
        console.log(err);
        setmodal(err);
      });
  };
  return (
    <Modal isVisible={visible}>
      <View
        style={{
          height: "70%",
          width: "90%",
          backgroundColor: Colors.orange,
          alignSelf: "center",
          justifyContent: "space-around",
        }}
      >
        <Text style={MainStyles.title}>Please Enter your new password</Text>
        <Input
          label="Password"
          placeholder={"Password"}
          value={password.value}
          onChange={(text) => setPassword({ ...password, value: text })}
        />
        <Input
          label="Password"
          placeholder={"Confirm Password"}
          value={password.re}
          onChange={(text) => setPassword({ ...password, re: text })}
        />
        <TouchableOpacity
          style={{
            height: 50,
            width: 120,
            backgroundColor: Colors.secondary,
            alignSelf: "center",
            borderRadius: 50 / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => changePassword()}
        >
          <Text style={MainStyles.title}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({});
