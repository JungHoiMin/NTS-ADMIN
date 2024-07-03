<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useOptionsStore } from '@/stores/useOptionsStore';
import {
	type PersonalOptionsType,
	usePersonalOptionsSettingStore,
} from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';
import { HmPopup } from '@/plugins/HmPlus';

const isShowDialog = defineModel<boolean>({ required: true });

const optionsStore = useOptionsStore();
const { platformOptions, sizeOptions, placementOptions, triggerOptions, themeOptions } =
	optionsStore;
const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const {
	getTheme,
	getSize,
	getIsCollapse,
	getUsePlatform,
	getShowNetAddress,
	getShowHint,
	getHintTrigger,
	getHintPlacement,
	getShowDetail,
	getDetailTrigger,
	getDetailPlacement,
} = storeToRefs(personalOptionsSettingStore);

const {
	setTheme,
	setSize,
	setIsCollapse,
	setUsePlatform,
	setShowNetAddress,
	setShowHint,
	setHintTrigger,
	setHintPlacement,
	setShowDetail,
	setDetailTrigger,
	setDetailPlacement,
} = personalOptionsSettingStore;

const formData = reactive<PersonalOptionsType>({
	theme: 'white',
	size: 'default',
	showHint: true,
	hintTrigger: 'focus',
	hintPlacement: 'top',
	usePlatform: 'exe',
	isCollapse: false,
	showNetAddress: true,
	showDetail: true,
	detailTrigger: 'hover',
	detailPlacement: 'top',
});
const isActiveSaveBtn = ref<boolean>(false);
const isSetClear = ref<boolean>(false);

const save = () => {
	setTheme(formData.theme);
	setSize(formData.size);
	setShowHint(formData.showHint);
	setHintTrigger(formData.hintTrigger);
	setHintPlacement(formData.hintPlacement);
	setUsePlatform(formData.usePlatform);
	setIsCollapse(formData.isCollapse);
	setShowNetAddress(formData.showNetAddress);
	setShowDetail(formData.showDetail);
	setDetailTrigger(formData.detailTrigger);
	setDetailPlacement(formData.detailPlacement);
	isShowDialog.value = false;
};

const setDefaultOptions = () => {
	formData.theme = 'white';
	formData.size = 'default';
	formData.showHint = true;
	formData.hintTrigger = 'focus';
	formData.hintPlacement = 'top';
	formData.usePlatform = 'exe';
	formData.isCollapse = false;
	formData.showNetAddress = true;
	formData.showDetail = true;
	formData.detailTrigger = 'hover';
	formData.detailPlacement = 'top';
};

const setClearOptions = () => {
	isSetClear.value = true;
	formData.theme = getTheme.value;
	formData.size = getSize.value;
	formData.showHint = getShowHint.value;
	formData.hintTrigger = getHintTrigger.value;
	formData.hintPlacement = getHintPlacement.value;
	formData.usePlatform = getUsePlatform.value;
	formData.isCollapse = getIsCollapse.value;
	formData.showNetAddress = getShowNetAddress.value;
	formData.showDetail = getShowDetail.value;
	formData.detailTrigger = getDetailTrigger.value;
	formData.detailPlacement = getDetailPlacement.value;
};

const close = () => {
	if (isActiveSaveBtn.value) {
		HmPopup('confirm', '저장 취소', '확인을 누르시면 수정하신 내용이 반영되지 않습니다.', {
			okBtnName: '확인',
			cancelBtnName: '돌아가기',
		}).then(() => (isShowDialog.value = false));
	} else {
		isShowDialog.value = false;
	}
};
watch(
	() => formData,
	() => {
		if (isSetClear.value) {
			isActiveSaveBtn.value = false;
			isSetClear.value = false;
		} else {
			isActiveSaveBtn.value = true;
		}
	},
	{ deep: true },
);

watch(
	() => isShowDialog.value,
	(value) => {
		setClearOptions();
		isSetClear.value = false;
		isActiveSaveBtn.value = false;
	},
);
</script>

<template>
	<el-dialog class="h-80p" v-model="isShowDialog" title="개인 옵션 설정" align-center width="880px">
		<template #default>
			<el-form :model="formData" label-width="auto" label-position="top">
				<h2>전체 설정</h2>
				<h3>테마</h3>
				<el-form-item label="테마">
					<el-radio-group v-model="formData.theme">
						<el-radio
							v-for="{ key, value } in themeOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-radio-group>
				</el-form-item>

				<h3>크기</h3>
				<el-form-item label="글자, 선택박스, 입력박스, 버튼 크기">
					<el-radio-group v-model="formData.size">
						<el-radio
							v-for="{ key, value } in sizeOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-radio-group>
				</el-form-item>

				<h3>힌트</h3>
				<el-form-item label="힌트 활성화">
					<el-switch v-model="formData.showHint" />
				</el-form-item>
				<el-form-item label="힌트 트리거">
					<el-select class="w-200" v-model="formData.hintTrigger">
						<el-option
							v-for="{ key, value } in triggerOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="힌트 위치">
					<el-select class="w-200" v-model="formData.hintPlacement">
						<el-option
							v-for="{ key, value } in placementOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-select>
				</el-form-item>

				<hr />
				<h2>센터 정보 관리</h2>
				<h3>플랫폼</h3>
				<el-form-item label="이용중인 플랫폼">
					<el-radio-group v-model="formData.usePlatform">
						<el-radio
							v-for="{ key, value } in platformOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-radio-group>
				</el-form-item>

				<h3>검색 옵션</h3>
				<el-form-item label="검색 옵션 숨기기">
					<el-switch v-model="formData.isCollapse" />
				</el-form-item>

				<h3>검색 결과</h3>
				<el-form-item label="IP, PORT 보기">
					<el-switch v-model="formData.showNetAddress" />
				</el-form-item>

				<h3>자세한 정보</h3>
				<el-form-item label="자세한 정보 활성화">
					<el-switch v-model="formData.showDetail" />
				</el-form-item>
				<el-form-item label="자세한 정보 트리거">
					<el-select class="w-200" v-model="formData.detailTrigger">
						<el-option
							v-for="{ key, value } in triggerOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="자세한 정보 위치">
					<el-select class="w-200" v-model="formData.detailPlacement">
						<el-option
							v-for="{ key, value } in placementOptions"
							:key="key"
							:value="key"
							:label="value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
		</template>
		<template #footer>
			<el-button type="info" @click="setDefaultOptions">기본값으로 설정</el-button>
			<el-button type="info" @click="setClearOptions" :disabled="!isActiveSaveBtn"
				>초기화</el-button
			>
			<el-button type="success" :disabled="!isActiveSaveBtn" @click="save">저장</el-button>
			<el-button type="danger" plain @click="close">취소</el-button>
		</template>
	</el-dialog>
</template>

<style scoped></style>
