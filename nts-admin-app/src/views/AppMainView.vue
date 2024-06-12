<script setup lang="ts">
import AppSideBar from '@/layouts/AppSideBar.vue';
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
