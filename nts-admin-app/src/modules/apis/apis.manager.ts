import axiosInstance, { getAxiosError } from '@/modules/apis/index';
import type {
	ManagerType,
	RequestAddManagerType,
	RequestUpdateManagerType,
} from '@/types/types.manager';

export const loadManager = async <T = ManagerType[]>(teamType: 'NTS' | 'AM') => {
	try {
		const response = await axiosInstance.get<T>(`manager/team/${teamType}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const loadManagerById = async <T = ManagerType>(id: string) => {
	try {
		const response = await axiosInstance.get<T>(`manager/${id}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const addManager = async <T = { idx: number }, D = RequestAddManagerType>(data: D) => {
	try {
		const response = await axiosInstance.post<T>('manager/signup', data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const editManager = async <D = RequestUpdateManagerType>(id: string, data: D) => {
	try {
		const response = await axiosInstance.put(`manager/${id}`, data);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const deleteManager = async <D = string>(id: D) => {
	try {
		const response = await axiosInstance.delete(`manager/${id}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
