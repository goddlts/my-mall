import axios from 'axios'
export default {
  install (Vue) {
    // 创建一个新的axios实例，并设置baseURL
    const instance = axios.create({
      baseURL: 'http://localhost:8888/api/private/v1/',
      timeout: 10000
      // headers: {'X-Custom-Header': 'foobar'}
    })
    
    Vue.prototype.axios = instance
  }
}