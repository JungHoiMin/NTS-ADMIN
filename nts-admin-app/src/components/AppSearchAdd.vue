<script setup lang="ts">
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize } = storeToRefs(personalOptionsSettingStore);

const searchText = defineModel<string>({ required: true });

const props = defineProps<{
	searchHint?: string;
}>();

defineEmits(['addItem']);
</script>

<template>
	<div class="m-b-1 flex">
		<el-input :size="getSize" v-model="searchText" :placeholder="props.searchHint">
			<template #prefix>
				<i class="bi bi-search"></i>
			</template>
		</el-input>
		<el-button :size="getSize" @click="$emit('addItem')" type="primary" style="margin-left: 0.5rem">
			추가하기
		</el-button>
	</div>
</template>

<style scoped></style>
