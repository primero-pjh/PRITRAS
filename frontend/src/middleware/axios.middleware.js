import axios from 'axios';

axios.interceptors.request.use((config) => {
	let token = window.$c.getCookie('token');  // Browser-Cookie에 저장된 token을 가져온다.
	config.headers["Authorization"] = `Bearer ${token}`;
	return config;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
	let response = res.data;
	return res;
}, (error) => {
	// ERR_BAD_REQUEST, Unauthorized
	if (error.response?.status === 401) {
		window.$c.UNAUTHORIZED_CONFIRM();
	}
	return Promise.reject(error);
});

export default axios;