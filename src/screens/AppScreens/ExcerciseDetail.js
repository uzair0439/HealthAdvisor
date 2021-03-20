import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, detail } from "../../global/Constants";
import { getUserDataFromDB } from "../../res/services";
import Header from "./components/Header";
import Modal from "react-native-modal";
import { MainStyles } from "../../global/GlobalStyles";
import { getRandomColor } from "../../res/utills";

const ExcerciseDetail = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [excercise, setExcersise] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    _getUser();
  }, []);
  const _getUser = () => {
    getUserDataFromDB()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            height: 300,
            backgroundColor: Colors.white,
            width: "95%",
            alignSelf: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        >
          <Text style={{ ...MainStyles.title, alignSelf: "center" }}>
            {modalData && modalData.title}
          </Text>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 17, color: Colors.blue }}>Set</Text>
              <Text style={{ fontSize: 17, color: Colors.blue }}>
                Repetitions
              </Text>

              <Text style={{ fontSize: 17, color: Colors.blue }}>Weight</Text>
            </View>

            {modalData &&
              modalData.detail.map((sets, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 15,
                  }}
                >
                  <Text style={{ fontSize: 17, color: Colors.blue }}>
                    {index + 1}
                  </Text>
                  <Text style={{ fontSize: 17, color: Colors.blue }}>
                    {sets.reps}
                  </Text>
                  <Text style={{ fontSize: 17, color: Colors.blue }}>
                    {sets.weight} kg
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </Modal>
      <Header user={user} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{ marginTop: 10, paddingVertical: 20 }}
      >
        {detail[excercise].map((item, index) => (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 220,
              marginTop: 15,
            }}
            onPress={() => {
              setModalVisible(true);
              setModalData(item);
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "90%",
                height: 180,
                borderRadius: 9,
                marginTop: 20,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                color: Colors.white,
                marginTop: 5,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExcerciseDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.orange },
});
