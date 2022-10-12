import i18n from 'i18next';
import { Next } from 'react-bootstrap/esm/PageItem';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sing Up',
                'Password missmatch!': 'Password missmatch! :)',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Choose a language:': 'Choose a language:',
                'Login': 'Login',
                'Error': 'Error',
                'Logout': 'Logout',
                Users: 'Users',
                Next: "Next >",
                Previous: "< Previous"
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
                'Login': 'Giriş Yap',
                'Error': 'Hata',
                'Logout': 'Çıkış Yap',
                Users: 'Kullanıcılar',
                Next: "Sonraki >",
                Previous: "< Önceki"
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