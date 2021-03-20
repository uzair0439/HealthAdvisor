import AsyncStorage from "@react-native-async-storage/async-storage";
export const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email) || email.length == 0)
    return "Please provide a valid email";
  return "";
};

export const passwordValidator = (password) => {
  if (password.length < 5)
    return "Please provide a password of length more than 5";
  return "";
};

export const nameValidator = (name) => {
  if (name.length == 0) return "Please enter a value";
  return "";
};
export const confirmValidator = (password, repassword) => {
  if (password !== repassword || repassword.length == 0)
    return "Both passwords should match";

  return "";
};

export const setUser = async (token) => {
  try {
    const jsonValue = JSON.stringify(token);
    await AsyncStorage.setItem("token", jsonValue);
  } catch (e) {
    return e;
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return e;
  }
};
export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
