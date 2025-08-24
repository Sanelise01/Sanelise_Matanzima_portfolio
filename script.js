// ==========================
// FADE-IN ANIMATIONS ON SCROLL
// ==========================
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});

// CSS for fade-in-visible (add to your CSS file):
/*
.animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;
}

.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
*/

// ==========================
// COUNTER ANIMATION FOR STATS
// ==========================
const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 200; // smaller = faster

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    const observerCounter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    observerCounter.observe(counter);
});
