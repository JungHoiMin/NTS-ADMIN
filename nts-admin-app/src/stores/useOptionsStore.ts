import { defineStore, storeToRefs } from 'pinia';
import type { OptionType } from '@/types/types.options';
import { computed, ref } from 'vue';
import { useInsuranceStore } from '@/stores/useInsuranceStore';

export const useOptionsStore = defineStore('options', () => {
	const placementOptions: OptionType[] = [
		{ key: 'top', value: 'top' },
		{ key: 'top-start', value: 'top-start' },
		{ key: 'top-end', value: 'top-end' },
		{ key: 'bottom', value: 'bottom' },
		{ key: 'bottom-start', value: 'bottom-start' },
		{ key: 'bottom-end', value: 'bottom-end' },
		{ key: 'left', value: 'left' },
		{ key: 'left-start', value: 'left-start' },
		{ key: 'left-end', value: 'left-end' },
		{ key: 'right', value: 'right' },
		{ key: 'right-start', value: 'right-start' },
		{ key: 'right-end', value: 'right-end' },
	];
	const triggerOptions: OptionType[] = [
		{ key: 'hover', value: 'hover' },
		{ key: 'click', value: 'click' },
		{ key: 'focus', value: 'focus' },
		{ key: 'contextmenu', value: 'contextmenu' },
	];
	const sizeOptions: OptionType[] = [
		{ key: 'large', value: '크게' },
		{ key: 'default', value: '기본' },
		{ key: 'small', value: '작게' },
	];
	const platformOptions: OptionType[] = [
		{ key: 'browser', value: 'browser' },
		{ key: 'exe', value: 'exe' },
	];
	const themeOptions: OptionType[] = [
		{ key: 'white', value: '화이트' },
		{ key: 'dark', value: '다크' },
	];
	const operationOptions: OptionType[] = [
		{ key: 0, value: '운영예정' },
		{ key: 1, value: '운영중' },
		{ key: 2, value: '운영종료' },
		{ key: 3, value: '보류' },
	];
	const integSalesTableOptions: OptionType[] = [
		{ key: 0, value: '적용안됨' },
		{ key: 1, value: '적용됨' },
	];
	const onnaraOptions: OptionType[] = [
		{ key: 0, value: '적용안됨' },
		{ key: 1, value: '적용됨' },
	];
	const pdsOptions: OptionType[] = [
		{ key: 0, value: '적용안됨' },
		{ key: 1, value: '적용됨' },
	];
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
	const getOperationOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...operationOptions,
	]);
	const getIntegSalesTableOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...integSalesTableOptions,
	]);
	const getMultipleInsuranceOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		{ key: 0, value: '단일판매' },
		{ key: 1, value: '복합판매' },
	]);
	const getInsuranceOptions = computed<OptionType[]>(() => {
		const insuranceStore = useInsuranceStore();
		const { getInsuranceList } = storeToRefs(insuranceStore);
		return getInsuranceList.value.map((insurance) => ({
			key: insurance.code,
			value: insurance.name,
		}));
	});
	const getOnnaraOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...onnaraOptions,
	]);
	const getPDSOptionsForSearch = computed<OptionType[]>(() => [
		{ key: -1, value: '전체' },
		...pdsOptions,
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
		themeOptions,
		placementOptions,
		triggerOptions,
		sizeOptions,
		platformOptions,
		getNtsTeamMemberOptions,
		getNtsTeamMemberOptionsForSearch,
		getNtsTeamIdOptions,
		getNtsTeamIdOptionsForSearch,
		getAmTeamIdOptions,
		getAmTeamIdOptionsForSearch,
		getIntegSalesTableOptionsForSearch,
		getOperationOptionsForSearch,
		getOnnaraOptionsForSearch,
		getPDSOptionsForSearch,
		getMultipleInsuranceOptionsForSearch,

		getInsuranceOptions,
		setNtsTeamMemberOptions,
		setNtsTeamIdOptions,
		setAmTeamIdOptions,
	};
});
