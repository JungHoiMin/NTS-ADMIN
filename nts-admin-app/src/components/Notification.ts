import { render } from 'vue';

export class Notification {
	private static elementId = 'notification';

	private static reset() {
		render(null, document.getElementById(this.elementId) as HTMLElement);
	}

	static
}
