import { createApp, h } from 'vue';
import HmPopupView from '@/plugins/HmPlus/components/hm-popup/HmPopupView.vue';

export default (
	type: 'prompt' | 'alert' | 'confirm',
	title: string,
	message?: string,
	options?: { okBtnName?: string; cancelBtnName?: string },
) => {
	console.log('여기');
	return new Promise((resolve, reject) => {
		const popupApp = createApp({
			render() {
				return h(HmPopupView, {
					type,
					title,
					message,
					okBtnName: options?.okBtnName,
					cancelBtnName: options?.cancelBtnName,
					onConfirm: (data: unknown) => {
						resolve(data);
						popupApp.unmount();
					},
					onCancel: () => {
						reject();
						popupApp.unmount();
					},
				});
			},
		});

		const popupContainerEl = document.getElementById('hm-popup-container') as HTMLElement;
		popupApp.mount(popupContainerEl);
	});
};
