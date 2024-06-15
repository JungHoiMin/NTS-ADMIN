import { h, render } from 'vue';
import { ElButton } from 'element-plus';

export class PopupMessage {
	private static reset() {
		render(null, document.getElementById('popup-message') as HTMLElement);
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
		return h('div', { class: 'popup-content' }, [
			h('h3', { class: 'popup-title' }, title),
			h('p', { class: 'popup-body' }, body),
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
					{ class: 'popup-bg' },
					h('div', { class: 'popup-box' }, [
						this.newContent(title, body),
						h(
							'div',
							{ class: 'popup-actions' },
							this.newButton('info', confirmBtnName, resolve, true),
						),
					]),
				),
				document.getElementById('popup-message') as HTMLElement,
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
					{ class: 'popup-bg' },
					h('div', { class: 'popup-box' }, [
						this.newContent(title, body),
						h('div', { class: 'popup-actions' }, [
							this.newButton('primary', confirmBtnName, resolve, true),
							this.newButton('danger', cancelBtnName, reject, false),
						]),
					]),
				),
				document.getElementById('popup-message') as HTMLElement,
			);
		});
	}
}
