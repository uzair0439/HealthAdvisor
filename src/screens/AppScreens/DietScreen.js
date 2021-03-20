import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../global/Constants";
import { MainStyles } from "../../global/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import { addUserDietToDB, getUserDataFromDB } from "../../res/services";
import { update } from "../../global/Global";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import DaysModal from "./components/DaysModal";
import MealModal from "./components/MealModal";
import FoodModal from "./components/FoodModal";
const DietScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [mealTimeModal, setMealTimeModal] = useState(false);
  const [day, setDay] = useState("");
  const [meal, setMeal] = useState("");
  const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);
  const [dataForUpload, setDataForUpload] = useState(null);
  useEffect(() => {
    _getUser();
  }, []);
  const _getUser = () => {
    getUserDataFromDB()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  const save = () => {
    addUserDietToDB(dataForUpload)
      .then((res) => {
        setDay("");
        setMeal("");
        setDataForUpload(null);
        alert("Diet Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("An Error Occured");
      });
  };
  return (
    <View style={styles.container}>
      <Header user={user} navigation={navigation} />
      <DaysModal
        visible={dayModalVisible}
        selectDay={(text) => {
          setDay(text);
          setDayModalVisible(false);
          setMeal("");
        }}
      />
      <MealModal
        visible={mealTimeModal}
        selectMeal={(text) => {
          setMeal(text);
          setMealTimeModal(false);
        }}
      />
      <FoodModal
        visible={isFoodModalVisible}
        onPress={(data) => {
          setIsFoodModalVisible(false);
          if (!dataForUpload) {
            const temp = {
              day: day,
              meals: [
                {
                  food: data,
                  meal: meal,
                },
              ],
            };
            setDataForUpload(temp);
          } else {
            let newData = dataForUpload.meals;
            let selected = false;
            data.forEach((el) => {
              if (el.meal === meal) {
                selected = true;
              }
            });
            if (selected) {
              return alert(
                "Meal already selected please select a different meal"
              );
            }

            newData.push({ food: data, meal: meal });
            const temp = {
              day: day,
              meals: newData,
            };
            setDataForUpload(temp);
            console.log(dataForUpload);
          }
        }}
      />
      <View style={styles.title}>
        <Text style={MainStyles.title}>Diet Planner</Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <Text style={MainStyles.title}>
            Please select a day and select the diet for each day
          </Text>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => setDayModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: Colors.secondary,
              }}
            >
              {day === "" ? "Select a day" : day}
            </Text>
            <Icon name="chevron-down" size={20} color={Colors.secondary} />
          </TouchableOpacity>
          {day !== "" && (
            <View style={{ marginTop: 10 }}>
              <Text style={MainStyles.title}>{day}</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={(text) => {
                  setMealTimeModal(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: Colors.secondary,
                  }}
                >
                  Select a Meal
                </Text>
                <Icon name="chevron-down" size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          )}
          {meal !== "" && (
            <View>
              <Text style={MainStyles.title}>{meal}</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  console.log(dataForUpload);
                  if (dataForUpload) {
                    const temp = Object.assign(dataForUpload);
                    let selected = false;
                    temp.meals.forEach((element) => {
                      if (element.meal === meal) {
                        selected = true;
                      }
                    });
                    if (selected) {
                      return alert(
                        "Please select a different meal for the day"
                      );
                    }
                  }
                  setIsFoodModalVisible(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: Colors.secondary,
                  }}
                >
                  Select a Food
                </Text>
                <Icon name="chevron-down" size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          )}
          {dataForUpload && (
            <View>
              <Text style={MainStyles.title}>
                Selected: {dataForUpload.day}
              </Text>
              {dataForUpload &&
                dataForUpload.meals.map((el, index) => (
                  <View
                    style={{
                      padding: 10,
                      borderColor: Colors.white,
                      borderRadius: 8,
                      borderWidth: 1,
                      marginTop: 10,
                    }}
                  >
                    <Text style={MainStyles.title}>{el.meal}</Text>
                    {el &&
                      el.food.map((food, index) => (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Text style={{ fontSize: 16, color: Colors.white }}>
                            {food.food}
                          </Text>
                          <Text style={{ fontSize: 16, color: Colors.white }}>
                            {food.calorie}cal
                          </Text>
                        </View>
                      ))}
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.addDiet} onPress={() => save()}>
          <Text style={styles.addDietText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DietScreen;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // width: Dimensions.get("window").width - 30,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    // width: Dimensions.get("window").width - 30,
    // paddingHorizontal: 10,
    paddingVertical: 1,

    // borderWidth: 0.5,
    // borderColor: 'purple',
    // borderRadius: 8,
    color: Colors.white,
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
    // paddingLeft: 10,
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    flex: 0.1,
    width: "100%",
    alignItems: "center",
  },
  pickerContainer: { flexDirection: "row", justifyContent: "space-between" },
  body: { flex: 0.75, width: "100%", paddingHorizontal: 20 },
  addDiet: {
    backgroundColor: Colors.secondary,
    height: 40,
    width: 170,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 50 / 2,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  smallPicker: {
    height: 30,
    width: "25%",
    borderColor: Colors.orange,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  addDietText: { fontSize: 15, color: Colors.white },
  button: { flex: 0.1 },
});
