// team/:teamType/group
import axiosInstance, { getAxiosError } from '@/modules/apis/index';
import type { OptionType } from '@/types/types.options';

export const loadManagerGroupOptions = async <T = OptionType[]>(teamType: 'NTS' | 'AM') => {
	try {
		const response = await axiosInstance.get<T>(`manager/team/${teamType}/group`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
