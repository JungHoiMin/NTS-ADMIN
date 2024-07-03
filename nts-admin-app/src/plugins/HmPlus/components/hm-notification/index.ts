import { useNotificationStore } from '@/plugins/HmPlus/stores/useNotificationStore';

export type NotificationType = {
	type: 'info' | 'success' | 'warning' | 'error';
	title: string;
	message: string;
};

const HmNotification = (notification: NotificationType) => {
	const notificationStore = useNotificationStore();
	const { addNotification } = notificationStore;
	addNotification(notification);
};

export default HmNotification;
