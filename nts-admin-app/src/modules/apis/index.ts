import axios, { isAxiosError } from 'axios';
import type { ResponseErrorType } from '@/types/types.axios';

export const getAxiosError = (e: unknown) => {
	if (isAxiosError<ResponseErrorType, any>(e)) {
		console.error(e);
		if (e.response) {
			return new Error(e.response.data.message);
		} else if (e.request) {
			return new Error('요청이 전송 되었으나 응답이 수신되지 않았습니다.');
		} else {
			return new Error('오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.');
		}
	}
	return new Error('알 수 없는 오류');
};

export const setAuthorizationToken = (token: string) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common['Authorization'];
	}
};

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_APP_API_URL}api/`,
	timeout: 1000,
});

export default axiosInstance;
