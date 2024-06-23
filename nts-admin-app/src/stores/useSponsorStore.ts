import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { RequestUpdateSponsorType, SponsorType } from '@/types/types.sponsor';

export const useSponsorStore = defineStore('sponsor', () => {
	const sponsorList = ref<SponsorType[]>([]);

	const getSponsorList = computed(() => sponsorList.value);

	const getSponsorByIdx = (idx: number) =>
		sponsorList.value.find((item) => item.idx === idx) || null;

	const addSponsor = (sponsor: SponsorType) => {
		sponsorList.value.push(sponsor);
	};

	const setSponsorList = (newSponsorList: SponsorType[]) => {
		sponsorList.value = newSponsorList;
	};

	const editSponsor = (idx: number, sourceSponsor: RequestUpdateSponsorType) => {
		const targetSponsor = getSponsorByIdx(idx);
		if (targetSponsor === null) return;

		targetSponsor.suffix = sourceSponsor.suffix;
	};

	const removeSponsorByIdx = (idx: number) => {
		setSponsorList(sponsorList.value.filter((item) => item.idx !== idx));
	};

	return {
		getSponsorByIdx,
		addSponsor,
		editSponsor,
		getSponsorList,
		setSponsorList,
		removeSponsorByIdx,
	};
});
