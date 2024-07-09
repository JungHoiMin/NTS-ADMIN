<script setup lang="ts">
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';
import AppSelect from '@/components/AppSelect.vue';
import { useOptionsStore } from '@/stores/useOptionsStore';
import { computed, ref } from 'vue';
import AppRadio from '@/components/AppRadio.vue';
import SearchOptionTag from '@/components/SearchOptionTag.vue';
import AppSearchAdd from '@/components/AppSearchAdd.vue';

const optionsStore = useOptionsStore();
const {
	getInsuranceOptions,
	getOperationOptionsForSearch,
	getMultipleInsuranceOptionsForSearch,
	getIntegSalesTableOptionsForSearch,
	getOnnaraOptionsForSearch,
	getPDSOptionsForSearch,
} = storeToRefs(optionsStore);

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize, getIsCollapse } = storeToRefs(personalOptionsSettingStore);

const searchText = ref<string>('');
const selectedInsuranceList = ref<string[]>([]);
const selectedOperation = ref<number>(-1);
const selectedMultipleInsurance = ref<number>(-1);
const selectedIntegSalesTable = ref<number>(-1);
const selectedOnnara = ref<number>(-1);
const selectedPDS = ref<number>(-1);

const isCollapse = computed<'Y' | 'N'>(() => (getIsCollapse.value ? 'N' : 'Y'));

// const getSelectedInsurance = computed<string>(() =>
// 	getInsuranceOptions.value
// 		.filter((option) => selectedInsuranceList.value.some((selected) => option.key === selected))
// 		.map((option) => option.value)
// 		.join(', '),
// );

const getSelectedOperation = computed<string>(
	() =>
		getOperationOptionsForSearch.value.find((option) => option.key === selectedOperation.value)
			?.value || '',
);

const getSelectedMultipleInsurance = computed<string>(
	() =>
		getMultipleInsuranceOptionsForSearch.value.find(
			(option) => option.key === selectedMultipleInsurance.value,
		)?.value || '',
);
const getSelectedIntegSalesTable = computed<string>(
	() =>
		getIntegSalesTableOptionsForSearch.value.find(
			(option) => option.key === selectedIntegSalesTable.value,
		)?.value || '',
);
const getSelectedOnnara = computed<string>(
	() =>
		getOnnaraOptionsForSearch.value.find((option) => option.key === selectedOnnara.value)?.value ||
		'',
);
const getSelectedPDS = computed<string>(
	() =>
		getPDSOptionsForSearch.value.find((option) => option.key === selectedPDS.value)?.value || '',
);
</script>

<template>
	<AppSearchAdd
		v-model="searchText"
		search-hint="검색어 (센터명 or 센터코드 스폰서 or 대리점 or IP)"
		@addItem="() => console.log('')"
	/>
	<el-collapse v-model="isCollapse" class="m-b-1">
		<el-collapse-item name="Y" class="search-option-header">
			<template #title>
				<div class="search-option-header-content p-i-10">
					<div class="insurance-option">
						<el-text :size="getSize">보험사</el-text>
						<AppSelect
							v-model="selectedInsuranceList"
							:option-list="getInsuranceOptions"
							selectClass="insurance-select"
							select-all
							select-multiple
						/>
					</div>
					<div class="option-tags">
						<SearchOptionTag
							v-model="selectedOperation"
							:option-value="getSelectedOperation"
							label="운영 여부"
						/>
						<SearchOptionTag
							v-model="selectedMultipleInsurance"
							:option-value="getSelectedMultipleInsurance"
							label="복합 센터 여부"
						/>
						<SearchOptionTag
							v-model="selectedIntegSalesTable"
							:option-value="getSelectedIntegSalesTable"
							label="청약 테이블 적용 여부"
						/>
						<SearchOptionTag
							v-model="selectedOnnara"
							:option-value="getSelectedOnnara"
							label="온나라 적용 여부"
						/>
						<SearchOptionTag
							v-model="selectedPDS"
							:option-value="getSelectedPDS"
							label="PDS 적용 여부"
						/>
					</div>
				</div>
			</template>
			<el-form
				class="p-8"
				style="border: #718096 2px solid"
				:size="getSize"
				label-position="right"
				label-width="auto"
				status-icon
				inline
			>
				<el-form-item>
					<template #label><el-text>운영 여부</el-text></template>
					<AppSelect v-model="selectedOperation" :option-list="getOperationOptionsForSearch" />
				</el-form-item>
				<el-form-item>
					<template #label><el-text>복합 센터 여부</el-text></template>
					<AppSelect
						v-model="selectedMultipleInsurance"
						:option-list="getMultipleInsuranceOptionsForSearch"
					/>
				</el-form-item>
				<!--					<el-form-item label="콜연동 모듈">-->
				<!--						<AppSelect v-model="" :option-list="" />-->
				<!--					</el-form-item>-->
				<el-form-item>
					<template #label><el-text>청약 테이블 적용 여부</el-text></template>
					<AppRadio
						v-model="selectedIntegSalesTable"
						:option-list="getIntegSalesTableOptionsForSearch"
					/>
				</el-form-item>
				<el-form-item>
					<template #label><el-text>온나라 적용 여부</el-text></template>
					<AppRadio v-model="selectedOnnara" :option-list="getOnnaraOptionsForSearch" />
				</el-form-item>
				<el-form-item>
					<template #label><el-text>PDS 적용 여부</el-text></template>
					<AppRadio v-model="selectedPDS" :option-list="getPDSOptionsForSearch" />
				</el-form-item>
				<!--					<el-form-item label="NTS 담당자">-->
				<!--						<AppSelect v-model="" :option-list="" />-->
				<!--					</el-form-item>-->
				<!--					<el-form-item label="영업팀 파트">-->
				<!--						<AppSelect v-model="" :option-list="" />-->
				<!--					</el-form-item>-->
			</el-form>
		</el-collapse-item>
	</el-collapse>
</template>

<style scoped lang="scss">
.insurance-select {
	width: calc(100% - 100px);
}
</style>
