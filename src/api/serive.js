import axios from 'axios'
// import { Qs } from 'qs'//vue自带方法 如果未用到 无视即可
//axios配置
const http = axios.create({
    method: 'get',
    baseURL: 'http://localhost:3021/', //请求的url前缀
    withCredentials: false, //开启withCredentials后，服务器才能拿到你的cookie，当然后端服务器也要设置允许你获取你开启了才有用
    timeout: 5000, //请求超时
    headers: { //headers设置 如缓存等 没需求的话都可以不需要
        'X-Requested-With': 'XMLHttpRequest',
        // 'Access-Control-Allow-Origin': '',
        'Content-Type': 'text/html; charset=utf-8'
    }
});

// axios 请求拦截：
http.interceptors.request.use(config => {
    //通常处理token相关逻辑 
    // 判断localStorage 或者 SessionStorage 内有无token 进行相应处理 此处简单的做了个赋值token操作
    // let token = localStorage.getItem('mytoken');
    // config.headers['Authorization'] = token;
    // console.log(config)
    return config;
}, err => { return Promise.reject(err); });

// axios 响应拦截；
http.interceptors.response.use(res => {

    if (res.data.code == 0) {
        return Promise.reject(res.data.message);
    }
    return res.data;
}, err => {
    return Promise.reject(err.data);
});

export default http;