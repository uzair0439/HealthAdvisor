import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Colors } from "../global/Constants";

const Input = ({
  placeholder,
  label,
  value,
  onChange,
  secureTextEntry,
  error,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        style={{ ...styles.input, fontSize: error ? 13 : 13 }}
        placeholder={error ? error : placeholder}
        value={value}
        label={label}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChange(text)}
        placeholderTextColor={error ? "red" : "grey"}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "80%",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 45 / 2,
  },
  input: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    height: "100%",
  },
});
