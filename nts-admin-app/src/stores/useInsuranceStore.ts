import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { InsuranceType, RequestUpdateInsuranceType } from '@/types/types.insurance';

export const useInsuranceStore = defineStore('insurance', () => {
	const insuranceList = ref<InsuranceType[]>([]);

	const getInsuranceList = computed(() => insuranceList.value);

	const getInsuranceByIdx = (idx: number) =>
		insuranceList.value.find((item) => item.idx === idx) || null;

	const addInsurance = (insurance: InsuranceType) => {
		insuranceList.value.push(insurance);
	};

	const setInsuranceList = (newInsuranceList: InsuranceType[]) => {
		insuranceList.value = newInsuranceList;
	};

	const editInsurance = (idx: number, sourceInsurance: RequestUpdateInsuranceType) => {
		const targetInsurance = getInsuranceByIdx(idx);
		if (targetInsurance === null) return;

		targetInsurance.name = sourceInsurance.name;
		targetInsurance.suffix = sourceInsurance.suffix;
		targetInsurance.NTSTeamId = sourceInsurance.NTSTeamId;
	};

	const removeInsuranceByIdx = (idx: number) => {
		setInsuranceList(insuranceList.value.filter((item) => item.idx !== idx));
	};

	return {
		getInsuranceByIdx,
		addInsurance,
		editInsurance,
		getInsuranceList,
		setInsuranceList,
		removeInsuranceByIdx,
	};
});
