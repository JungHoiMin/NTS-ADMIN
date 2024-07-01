import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { type NotificationType } from '../types/types.hm-modal';

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
