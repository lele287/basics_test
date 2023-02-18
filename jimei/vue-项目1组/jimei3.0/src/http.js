import axios from 'axios'
//设置请求拦截器
axios.interceptors.request.use(config => {
    // console.log('请求拦截开始了！');
    //全局设置请求头信息，加入Token
    config.headers['Authorization'] = localStorage.getItem('userToken');
    return config;
})

//设置响应拦截器
axios.interceptors.response.use(config => {
    // console.log('响应拦截开始了！');
    return config;
}, err => {
    console.log('服务器请求出现错误！');
    if (err.response.status == 401) {
        localStorage.removeItem('userToken')
    }
    return Promise.reject(err);
})

export default axios