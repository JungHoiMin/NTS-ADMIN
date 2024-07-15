<script setup lang="ts">
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getShowDetail, getDetailTrigger, getDetailPlacement } = storeToRefs(
	personalOptionsSettingStore,
);
</script>

<template>
	<el-popover
		:disabled="!getShowDetail"
		:trigger="getDetailTrigger"
		:placement="getDetailPlacement"
	>
		<template #default>
			<slot></slot>
		</template>
		<template #reference>
			<slot name="reference"></slot>
		</template>
	</el-popover>
</template>

<style scoped></style>
