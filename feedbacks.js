const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const feedback = document.getElementById('feedback').value;

  if (!username || !feedback) {
    alert('الرجاء ملء جميع الحقول!');
    return;
  }

  const review = {
    username,
    feedback,
    timestamp: new Date().toISOString(),
  };

  // حفظ التقييم مباشرة في ملف onReview.json
  saveReviewDirectly(review);

function saveReviewDirectly(review) {
  const reviewFile = 'onReview.json';

  fetch(reviewFile)
    .then((response) => response.json())
    .then((reviews) => {
      reviews.push(review); // إضافة التقييم الجديد
      updateJSONFile(reviewFile, reviews); // تحديث الملف
    })
    .catch((error) => {
      console.error('حدث خطأ أثناء حفظ التقييم:', error);
    });
}

function updateJSONFile(file, data) {
  fetch(file, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => console.log(`تم تحديث الملف: ${file}`))
    .catch((error) => console.error('حدث خطأ أثناء تحديث الملف:', error));
}
