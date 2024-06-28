<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import { deleteInsurance } from '@/modules/apis/apis.insurance';
import { ElNotification } from 'element-plus';
import { computed } from 'vue';
import { useOptionsStore } from '@/stores/useOptionsStore';

const router = useRouter();
const insuranceStore = useInsuranceStore();
const { getInsuranceList } = storeToRefs(insuranceStore);
const optionsStore = useOptionsStore();
const { getNtsTeamMemberOptions } = storeToRefs(optionsStore);
const insuranceList = computed(() =>
	getInsuranceList.value.map((insurnaceData) => {
		const { NTSTeamId, ...data } = insurnaceData;
		const NTSTeam = getNtsTeamMemberOptions.value.find((teamInfo) => teamInfo.key === NTSTeamId);
		const NTSTeamName = NTSTeam !== undefined ? NTSTeam.value : '알수없음';
		return {
			...data,
			NTSTeamName,
		};
	}),
);
const insuranceColumnsList = [
	{ prop: 'code', label: '보험사 코드', width: 120 },
	{ prop: 'name', label: '보험사 명', width: 200 },
	{ prop: 'suffix', label: '접미사(영문)', width: 200 },
	{ prop: 'NTSTeamName', label: 'NTS 담당자', width: 300 },
];

const clickAddInsuranceBtn = () => {
	router.push({ name: 'Add Insurance' });
};
const clickEditInsuranceBtn = (idx: number) => {
	router.push({ name: 'Edit Insurance', params: { idx } });
};
const clickDeleteInsuranceBtn = (idx: number) => {
	const insurance = insuranceStore.getInsuranceByIdx(idx);
	if (insurance === null) return;
	HmPopupMessage.confirm(
		'보험사 삭제',
		`${insurance.code}(${insurance.name}) 보험사를 <strong style="color: red">삭제</strong>하시겠습니까?`,
	).then(() => {
		deleteInsurance(idx).then(() => {
			insuranceStore.removeInsuranceByIdx(idx);
			ElNotification({
				title: '보험사 삭제',
				message: `${insurance.code}(${insurance.name}) 보험사를 삭제 했습니다.`,
				type: 'success',
			});
		});
	});
};
</script>

<template>
	<AppTable
		v-model:column-list="insuranceColumnsList"
		v-model:table-data="insuranceList"
		:search-key-list="['code', 'name']"
		search-hint="보험사 코드 or 보험사 명"
		key-name="idx"
		@addItem="clickAddInsuranceBtn"
		@editItem="clickEditInsuranceBtn"
		@deleteItem="clickDeleteInsuranceBtn"
	>
		<template #actions="{ key }">
			<el-button
				@click="
					() => {
						console.log(key);
					}
				"
			>
				버튼
			</el-button>
		</template>
	</AppTable>
</template>

<style scoped></style>
