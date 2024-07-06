<script setup lang="ts">
import type { OptionType } from '@/types/types.options';
import { onMounted, ref, watch } from 'vue';
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize } = storeToRefs(personalOptionsSettingStore);

const selectKey = defineModel<string | number | (string | number)[]>({ required: true });
const props = withDefaults(
	defineProps<{
		optionList: OptionType[];
		placeholder?: string;
		selectClass?: string;
		selectAll?: boolean;
		selectMultiple?: boolean;
		maxMultipleTags?: number;
	}>(),
	{
		placeholder: '선택',
		selectAll: false,
		selectMultiple: false,
		maxMultipleTags: 10,
	},
);

const checkAll = ref<boolean>(false);
const indeterminate = ref<boolean>(false);

const handleCheckAll = (val: boolean) => {
	indeterminate.value = false;
	if (val) {
		selectKey.value = props.optionList.map((_) => _.key);
	} else {
		selectKey.value = [];
	}
};

watch(selectKey, (val) => {
	if (val instanceof Array) {
		if (val.length === 0) {
			checkAll.value = false;
			indeterminate.value = false;
		} else if (val.length === props.optionList.length) {
			checkAll.value = true;
			indeterminate.value = false;
		} else {
			indeterminate.value = true;
		}
	}
});

// NOTE:: watch와 onMounted를 같이 사용한 이유
//  onMounted 시점에 handleCheckAll을 호출하면
//  props.optionList 값이 빈 배열이기 때문에 (axios 호출 및 computed 계산 과정에서 시간이 소요됨)
//  페이지 리로딩시 전체 선택이 안되어 watch로 옵션이 바뀌면 전체 선택을 하도록 함.
//  단, 페이지 이동 시에는 이미 axios 호출은 끝났기 때문에
//  props.optionsList의 값이 변하지 않아
//  watch로 감지할 수 없고, 따라서 onMounted에서 handleCheckAll을 호출한다.
watch(
	() => props.optionList,
	() => {
		if (props.selectMultiple) {
			handleCheckAll(true);
		}
	},
);
onMounted(() => {
	if (props.selectMultiple) {
		handleCheckAll(true);
	}
});
</script>

<template>
	<el-select
		class="w-220"
		style="min-width: 210px"
		:class="selectClass"
		v-model="selectKey"
		:placeholder="placeholder"
		filterable
		:multiple="selectMultiple"
		:max-collapse-tags="maxMultipleTags"
		:size="getSize"
	>
		<template #header v-if="selectAll">
			<el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
				전체
			</el-checkbox>
		</template>
		<el-option
			v-for="option in optionList"
			:key="option.key"
			:value="option.key"
			:label="option.value"
		>
			{{ option.value }}
		</el-option>
	</el-select>
</template>
