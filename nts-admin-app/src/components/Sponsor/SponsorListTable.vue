<script setup lang="ts">
import AppTable from '@/components/AppTable.vue';
import { storeToRefs } from 'pinia';
import { useSponsorStore } from '@/stores/useSponsorStore';
import { useRouter } from 'vue-router';
import { deleteSponsor } from '@/modules/apis/apis.sponsor';
import { HmNotification, HmPopup } from '@/plugins/HmPlus';

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
const clickEditSponsorBtn = (idx: number) => {
	router.push({ name: 'Edit Sponsor', params: { idx } });
};
const clickDeleteSponsorBtn = (idx: number) => {
	const sponsor = sponsorStore.getSponsorByIdx(idx);
	if (sponsor === null) return;
	HmPopup(
		'confirm',
		'스폰서사 삭제',
		`${sponsor.name} 스폰서사를 <strong style="color: red">삭제</strong>하시겠습니까?`,
	).then(() => {
		deleteSponsor(idx).then(() => {
			sponsorStore.removeSponsorByIdx(idx);
			HmNotification({
				title: '스폰서사 삭제',
				message: `${sponsor.name} 스폰서사를 삭제 했습니다.`,
				type: 'success',
			});
		});
	});
};
</script>

<template>
	<AppTable
		v-model:column-list="sponsorColumnsList"
		v-model:table-data="getSponsorList"
		:search-key-list="['name']"
		search-hint="스폰서사 명"
		key-name="idx"
		@addItem="clickAddSponsorBtn"
		@editItem="clickEditSponsorBtn"
		@deleteItem="clickDeleteSponsorBtn"
	/>
</template>

<style scoped></style>
