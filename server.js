const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const clientId = '1309799211830743051';
const clientSecret = 'gx1R3yKWPpWu8Rzm_MkvciMaHKU8JiYl';
const redirectUri = 'https://discord.com/oauth2/authorize?client_id=1309799211830743051&response_type=code&redirect_uri=https%3A%2F%2Fyes.discloud.app%2Fwaiting.html&scope=identify+guilds.join+guilds'; // رابط العودة بعد التسجيل

app.use(express.static('public'));

// صفحة تسجيل الدخول
app.get('/login', (req, res) => {
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
    res.redirect(discordAuthUrl);
});

// صفحة العودة من Discord بعد التسجيل
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.send('خطأ في تسجيل الدخول.');
    }

    try {
        // إرسال طلب للحصول على التوكن من Discord
        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const accessToken = response.data.access_token;

        // الحصول على بيانات المستخدم
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userId = userResponse.data.id;

        // التحقق من وجود معرف المستخدم في ids.json
        fs.readFile('ids.json', 'utf8', (err, data) => {
            if (err) {
                return res.send('خطأ في قراءة الملف.');
            }

            const ids = JSON.parse(data);

            if (ids.includes(userId)) {
                res.redirect('/waiting');
            } else {
                res.send('إنت غير مسموح لك بتسجيل الدخول.');
            }
        });
    } catch (err) {
        console.error(err);
        res.send('حدث خطأ أثناء محاولة تسجيل الدخول.');
    }
});

// صفحة الانتظار
app.get('/waiting', (req, res) => {
    res.send('<h1>تم تسجيل الدخول بنجاح! بانتظار التحقق...</h1>');
});

// بدء الخادم
app.listen(3000, () => {
    console.log('الخادم يعمل على http://localhost:3000');
});
