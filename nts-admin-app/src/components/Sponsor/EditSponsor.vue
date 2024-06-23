<script setup lang="ts">
import { onBeforeMount, reactive, ref, defineProps } from 'vue';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { emptyCheckRule, noWhitespaceRule } from '@/modules/commons/form/form.rules';
import { validateOnlyEnglish } from '@/modules/commons/form/form.validates';
import { HmPopupMessage } from '@/components/HmPopupMessage';
import { useRouter } from 'vue-router';
import { useSponsorStore } from '@/stores/useSponsorStore';
import type { RequestUpdateSponsorType } from '@/types/types.sponsor';
import { editSponsor } from '@/modules/apis/apis.sponsor';

const router = useRouter();
const sponsorStore = useSponsorStore();
const formRef = ref<FormInstance>();

const props = defineProps({
	idx: {
		type: Number,
		required: true,
	},
});

const name = ref<string>('');

const formData = reactive<RequestUpdateSponsorType>({
	suffix: '',
});

const rules = reactive<FormRules<typeof formData>>({
	suffix: [
		emptyCheckRule(),
		noWhitespaceRule(),
		{ validator: validateOnlyEnglish, trigger: ['change', 'blur'] },
	],
});

const clickEditSponsorBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			editSponsor(+props.idx, formData)
				.then(() => {
					sponsorStore.editSponsor(+props.idx, { ...formData });
					ElNotification({
						title: '스폰서사 수정',
						message: '스폰서사가 정상적으로 수정 되었습니다.',
						type: 'success',
					});
					router.push({ name: 'Sponsor List' });
				})
				.catch((e) => {
					HmPopupMessage.alert('스폰서사 수정 실패', e.message);
				});
		} else {
			console.error('스폰서사 수정 페이지 유효성 검사 실패', invalidFields);
		}
	});
};

const clickCancelBtn = () => {
	HmPopupMessage.confirm('주의!!!', '확인버튼을 누르면 저장하지 않고 목록으로 돌아갑니다.').then(
		() => {
			router.push({ name: 'Sponsor List', replace: true });
		},
	);
};

const keyDownAddInsruanceForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickEditSponsorBtn(formRef.value);
};

onBeforeMount(async () => {
	const sponsor = sponsorStore.getSponsorByIdx(+props.idx);
	if (sponsor === null) {
		await HmPopupMessage.alert('오류', '잘못된 접근입니다.\n보험사 정보 목록으로 돌아갑니다.');
		await router.push({ name: 'Sponsor List', replace: true });
	} else {
		name.value = sponsor.name;
		formData.suffix = sponsor.suffix;
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
		<el-form-item label="스폰서사 명" prop="name">
			<el-text>{{ name }}</el-text>
		</el-form-item>

		<el-form-item label="접미사" prop="suffix">
			<el-input v-model="formData.suffix" />
		</el-form-item>

		<el-form-item>
			<el-button class="form-btn" type="primary" @click="clickEditSponsorBtn(formRef)">
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
