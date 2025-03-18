import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/";

class UserService {
    authenticate(User) {
        return axios.post(`${API_BASE_URL}/customer`, User);
    }

    loadCustomerProfile() {
        return axios.post(`${API_BASE_URL}/customerProfile`);
    }
}

export default new UserService();
