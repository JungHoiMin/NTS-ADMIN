export const emptyCheckRule = () => ({
	required: true,
	message: '값을 입력하세요',
	trigger: ['change', 'blur'],
});

export const noWhitespaceRule = () => ({
	whitespace: true,
	message: '공백은 입력할 수 없습니다.',
	trigger: ['change', 'blur'],
});

export const lenLimitRule = (limit: number) => ({
	len: limit,
	message: `${limit}글자로 이루어져야 합니다.`,
	trigger: ['blur'],
});
