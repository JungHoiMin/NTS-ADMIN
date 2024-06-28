import type { InternalRuleItem, Value } from 'async-validator/dist-types/interface';

export const validateEmpty = (
	rule: InternalRuleItem,
	value: Value,
	callback: (error?: string | Error) => void,
) => {
	if (value === '') {
		callback(new Error('값을 입력하세요'));
	} else {
		callback();
	}
};

export const validateOnlyNumber = (
	rule: InternalRuleItem,
	value: Value,
	callback: (error?: string | Error) => void,
) => {
	if (value.match(/^[0-9]*$/)) {
		callback();
	} else {
		callback(new Error('숫자만 입력할 수 있습니다.'));
	}
};

export const validateOnlyEnglish = (
	rule: InternalRuleItem,
	value: Value,
	callback: (error?: string | Error) => void,
) => {
	if (value.match(/^[a-zA-Z]*$/)) {
		callback();
	} else {
		callback(new Error('영어만 입력할 수 있습니다.'));
	}
};
