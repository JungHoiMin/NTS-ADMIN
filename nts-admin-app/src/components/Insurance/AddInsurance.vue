<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { RequestAddInsuranceType } from '@/types/types.insurance';
import { type FormInstance, type FormRules } from 'element-plus';
import { emptyCheckRule, lenLimitRule, noWhitespaceRule } from '@/modules/commons/form/form.rules';
import { validateOnlyEnglish, validateOnlyNumber } from '@/modules/commons/form/form.validates';
import { addInsurance } from '@/modules/apis/apis.insurance';
import { useRouter } from 'vue-router';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { useOptionsStore } from '@/stores/useOptionsStore';
import { storeToRefs } from 'pinia';
import { HmNotification, HmPopup } from '@/plugins/HmPlus';

const router = useRouter();
const insuranceStore = useInsuranceStore();
const optionsStore = useOptionsStore();
const { getNtsTeamMemberOptions } = storeToRefs(optionsStore);
const formRef = ref<FormInstance>();

const formData = reactive<RequestAddInsuranceType>({
	code: '',
	name: '',
	suffix: '',
	NTSTeamId: -1,
});

const rules = reactive<FormRules<typeof formData>>({
	code: [
		emptyCheckRule(),
		noWhitespaceRule(),
		{ validator: validateOnlyNumber, trigger: ['change', 'blur'] },
		lenLimitRule(2),
	],
	name: [emptyCheckRule()],
	suffix: [
		emptyCheckRule(),
		noWhitespaceRule(),
		{ validator: validateOnlyEnglish, trigger: ['change', 'blur'] },
	],
});

const clickAddInsuranceBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			addInsurance(formData)
				.then((data) => {
					insuranceStore.addInsurance({ idx: data.idx, ...formData });
					HmNotification({
						title: '보험사 추가',
						message: '보헙사가 정상적으로 추가 되었습니다.',
						type: 'success',
					});
					router.push({ name: 'Insurance List' });
				})
				.catch((e) => {
					HmPopup('alert', '보험사 추가 실패', e.message);
				});
		} else {
			console.error('보험사 추가 페이지 유효성 검사 실패', invalidFields);
		}
	});
};

const clickCancelBtn = () => {
	HmPopup('confirm', '주의!!!', '확인버튼을 누르면 저장하지 않고 목록으로 돌아갑니다.').then(() => {
		router.push({ name: 'Insurance List', replace: true });
	});
};

const keyDownAddInsruanceForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickAddInsuranceBtn(formRef.value);
};
</script>

<template>
	<h3>보험사 추가</h3>
	<el-form
		ref="formRef"
		class="add-form"
		:model="formData"
		label-position="right"
		label-width="auto"
		:rules="rules"
		status-icon
		@keydown="keyDownAddInsruanceForm"
	>
		<el-form-item label="보험사 코드" prop="code">
			<el-input v-model="formData.code" maxlength="2" />
		</el-form-item>

		<el-form-item label="보험사 명" prop="name">
			<el-input v-model="formData.name" />
		</el-form-item>

		<el-form-item label="접미사" prop="suffix">
			<el-input v-model="formData.suffix" />
		</el-form-item>

		<el-form-item label="NTS 담당자">
			<el-select v-model="formData.NTSTeamId" placeholder="선택">
				<el-option
					v-for="{ key, value } in getNtsTeamMemberOptions"
					:key="key"
					:label="value"
					:value="key"
				/>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button class="form-btn" type="primary" @click="clickAddInsuranceBtn(formRef)">
				저장
			</el-button>
			<el-button class="form-btn" type="danger" plain @click="clickCancelBtn()"> 취소 </el-button>
		</el-form-item>
	</el-form>
</template>

<style scoped></style>
