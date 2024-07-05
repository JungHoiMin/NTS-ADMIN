<script setup lang="ts">
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';
import AppSelect from '@/components/AppSelect.vue';
import { useOptionsStore } from '@/stores/useOptionsStore';
import { computed, ref } from 'vue';
import AppRadio from '@/components/AppRadio.vue';

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
const { getSize } = storeToRefs(personalOptionsSettingStore);

const selectedInsuranceList = ref<string[]>([]);
const selectedOperation = ref<number>(-1);
const selectedMultipleInsurance = ref<number>(-1);
const selectedIntegSalesTable = ref<number>(-1);
const selectedOnnara = ref<number>(-1);
const selectedPDS = ref<number>(-1);

const getSelectedInsurance = computed<string>(() =>
	getInsuranceOptions.value
		.filter((option) => selectedInsuranceList.value.some((selected) => option.key === selected))
		.map((option) => option.value)
		.join(', '),
);

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
	<div>
		<el-input :size="getSize"></el-input>
		<el-collapse model-value="1">
			<el-collapse-item name="1" class="search-option-header">
				<template #title>
					<div class="p-i-20" style="text-align: left">
						<el-text :size="getSize">보험사: {{ getSelectedInsurance }}</el-text>
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>
								<el-text :size="getSize">운영 여부: {{ getSelectedOperation }}</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text :size="getSize">
									복합 센터 여부: {{ getSelectedMultipleInsurance }}
								</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text :size="getSize">
									청약 테이블 적용 여부: {{ getSelectedIntegSalesTable }}
								</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text :size="getSize">온나라 적용 여부: {{ getSelectedOnnara }}</el-text>
							</el-breadcrumb-item>
							<el-breadcrumb-item>
								<el-text :size="getSize">PDS 적용 여부: {{ getSelectedPDS }}</el-text>
							</el-breadcrumb-item>
						</el-breadcrumb>
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
						<template #label><el-text>보험사</el-text></template>
						<AppSelect
							v-model="selectedInsuranceList"
							:option-list="getInsuranceOptions"
							selectClass="w-582"
							select-all
							select-multiple
						/>
					</el-form-item>
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
	</div>
</template>
