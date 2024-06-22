import { defineStore } from 'pinia';
import type { OptionType } from '@/types/types.options';
import { computed, ref } from 'vue';

export const useOptionsStore = defineStore('options', () => {
	const ntsManagerGroupOptions = ref<OptionType[]>([]);

	const getNtsManagerGroupOptions = computed(() => [
		{ key: -1, value: '지정안함' },
		...ntsManagerGroupOptions.value,
	]);
	const getNtsManagerGroupOptionsForSearch = computed(() => [
		{ key: -1, value: '전체' },
		...ntsManagerGroupOptions.value,
	]);

	const setManagerGroupOptions = (newNtsManagerGroupOptions: OptionType[]) => {
		ntsManagerGroupOptions.value = newNtsManagerGroupOptions;
	};

	return {
		getNtsManagerGroupOptions,
		getNtsManagerGroupOptionsForSearch,
		setManagerGroupOptions,
	};
});
