<script setup lang="ts">
import { useNotificationStore } from '@/plugins/HmPlugin/stores/useNotificationStore';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { getNotificationList } = storeToRefs(notificationStore);
</script>

<template>
	<div class="notification-box">
		<TransitionGroup name="slide">
			<div v-for="({ type, title, message }, idx) in getNotificationList" :key="idx">
				<div class="notification-content">
					<div class="notification-title">
						<div class="notification-icon" :class="type">
							<i v-if="type === 'info'" class="bi bi-info-circle" />
							<i v-else-if="type === 'success'" class="bi bi-check-circle" />
							<i v-else-if="type === 'warning'" class="bi bi-exclamation-circle" />
							<i v-else-if="type === 'error'" class="bi bi-x-circle"></i>
						</div>
						<h3>{{ title }}</h3>
					</div>
					<div class="notification-body" v-html="message" />
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateY(0);
}
</style>
