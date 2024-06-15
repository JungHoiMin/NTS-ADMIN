<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<RouterView />
</template>

<style lang="scss">
html,
body,
main,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}
//h1,
//h2 {
//	font-family: 맑은 고딕, serif;
//}

#popup-message {
	.popup-bg {
		position: fixed;
		top: 0;
		right: 0;
		background-color: #12121260;
		width: 100%;
		height: 100%;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;

		.popup-box {
			box-shadow:
				0 12px 32px 4px rgba(0, 0, 0, 0.36),
				0 8px 20px rgba(0, 0, 0, 0.72);
			background-color: white;
			min-width: 320px;
			min-height: 240px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			.popup-content {
				padding: 10px 30px;
				.popup-body {
					user-select: none;
					white-space: pre;
					word-wrap: break-word;
					word-break: keep-all;
					line-height: 30px;
				}
			}
			.popup-actions {
				padding: 10px;
			}
		}
	}
}
</style>
