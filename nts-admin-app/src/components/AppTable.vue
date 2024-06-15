<script setup lang="ts">
import { defineModel } from 'vue';
import type { TableColumnType } from '@/types/types.table';

const columnList = defineModel<TableColumnType[]>('columnList', { required: true });
const tableData = defineModel<any[]>('tableData', { required: true });
defineProps({
	keyName: {
		type: String,
		required: true,
	},
});
defineEmits(['addItem']);
</script>

<template>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column
			v-for="column in columnList"
			:key="column.prop"
			:prop="column.prop"
			:label="column.label"
			:width="column.width"
		/>
		<el-table-column fixed="right">
			<template #default="scope">
				<slot name="actions" :key="scope.row[keyName]" />
			</template>
		</el-table-column>
	</el-table>
	<el-button @click="$emit('addItem')">추가하기</el-button>
</template>

<style scoped></style>
