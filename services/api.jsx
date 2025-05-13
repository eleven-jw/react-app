import axios from 'axios';
import { config } from 'webpack';

// Example of creating an Axios instance
const api = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        // Add any custom headers or authentication tokens here
        const token = localStorage.getItem('token'); // Example of getting a token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // Handle successful response
            console.log('Response data:', response.data);
            return response.data;
        } else {
            // Handle non-200 status codes
            console.error('Unexpected response status:', response.status);
            return Promise.reject(new Error(`Unexpected response status: ${response.status}`));
        }
    },
    error => {
        // Handle response error
        if (error.response) {
            // 服务器返回了错误状态码（如 401、500）
            switch (error.response.status) {
                case 401:
                    // Token 过期，跳转登录页
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error('未知错误:', error.response.status);
            }
            console.error('Response error:', error.response.status);
        } else if (error.request) {
            console.error('Network error:', error.message);
        } else {
            console.error('Request Error:', error.toString());
        }
        return Promise.reject(error);
    }
);
// GET request
export const fetchData = async (endpoint) => {
    const response = await api.get(endpoint);
    return response.data;
    
};

// POST request
export const postData = async (endpoint, data) => {
    const response = await api.post(endpoint, data);
    return response.data;
};

const handleError = (error) => {
    if(error.response) {
        console.error('Server error:', error.response.status);
    }else if(error.request) {
        console.error('Network error:', error.message);
    } else {
        console.error('Request Error:', error.toString());
    }
}
export default api;