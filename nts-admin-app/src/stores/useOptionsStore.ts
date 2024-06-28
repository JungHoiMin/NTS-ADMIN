import { defineStore } from 'pinia';
import type { OptionType } from '@/types/types.options';
import { computed, ref } from 'vue';

export const useOptionsStore = defineStore('options', () => {
	const ntsTeamMemberOptions = ref<OptionType[]>([]);
	const ntsTeamIdOptions = ref<OptionType[]>([]);
	const amTeamIdOptions = ref<OptionType[]>([]);

	const getNtsTeamMemberOptions = computed<OptionType[]>(() => [
		{ key: -1, value: '지정안함' },
		...ntsTeamMemberOptions.value,
	]);
	const getNtsTeamMemberOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...ntsTeamMemberOptions.value,
	]);
	const getNtsTeamIdOptions = computed<OptionType[]>(() => [
		{ key: -1, value: '지정안함' },
		...ntsTeamIdOptions.value,
	]);
	const getNtsTeamIdOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...ntsTeamIdOptions.value,
	]);
	const getAmTeamIdOptions = computed<OptionType[]>(() => [
		{ key: -1, value: '지정안함' },
		...amTeamIdOptions.value,
	]);
	const getAmTeamIdOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...amTeamIdOptions.value,
	]);

	const setNtsTeamMemberOptions = (newNtsManagerGroupOptions: OptionType[]) => {
		ntsTeamMemberOptions.value = newNtsManagerGroupOptions;
	};
	const setNtsTeamIdOptions = (newNtsManagerGroupOptions: OptionType[]) => {
		ntsTeamIdOptions.value = newNtsManagerGroupOptions;
	};
	const setAmTeamIdOptions = (newNtsManagerGroupOptions: OptionType[]) => {
		amTeamIdOptions.value = newNtsManagerGroupOptions;
	};

	return {
		getNtsTeamMemberOptions,
		getNtsTeamMemberOptionsForSearch,
		getNtsTeamIdOptions,
		getNtsTeamIdOptionsForSearch,
		getAmTeamIdOptions,
		getAmTeamIdOptionsForSearch,
		setNtsTeamMemberOptions,
		setNtsTeamIdOptions,
		setAmTeamIdOptions,
	};
});
