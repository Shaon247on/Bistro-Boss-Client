import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxios = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    // interceptor for get request
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (err) {
        return Promise.reject(err)
    })

    // interceptor for 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (err) => {
        const status = err.response.status
        if (status === 401 || status === 403) {

            await logOut()
            navigate('/login')
        }
        return Promise.reject(err)
    })
    return axiosSecure
};

export default useAxios;