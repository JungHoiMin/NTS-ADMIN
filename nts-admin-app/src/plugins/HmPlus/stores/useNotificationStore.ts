import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NotificationType } from '@/plugins/HmPlus';

export const useNotificationStore = defineStore('notification', () => {
	const notificationList = ref<NotificationType[]>([]);

	const getNotificationList = computed(() => notificationList.value);

	const addNotification = (notification: NotificationType) => {
		notificationList.value.push(notification);
		setTimeout(() => {
			notificationList.value.shift();
		}, 2000);
	};

	return {
		getNotificationList,
		addNotification,
	};
});
