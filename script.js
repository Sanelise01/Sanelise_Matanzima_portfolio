// ==========================
// FADE-IN ANIMATIONS ON SCROLL
// ==========================
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = { threshold: 0.1 };

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => fadeObserver.observe(el));

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

// ==========================
// SKILL BARS ANIMATION
// ==========================
const skillBars = document.querySelectorAll('.skill-level');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
            bar.querySelector('span:last-child').innerText = level; // Update percentage text
            observer.unobserve(bar);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.6 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==========================
// CORE COMPETENCIES TAG HOVER EFFECT
// ==========================
const tags = document.querySelectorAll('.skills-core .core-tags span');

tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px) scale(1.1)';
        tag.style.boxShadow = '0 8px 20px rgba(255,118,140,0.4)';
        tag.style.filter = 'brightness(1.2)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
        tag.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        tag.style.filter = 'brightness(1)';
    });
});
