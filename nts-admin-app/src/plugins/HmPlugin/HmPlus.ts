import { createApp, h } from 'vue';
import HmPopup from '@/plugins/HmPlugin/components/HmPopup.vue';
import type { HmPlusType } from '@/plugins/HmPlugin/types/types.hm-modal';

export class HmPlus implements HmPlusType {
	popup(
		type: 'Prompt' | 'Alert' | 'Confirm',
		title: string,
		message?: string,
		options?: { okBtnName?: string; cancelBtnName?: string },
	) {
		return new Promise((resolve, reject) => {
			const popupApp = createApp({
				render() {
					return h(HmPopup, {
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
	}
}
