import axios from 'axios'
//设置请求拦截器
axios.interceptors.request.use(config => {
    console.log('请求拦截开始了！')
    if (localStorage.getItem('MyToken')) {
        //全局设置请求头信息，加入Token
        config.headers['Authorization'] = localStorage.getItem('MyToken')
    }
    return config
})
//设置响应拦截器
axios.interceptors.response.use(config => {
    console.log('响应拦截开始了！')
    return config
},err=>{
    console.log('服务器请求出现错误了！')
    console.log('response:',err.response)
    // if(err.response.status == 401 || err.response.status == 500){
    if(err.response.status == 401){
        localStorage.removeItem('MyToken')
        localStorage.removeItem('userName')
    }
    return Promise.reject(err)
})
export default axios