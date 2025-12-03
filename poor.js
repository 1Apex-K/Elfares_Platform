// =====================
// Scroll Line Navbar
// =====================
let lastScroll = 0;

function updateScrollLine() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // تسريع الانسياب
  lastScroll += (scrollPercent - lastScroll) * 0.1; 
  document.querySelector('.scroll-line').style.width = lastScroll + '%';

  requestAnimationFrame(updateScrollLine);
}

requestAnimationFrame(updateScrollLine);


// ==================================================================================

// الانيميشن 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');   // يظهر
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.remove('show'); // يختفي
            entry.target.classList.add('hidden');
        }
    });
}, {
    threshold: 0.2  // معنى كده 20% من العنصر تظهر عشان الأنيمشن يشتغل
});

// هنا بحدد كل العناصر اللي في صفحتك كلها
const animatedElements = document.querySelectorAll(
    '.hero-card .card-text h1, ' +
    '.hero-card .card-text h2, ' +
    '.hero-card .card-text h3, ' +
    '.hero-card .buttons .btn, ' +
    '.card-image img, ' +
    '.feature-item, ' +
    '.cards-row .card, ' +
    '.big-card .left-side, ' +
    '.big-card .paragraph-group'
);

animatedElements.forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// ===========================================================================================================================================================================