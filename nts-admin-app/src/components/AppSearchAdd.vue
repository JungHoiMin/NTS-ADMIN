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
	<div class="search-section">
		<el-input
			:size="getSize"
			v-model="searchText"
			:placeholder="props.searchHint"
			style="width: calc(100% - 110px); margin-right: 16px"
		>
			<template #prefix>
				<i class="bi bi-search"></i>
			</template>
		</el-input>
		<el-button :size="getSize" @click="$emit('addItem')" type="primary">추가하기</el-button>
	</div>
</template>

<style scoped></style>
