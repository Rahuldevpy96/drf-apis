import axios from 'axios';
import Cookies from 'js-cookie';

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

authAxios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        // const accessToken = token;
        if (token) {
            config.headers.authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authAxios;