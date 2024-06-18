<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, defineProps } from 'vue';
import type { RequestUpdateInsuranceType } from '@/types/types.insurance';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { emptyCheckRule, noWhitespaceRule } from '@/modules/commons/form/form.rules';
import { validateOnlyEnglish } from '@/modules/commons/form/form.validates';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import { useRouter } from 'vue-router';
import { loadManagerGroupOptions } from '@/modules/apis/apis.options';
import type { OptionType } from '@/types/types.options';
import { useInsuranceStore } from '@/stores/useInsuranceStore';
import { editInsurance } from '@/modules/apis/apis.insurance';

const router = useRouter();
const insuranceStore = useInsuranceStore();
const formRef = ref<FormInstance>();

const props = defineProps({
	idx: {
		type: Number,
		required: true,
	},
});

const code = ref<string>('');

const formData = reactive<RequestUpdateInsuranceType>({
	name: '',
	suffix: '',
	NTSTeamId: -1,
});

const NTSTeamOptionsData = ref<OptionType[]>([]);
const NTSTeamOptions = computed(() => {
	return [{ key: -1, value: '지정안함' }, ...NTSTeamOptionsData.value];
});
const rules = reactive<FormRules<typeof formData>>({
	name: [emptyCheckRule()],
	suffix: [
		emptyCheckRule(),
		noWhitespaceRule(),
		{ validator: validateOnlyEnglish, trigger: ['change', 'blur'] },
	],
});

const clickEditInsuranceBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			editInsurance(+props.idx, formData)
				.then(() => {
					insuranceStore.editInsurance({ idx: +props.idx, code: code.value, ...formData });
					ElNotification({
						title: '보험사 수정',
						message: '보헙사가 정상적으로 수정 되었습니다.',
						type: 'success',
					});
					router.push({ name: 'Insurance List' });
				})
				.catch((e) => {
					HmPopupMessage.alert('보험사 수정 실패', e.message);
				});
		} else {
			console.error('보험사 수정 페이지 유효성 검사 실패', invalidFields);
		}
	});
};

const clickCancelBtn = () => {
	HmPopupMessage.confirm('주의!!!', '확인버튼을 누르면 저장하지 않고 목록으로 돌아갑니다.').then(
		() => {
			router.push({ name: 'Insurance List', replace: true });
		},
	);
};

const keyDownAddInsruanceForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickEditInsuranceBtn(formRef.value);
};

onBeforeMount(async () => {
	loadManagerGroupOptions('NTS').then((data) => {
		NTSTeamOptionsData.value = data;
	});

	const insurance = insuranceStore.getInsuranceByIdx(+props.idx);
	if (insurance === null) {
		await HmPopupMessage.alert('오류', '잘못된 접근입니다.\n보험사 정보 목록으로 돌아갑니다.');
		await router.push({ name: 'Insurance List', replace: true });
	} else {
		code.value = insurance.code;
		formData.name = insurance.name;
		formData.suffix = insurance.suffix;
		formData.NTSTeamId = insurance.NTSTeamId;
	}
});
</script>

<template>
	<h3>보험사 수정</h3>
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
			<el-text>{{ code }}</el-text>
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
					v-for="{ key, value } in NTSTeamOptions"
					:key="key"
					:label="value"
					:value="key"
				/>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button class="form-btn" type="primary" @click="clickEditInsuranceBtn(formRef)">
				저장
			</el-button>
			<el-button class="form-btn" type="danger" plain @click="clickCancelBtn()"> 취소 </el-button>
		</el-form-item>
	</el-form>
</template>

<style scoped>
.add-form {
	max-width: 600px;
}
</style>
