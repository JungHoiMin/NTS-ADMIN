import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { SponsorType } from '@/types/types.sponsor';

export const useSponsorStore = defineStore('sponsor', () => {
	const sponsorList = ref<SponsorType[]>([]);

	const getSponsorList = computed(() => sponsorList.value);

	const getSponsorByCode = (idx: number) =>
		sponsorList.value.find((item) => item.idx === idx) || null;

	const addSponsor = (sponsor: SponsorType) => {
		sponsorList.value.push(sponsor);
	};

	const setSponsorList = (newSponsorList: SponsorType[]) => {
		sponsorList.value = newSponsorList;
	};

	const editSponsor = (sourceSponsor: SponsorType) => {
		const targetSponsor = getSponsorByCode(sourceSponsor.idx);
		if (targetSponsor === null) return;

		targetSponsor.name = sourceSponsor.name;
		targetSponsor.suffix = sourceSponsor.suffix;
	};

	return { getSponsorByCode, addSponsor, editSponsor, getSponsorList, setSponsorList };
});
