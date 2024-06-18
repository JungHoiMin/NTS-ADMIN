<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

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
</script>

<template>
	<AppTable
		v-model:column-list="insuranceColumnsList"
		v-model:table-data="getInsuranceList"
		key-name="code"
		@addItem="clickAddInsuranceBtn"
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
