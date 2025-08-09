// This event listener ensures the script runs only after the full page is loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the AOS library for "Animate On Scroll" effects
    AOS.init();

    // ---------- Testimonial slider logic ----------
    const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
    let currentIndexTestimonial = 0;
    const delayTestimonial = 5000;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentIndexTestimonial = (currentIndexTestimonial + 1) % testimonials.length;
        showTestimonial(currentIndexTestimonial);
    }

    if (testimonials.length > 0) {
        showTestimonial(currentIndexTestimonial);
        setInterval(nextTestimonial, delayTestimonial);
    }

    // ---------- Mobile navigation toggle logic ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ---------- Popup Form Logic ----------
    window.openIdeaForm = function () {
        document.getElementById("ideaFormOverlay").style.display = "flex";
    };

    window.closeIdeaForm = function () {
        document.getElementById("ideaFormOverlay").style.display = "none";
    };

    // ---------- Service Slider Logic ----------
    const serviceItems = document.querySelectorAll('.service-slider .neumorphic-service-item');
    const prevServiceBtn = document.querySelector('.prev-service');
    const nextServiceBtn = document.querySelector('.next-service');
    let currentServiceIndex = 0;

    function showService(index) {
        serviceItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextService() {
        currentServiceIndex = (currentServiceIndex + 1) % serviceItems.length;
        showService(currentServiceIndex);
    }

    function prevService() {
        currentServiceIndex = (currentServiceIndex - 1 + serviceItems.length) % serviceItems.length;
        showService(currentServiceIndex);
    }

    if (serviceItems.length > 0) {
        showService(currentServiceIndex);
        if (prevServiceBtn) {
            prevServiceBtn.addEventListener('click', prevService);
        }
        if (nextServiceBtn) {
            nextServiceBtn.addEventListener('click', nextService);
        }
    }

    // ---------- Project Card Mobile Click Logic ----------
    // This script handles the toggle of project details on mobile click
    const projectCards = document.querySelectorAll('.js-project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Check if the screen is a mobile size (e.g., less than 768px)
            if (window.innerWidth <= 768) {
                // Check if the clicked card is already active
                const isActive = card.classList.contains('active');
    
                // Remove the 'active' class from all other cards to close them
                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
    
                // Toggle the 'active' class on the clicked card
                if (!isActive) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            }
        });
    });
});
