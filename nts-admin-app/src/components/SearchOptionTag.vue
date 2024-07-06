<script setup lang="ts">
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize } = storeToRefs(personalOptionsSettingStore);

const optionKey = defineModel<string | number>({ required: true });
defineProps<{
	label: string;
	optionValue: string;
}>();

const closeOption = () => {
	if (typeof optionKey.value === 'string') optionKey.value = '-1';
	else optionKey.value = -1;
};
</script>

<template>
	<el-tag v-if="optionKey != -1" :size="getSize" closable @close="closeOption" round>
		{{ label }}: {{ optionValue }}
	</el-tag>
</template>

<style scoped></style>
