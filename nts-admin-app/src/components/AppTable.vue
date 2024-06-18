<script setup lang="ts">
import { defineModel, ref } from 'vue';
import type { TableColumnType } from '@/types/types.table';

const columnList = defineModel<TableColumnType[]>('columnList', { required: true });
const tableData = defineModel<any[]>('tableData', { required: true });
defineProps({
	keyName: {
		type: String,
		required: true,
	},
});
defineEmits(['addItem', 'editItem', 'deleteItem']);

const cellClassName = (data: { row: any; column: any; rowIndex: number; columnIndex: number }) => {
	if (data.columnIndex === columnList.value.length) {
		return 'actions';
	}
};
</script>

<template>
	<el-table
		:data="tableData"
		style="width: 100%"
		row-class-name="table-row"
		:cell-class-name="cellClassName"
	>
		<el-table-column
			v-for="column in columnList"
			:key="column.prop"
			:prop="column.prop"
			:label="column.label"
			:width="column.width"
		/>
		<el-table-column fixed="right" :min-width="200" align="right">
			<template #default="scope">
				<slot name="actions" :key="scope.row[keyName]" />
				<el-button circle type="info" plain @click="$emit('editItem', scope.row[keyName])">
					<template #icon>
						<i class="bi bi-pencil-square"></i>
					</template>
				</el-button>
				<el-button circle type="danger" plain @click="$emit('deleteItem', scope.row[keyName])">
					<template #icon>
						<i class="bi bi-trash3"></i>
					</template>
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-button @click="$emit('addItem')">추가하기</el-button>
</template>

<style lang="scss"></style>
