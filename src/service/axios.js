import axios from 'axios';
import { base_url } from '../Config/Auth';

const axiosClient = axios.create({
  baseURL: base_url,
  timeout: 10000,
});



axiosClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token').replace('"',"").replace('"',"")} `
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;


// import axios from 'axios';
// import { API_URL } from '../../Config/Auth';

// const axiosClient = axios.create({
//   baseURL: API_URL, // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// axiosClient.interceptors.request.use(
//   config => {
//     // Attach access token to the request header
//     const accessToken = sessionStorage.getItem('token').replace('"',"").replace('"',"");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosClient.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     const refreshToken = sessionStorage.getItem('refresh_token').replace('"',"").replace('"',"");

//     // Check if the error is due to an expired access token
//     if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
//       originalRequest._retry = true;

//       try {
//         // Use your logic to refresh the access token using the refresh token
//         const { data } = await axios.post(`${API_URL}/api/token/refresh`, {refresh: refreshToken });
//         console.log("access",data);
//         // Update the access token in local storage
//         sessionStorage.setItem('token', data.access);
//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${data.access}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh error (e.g., redirect to login page)
//         console.error('Error refreshing token:', refreshError);
//         // Logout or redirect to login page
//         // Example: history.push('/login');
//         sessionStorage.clear();
      
//         // Redirect the user to the homepage
//         window.location.href = "/signin";
  
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
