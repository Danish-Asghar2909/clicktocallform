import axios from 'axios';

const reqres = axios.create({ baseURL: 'https://reqres.in/api' });

export const registerNewUser = userData => {
  // return reqres.post('/register', userData);
  return axios.post('http://localhost:3000/agents', userData);
}