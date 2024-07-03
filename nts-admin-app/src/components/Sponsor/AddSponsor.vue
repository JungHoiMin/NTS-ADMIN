<script setup lang="ts">
import { reactive, ref } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus';
import { emptyCheckRule, noWhitespaceRule } from '@/modules/commons/form/form.rules';
import { validateOnlyEnglish } from '@/modules/commons/form/form.validates';
import { useRouter } from 'vue-router';
import { useSponsorStore } from '@/stores/useSponsorStore';
import type { RequestAddSponsorType } from '@/types/types.sponsor';
import { addSponsor } from '@/modules/apis/apis.sponsor';
import { HmNotification, HmPopup } from '@/plugins/HmPlus';
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const sponsorStore = useSponsorStore();
const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getSize } = storeToRefs(personalOptionsSettingStore);

const formRef = ref<FormInstance>();

const formData = reactive<RequestAddSponsorType>({
	name: '',
	suffix: '',
});

const rules = reactive<FormRules<typeof formData>>({
	name: [emptyCheckRule()],
	suffix: [
		emptyCheckRule(),
		noWhitespaceRule(),
		{ validator: validateOnlyEnglish, trigger: ['change', 'blur'] },
	],
});

const clickAddSponsorBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			addSponsor(formData)
				.then((data) => {
					sponsorStore.addSponsor({ idx: data.idx, ...formData });
					HmNotification({
						title: '스폰서사 추가',
						message: '스폰서사가 정상적으로 추가 되었습니다.',
						type: 'success',
					});
					router.push({ name: 'Sponsor List' });
				})
				.catch((e) => {
					HmPopup('alert', '스폰서사 추가 실패', e.message);
				});
		} else {
			console.error('스폰서사 추가 페이지 유효성 검사 실패', invalidFields);
		}
	});
};

const clickCancelBtn = () => {
	HmPopup('confirm', '주의!!!', '확인버튼을 누르면 저장하지 않고 목록으로 돌아갑니다.').then(() => {
		router.push({ name: 'Sponsor List', replace: true });
	});
};

const keyDownAddSponsorForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickAddSponsorBtn(formRef.value);
};
</script>

<template>
	<h3>스폰서사 추가</h3>
	<el-form
		ref="formRef"
		class="add-form"
		:size="getSize"
		:model="formData"
		label-position="right"
		label-width="auto"
		:rules="rules"
		status-icon
		@keydown="keyDownAddSponsorForm"
	>
		<el-form-item label="스폰서사 명" prop="name">
			<el-input v-model="formData.name" />
		</el-form-item>

		<el-form-item label="접미사" prop="suffix">
			<el-input v-model="formData.suffix" />
		</el-form-item>

		<el-form-item>
			<el-button class="form-btn" type="primary" @click="clickAddSponsorBtn(formRef)">
				저장
			</el-button>
			<el-button class="form-btn" type="danger" plain @click="clickCancelBtn()"> 취소 </el-button>
		</el-form-item>
	</el-form>
</template>

<style scoped></style>
