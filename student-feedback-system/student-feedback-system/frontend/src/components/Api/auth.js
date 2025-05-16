// frontend/src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

export const signup = (userData) => API.post('/auth/signup', userData);