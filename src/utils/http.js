import axios from 'axios';

const axiosInstance = axios.create({});

const errorHandler = (res) => {
    if (res.result.code != 0) {
        return null;
    }
    return res.result;
};

export const get = function() {
   return axiosInstance.get.apply(axiosInstance, arguments).then(errorHandler);
}
export const post = function() {
    return axiosInstance.post.apply(axiosInstance, arguments).then(errorHandler);
}