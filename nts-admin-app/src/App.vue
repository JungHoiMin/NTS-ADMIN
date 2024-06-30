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
	await Promise.all([
		setTheme(getTheme.value),
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
@import '@/assets/css/hm.popup-message';
@import '@/assets/css/custom.element-plus';
@import '@/assets/css/commons.scss';
html,
body,
main,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}
//h1,
//h2 {
//	font-family: 맑은 고딕, serif;
//}
</style>
