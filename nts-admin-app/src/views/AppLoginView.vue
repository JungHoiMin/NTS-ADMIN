<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { RequestLoginType } from '@/types/types.login';
import { login } from '@/modules/apis/apis.login';
import { setAuthorizationToken } from '@/modules/apis';
import { useRouter } from 'vue-router';
import { secureLocalStorage, secureSessionStorage } from '@/modules/storages';
import { validateEmpty } from '@/modules/commons/form/form.validates';
import { emailRule } from '@/modules/commons/form/form.rules';
import { HmPopup } from '@/plugins/HmPlus';

const router = useRouter();

const formRef = ref<FormInstance>();

const isAutoLogin = ref<boolean>(false);

const formData = reactive<RequestLoginType>({
	id: '',
	pw: '',
});

const rules = reactive<FormRules<typeof formData>>({
	id: [emailRule()],
	pw: [{ validator: validateEmpty, trigger: 'blur' }],
});

const clickLoginBtn = async (formEl: FormInstance | undefined) => {
	if (formEl === undefined) return;
	await formEl.validate((isValid, invalidFields) => {
		if (isValid) {
			login(formData)
				.then((token) => {
					setAuthorizationToken(token);
					secureSessionStorage.setItem('token', { token });
					if (isAutoLogin.value) secureLocalStorage.setItem('loginInfo', formData);
					else secureLocalStorage.setItem('loginInfo', { id: formData.id });
					router.push({ name: 'NTS Admin', replace: false });
				})
				.catch((e) => {
					HmPopup('alert', '로그인 실패', e.message);
				});
		} else {
			console.error('로그인 페이지 유효성 검사 실패', invalidFields);
		}
	});
};

const clickGoSignupBtn = () => {
	router.push({ name: 'Sign Up', replace: false });
};

const keyDownLoginForm = (ev: KeyboardEvent) => {
	if (ev.key === 'Enter' || ev.key === 'NumpadEnter') clickLoginBtn(formRef.value);
};

onMounted(() => {
	const loginInfo = secureLocalStorage.getItem<{ id?: string; pw?: string }>('loginInfo');
	if (loginInfo !== null) {
		if (loginInfo.id) {
			formData.id = loginInfo.id;
			if (loginInfo.pw) {
				formData.pw = loginInfo.pw;
				isAutoLogin.value = true;
				clickLoginBtn(formRef.value);
			}
		}
	}
});
</script>

<template>
	<div class="login-view">
		<el-form
			ref="formRef"
			class="login-form"
			:model="formData"
			label-position="right"
			label-width="auto"
			:rules="rules"
			status-icon
			@keydown="keyDownLoginForm"
		>
			<img class="logo-form" src="../../public/icon.ico" alt="" />
			<h2>로그인</h2>
			<el-form-item label="아이디" prop="id">
				<el-input v-model="formData.id" :tabindex="1" />
			</el-form-item>
			<el-form-item label="비밀번호" prop="pw">
				<el-input v-model="formData.pw" type="password" show-password :tabindex="2" />
			</el-form-item>
			<el-checkbox v-model="isAutoLogin" label="자동로그인" :tabindex="3" />
			<el-form-item>
				<el-button class="form-btn" type="primary" @click="clickLoginBtn(formRef)">
					로그인
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button class="form-btn" plain type="info" @click="clickGoSignupBtn">
					회원가입 하러가기
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="scss">
.login-view {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.logo-form {
		width: 88px;
	}
	.login-form {
		width: 344px;
		.form-btn {
			width: 100%;
		}
		margin-bottom: 100px;
	}
}
</style>
