// دالة لتحميل بيانات ID الحسابات من ملف JSON
async function getIdsFromFile() {
  const response = await fetch('passwords.json');
  const data = await response.json();
  return data.map(item => item.id); // إعادة قائمة بأرقام الحسابات فقط
}

// التعامل مع حدث تسجيل الدخول باستخدام Discord OAuth
document.getElementById('discord-login-btn').addEventListener('click', async () => {
  // التوجيه إلى رابط OAuth 2.0 لتسجيل الدخول عبر Discord
  window.location.href = 'https://discord.com/oauth2/authorize?client_id=1309799211830743051&response_type=code&redirect_uri=https%3A%2F%2Fyes.discloud.app%2Fwaiting.html&scope=identify+guilds.join+guilds';
});

// التحقق من صلاحية الدخول بعد العودة من OAuth
async function checkLogin() {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code'); // الحصول على الكود بعد تسجيل الدخول

  if (authCode) {
    // طلب رمز الوصول باستخدام الكود
    const tokenResponse = await fetch('http://localhost:3000/callback', {
      method: 'POST',
      body: JSON.stringify({ code: authCode }),
      headers: { 'Content-Type': 'application/json' },
    });


    const tokenData = await tokenResponse.json();
    const userId = tokenData.user.id; // الحصول على ID الحساب من البيانات المرسلة

    document.getElementById('waiting-message').style.display = 'block';

    setTimeout(async () => {
      // تحقق من صلاحية الدخول عبر ID الحساب
      const isValidUser = await validateId(userId);

      if (isValidUser) {
        // إذا كان ID موجودًا، يتم نقله إلى الداشبورد
        window.location.href = 'dashboard.html';
      } else {
        // إذا لم يكن ID موجودًا، يعرض رسالة الخطأ
        document.getElementById('waiting-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
      }
    }, 5000); // الانتظار لمدة 5 ثواني
  }
}

// التحقق عند تحميل الصفحة
if (window.location.pathname === '/callback.html') {
  checkLogin();
}
