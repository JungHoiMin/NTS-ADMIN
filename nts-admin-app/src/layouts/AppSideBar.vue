<script setup lang="ts">
import { useRouter } from 'vue-router';
import ManagerAvatar from '@/components/ManagerAvatar.vue';
const router = useRouter();

const goPageByName = (name: string, replace: boolean = true) => {
	router.push({ name, replace });
};
</script>

<template>
	<el-container style="height: 100%">
		<el-main style="padding: 0">
			<el-menu default-active="0" class="na-menu">
				<el-menu-item index="1" @click="goPageByName('Insurance List')">
					<template #title>보험사 관리</template>
				</el-menu-item>

				<el-menu-item index="2" @click="goPageByName('Sponsor List')">
					<template #title>스폰서사 관리</template>
				</el-menu-item>

				<el-menu-item index="3" @click="goPageByName('Manager')">
					<template #title>담당자 정보 관리</template>
				</el-menu-item>

				<el-menu-item index="4" @click="goPageByName('Call Center')">
					<template #title>콜 센터정보 관리</template>
				</el-menu-item>

				<el-menu-item index="5" @click="goPageByName('NTS App')">
					<template #title>NTS APP 관리</template>
				</el-menu-item>

				<el-menu-item index="6" @click="goPageByName('Deploy')">
					<template #title>배포 관리</template>
				</el-menu-item>
			</el-menu>
		</el-main>
		<el-footer>
			<ManagerAvatar />
		</el-footer>
	</el-container>
</template>

<style scoped>
.na-menu {
	height: 100%;
	user-select: none;
}
</style>
