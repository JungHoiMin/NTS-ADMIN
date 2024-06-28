<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import type { ManagerType } from '@/types/types.manager';
import { computed, onBeforeMount, ref } from 'vue';
import { deleteManager, loadManager } from '@/modules/apis/apis.manager';
import dayjs from 'dayjs';

const router = useRouter();

const agentManagerList = ref<ManagerType[]>();
const getAgentManagerList = computed(() => {
	if (agentManagerList.value === undefined) return [];
	return agentManagerList.value.map((data) => {
		const { teamId, joinDate, ...rest } = data;
		return {
			...rest,
			teamId: teamId === -1 ? '지정안됨' : `AM ${teamId} 파트`,
			joinDate: joinDate !== null ? dayjs(joinDate).format('YYYY-MM-DD') : '',
		};
	});
});
const getAgentManagerById = (id: string) => {
	if (agentManagerList.value === undefined) return null;
	return agentManagerList.value.find((am) => am.id === id) || null;
};
const removeAgentManagerById = (id: string) => {
	if (agentManagerList.value === undefined) return;
	const idx = agentManagerList.value.findIndex((am) => am.id === id);
	if (idx === -1) return;
	agentManagerList.value.splice(idx, 1);
};

const agentManagerColumnsList = [
	{ prop: 'id', label: '아이디', width: 260 },
	{ prop: 'name', label: '이름', width: 120 },
	{ prop: 'teamId', label: '팀 아이디', width: 200 },
	{ prop: 'joinDate', label: '입사일', width: 200 },
];

const clickAddAgentManagerBtn = () => {
	router.push({ name: 'Add Agent Manager' });
};
const clickEditAgentManagerBtn = (id: string) => {
	router.push({ name: 'Edit Agent Manager', params: { id } });
};
const clickDeleteAgentManagerBtn = (id: string) => {
	const agentManager = getAgentManagerById(id);
	if (agentManager === null) return;
	HmPopupMessage.confirm(
		'AM 삭제',
		`${agentManager.name} 님을 <strong style="color: red">삭제</strong>하시겠습니까?`,
	).then(() => {
		deleteManager(id).then(() => {
			removeAgentManagerById(id);
			ElNotification({
				title: 'AM 삭제',
				message: `${agentManager.name}님을 삭제 했습니다.`,
				type: 'success',
			});
		});
	});
};

onBeforeMount(async () => {
	await Promise.all([
		loadManager('AM').then((data) => {
			agentManagerList.value = data;
		}),
	]);
});
</script>

<template>
	<AppTable
		v-model:column-list="agentManagerColumnsList"
		v-model:table-data="getAgentManagerList"
		:search-key-list="['id', 'name']"
		search-hint="아이디 or 이름"
		key-name="id"
		@addItem="clickAddAgentManagerBtn"
		@editItem="clickEditAgentManagerBtn"
		@deleteItem="clickDeleteAgentManagerBtn"
	/>
</template>

<style scoped></style>
