<script setup lang="ts">
import { useRouter } from 'vue-router';
import { secureLocalStorage, secureSessionStorage } from '@/modules/storages';

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const router = useRouter();
const clickLogoutBtn = () => {
	const loginInfo = secureLocalStorage.getItem<{ id: string; pw: string }>('loginInfo');
	secureSessionStorage.removeItem('token');
	if (loginInfo === null) {
		secureLocalStorage.removeItem('loginInfo');
	} else {
		secureLocalStorage.setItem('loginInfo', { id: loginInfo.id });
	}
	router.push({ name: 'Login', replace: true });
};
</script>

<template>
	<el-dropdown trigger="click">
		<el-avatar class="na-avatar" :size="50" :src="circleUrl" />
		<template #dropdown>
			<el-dropdown-item>사용자 설정</el-dropdown-item>
			<el-dropdown-item @click="clickLogoutBtn">로그아웃</el-dropdown-item>
		</template>
	</el-dropdown>
</template>

<style scoped lang="scss">
.na-avatar:hover {
	cursor: pointer;
	border: 2px solid black;
}
</style>
