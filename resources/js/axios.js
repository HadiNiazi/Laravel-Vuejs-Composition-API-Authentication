import axios from 'axios';

axios.interceptors.request.use(
  config => {

    const authToken = localStorage.getItem('token');

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  error => {

    return Promise.reject(error);
  }
);

export default axios;
