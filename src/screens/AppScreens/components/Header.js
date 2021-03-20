import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../global/Constants";
import Icon from "react-native-vector-icons/Feather";

const Header = ({ user, navigation }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={"menu"}
        size={25}
        color={Colors.white}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={{ color: Colors.white, fontSize: 15 }}>
        {user && user.name}
      </Text>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          borderWidth: 1,
          borderColor: Colors.white,
        }}
      >
        <Image source={{ uri: user && user.photo }} style={styles.image} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    backgroundColor: Colors.orange,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.3,
    paddingTop: 25,
  },
  text: { fontSize: 17, fontWeight: "500", color: Colors.orange },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderColor: Colors.orange,
    borderWidth: 2,
  },
});
