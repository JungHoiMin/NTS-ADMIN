import axios, { isAxiosError } from 'axios';
import type { ResponseErrorType } from '@/types/types.axios';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import router from '@/router';

export const getAxiosError = (e: unknown) => {
	if (isAxiosError<ResponseErrorType, any>(e)) {
		if (e.response) {
			if (e.response.data.statusCode === 401 && e.response.data.message === 'Unauthorized') {
				HmPopupMessage.alert(
					'인증 오류',
					'<strong style="color: red">사용자 인증을 다시해야합니다.</strong>\n확인을 누르시면 로그인 화면으로 돌아갑니다.',
				).then(async () => {
					await router.push({ name: 'Login' });
				});
			} else return new Error(e.response.data.message);
		} else if (e.request) {
			return new Error(
				'요청이 전송 되었으나, 응답이 수신되지 않았습니다.\n서버와의 연결을 확인해 보시기 바랍니다.',
			);
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

export const getAuthorizationToken = () => {
	return axiosInstance.defaults.headers.common['Authorization'];
};

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_APP_API_URL}api/`,
	timeout: 1000,
});

export default axiosInstance;
