import axios from "axios";

let isRefresh = false;
let failedQueue = [];

const reqProcess = (err, token = null) => {
    failedQueue.forEach(param => {
        if (err) {
            param.reject(err)
        } else {
            param.resolve(token)
        }
    })

    failedQueue = [];
}

export const instance = axios.create({
    baseURL: 'http://192.168.240.250:8080/api/v1',
})

instance.interceptors.request.use(
    (config) => {
        if (!localStorage.getItem('accessToken')) {
            config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9HVUVTVCIsInR5cGUiOiJndWVzdEFjY2VzcyIsImVtYWlsIjoiZ3Vlc3RAbmF2ZXIuY29tIn0.TCIqypZpFXD6v185MPSQ6we1mcM9CGDxwqXcD1ZTuG8'
        } else {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)
instance.interceptors.response.use(
    (res) => {
        console.log(res)
        return res;
    },
    (err) => {
        const originReq = err.config
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem('accessToken')
        console.log(originReq)
        let body = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
        console.log(err)
        if (err.response.data.code === 'T003') {
            if (isRefresh) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject })
                }).then(() => {
                    originReq.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
                    return axios(originReq)
                }).catch(err => {
                    if (err.response.data.code === 'T004' || err.response.data.code === 'T007') {
                        // 재발급 실패. => 재로그인
                        alert('모든 토큰이 만료되었습니다 다시 로그인 하시길 바랍니다.')
                        axios.post('http://192.168.240.250:8080/api/v1/sign/signout',
                                    {email:localStorage.getItem('email')})
                                    .then(function (res) {
                                        localStorage.clear();
                                        window.location.href = "./";
                                    }).catch((err)=>{
                                        console.log(err)
                                    });
                    }
                    console.log('재발급 후 요청 실패')
                    console.log(err)
                    return Promise.reject(err)
                })
            }
            isRefresh = true;
            originReq._retry = true;

            return new Promise(function (resolve, reject) {
                axios.post('http://192.168.240.250:8080/api/v1/sign/get-newToken', body)
                    .then((res) => {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        localStorage.setItem("accessToken", res.data.accessToken);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                        originReq.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
                        reqProcess(null, res.data.accessToken)
                        resolve(axios(originReq))
                    }).catch((err) => {
                        reqProcess(err, null)
                        reject(err)
                    }).finally(() => { isRefresh = false })
            })
        }

        return Promise.reject(err)
        
        

    })


