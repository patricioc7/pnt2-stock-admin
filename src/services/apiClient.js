import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ApiClient = {

  login: (body) => {
    return axios.post(`${BASE_URL}/user/login`, body);
  },

  getAllStocks: (jwt) => {
    return axios.get(`${BASE_URL}/stock/`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getAllProducts: (jwt) => {
    return axios.get(`${BASE_URL}/product/`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getAllStores: (jwt) => {
    return axios.get(`${BASE_URL}/store/`, {
      headers: {
        Authorization: jwt,},
    });
  },

  addNewStock: (jwt, newStock) => {
    return axios.post(`${BASE_URL}/stock/`, newStock, {
      headers: {
        Authorization: jwt,},
    });
  },
};
export default ApiClient;