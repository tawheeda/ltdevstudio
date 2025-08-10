// This event listener ensures the script runs only after the full page is loaded.
document.addEventListener('DOMContentLoaded', () => {
    // ---------- AOS Library Initialization ----------
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // ---------- Fade-in & Stagger Logic for About Section ----------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Trigger once
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));

    // ---------- Testimonial Slider Logic ----------
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

    // ---------- Mobile Navigation Toggle ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ---------- Popup Form Logic ----------
    window.openIdeaForm = () => {
        document.getElementById("ideaFormOverlay").style.display = "flex";
    };

    window.closeIdeaForm = () => {
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
        if (prevServiceBtn) prevServiceBtn.addEventListener('click', prevService);
        if (nextServiceBtn) nextServiceBtn.addEventListener('click', nextService);
    }

    // ---------- Project Card Mobile Click Logic ----------
    const projectCards = document.querySelectorAll('.js-project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const isActive = card.classList.contains('active');
                projectCards.forEach(otherCard => otherCard.classList.remove('active'));
                if (!isActive) card.classList.add('active');
            }
        });
    });
});
