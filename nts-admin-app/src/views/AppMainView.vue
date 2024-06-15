<script setup lang="ts">
import AppSideBar from '@/layouts/AppSideBar.vue';
import { onMounted } from 'vue';
import { useInsuranceStore } from '@/store/useInsuranceStore';
import { loadInsuranceList } from '@/modules/apis/apis.insurance';

const insuranceStore = useInsuranceStore();

onMounted(() => {
	loadInsuranceList()
		.then((data) => {
			insuranceStore.setInsuranceList(data);
		})
		.catch((e) => {
			console.error(e);
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
