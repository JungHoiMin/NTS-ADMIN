<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';
import { loadTeamIdOptions } from '@/modules/apis/apis.options';
import { useOptionsStore } from '@/stores/useOptionsStore';
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const optionsStore = useOptionsStore();
const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getTheme } = storeToRefs(personalOptionsSettingStore);
const { setTheme } = personalOptionsSettingStore;

onBeforeMount(async () => {
	setTheme(getTheme.value);

	await Promise.all([
		loadTeamIdOptions('NTS')
			.then((data) => optionsStore.setNtsTeamIdOptions(data))
			.catch((e) => console.error(e)),
	]);
});
</script>

<template>
	<RouterView />
</template>

<style lang="scss">
@import '@/assets/css/app';
@import '@/assets/css/custom.element-plus';
@import '@/assets/css/commons';
</style>
