import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_SECRET_KEY;

export const encrypt = (text: string) => {
	return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (text: string) => {
	const bytes = CryptoJS.AES.decrypt(text, key);
	return bytes.toString(CryptoJS.enc.Utf8);
};
