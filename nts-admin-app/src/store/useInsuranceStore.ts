import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { InsuranceType } from '@/types/types.insurance';

export const useInsuranceStore = defineStore('insurance', () => {
	const insuranceList = ref<InsuranceType[]>([]);

	const getInsuranceList = computed(() => insuranceList.value);

	const getInsuranceByCode = (code: string) =>
		insuranceList.value.find((item) => item.code === code) || null;

	const addInsurance = (insurance: InsuranceType) => {
		insuranceList.value.push(insurance);
	};

	const setInsuranceList = (newInsuranceList: InsuranceType[]) => {
		insuranceList.value = newInsuranceList;
	};

	const editInsurance = (sourceInsurance: InsuranceType) => {
		const targetInsurance = getInsuranceByCode(sourceInsurance.code);
		if (targetInsurance === null) return;

		targetInsurance.name = sourceInsurance.name;
		targetInsurance.suffix = sourceInsurance.suffix;
		targetInsurance.NTSTeamId = sourceInsurance.NTSTeamId;
	};

	return { getInsuranceByCode, addInsurance, editInsurance, getInsuranceList, setInsuranceList };
});
