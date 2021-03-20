import React from "react";
import Modal from "react-native-modal";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../global/Constants";

const Loader = ({ visible }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <ActivityIndicator animating color={Colors.orange} size="large" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    alignSelf: "center",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
});
