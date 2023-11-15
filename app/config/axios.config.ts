//return axios config file

import axios from 'axios';
import { BASE_URL, DEFAULT_API_TIMEOUT } from '../constants/app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;