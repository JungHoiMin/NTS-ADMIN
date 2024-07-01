import type { App } from 'vue';
import { HmPlus } from '@/plugins/HmPlugin/HmPlus';
import type { Pinia } from 'pinia';

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

export default (app: App) => {
	createHmContainer();

	createContainerInHmContainer('hm-popup-container');

	app.provide('HmPlus', new HmPlus());
};
