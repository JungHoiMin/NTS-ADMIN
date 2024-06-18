import type { InsuranceType, RequestAddInsuranceType } from '@/types/types.insurance';
import axiosInstance, { getAxiosError } from '@/modules/apis/index';

export const loadInsuranceList = async <T = InsuranceType[]>() => {
	try {
		const response = await axiosInstance.get<T>('insurance');
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const addInsurance = async <T = { idx: number }, D = RequestAddInsuranceType>(data: D) => {
	try {
		const response = await axiosInstance.post<T>('insurance', data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const deleteInsurance = async <D = number>(idx: D) => {
	try {
		const response = await axiosInstance.delete(`insurance/${idx}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
}