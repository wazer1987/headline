import axios from 'axios'
import stor from '../stor/stor.js'
import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${stor.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
axios.interceptors.response.use((res) => {
  return res
},
(err) => {
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
export default axios
