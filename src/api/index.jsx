import axios from 'axios';
import { redirect } from 'react-router-dom';

//apply base url for axios
const API_URL = 'https://filesapi-6ytl.onrender.com/api/v1';


const axiosApi = axios.create({
	baseURL: API_URL,
});

axiosApi.defaults.headers.common['Content-Type'] = 'application/json';

axiosApi.interceptors.request.use(async (config) => {
    const token = window.localStorage.getItem('token-my-personal-workspace')
  
    const { headers } = config
    headers.Authorization = `Bearer ${token}`
  
    return { ...config, headers }
  })

axiosApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		console.log(error.code);
		if (error.code === 'ERR_NETWORK') {
			console.log('no internet')
			return Promise.reject(error);
		} else if (
			error.response.status === 403 ||
			error.response.status === 401
		) {
            localStorage.removeItem('token-my-personal-workspace')
			redirect('/');
		} else {
			return Promise.reject(error);
		}
	}
);

export async function get(url, config = {}) {
	return await axiosApi
		.get(url, { ...config })
		.then((response) => response.data);
}

export async function post(url, data, config = {}) {
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then((response) => response.data);
}

export async function put(url, data, config = {}) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then((response) => response.data);
}

export async function del(url, config = {}) {
	return await axiosApi
		.delete(url, { ...config })
		.then((response) => response.data);
}