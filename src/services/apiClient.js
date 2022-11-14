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

  // TODO
  getAllStocksPaginated: (jwt) => {
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

  addNewProduct: (jwt, newProduct) => {
    return axios.post(`${BASE_URL}/product/`, newProduct, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  deleteProduct: (jwt, productId, ) => {
    return axios.delete(`${BASE_URL}/product/${productId}`,  {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getAllStores: (jwt) => {
    return axios.get(`${BASE_URL}/store/`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  addNewStore: (jwt, newStore) => {
    return axios.post(`${BASE_URL}/store/`, newStore, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  deleteStore: (jwt, storeId, ) => {
    return axios.delete(`${BASE_URL}/product/${storeId}`,  {
      headers: {
        Authorization: jwt,
      },
    });
  },


  addNewStock: (jwt, newStock) => {
    return axios.post(`${BASE_URL}/stock/`, newStock, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  increaseStock: (jwt, stockId, qty) => {
    return axios.put(`${BASE_URL}/stock/${stockId}/increase/${qty}`,  {},{
      headers: {
        Authorization: jwt,
      },
    });
  },

  deleteStock: (jwt, stockId, ) => {
    return axios.delete(`${BASE_URL}/stock/${stockId}`,  {
      headers: {
        Authorization: jwt,
      },
    });
  },
};
export default ApiClient;
