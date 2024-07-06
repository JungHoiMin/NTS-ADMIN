<script setup lang="ts">
import type { OptionType } from '@/types/types.options';

const selectKey = defineModel<string | number>({ required: true });
defineProps<{
	optionList: OptionType[];
}>();
</script>

<template>
	<el-radio-group v-model="selectKey" style="min-width: 210px">
		<el-radio-button
			v-for="option in optionList"
			:key="option.key"
			:value="option.key"
			:label="option.value"
		>
			<el-text>{{ option.value }}</el-text>
		</el-radio-button>
	</el-radio-group>
</template>
