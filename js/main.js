document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon if using a font icon library like FontAwesome
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '&#10005;'; // Close icon (X)
            } else {
                mobileMenuBtn.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '&#9776;';
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission mock (Prevent default)
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending Request...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Request Sent!';
                btn.style.background = '#27b75c'; // Success color
                quoteForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = ''; // Reset to default
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Hero Carousel Animation
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // Charges Tabs Toggle
    const tabLocal = document.getElementById('tab-local');
    const tabLong = document.getElementById('tab-long');
    const tableLocal = document.getElementById('table-local');
    const tableLong = document.getElementById('table-long');

    if (tabLocal && tabLong && tableLocal && tableLong) {
        tabLocal.addEventListener('click', () => {
            tabLocal.classList.add('active');
            tabLong.classList.remove('active');
            tableLocal.style.display = 'block';
            tableLong.style.display = 'none';
        });

        tabLong.addEventListener('click', () => {
            tabLong.classList.add('active');
            tabLocal.classList.remove('active');
            tableLong.style.display = 'block';
            tableLocal.style.display = 'none';
        });
    }

    // View More Cities/States Toggle
    const btnViewMoreCities = document.getElementById('view-more-cities');
    const extraCities = document.getElementById('extra-cities');
    
    if (btnViewMoreCities && extraCities) {
        btnViewMoreCities.addEventListener('click', () => {
            if (extraCities.style.display === 'none') {
                extraCities.style.display = 'flex';
                btnViewMoreCities.textContent = 'View Less States';
            } else {
                extraCities.style.display = 'none';
                btnViewMoreCities.textContent = 'View States';
            }
        });
    }

    // FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Toggle max-height for smooth transition
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
    // WhatsApp Popup Timer
    setTimeout(() => {
        const waPopup = document.getElementById('whatsapp-popup');
        if (waPopup) {
            waPopup.classList.add('show');
        }
    }, 8000); // 8 seconds

    const closeWaPopup = document.getElementById('close-wa-popup');
    if (closeWaPopup) {
        closeWaPopup.addEventListener('click', () => {
            const waPopup = document.getElementById('whatsapp-popup');
            if (waPopup) {
                waPopup.classList.remove('show');
            }
        });
    }
});
