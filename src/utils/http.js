import axios from 'axios';

const baseURL = 'http://localhost:8080/src/';
const axiosInstance = axios.create({
    baseURL
});

const errorHandler = (res) => {
    const data = res.data;
    if (data.result.code != 0) {
        return null;
    }
    return data;
};



export const get = function() {
   return axiosInstance.get.apply(axiosInstance, arguments).then(errorHandler);
}
export const post = function() {
    return axiosInstance.post.apply(axiosInstance, arguments).then(errorHandler);
}