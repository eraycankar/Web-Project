import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Email' : 'Email',
                'Password mismatch': 'Password mismatch',
                'Username' : 'Username',
                'Password' : 'Password',
                'Password Repeat' : 'Password Repeat',
                'Sign In': 'Sign In'

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Sign In': 'Giriş Yap',
                'Email' : 'E-Posta',
                'Username': 'Kullanıcı Adı',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarla',
                'Password mismatch' : 'Şifreleriniz uyuşmuyor !',
                
               
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