import axiosInstance, { getAxiosError } from '@/modules/apis/index';
import type { OptionType } from '@/types/types.options';

export const loadTeamMemberOptions = async <T = OptionType[]>(teamType: 'NTS') => {
	try {
		const response = await axiosInstance.get<T>(`manager/options/teamMember/${teamType}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};

export const loadTeamIdOptions = async <T = OptionType[]>(teamType: 'NTS' | 'AM') => {
	try {
		const response = await axiosInstance.get<T>(`manager/options/teamId/${teamType}`);
		return response.data;
	} catch (e) {
		throw getAxiosError(e);
	}
};
