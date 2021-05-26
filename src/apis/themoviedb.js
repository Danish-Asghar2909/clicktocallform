import axios from 'axios';

const themoviedb = axios.create({ baseURL: 'https://api.themoviedb.org/3' });
const apiKey = '90f7d0d14df79718584c844d5c68a004';

export const requestToken = () => {
  return themoviedb.get(`/authentication/token/new?api_key=${apiKey}`);
}

export const createSession = userData => {
  return themoviedb.post(`/authentication/token/validate_with_login?api_key=${apiKey}`, userData);
}