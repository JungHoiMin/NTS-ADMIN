import { decrypt, encrypt } from '@/modules/hashing';

export class secureSessionStorage {
	static setItem<T = Object>(key: string, value: T) {
		const jsonText = JSON.stringify(value);
		sessionStorage.setItem(key, encrypt(jsonText));
	}
	static getItem<T>(key: string): T | null {
		const storage = sessionStorage.getItem(key);
		if (storage === null) return null;

		return JSON.parse(decrypt(storage)) as T;
	}
}

export class secureLocalStorage {
	static setItem<T = Object>(key: string, value: T) {
		const jsonText = JSON.stringify(value);
		localStorage.setItem(key, encrypt(jsonText));
	}
	static getItem<T>(key: string): T | null {
		const storage = localStorage.getItem(key);
		if (storage === null) return null;

		return JSON.parse(decrypt(storage)) as T;
	}
}
