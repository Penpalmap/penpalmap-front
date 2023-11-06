import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(initReactI18next)
    .use(LanguageDetector) // Utilisez le détecteur de langue
    .init({
        interpolation: {
            escapeValue: false,
        },
        fallbackLng: 'en', // Langue par défaut en cas de non-détection
        resources: {
            en: {
                translation: require('./public/locales/en.json'),
            },
            fr: {
                translation: require('./public/locales/fr.json'),
            },
        },
    })

export default i18n
