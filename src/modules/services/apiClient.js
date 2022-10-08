import axios from "axios";

const BASE_URL = "http://localhost:3000";

const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUyNTI4NzUsImV4cCI6MTY2NTMzOTI3NX0.g8MpeObZGgp4kXPygS1DaZhsPaKmApeWLk1yT0PVjKM";

const ApiClient = {
  getAllStocks: () => {
    return axios.get(`${BASE_URL}/stock/`, {
      headers: {
        Authorization: bearerToken,
      },
    });
  },

  getAllProducts: () => {
    return axios.get(`${BASE_URL}/product/`, {
      headers: {
        Authorization: bearerToken,
      },
    });
  },

  getAllStores: () => {
    return axios.get(`${BASE_URL}/store/`, {
      headers: {
        Authorization: bearerToken,},
    });
  },

  addNewStock: (newStock) => {
    return axios.post(`${BASE_URL}/stock/`, newStock, {
      headers: {
        Authorization: bearerToken,},
    });
  },
};
export default ApiClient;

//curl --request GET \
//   --url http://localhost:3000/stock/ \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUyNTI4NzUsImV4cCI6MTY2NTMzOTI3NX0.g8MpeObZGgp4kXPygS1DaZhsPaKmApeWLk1yT0PVjKM'
