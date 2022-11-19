import i18n from 'i18next';
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
                Previous: "< Previous",
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                Edit: 'Edit',
                'Change Display Name': 'Change Display Name',
                Save: 'Save',
                Cancel: 'Cancel',
                'My Profile': 'My Profile',
                'There are no posts': 'There are no posts'
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
                Previous: "< Önceki",
                'Load Failure': 'Liste alınamadı',
                'User not found': 'Kullanıcı bulunamadı!',
                Edit: 'Düzenle',
                'Change Display Name': 'Görünür İsminizi Değiştirin',
                Save: 'Kaydet',
                Cancel: 'İptal Et',
                'My Profile': 'Hesabım',
                'There are no posts': 'Gönderi bulunamadı'
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