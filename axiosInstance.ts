import axios from 'axios'
import { refreshToken } from './api/authApi'
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log('error', error)
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshTokenStocked = localStorage.getItem('refreshToken')
      if (!refreshTokenStocked) {
        return Promise.reject(error)
      }

      const responseToken = await refreshToken(refreshTokenStocked)
      const { accessToken } = responseToken

      localStorage.setItem('accessToken', accessToken)

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
