import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'es',
    resources: {
        en: {
            navbar: require('./locales/en/navbar.json'),
            home: require('./locales/en/home.json'),
            services: require('./locales/en/services.json'),
            team: require('./locales/en/team.json'),
            contact: require('./locales/en/contact.json'),
            appointment: require('./locales/en/appointment.json'),
            delete: require('./locales/en/delete.json')
        },
        es: {
            navbar: require('./locales/es/navbar.json'),
            home: require('./locales/es/home.json'),
            services: require('./locales/es/services.json'),
            team: require('./locales/es/team.json'),
            contact: require('./locales/es/contact.json'),
            appointment: require('./locales/es/appointment.json'),
            delete: require('./locales/es/delete.json')
        }
    },
    ns: ['navbar', 'home', 'services', 'team', 'contact', 'appointment', 'delete'],
    defaultNS: 'navbar'
});

i18n.languages = ['en', 'es'];

export default i18n;