import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Colors, FoodPickerData } from "../../../global/Constants";
import { MainStyles } from "../../../global/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import CommonButton from "../../../components/CommonButton";
import { getFoodFromDB } from "../../../res/services";
const FoodModal = ({ visible, onPress }) => {
  const [data, setData] = React.useState([]);
  const [food, setFood] = useState([
    { label: "Asparagus", calories: 16, selected: false },
    { label: "Black Olives", calories: 16, selected: false },
    { label: "Cabbage", calories: 25, selected: false },
    { label: "Carrot", calories: 40.98, selected: false },
    { label: "Cauliflower", calories: 23, selected: false },
    { label: "Cucumber", calories: 17, selected: false },
    { label: "Peas", calories: 79, selected: false },
    { label: "Potato", calories: 77, selected: false },
    { label: "Pumpkin", calories: 26, selected: false },
    { label: "Spinach", calories: 23, selected: false },
    { label: "Apple", calories: 45, selected: false },
    { label: "Banana", calories: 95, selected: false },
  ]);
  const [picker, setPicker] = useState(null);
  useEffect(() => {
    _getFood();
  }, []);
  const _getFood = () => {
    getFoodFromDB()
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal isVisible={visible}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            height: "95%",
            width: "95%",
            backgroundColor: Colors.orange,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={MainStyles.title}>{"Please select a food"}</Text>
          {food &&
            food.map((item, index) => (
              <View style={{ height: 100, width: "90%" }}>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor:
                      item && item.selected ? Colors.secondary : Colors.white,
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={{
                      color: Colors.orange,
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {item && item.label}
                  </Text>
                  <Text>{item && item.calories}cal/100g</Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    marginTop: 8,
                    height: 30,
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <RNPickerSelect
                    onValueChange={(value) => {
                      if (data.length > 2) {
                        return alert("You can select 3 foods");
                      }
                      let temp = [...food];
                      temp[index].selected = true;
                      setFood(temp);
                      let tempData = [...data];
                      let selected = false;
                      tempData.forEach((el) => {
                        if (el.food === item.label) {
                          selected = true;
                        }
                      });
                      if (selected) {
                        return alert("Already Selected");
                      }
                      tempData.push({
                        food: item.label,
                        quantity: value,
                        calorie: (item.calories * (value / 100)).toFixed(1),
                      });
                      setData(tempData);
                    }}
                    placeholder={{
                      label: "Please select quantity",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    items={[
                      { label: "50g", value: 50 },
                      { label: "100g", value: 100 },
                      { label: "150g", value: 150 },
                      { label: "200g", value: 200 },
                      { label: "300g", value: 250 },
                      { label: "350g", value: 350 },
                      { label: "400g", value: 400 },
                      { label: "450g", value: 450 },
                      { label: "500g", value: 500 },
                      { label: "550g", value: 550 },
                      { label: "600g", value: 600 },
                      { label: "650g", value: 650 },
                      { label: "700g", value: 700 },
                      { label: "750g", value: 750 },
                      { label: "800g", value: 800 },
                      { label: "850g", value: 850 },
                      { label: "900g", value: 900 },
                      { label: "950g", value: 950 },
                      { label: "1000g", value: 1000 },
                    ]}
                    useNativeAndroidPickerStyle={false}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (data.length !== 0) {
            setFood([
              { label: "Asparagus", calories: 16, selected: false },
              { label: "Black Olives", calories: 16, selected: false },
              { label: "Cabbage", calories: 25, selected: false },
              { label: "Carrot", calories: 40.98, selected: false },
              { label: "Cauliflower", calories: 23, selected: false },
              { label: "Cucumber", calories: 17, selected: false },
              { label: "Peas", calories: 79, selected: false },
              { label: "Potato", calories: 77, selected: false },
              { label: "Pumpkin", calories: 26, selected: false },
              { label: "Spinach", calories: 23, selected: false },
              { label: "Apple", calories: 45, selected: false },
              { label: "Banana", calories: 95, selected: false },
            ]);
            setData([]);
            onPress(data);
          } else {
            alert("Please select foods");
          }
        }}
        style={{
          height: 40,
          width: 200,
          borderRadius: 50 / 2,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.secondary,
        }}
      >
        <Text>Select</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default FoodModal;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: Dimensions.get("window").width - 30,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    width: Dimensions.get("window").width - 30,
    // paddingHorizontal: 10,
    paddingVertical: 1,
    // borderWidth: 0.5,
    // borderColor: 'purple',
    // borderRadius: 8,
    color: "black",
    // paddingRight: 30, // to ensure the text is never behind the icon
    // paddingLeft: 10,
  },
});
const styles = StyleSheet.create({
  day: {
    width: "100%",
    marginTop: 10,
    height: 30,
    borderRadius: 30 / 2,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
