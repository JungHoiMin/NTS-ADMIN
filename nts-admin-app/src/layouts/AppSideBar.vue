<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goPageByName = (name: string, replace: boolean = true) => {
	router.push({ name, replace });
};
</script>

<template>
	<el-menu default-active="1" class="na-menu">
		<el-menu-item index="1" @click="goPageByName('Insurance Sponsor')">
			<template #title> 보험사 & 스폰서사 관리 </template>
		</el-menu-item>

		<el-menu-item index="2" @click="goPageByName('Manager')">
			<template #title>담당자 정보 관리</template>
		</el-menu-item>

		<el-menu-item index="3" @click="goPageByName('Call Center')">
			<template #title>콜 센터정보 관리</template>
		</el-menu-item>

		<el-menu-item index="4" @click="goPageByName('NTS App')">
			<template #title>NTS APP 관리</template>
		</el-menu-item>

		<el-menu-item index="5" @click="goPageByName('Deploy')">
			<template #title>배포 관리</template>
		</el-menu-item>
	</el-menu>
</template>

<style scoped>
.na-menu {
	height: 100%;
	user-select: none;
}
</style>
