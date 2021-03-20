import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Colors, EXCERCISE } from "../../global/Constants";
import { getUserDataFromDB } from "../../res/services";
import { getRandomColor, getUser } from "../../res/utills";
import Header from "./components/Header";

const Excercise = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    _getUser();
  }, []);
  const _getUser = async () => {
    getUserDataFromDB()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ExcerciseDetail", item.title.toLowerCase());
        }}
        style={{
          height: 150,
          width: "90%",
          alignSelf: "center",
          backgroundColor: getRandomColor(),
          marginTop: 10,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ color: Colors.white, fontSize: 17, fontWeight: "500" }}>
          {item.title}
        </Text>
        <Image source={item.image} style={{ height: 100, width: 100 }} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header user={user && user} navigation={navigation} />
      <FlatList
        data={EXCERCISE}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Excercise;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.orange },
});
