import axios from "axios";

const BASE_URL = process.env.BASE_URL

const pageSize = 5;
const historyPageSize = 10;

const ApiClient = {
  login: (body) => {
    return axios.post(`${BASE_URL}/user/login`, body);
  },

  registerNewUser: (body) => {
    return axios.post(`${BASE_URL}/user`, body);
  },

  getAllStocks: (jwt) => {
    return axios.get(`${BASE_URL}/stock/`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getAllStocksPaginated: (jwt, page) => {
    console.log(jwt);
    return axios.get(
      `${BASE_URL}/stock/paginated?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
  },

  getStocksPages: (jwt) => {
    console.log(jwt);
    return axios.get(`${BASE_URL}/stock/pages?pageSize=${pageSize}`, {
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

  deleteProduct: (jwt, productId) => {
    return axios.delete(`${BASE_URL}/product/${productId}`, {
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

  deleteStore: (jwt, storeId) => {
    return axios.delete(`${BASE_URL}/store/${storeId}`, {
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

  sellStock: (jwt, stockId, customerId, qty) => {
    return axios.put(`${BASE_URL}/stock/${stockId}/sell/${customerId}/${qty}`,undefined, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  increaseStock: (jwt, stockId, qty) => {
    return axios.put(
      `${BASE_URL}/stock/${stockId}/increase/${qty}`,
      {},
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
  },

  deleteStock: (jwt, stockId) => {
    return axios.delete(`${BASE_URL}/stock/${stockId}`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getHistoryPaginated: (jwt, page) => {
    console.log(jwt);
    return axios.get(
      `${BASE_URL}/history?page=${page}&pageSize=${historyPageSize}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
  },

  getHistoryPages: (jwt) => {
    console.log(jwt);
    return axios.get(`${BASE_URL}/history/pages?pageSize=${historyPageSize}`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  getAllCustomers: (jwt) => {
    return axios.get(`${BASE_URL}/customer/`, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  addNewCustomer: (jwt, newCustomer) => {
    return axios.post(`${BASE_URL}/customer/`, newCustomer, {
      headers: {
        Authorization: jwt,
      },
    });
  },

  deleteCustomer: (jwt, customerId) => {
    return axios.delete(`${BASE_URL}/customer/${customerId}`, {
      headers: {
        Authorization: jwt,
      },
    });
  },
};
export default ApiClient;
