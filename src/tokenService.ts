import axios from 'axios';

export function refreshToken(oldtoken: string) {
    const bearEr = `bearer ${oldtoken}`
    console.log(bearEr)
  return axios.post('/api/test/refresh', null,{
    headers:{
        Authorization:bearEr
    }
  });
}
// 刷新 token 的逻辑
export function refreshAccessToken(oldtoken: string) {
    return refreshToken(oldtoken)
      .then(response => {
        const newToken = response.data.data;
        // 将新的 token 存储到 localStorage 或 Vuex 等状态管理工具中
        localStorage.setItem('token', newToken);
      })
      .catch(error => {
        // 处理刷新 token 失败的情况
        console.error('刷新 token 失败', error);
      });
  }