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
                extraCities.style.display = 'grid';
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
    // Calculator Widget Logic
    const calcRates = {
        local: {
            distances: [
                { value: 'upto10', label: 'UPTO 10 KM' },
                { value: '11to20', label: '11-20 KM' },
                { value: '20to50', label: '20-50 KM' }
            ],
            rates: {
                '1bhk': { upto10: '₹1,900 - ₹7,000', '11to20': '₹2,800 - ₹8,200', '20to50': '₹3,500 - ₹9,000' },
                '2bhk': { upto10: '₹2,000 - ₹8,200', '11to20': '₹3,000 - ₹10,500', '20to50': '₹3,000 - ₹11,800' },
                '3bhk': { upto10: '₹2,800 - ₹15,500', '11to20': '₹5,500 - ₹20,000', '20to50': '₹7,800 - ₹20,500' },
                '4bhk': { upto10: '₹5,000 - ₹13,800', '11to20': '₹6,000 - ₹15,800', '20to50': '₹7,000 - ₹18,500' },
                'complete': { upto10: '₹8,500 - ₹21,500', '11to20': '₹8,500 - ₹29,000', '20to50': '₹9,000 - ₹37,700' }
            }
        },
        long: {
            distances: [
                { value: 'upto500', label: 'UPTO 500 KM' },
                { value: '500to1000', label: '500-1000 KM' },
                { value: 'above1000', label: '1000+ KM' }
            ],
            rates: {
                '1bhk': { upto500: '₹11,000 - ₹24,000', '500to1000': '₹14,500 - ₹32,000', above1000: '₹18,000 - ₹40,000' },
                '2bhk': { upto500: '₹15,000 - ₹32,000', '500to1000': '₹18,000 - ₹40,000', above1000: '₹22,000 - ₹50,000' },
                '3bhk': { upto500: '₹20,000 - ₹40,000', '500to1000': '₹24,000 - ₹50,000', above1000: '₹28,000 - ₹65,000' },
                '4bhk': { upto500: '₹25,000 - ₹50,000', '500to1000': '₹30,000 - ₹60,000', above1000: '₹35,000 - ₹80,000' },
                'complete': { upto500: '₹35,000 - ₹65,000', '500to1000': '₹40,000 - ₹80,000', above1000: '₹50,000 - ₹1,00,000' }
            }
        }
    };

    const moveTypeSelect = document.getElementById('moveType');
    const propertyTypeSelect = document.getElementById('propertyType');
    const moveDistanceSelect = document.getElementById('moveDistance');
    const calcBtn = document.getElementById('calcBtn');
    const calcResult = document.getElementById('calcResult');
    const calcPrice = document.getElementById('calcPrice');

    if (moveTypeSelect && propertyTypeSelect && moveDistanceSelect && calcBtn && calcResult && calcPrice) {
        const updateDistanceOptions = () => {
            const selectedType = moveTypeSelect.value;
            const distances = calcRates[selectedType].distances;
            moveDistanceSelect.innerHTML = '';
            distances.forEach(d => {
                const option = document.createElement('option');
                option.value = d.value;
                option.textContent = d.label;
                moveDistanceSelect.appendChild(option);
            });
        };

        moveTypeSelect.addEventListener('change', updateDistanceOptions);

        calcBtn.addEventListener('click', () => {
            const selectedType = moveTypeSelect.value;
            const selectedProperty = propertyTypeSelect.value;
            const selectedDistance = moveDistanceSelect.value;
            
            const price = calcRates[selectedType].rates[selectedProperty][selectedDistance];
            
            calcPrice.textContent = price;
            calcResult.style.display = 'block';
        });

        // Initialize distance options on load
        updateDistanceOptions();
    }

    // Paytm Payment Modal Logic
    const paytmModal = document.getElementById('paytmModal');
    const openPaytmModalBtn = document.getElementById('open-paytm-modal');
    const closePaytmModalBtn = document.querySelector('.close-paytm');

    if (paytmModal && openPaytmModalBtn && closePaytmModalBtn) {
        openPaytmModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paytmModal.style.display = 'block';
        });

        closePaytmModalBtn.addEventListener('click', () => {
            paytmModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === paytmModal) {
                paytmModal.style.display = 'none';
            }
        });
    }
});
