import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../../global/Constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { MainStyles } from "../../../global/GlobalStyles";
const DaysModal = ({ visible, selectDay }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Text style={MainStyles.title}>Please select a day</Text>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Monday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Monday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Tuesday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Tuesday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Wednesday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Wednesday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Thursday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Thursday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Sunday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Friday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Saturday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Saturday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.day}
          onPress={() => selectDay("Sunday")}
        >
          <Text
            style={{ color: Colors.orange, fontSize: 17, fontWeight: "bold" }}
          >
            Sunday
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DaysModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    height: "80%",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
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
