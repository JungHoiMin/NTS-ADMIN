<script setup lang="ts">
import { computed, defineModel, type PropType, ref } from 'vue';
import type { TableColumnType } from '@/types/types.table';

const columnList = defineModel<TableColumnType[]>('columnList', { required: true });
const tableData = defineModel<any[]>('tableData', { required: true });

const searchText = ref('');
const searchedTableData = computed(() => {
	if (props.searchKeyList === undefined || props.searchKeyList.length === 0) return tableData.value;
	return tableData.value.filter((item) => {
		if (props.searchKeyList === undefined) return true;

		for (const key of props.searchKeyList) {
			if (item[key].includes(searchText.value)) {
				return true;
			}
		}
		return false;
	});
});
const props = defineProps({
	keyName: {
		type: String,
		required: true,
	},
	searchKeyList: {
		type: Array as PropType<string[]>,
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
	<el-row :gutter="20" justify="space-between">
		<el-col :span="20" v-if="searchKeyList && searchKeyList.length > 0">
			<el-input placeholder="보험사 코드 or 보험사 명" v-model="searchText" />
		</el-col>
		<el-col :span="searchKeyList && searchKeyList.length > 0 ? 4 : 24" style="text-align: right">
			<el-button @click="$emit('addItem')" type="primary">추가하기</el-button>
		</el-col>
	</el-row>
	<el-table
		class-name="app-table-section"
		:data="searchedTableData"
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
</template>

<style lang="scss">
.app-table-section {
	width: 100%;
	height: calc(100% - 120px);
}
</style>
