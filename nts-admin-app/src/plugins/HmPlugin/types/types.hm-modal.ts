export interface HmPlusType {
	popup: (
		type: 'Prompt' | 'Alert' | 'Confirm',
		title: string,
		message?: string,
		options?: { okBtnName?: string; cancelBtnName?: string },
	) => Promise<unknown>;
}
