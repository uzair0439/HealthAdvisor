import { StyleSheet } from "react-native";
import { Colors } from "./Constants";

export const MainStyles = StyleSheet.create({
  cardStyles: {
    backgroundColor: Colors.white,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderTopEndRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "500",
    color: Colors.white,
    textAlign: "center",
    lineHeight: 30,
  },
});
