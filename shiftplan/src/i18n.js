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
                'Sign In': 'Sign In',
                'Sign Out' : 'Sign Out',
                'Unauthorized':'Unauthorized',
                'Next': 'Next >',
                'Previous':'< Previous',
                'Load Failure' : 'Load Failure',
                'Employee List': 'Employee List',
                'User not found': 'User not found',
                'Edit':'Edit',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'Change Email':'Change Email',
                'My Profile': 'My Profile'

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Sign In': 'Giriş Yap',
                'Sign Out': 'Çıkış Yap',
                'Email' : 'E-Posta',
                'Username': 'Kullanıcı Adı',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarla',
                'Password mismatch' : 'Şifreleriniz uyuşmuyor !',
                'Unauthorized' : 'Kullanıcı Adı veya şifreniz hatalı',
                'Next': 'Sonraki >',
                'Previous':'< Önceki',
                'Load Failure' : 'Liste Bilgisi Alınamadı',
                'Employee List': 'Çalışan Listesi',
                'User not found': 'Kullanıcı Bulunamadı',
                'Edit': 'Düzenle',
                'Save' : 'Kaydet' ,
                'Cancel' : 'İptal Et',
                'Change Email':'Email Adresini Değiştir',
                'My Profile':'Profilim'
               
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