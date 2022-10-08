import axios from "axios";
import { baseUrl } from "./baseAPI";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(async (req) => {
    // const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    // const refresh_token = Cookies.get(REFRESH_TOKEN_KEY)
    // if (accessToken) return req
    // if (refresh_token) {
    //     try {
    //         const res = await axios.post(refreshTokenApi, {
    //             "refresh_token": refresh_token
    //         })
    //         Cookies.set(ACCESS_TOKEN_KEY, res.data.data.newTokens.access_token, { expires: 1 / 24 })
    //         Cookies.set(REFRESH_TOKEN_KEY, res.data.data.newTokens.refresh_token, { expires: 7 })
    //         req.headers.Authorization = `Bearer ${res.data.data.newTokens.access_token}`
    //         return req
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // } else {
    //     return req
    // }
}
)
axiosInstance.interceptors.response.use((res) => {
    return res
}, err => {
    // console.log(err.response.status)
    // if (err.response.status === 401) {
    //     Cookies.remove()
    //     localStorage.clear()
    //     console.log('redirect login')
    //     if(window.location.pathname=== '/login' || window.location.pathname=== '/register' || window.location.pathname=== '/forgot' ) return
    //     window.location.pathname = '/login'
    // }
    return Promise.reject(err);
}
);
export default axiosInstance;