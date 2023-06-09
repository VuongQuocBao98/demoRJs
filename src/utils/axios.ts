import axios from 'axios';
// config
import { HOST_API_KEY_CAMBRIDGE } from '../config-global';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API_KEY });
const axiosInstance = axios.create({ baseURL: HOST_API_KEY_CAMBRIDGE });

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
