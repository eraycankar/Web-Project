import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                'Username' : 'Username',
                'Password' : 'Password',
                'Password Repeat' : 'Password Repeat',
                'Email' : 'Email'


            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch' : 'Şifreleriniz uyuşmuyor !',
                'Username': 'Kullanıcı Adı',
                'Email' : 'Mail Adresi',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarla'
            }
        }
        
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation : {
        escapeValue:false,
        formatSeparator: ','
        },
        react: {
            wait: true
        }
});

export default i18n;