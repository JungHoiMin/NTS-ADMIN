<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps<{
	type: 'Prompt' | 'Alert' | 'Confirm';
	title: string;
	message?: string;
	okBtnName?: string;
	cancelBtnName?: string;
}>();

const emits = defineEmits(['confirm', 'cancel']);

const inputText = ref<string>('');

const confirm = () => emits('confirm', inputText.value || undefined);
const cancel = () => emits('cancel');
</script>

<template>
	<div class="popup-bg">
		<div class="popup-box">
			<h3 class="popup-title">{{ props.title }}</h3>
			<div class="popup-body" v-if="props.type !== 'Prompt'" v-html="props.message" />
			<div class="popup-body" v-else>
				<el-input v-model="inputText">
					<template #prepend v-if="props.message">{{ props.message }}</template>
				</el-input>
			</div>
			<div class="popup-actions">
				<el-button type="primary" @click="confirm">
					{{ props.okBtnName ? props.okBtnName : '확인' }}
				</el-button>
				<el-button v-if="props.type !== 'Alert'" type="danger" @click="cancel">
					{{ props.okBtnName ? props.cancelBtnName : '취소' }}
				</el-button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
