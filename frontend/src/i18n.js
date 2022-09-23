import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sing Up': 'Sing Up',
                'Password missmatch!': 'Password missmatch! :)',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Choose a language:': 'Choose a language:', 
                'Login': 'Login',
                'Error':'Error',
                'Logout':'Logout'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password missmatch!': 'Şifreler eşleşmedi! :)',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih edilen isim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrarla',
                'Choose a language:': ' Dil seç:',
                'Login':'Giriş Yap',
                'Error':'Hata',
                'Logout':'Çıkış Yap',
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;