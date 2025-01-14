// التحقق عند تحميل الصفحة إذا كان قد مر الوقت الكافي للمسح
if (localStorage.getItem('visited_waiting.html') === 'true') {
  // إذا كانت الزيارة من waiting.html، عرض محتوى الداشبورد
  document.getElementById('dashboard-content').style.display = 'block';

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

// رد الفعل عند الضغط على الزر
document.getElementById('buy-password-btn')?.addEventListener('click', () => {
  window.location.href = 'https://discord.gg/hfnMXUkzrU';
});

  function displayVisa(data) {
    const container = document.getElementById("visa-cards-container");
    if (data.length > 0) {
      const currentVisa = data[0];
      container.innerHTML = `
        <div class="card">
          <h3>رقم الفيزا: ${currentVisa.visa_number}</h3>
          <p>تاريخ الانتهاء: ${currentVisa.expiry_date}</p>
          <p>CVV: ${currentVisa.cvv}</p>
          <p>الدولة: ${currentVisa.region}</p>
          <p>الحالة: ${currentVisa.status}</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="card">
          <h3>لا توجد فيزات حاليًا</h3>
          <p>سيتم تحديثها قريبًا. نرجو عدم إزعاج أي إداري في الموقع.</p>
        </div>
      `;
    }
  }

  // تحديث بيانات الفيزا عند انتهاء العداد
  function updateVisaData() {
    fetch("visa.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // حذف أول فيزا
          const nextData = data.slice(1);

          // إرسال البيانات المحدثة إلى الخادم
          fetch("updateVisa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nextData),
          })
            .then(() => {
              displayVisa(nextData); // عرض الفيزا التالية
            })
            .catch((error) =>
              console.error("حدث خطأ أثناء تحديث بيانات الفيزا:", error)
            );
        } else {
          displayVisa([]);
        }
      })
      .catch((error) =>
        console.error("حدث خطأ أثناء تحميل بيانات الفيزا:", error)
      );
  }

// إعداد العداد
function startCountdown() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeUntilMidnight = nextMidnight - now;

  const countdownElement = document.createElement('div');
  countdownElement.id = 'countdown';
  document.body.appendChild(countdownElement);

  const updateCountdown = () => {
    const now = new Date();
    const timeLeft = nextMidnight - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <p>سيتم تحديث بيانات الفيزا عند منتصف الليل</p>
      <p>الوقت المتبقي: ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية</p>
    `;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // جدولة التحديث عند منتصف الليل
  setTimeout(() => {
    updateVisaData();
    setInterval(updateVisaData, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
}

function loadInitialVisa() {
  fetch("visa.json")
    .then((response) => response.json())
    .then((data) => {
      displayVisa(data); // عرض أول فيزا
    })
    .catch((error) =>
      console.error("حدث خطأ أثناء تحميل بيانات الفيزا:", error)
    );
}

startCountdown();
// إعداد العداد
function startCountdown() {
  const now = new Date();
  const nextUpdate = new Date();
  nextUpdate.setHours(24, 0, 0, 0); // تحديد الساعة 12 منتصف الليل
  const timeUntilNextUpdate = nextUpdate - now;

  function updateTimer() {
    const remainingTime = nextUpdate - new Date();
    if (remainingTime <= 0) {
      document.getElementById('timer').innerText = '00:00:00';
      clearInterval(countdownInterval);
      return;
    }

    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    document.getElementById('timer').innerText = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // تحديث العداد كل ثانية
  updateTimer();
  const countdownInterval = setInterval(updateTimer, 1000);
}

// استدعاء وظيفة العداد عند تحميل الصفحة
loadInitialVisa();
startCountdown();

document.getElementById('dropdown-toggle').addEventListener('click', function(event) {
  event.preventDefault(); // منع التمرير إلى الرابط
  var menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('show'); // عند الضغط تظهر أو تختفي القائمة
  this.classList.toggle('active'); // عند الضغط يحرك السهم
});

// عند الضغط في مكان آخر من الصفحة تختفي القائمة
document.addEventListener('click', function(event) {
  var menu = document.getElementById('dropdown-menu');
  var dropdown = document.querySelector('.dropdown');
  if (!dropdown.contains(event.target)) {
    menu.classList.remove('show'); // تختفي القائمة
    document.getElementById('dropdown-toggle').classList.remove('active'); // إخفاء السهم
  }
});


// التأكد من بداية العداد من 0 ويزداد بشكل تدريجي عند دخول الصفحة
window.addEventListener('load', function() {
  const counter = document.getElementById('counter');
  const visitsCounter = document.getElementById('visits-counter');
  let count = 0;
  const maxCount = 363;
  let speed = 50; // السرعة الأولية

  // إظهار عدد الزيارات
  visitsCounter.style.opacity = 1;

  // زيادة العداد بشكل تدريجي
  const interval = setInterval(function() {
    if (count < maxCount) {
      // كلما اقترب من العدد النهائي، يبطئ الرقم
      if (count > maxCount * 0.8) {
        speed = 100; // زيادة البطء عند الاقتراب
      } else if (count > maxCount * 0.5) {
        speed = 120; // تقليل السرعة بشكل تدريجي
      }

      count++;
      counter.textContent = count;
    } else {
      clearInterval(interval);
    }
  }, speed); // تعديل السرعة بناءً على قيمة العداد

  // إظهار العداد بعد تحميل الصفحة
  setTimeout(function() {
    counter.style.opacity = 1;
  }, 500); // إظهار العداد بعد نصف ثانية
});