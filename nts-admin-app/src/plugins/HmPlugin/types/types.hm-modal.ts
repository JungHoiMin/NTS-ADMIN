export type NotificationType = {
	type: 'info' | 'success' | 'warning' | 'error';
	title: string;
	message: string;
};

export interface HmPlusType {
	popup: (
		type: 'prompt' | 'alert' | 'confirm',
		title: string,
		message?: string,
		options?: { okBtnName?: string; cancelBtnName?: string },
	) => Promise<unknown>;
	notify: (notification: NotificationType) => void;
}
