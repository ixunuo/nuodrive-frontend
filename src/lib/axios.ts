import axios from 'axios'
import qs from 'qs'

export const baseURL = 'http://106.15.121.35:30001/'

const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config = {...config, data: qs.stringify(config.data)}
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export default axiosInstance
