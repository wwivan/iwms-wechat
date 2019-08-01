// 引入 axios
import axios from 'axios';
import {
  Toast
} from 'vant';
import router from '@/router';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://47.111.87.217:2080/iwms-api/api';
} else {
  axios.defaults.baseURL = 'http://47.111.87.217:2080/iwms-api/api';
}
// 请求拦截
// axios.interceptors.request.use(function (config) {
//   if (localStorage.token) {
//     config.headers.Authorization = "Bearer " + localStorage.token
//   }

//   return config;
// }, function (error) {
//   return Promise.reject(error)
// })

// 超时时间
axios.defaults.timeout = 10000;
// axios.defaults.withCredentials = true;
// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && localStorage.appid) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          });
          break;
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  log("请求地址:" + url);
  log("请求参数:" + JSON.stringify(params));
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        "resquestParam": params,
        "signature": "7447D0441882CAA7070646C0DA7646E7AA854778",
        "sysParam": {
          "appId": "5032022018001"
        }
      })
      .then(res => {
        log("request result:\n" + JSON.stringify(res.data));
        try {
          if (res.data === undefined || res.data === "") {
            reject({
              code: -1,
              message: "数据解析失败"
            });
          }
          let response = res.data;
          if (response.code === 0 || response.code === "0") {
            resolve(response);
          } else {
            reject(response);
          }
        } catch (error) {
          reject({
            code: -1,
            message: "数据解析失败"
          });
        }
      })
      .catch(err => {
        log("request failed:");
        log(err);
        if (err.message.startsWith("timeout")) {
          reject({
            code: -1,
            message: "网络请求超时"
          })
        } else {
          reject({
            code: -1,
            message: "数据解析失败"
          })
        }
      });
  });
}

let isDebug = process.env.NODE_ENV === "development";

function log(content) {
  if (isDebug) {
    console.log(content);
  }
}