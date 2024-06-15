import type { InsuranceType } from '@/types/types.insurance';
import axiosInstance, { getAxiosError } from '@/modules/apis/index';

export const loadInsuranceList = async <T = InsuranceType[]>() => {
	try {
		const response = await axiosInstance.get<T>('insurance');
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
