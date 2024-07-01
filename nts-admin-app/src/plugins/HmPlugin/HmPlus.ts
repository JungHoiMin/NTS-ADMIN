import { createApp, h } from 'vue';
import HmPopup from '@/plugins/HmPlugin/components/HmPopup.vue';
import HmNotification from '@/plugins/HmPlugin/components/HmNotification.vue';
import type { HmPlusType, NotificationType } from '@/plugins/HmPlugin/types/types.hm-modal';
import { createPinia } from 'pinia';
import { useNotificationStore } from '@/plugins/HmPlugin/stores/useNotificationStore';

export class HmPlus implements HmPlusType {
	constructor() {
		const notificationApp = createApp({
			render() {
				return h(HmNotification);
			},
		});

		const notificationContainerEl = document.getElementById(
			'hm-notification-container',
		) as HTMLElement;
		notificationApp.mount(notificationContainerEl);
		notificationApp.use(createPinia());
	}
	notify(notification: NotificationType) {
		const notificationStore = useNotificationStore();
		const { addNotification } = notificationStore;
		addNotification(notification);
	}

	popup(
		type: 'prompt' | 'alert' | 'confirm',
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
