import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Colors } from "../../../global/Constants";
import { MainStyles } from "../../../global/GlobalStyles";
const MealModal = ({ visible, selectMeal }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Text style={MainStyles.title}>Please Select a meal</Text>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectMeal("breakfast")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Breakfast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectMeal("lunch")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Lunch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectMeal("dinner")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Dinner
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MealModal;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 2,
    width: "95%",
    backgroundColor: Colors.orange,
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  day: {
    backgroundColor: Colors.white,
    width: "80%",
    height: 40,
    borderRadius: 40 / 2,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
