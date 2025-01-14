// التحقق عند تحميل الصفحة إذا كان قد مر الوقت الكافي للمسح
if (localStorage.getItem('visited_waiting.html') === 'true') {
  // إذا كانت الزيارة من waiting.html، عرض محتوى الداشبورد
  document.getElementById('redirectcodexhsduubdd46gdw2-content').style.display = 'block';

  // حذف البيانات بعد 3 ثواني من الدخول للصفحة
  setTimeout(function() {
    localStorage.removeItem('visited_waiting.html');
  }, 3000);

} else {
  // إذا لم تكن الزيارة من waiting.html، عرض رسالة رفض الوصول
  document.getElementById('access-denied').style.display = 'block';
}

// التحقق بعد التحديث
window.onbeforeunload = function() {
  localStorage.setItem('visited_waiting.html', 'false');
};