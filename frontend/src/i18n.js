import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';


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
                'There are no posts': 'There are no posts',
                'Load old posts': 'Load old posts',
                'There are new posts': 'There are new posts',
                'Delete Post': 'Delete Post',
                'Are you sure to delete Post?': 'Are you sure to delete Post?'
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
                'There are no posts': 'Gönderi bulunamadı',
                'Load old posts': "Eski gönderileri yükle",
                "There are new posts": "Yeni gönderiler var",
                'Delete Post': `Gönderiyi sil`,
                'Are you sure to delete post?': `Gönderiyi silmek istedğinizden emin misiniz?`
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

const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ][index];
};
register('tr', timeageTR);


export default i18n;