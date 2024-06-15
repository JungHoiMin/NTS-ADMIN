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
