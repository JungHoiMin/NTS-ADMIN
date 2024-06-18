<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import { deleteInsurance } from '@/modules/apis/apis.insurance';
import { ElNotification } from 'element-plus';

const router = useRouter();
const insuranceStore = useInsuranceStore();
const { getInsuranceList } = storeToRefs(insuranceStore);
const insuranceColumnsList = [
	{ prop: 'code', label: '보험사 코드', width: 120 },
	{ prop: 'name', label: '보험사 명', width: 200 },
	{ prop: 'suffix', label: '접미사(영문)', width: 200 },
	{ prop: 'NTSTeamId', label: 'NTS 담당자', width: 300 },
];

const clickAddInsuranceBtn = () => {
	router.push({ name: 'Add Insurance' });
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
		v-model:table-data="getInsuranceList"
		key-name="idx"
		@addItem="clickAddInsuranceBtn"
		@delete-item="clickDeleteInsuranceBtn"
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
