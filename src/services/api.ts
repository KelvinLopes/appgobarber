import axios from 'axios';
import apiUrl from '../../baseUrl';

const api = axios.create({
  baseURL: apiUrl,
});

export default api;