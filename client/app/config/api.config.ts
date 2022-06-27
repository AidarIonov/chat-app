import axios from 'axios'
import Cookies from 'js-cookie'


export const API_URL = `${process.env.APP_SERVER_URL}/api`
export const axiosClient = axios.create({
    // baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
})

const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
})

axiosAuth.interceptors.request.use(config => {
    const accessToken = Cookies.get('accessToken')

    if (config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})
export default axiosAuth
