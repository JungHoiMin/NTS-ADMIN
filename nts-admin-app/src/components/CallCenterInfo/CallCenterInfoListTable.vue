<script setup lang="ts">
import CallCenterInfoSearchOptions from '@/components/CallCenterInfo/CallCenterInfoSearchOptions.vue';
import type { SelectedOptionInterface } from '@/types/types.options';

const onChangeSelectedOption = (data: SelectedOptionInterface): void => {
	console.log(data);
};
</script>

<template>
	<CallCenterInfoSearchOptions @change:options="onChangeSelectedOption" />
	<el-table class="app-table-section"> </el-table>
</template>
