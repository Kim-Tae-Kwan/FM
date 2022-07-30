import axios from "axios";

export const instance = axios.create({
    baseURL:'http://192.168.240.250:8080/api/v1',
})
instance.interceptors.request.use(
    (config)=>{
        config.headers.Authorization = 'Bearer '+ localStorage.getItem("accessToken")
        return config;
    },
    (err) => {
        console.log(err)
        return Promise.reject(err);
    }
)
instance.interceptors.response.use(
    (res)=>{
        // config.headers.Authorization = 'Bearer '+ localStorage.getItem("accessToken")
        return res;
    },
    (err) => {
        console.log(err)
        return Promise.reject(err);
    }
)