import { h, render } from 'vue';
import { ElButton } from 'element-plus';

export class HmPopupMessage {
	private static elementId = 'hm-popup-message';

	private static reset() {
		render(null, document.getElementById(this.elementId) as HTMLElement);
	}

	private static newButton(
		type: 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger',
		label: string,
		callback: Function,
		data: any,
	) {
		return h(
			ElButton,
			{
				type,
				plain: true,
				onClick: () => {
					callback(data);
					this.reset();
				},
			},
			() => label,
		);
	}

	private static newContent(title: string, body: string) {
		return h('div', { class: 'hm-popup-content' }, [
			h('h3', { class: 'hm-popup-title' }, title),
			h('div', { class: 'hm-popup-body', innerHTML: body }),
		]);
	}

	static alert(title: string, body: string, options?: { confirmBtnName?: string }) {
		return new Promise((resolve) => {
			let confirmBtnName = '확인';
			if (options !== undefined) {
				if (options.confirmBtnName !== undefined) confirmBtnName = options.confirmBtnName;
			}
			render(
				h(
					'div',
					{
						class: 'hm-popup-bg',
						tabIndex: 0,
						onVnodeMounted(vnode) {
							if (vnode.el === null) return;
							vnode.el.focus();
						},
						onKeydown: (ev) => {
							if (['Enter', 'Escape', 'NumpadEnter'].includes(ev.code)) {
								resolve(true);
								this.reset();
							}
						},
					},
					h('div', { class: 'hm-popup-box' }, [
						this.newContent(title, body),
						h(
							'div',
							{ class: 'hm-popup-actions' },
							this.newButton('info', confirmBtnName, resolve, true),
						),
					]),
				),
				document.getElementById(this.elementId) as HTMLElement,
			);
		});
	}

	static confirm(
		title: string,
		body: string,
		options?: { confirmBtnName?: string; cancelBtnName?: string },
	) {
		return new Promise((resolve, reject) => {
			let confirmBtnName = '확인';
			let cancelBtnName = '취소';
			if (options !== undefined) {
				if (options.confirmBtnName !== undefined) confirmBtnName = options.confirmBtnName;
				if (options.cancelBtnName !== undefined) cancelBtnName = options.cancelBtnName;
			}
			render(
				h(
					'div',
					{
						class: 'hm-popup-bg',
						tabIndex: 0,
						onVnodeMounted(vnode) {
							if (vnode.el === null) return;
							vnode.el.focus();
						},
						onKeydown: (ev) => {
							if (['Enter', 'NumpadEnter'].includes(ev.code)) {
								resolve(true);
								this.reset();
							} else if (ev.code === 'Escape') {
								reject(false);
								this.reset();
							}
						},
					},
					h('div', { class: 'hm-popup-box' }, [
						this.newContent(title, body),
						h('div', { class: 'hm-popup-actions' }, [
							this.newButton('primary', confirmBtnName, resolve, true),
							this.newButton('danger', cancelBtnName, reject, false),
						]),
					]),
				),
				document.getElementById(this.elementId) as HTMLElement,
			);
		});
	}
}
