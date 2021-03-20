import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, DASHBOARDDATA } from "../../global/Constants";
import { authState } from "../../global/Global";
import { MainStyles } from "../../global/GlobalStyles";
import { getUserDataFromDB } from "../../res/services";
import Header from "./components/Header";

const Dashboard = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    _getUser();
  }, []);
  const _getUser = () => {
    getUserDataFromDB()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  const styler = (index) => {
    if (index === 0) {
      return {
        height: Dimensions.get("window").width / 2,
        backgroundColor: "#34ebb7",
      };
    } else if (index === 1) {
      return {
        height: Dimensions.get("window").width / 2 - 40,
        backgroundColor: "#f09eff",
      };
    } else if (index === 2) {
      return {
        height: Dimensions.get("window").width / 2 - 40,
        backgroundColor: "#8b77d9",
        marginTop: 10,
      };
    } else if (index === 3) {
      return {
        height: Dimensions.get("window").width / 2,
        backgroundColor: "#34b1eb",
        marginTop: -30,
      };
    } else if (index === 4) {
      return {
        height: Dimensions.get("window").width / 2,
        backgroundColor: "#ffd1db",
        marginTop: 10,
      };
    }
  };
  return (
    <View style={styles.container}>
      <Header user={user && user} navigation={navigation} />
      <Text style={MainStyles.title}>Dashboard</Text>
      <Image
        source={require("../../assets/Logo.png")}
        style={{ height: 120, width: 120, alignSelf: "center" }}
      />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {DASHBOARDDATA.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                if (index === 5) {
                } else if (index === 4) {
                  authState.set(false);
                } else {
                  navigation.navigate(item.screen);
                }
              }}
              style={{
                ...styler(index),
                width: Dimensions.get("window").width / 2 - 20,
                marginLeft: 10,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Image
                source={item.image}
                style={{ height: "60%", width: "90%" }}
                resizeMode="contain"
              />
              <Text
                style={{ fontSize: 18, fontWeight: "500", color: Colors.white }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    flex: 1,
  },
  card: {
    width: Dimensions.get("window").width / 2 - 20,
    borderRadius: 8,
  },
  text: { color: Colors.white, fontSize: 20, fontWeight: "500" },
});
