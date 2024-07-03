<script setup lang="ts">
import { computed, reactive, ref, defineProps } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus';
import { emailRule, emptyCheckRule } from '@/modules/commons/form/form.rules';
import { useRouter } from 'vue-router';
import type { RequestAddManagerType } from '@/types/types.manager';
import { addManager } from '@/modules/apis/apis.manager';
import { useOptionsStore } from '@/stores/useOptionsStore';
import { storeToRefs } from 'pinia';
import type { OptionType } from '@/types/types.options';
import { HmNotification, HmPopup } from '@/plugins/HmPlus';

const props = defineProps<{
	teamType: 'NTS' | 'AM';
}>();
const nextRouterName = props.teamType === 'NTS' ? 'Login' : 'Agent Manager List';

const router = useRouter();
const optionsStore = useOptionsStore();
const { getAmTeamIdOptions, getNtsTeamIdOptions } = storeToRefs(optionsStore);

const addedOptions = ref<OptionType[]>([]);
const formRef = ref<FormInstance>();
const isAdding = ref<boolean>(false);
const optionKey = ref<number>(0);

const formData = reactive<RequestAddManagerType>({
	id: '',
	pw: '1234',
	name: '',
	teamType: props.teamType,
	teamId: -1,
	joinDate: new Date(),
});

const rules = reactive<FormRules<typeof formData>>({
	name: [emptyCheckRule()],
	id: [emailRule()],
	pw: [emptyCheckRule()],
});

const getOptions = computed<OptionType[]>(() => {
	let defaultOptions: OptionType[];
	if (props.teamType === 'NTS') defaultOptions = getNtsTeamIdOptions.value;
	else defaultOptions = getAmTeamIdOptions.value;
	return defaultOptions.concat(addedOptions.value);
});

const clickAddManagerBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			if (formData.joinDate !== null) formData.joinDate = new Date(formData.joinDate);
			addManager(formData)
				.then(() => {
					HmNotification({
						title: `${props.teamType} 담당자 추가`,
						message: `${props.teamType}팀에 ${formData.name}님이 정상적으로 추가 되었습니다.`,
						type: 'success',
					});
					router.push({ name: nextRouterName });
				})
				.catch((e) => {
					HmPopup('alert', `${props.teamType} 담당자 추가 실패`, e.message);
				});
		} else {
			console.error(`${props.teamType} 담당자 추가 페이지 유효성 검사 실패`, invalidFields);
		}
	});
};

const clickCancelBtn = () => {
	const nextPageName = props.teamType === 'NTS' ? '로그인화면' : '목록';
	HmPopup(
		'confirm',
		'주의!!!',
		`확인버튼을 누르면 저장하지 않고 ${nextPageName}으로 돌아갑니다.`,
	).then(() => {
		router.push({ name: nextRouterName, replace: true });
	});
};

const clear = () => {
	isAdding.value = false;
	optionKey.value = 0;
};

const onAddOption = () => {
	optionKey.value = getOptions.value.length;
	isAdding.value = true;
};

const clickConfirmAddOptionBtn = () => {
	if (optionKey.value) {
		addedOptions.value.push({
			key: optionKey.value,
			value: `${props.teamType} ${optionKey.value} 파트`,
		});
		clear();
	}
};

const keyDownAddManagerForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickAddManagerBtn(formRef.value);
};
</script>

<template>
	<h3>{{ props.teamType }} 담당자 추가</h3>
	<el-form
		ref="formRef"
		class="add-form"
		:model="formData"
		label-position="right"
		label-width="auto"
		:rules="rules"
		status-icon
		@keydown="keyDownAddManagerForm"
	>
		<el-form-item label="아이디" prop="id">
			<el-input v-model="formData.id" />
		</el-form-item>

		<el-form-item label="패스워드" prop="pw">
			<el-input v-model="formData.pw" disabled />
		</el-form-item>

		<el-form-item label="이름" prop="name">
			<el-input v-model="formData.name" />
		</el-form-item>

		<el-form-item label="팀" prop="teamId">
			<el-select v-model="formData.teamId" placeholder="선택">
				<el-option v-for="{ key, value } in getOptions" :key="key" :label="value" :value="key" />
				<template #footer>
					<el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
						팀 추가
					</el-button>
					<template v-else>
						<el-input
							v-model="optionKey"
							type="number"
							placeholder="팀 아이디를 입력하세요 (숫자만 가능)"
							size="small"
							style="margin-bottom: 8px"
						/>
						<el-button type="primary" size="small" @click="clickConfirmAddOptionBtn">
							확인
						</el-button>
						<el-button size="small" @click="clear">취소</el-button>
					</template>
				</template>
			</el-select>
		</el-form-item>

		<el-form-item label="입사일" prop="joinDate">
			<el-date-picker
				v-model="formData.joinDate"
				type="date"
				value-format="x"
				placeholder="입사일을 선택하세요"
			/>
		</el-form-item>

		<el-form-item>
			<el-button class="form-btn" type="primary" @click="clickAddManagerBtn(formRef)">
				저장
			</el-button>
			<el-button class="form-btn" type="danger" plain @click="clickCancelBtn()"> 취소 </el-button>
		</el-form-item>
	</el-form>
</template>

<style scoped></style>
