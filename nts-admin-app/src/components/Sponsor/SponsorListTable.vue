<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { storeToRefs } from 'pinia';
import { useSponsorStore } from '@/stores/useSponsorStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const sponsorStore = useSponsorStore();
const { getSponsorList } = storeToRefs(sponsorStore);
const sponsorColumnsList = [
	{ prop: 'idx', label: '스폰서사 코드', width: 120 },
	{ prop: 'name', label: '스폰서사 명', width: 200 },
	{ prop: 'suffix', label: '접미사(영문)', width: 200 },
];

const clickAddSponsorBtn = () => {
	router.push({ name: 'Add Sponsor' });
};
</script>

<template>
	<AppTable
		v-model:column-list="sponsorColumnsList"
		v-model:table-data="getSponsorList"
		key-name="code"
		@addItem="clickAddSponsorBtn"
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
