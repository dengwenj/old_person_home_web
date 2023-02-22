import axios from "axios";
import { message } from 'antd';

import { BASE_URL, TIMEOUT } from './config';
import history from '../utils/history';

import type { AxiosRequestConfig } from 'axios';

export default function request<T = any>(options: AxiosRequestConfig): Promise<T> {
  return new Promise(async (resolve, reject) => {
    // 创建 axios 实例
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT
    })

    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 请求成功的拦截
      // 在这里面可以统一设置 token
      const token = localStorage.getItem('old_person_home_token') || ''
      config.headers.Authorization = `Bearer ${token}`
      
      return config
    }, (err) => {
      // 请求失败的拦截
      return err
    })

    // 响应拦截
    instance.interceptors.response.use((response) => {
      // 响应成功的拦截
      return response.data
    }, (error) => {
      if (error.response.status === 401) {
        message.error(error.response.data.msg)
        history.push('/user/login');
      } else if (error.response.status === 404) {
        message.error(error.response.data.msg)
      } else if (error.response.status === 400) {
        message.error(error.response.data.msg)
      } else if (error.response.status >= 500) {
        message.error('服务器异常啦')
      } else {
        message.error(error.response.data.msg)
      }
    })

    try {
      const result: T = await instance.request(options)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export const apiPost = (url: string, data: Record<string, any>) => {
  return request({
    method: 'POST',
    url,
    data
  });
};
