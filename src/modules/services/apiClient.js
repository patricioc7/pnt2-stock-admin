import axios from "axios";


const BASE_URL = "http://localhost:3000"

const ApiClient = {
    getAllStocks: () => {
        return axios

            .get(`${BASE_URL}/stock/`,
                {
                    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUyNTI4NzUsImV4cCI6MTY2NTMzOTI3NX0.g8MpeObZGgp4kXPygS1DaZhsPaKmApeWLk1yT0PVjKM'}
                }, )

    }
}
export default ApiClient;

//curl --request GET \
//   --url http://localhost:3000/stock/ \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUyNTI4NzUsImV4cCI6MTY2NTMzOTI3NX0.g8MpeObZGgp4kXPygS1DaZhsPaKmApeWLk1yT0PVjKM'