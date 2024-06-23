import type {
	RequestAddSponsorType,
	RequestUpdateSponsorType,
	SponsorType,
} from '@/types/types.sponsor';
import axiosInstance, { getAxiosError } from '@/modules/apis/index';

export const loadSponsor = async <T = SponsorType[]>() => {
	try {
		const response = await axiosInstance.get<T>('sponsor');
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const addSponsor = async <T = { idx: number }, D = RequestAddSponsorType>(data: D) => {
	try {
		const response = await axiosInstance.post<T>('sponsor', data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const editSponsor = async <D = RequestUpdateSponsorType>(idx: number, data: D) => {
	try {
		const response = await axiosInstance.put(`sponsor/${idx}`, data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const deleteSponsor = async <D = number>(idx: D) => {
	try {
		const response = await axiosInstance.delete(`sponsor/${idx}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
