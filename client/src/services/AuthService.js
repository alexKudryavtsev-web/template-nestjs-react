import axios from 'axios';
import $api, { API_URL } from '../http';

class AuthService {
  static async registration(
    email,
    firstName,
    lastName,
    password,
    gender,
    agree,
  ) {
    return axios.post(`${API_URL}/user`, {
      email,
      firstName,
      lastName,
      password,
      gender,
      agree,
    });
  }

  static async login(email, password) {
    return $api.post(`session`, { email, password });
  }
  static async logout() {
    return $api.delete('session');
  }
}

export default AuthService;
