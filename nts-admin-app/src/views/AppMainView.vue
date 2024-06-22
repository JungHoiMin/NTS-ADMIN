<script setup lang="ts">
import AppSideBar from '@/layouts/AppSideBar.vue';
import { onMounted } from 'vue';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { loadInsuranceList } from '@/modules/apis/apis.insurance';
import { loadManagerGroupOptions } from '@/modules/apis/apis.options';
import { useOptionsStore } from '@/stores/useOptionsStore';

const insuranceStore = useInsuranceStore();
const optionsStore = useOptionsStore();

onMounted(() => {
	loadInsuranceList()
		.then((data) => {
			insuranceStore.setInsuranceList(data);
		})
		.catch((e) => {
			console.error(e);
		});
	loadManagerGroupOptions('NTS').then((data) => {
		optionsStore.setManagerGroupOptions(data);
	});
});
</script>

<template>
	<div class="main-layout">
		<el-container>
			<el-aside width="200px">
				<AppSideBar />
			</el-aside>
			<el-main>
				<RouterView />
			</el-main>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
.main-layout,
.main-layout > * {
	height: 100%;
}
</style>
