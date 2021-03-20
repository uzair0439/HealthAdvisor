import axios from "axios";
import { API_ROUTES } from "./routes";
import { getUser } from "./utills";

const request = async (config) => {
  const token = await getUser();
  // console.log(token);
  config["headers"] = {
    ...config.headers,
    Accept: "application/json",
    Authorization: token,
  };
  // console.log({...config});
  return axios({
    ...config,
  })
    .then((res) => {
      // console.log('request return', res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log({err});
      return { err };
    });
};
export const loginUserToDB = (data) => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.login,
    method: "POST",
    data: data,
  });
};

export const registerUserToDB = (data) => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.register,
    method: "POST",
    data: data,
  });
};

export const sendForgotRequest = (email) => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.forgotPassword,
    method: "POST",
    data: email,
  });
};

export const compareTokensAtDB = (token) => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.compareToken,
    method: "POST",
    data: token,
  });
};
export const changePasswordAtDB = (data) => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.resetPassword,
    method: "PUT",
    data: data,
  });
};

export const getUserDataFromDB = () => {
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.getMe,
    method: "GET",
  });
};

export const uploadProfilePhoto = (data, id) => {
  return request({
    url: `${API_ROUTES.baseUrl}${API_ROUTES.profilePhoto}/${id}`,
    method: "PUT",
    data: data,
  });
};

export const updateUserProfile = (data) => {
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.update,
    method: "PUT",
    data: data,
  });
};

export const addUserDietToDB = (data) => {
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.addDiet,
    method: "PUT",
    data: data,
  });
};

export const getUserDietFromDB = () => {
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.addDiet,
    method: "Get",
  });
};

export const deleteUserDietFromDB = () => {
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.addDiet,
    method: "DELETE",
  });
};

export const getFoodFromDB = () => {
  return axios({
    url: API_ROUTES.baseUrl + API_ROUTES.getFood,
    method: "GET",
  });
};
export const changeUserPassword = (password) => {
  console.log("Function" + password);
  return request({
    url: API_ROUTES.baseUrl + API_ROUTES.change,
    method: "PUT",
    data: password,
  });
};
