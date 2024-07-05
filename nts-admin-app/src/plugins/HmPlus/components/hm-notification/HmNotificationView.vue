<script setup lang="ts">
import { useNotificationStore } from '@/plugins/HmPlus/stores/useNotificationStore';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { getNotificationList } = storeToRefs(notificationStore);
</script>

<template>
	<div class="notification-box">
		<TransitionGroup name="slide">
			<div v-for="({ type, title, message }, idx) in getNotificationList" :key="idx">
				<div class="notification-content">
					<div class="notification-icon" :class="type">
						<i v-if="type === 'info'" class="bi bi-info-circle" />
						<i v-else-if="type === 'success'" class="bi bi-check-circle" />
						<i v-else-if="type === 'warning'" class="bi bi-exclamation-circle" />
						<i v-else-if="type === 'error'" class="bi bi-x-circle"></i>
					</div>
					<div class="notification-body">
						<div class="notification-title">
							<h3>{{ title }}</h3>
						</div>
						<div class="notification-message" v-html="message" />
					</div>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>
