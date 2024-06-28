import type { FormItemRule } from 'element-plus';

export const emptyCheckRule = (): FormItemRule => ({
	required: true,
	message: '값을 입력하세요',
	trigger: ['change', 'blur'],
});

export const noWhitespaceRule = (): FormItemRule => ({
	whitespace: true,
	message: '공백은 입력할 수 없습니다.',
	trigger: ['change', 'blur'],
});

export const lenLimitRule = (limit: number): FormItemRule => ({
	len: limit,
	message: `${limit}글자로 이루어져야 합니다.`,
	trigger: ['blur'],
});

export const emailRule = (): FormItemRule => ({
	type: 'email',
	required: true,
	message: `아이디는 이메일 형식이어야 합니다.`,
	trigger: ['blur'],
});
