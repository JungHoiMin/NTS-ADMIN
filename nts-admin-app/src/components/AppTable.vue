<script setup lang="ts">
import { computed, defineModel, type PropType, ref } from 'vue';
import type { TableColumnType } from '@/types/types.table';
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize } = storeToRefs(personalOptionsSettingStore);

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
	searchHint: {
		type: String,
	},
});
defineEmits(['addItem', 'editItem', 'deleteItem']);

const cellClassName = (data: { row: any; column: any; rowIndex: number; columnIndex: number }) => {
	if (data.columnIndex === columnList.value.length) {
		return 'actions';
	}
};

const getRowHeight = computed(() => {
	if (getSize.value === 'small') return 'h-36';
	else if (getSize.value === 'large') return 'h-66';
	else return 'h-50';
});
</script>

<template>
	<div class="search-section">
		<el-input
			:size="getSize"
			v-model="searchText"
			:placeholder="props.searchHint"
			style="width: calc(100% - 100px); margin-right: 16px"
		>
			<template #prefix>
				<i class="bi bi-search"></i>
			</template>
		</el-input>
		<el-button :size="getSize" @click="$emit('addItem')" type="primary">추가하기</el-button>
	</div>
	<el-table
		class-name="app-table-section"
		:size="getSize"
		:data="searchedTableData"
		:row-class-name="`table-row ${getRowHeight}`"
		:cell-class-name="cellClassName"
	>
		<el-table-column
			v-for="column in columnList"
			:key="column.prop"
			:prop="column.prop"
			:label="column.label"
			:min-width="column.width"
		>
			<template #header="scope">
				<el-text :size="getSize">{{ scope.column.label }}</el-text>
			</template>
			<template #default="scope">
				<el-text :size="getSize">{{ scope.row[column.prop] }}</el-text>
			</template>
		</el-table-column>
		<el-table-column fixed="right" :min-width="180" align="right">
			<template #default="scope">
				<slot name="actions" :key="scope.row[keyName]" />
				<el-button
					:size="getSize"
					circle
					type="info"
					plain
					@click="$emit('editItem', scope.row[keyName])"
				>
					<template #icon>
						<i class="bi bi-pencil-square"></i>
					</template>
				</el-button>
				<el-button
					:size="getSize"
					circle
					type="danger"
					plain
					@click="$emit('deleteItem', scope.row[keyName])"
				>
					<template #icon>
						<i class="bi bi-trash3"></i>
					</template>
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
