import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../../../public/locales/fr/translation.json';
import en from '../../../public/locales/en/translation.json'
import mg from '../../../public/locales/mg/translation.json'; 
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: fr
      },
      en : {
        translation : en
      },
      mg: {
        translation: mg 
      }
      
    },
    lng: 'fr', 
    fallbackLng: 'fr', 
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
