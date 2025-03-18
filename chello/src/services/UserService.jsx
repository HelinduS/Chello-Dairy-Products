import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

class UserService {
    createUser(User) {
        return axios.post(`${API_BASE_URL}/customer`, User);
    }

    createCustomerProfile(customer) {
        return axios.post(`${API_BASE_URL}/customerProfile`, customer);
    }
}

export default new UserService();
