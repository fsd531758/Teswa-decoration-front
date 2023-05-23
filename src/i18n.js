import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		ns: ['words', 'sentences', 'validations'],
		fallbackLng: 'ar',
		default: 'ar',
		debug: false,
		saveMissing: true,
	});

export default i18n;
