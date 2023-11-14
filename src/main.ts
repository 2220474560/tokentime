/* import './assets/main.css' */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 导入axios的默认导入
import type { AxiosInstance,  InternalAxiosRequestConfig ,AxiosRequestHeaders } from 'axios' // 导入AxiosRequestConfig的类型导入
import { refreshToken,refreshAccessToken } from './tokenService'; //引入刷新token函数

// 全局注册element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)
app.config.globalProperties.$refreshToken = refreshToken; // 刷新token
axios.defaults.baseURL = 'http://150.158.53.178:2053'

// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create()
// 设置 axios
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      }
      Object.assign(config.headers, { Authorization: `Bearer ${jwtToken}` });
    }
    return config 
  },
  (error) => {
    return Promise.reject(error)
  }
)
app.provide<AxiosInstance>('axios', axiosInstance)

 // 定时调用刷新 token 的函数
const refreshTokenInterval = setInterval(() => {
  console.log('Checking and refreshing token...'); // 添加这行日志
  const oldToken = localStorage.getItem('token');
  if (oldToken) {
    refreshAccessToken(oldToken);
  }
  // 检测是否处于登录页面的代码,如果是登录页面就清理掉定时器
if (document.getElementById('login-page')) {
  clearInterval(refreshTokenInterval);
}
}, 3600000);


app.use(router).use(ElementPlus)
app.mount('#app')
