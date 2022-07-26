import axios from 'axios';
import $api from '../http';

class AuthService {
  static async registration(
    email,
    firstName,
    lastName,
    password,
    gender,
    agree,
  ) {
    return axios.post('http://localhost:3000/api/user', {
      email,
      firstName,
      lastName,
      password,
      gender,
      agree,
    });
  }

  static async login(email, password) {
    return $api.post('session/login', { email, password });
  }
  static async logout() {
    return $api.post('session/logout');
  }
}

export default AuthService;
