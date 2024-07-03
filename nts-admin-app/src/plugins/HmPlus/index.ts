import type { App } from 'vue';
import { createApp, h } from 'vue';
import HmNotification from '@/plugins/HmPlus/components/hm-notification/HmNotificationView.vue';
import { createPinia } from 'pinia';

export { default as HmPopup } from './components/hm-popup';
export { default as HmNotification } from './components/hm-notification';

export default (app: App) => {
	const createHmContainer = () => {
		const htmlEl = document.querySelector('body') as HTMLElement;
		const hmContainerEl = document.createElement('div');
		hmContainerEl.id = 'hm-container';
		htmlEl.appendChild(hmContainerEl);
	};

	const createContainerInHmContainer = (id: string) => {
		if (id === '') throw new Error('id가 공백일 수 없습니다.');
		const hmContainerEl = document.getElementById('hm-container') as HTMLElement;
		const containerEl = document.createElement('div') as HTMLElement;
		containerEl.id = id;
		hmContainerEl.appendChild(containerEl);
		return containerEl;
	};

	const installNotificationApp = () => {
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
	};

	createHmContainer();

	createContainerInHmContainer('hm-popup-container');
	createContainerInHmContainer('hm-notification-container');
	installNotificationApp();
};
