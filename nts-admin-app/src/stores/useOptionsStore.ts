import { defineStore } from 'pinia';
import type { OptionType } from '@/types/types.options';
import { computed, ref } from 'vue';

export const useOptionsStore = defineStore('options', () => {
	const ntsTeamMemberOptions = ref<OptionType[]>([]);

	const getNtsTeamMemberOptions = computed<OptionType[]>(() => [
		{ key: -1, value: '지정안함' },
		...ntsTeamMemberOptions.value,
	]);
	const getNtsTeamMemberOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...ntsTeamMemberOptions.value,
	]);
	]);

	const setNtsTeamMemberOptions = (newNtsManagerGroupOptions: OptionType[]) => {
		ntsTeamMemberOptions.value = newNtsManagerGroupOptions;
	};
	};

	return {
		getNtsTeamMemberOptions,
		getNtsTeamMemberOptionsForSearch,
		setNtsTeamMemberOptions,
	};
});
