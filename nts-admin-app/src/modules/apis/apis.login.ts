import type { RequestLoginType, ResponseLoginType } from '@/types/types.login';
import axiosInstance, { getAxiosError } from '@/modules/apis/index';

export const login = async <T = ResponseLoginType, R = RequestLoginType>(data: R) => {
	try {
		const response = await axiosInstance.post<T>('/manager/login', data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
