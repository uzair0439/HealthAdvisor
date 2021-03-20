import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Colors } from "../../global/Constants";
import { Pedometer } from "expo-sensors";
import moment from "moment";
import {
  deleteUserDietFromDB,
  getUserDataFromDB,
  getUserDietFromDB,
} from "../../res/services";
import Header from "./components/Header";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/Entypo";
import { update } from "../../global/Global";
import Loader from "../../components/Loader";
const HomeScreen = ({ navigation }) => {
  const [diet, setDiet] = useState(null);
  const [user, setuser] = useState(null);
  const [state, setState] = update.use();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDiet();
  }, [state]);
  const getDiet = () => {
    setLoading(true);
    getUserDietFromDB()
      .then((res) => {
        setDiet(res.data.data);
        console.log(res.data.data);
        getUserData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getUserData = () => {
    getUserDataFromDB()
      .then((res) => {
        setuser(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const deleteDiet = () => {
    deleteUserDietFromDB()
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Header user={user && user} navigation={navigation} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={styles.title}>WELCOME TO HEALTH ADVISOR</Text>
        <Icon
          name="cycle"
          color={Colors.white}
          size={30}
          onPress={() => getDiet()}
        />
      </View>
      <Loader visible={loading} />
      <ScrollView>
        <View style={styles.graph}>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            yAxisSuffix="kCal"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.secondary,
              backgroundGradientFrom: Colors.secondary,
              backgroundGradientTo: Colors.orange,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: Colors.white,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              alignSelf: "center",
            }}
          />
        </View>
        <View style={styles.dietPlanner}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{"User Current Diet"}</Text>
            <Icon
              name={"trash"}
              size={30}
              color={Colors.white}
              onPress={() =>
                Alert.alert(
                  "Delete Plan",
                  "Are you sure want to delete diet plan",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "Yes", onPress: () => deleteDiet() },
                  ],
                  { cancelable: false }
                )
              }
            />
          </View>
          {diet &&
            diet.map((item, index) => (
              <View style={styles.dietEntry} key={index.toString()}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {item.userDiet.day}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.userDiet.meals.map((day, index) => (
                    <View
                      style={{
                        flex: 0.4,
                        backgroundColor: Colors.secondary,
                        padding: 10,
                        height: "100%",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>{day.meal}</Text>
                      {day.food.map((meal, index) => (
                        <Text style={{ marginTop: 5, fontSize: 10 }}>
                          {meal.food} {meal.calorie}cal
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    flex: 1,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "500",
    color: Colors.white,
  },
  graph: {
    backgroundColor: Colors.white,
    marginTop: 10,
  },
  dietPlanner: { marginTop: 10 },
  dietEntry: {
    height: 120,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
});
