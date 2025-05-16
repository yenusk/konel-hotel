document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Auto slide change every 5 seconds
    startSlideShow();

    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', startSlideShow);

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Gallery
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.querySelector('.lightbox-caption').textContent = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    const testimonialDots = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
        testimonialDots.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        
        // Update dots
        document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentTestimonial = index;
    }

    function nextTestimonialSlide() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonialSlide() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonialSlide, 6000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    nextTestimonial.addEventListener('click', () => {
        nextTestimonialSlide();
        resetTestimonialInterval();
    });
    
    prevTestimonial.addEventListener('click', () => {
        prevTestimonialSlide();
        resetTestimonialInterval();
    });

    // Auto testimonial change every 6 seconds
    startTestimonialInterval();

    // Booking Modal
    const bookingModal = document.querySelector('.booking-modal');
    const bookingBtns = document.querySelectorAll('[href="#booking"], .booking-btn .btn');
    const closeModal = document.querySelector('.close-modal');

    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#booking') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            document.querySelector('.loading-spinner').classList.add('active');
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                showFormError('Please enter your name', name);
                return;
            }
            
            if (email.value.trim() === '' || !validateEmail(email.value)) {
                showFormError('Please enter a valid email', email);
                return;
            }
            
            if (subject.value.trim() === '') {
                showFormError('Please enter a subject', subject);
                return;
            }
            
            if (message.value.trim() === '') {
                showFormError('Please enter your message', message);
                return;
            }
            
            // Simulate form submission (in a real app, you would use fetch or AJAX)
            setTimeout(() => {
                document.querySelector('.loading-spinner').classList.remove('active');
                showFormSuccess('Thank you for your message! We will get back to you soon.');
                this.reset();
            }, 1500);
        });
    }

    // Form validation for booking forms
    const bookingForm = document.getElementById('bookingForm');
    const quickBookingForm = document.getElementById('quickBookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingForm(this);
        });
    }
    
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingForm(this);
        });
    }

    function handleBookingForm(form) {
        const checkIn = form.querySelector('input[name="check-in"]');
        const checkOut = form.querySelector('input[name="check-out"]');
        const guests = form.querySelector('select[name="guests"]');
        const roomType = form.querySelector('select[name="room-type"]');
        const firstName = form.querySelector('input[name="first-name"]') || { value: '' };
        const lastName = form.querySelector('input[name="last-name"]') || { value: '' };
        const email = form.querySelector('input[name="email"]') || { value: '' };
        const phone = form.querySelector('input[name="phone"]') || { value: '' };
        const formStatus = form.querySelector('.form-status') || document.createElement('div');
        
        // Validate dates
        if (!checkIn.value || !checkOut.value) {
            showFormError('Please select both check-in and check-out dates', formStatus);
            return;
        }
        
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);
        
        if (checkOutDate <= checkInDate) {
            showFormError('Check-out date must be after check-in date', formStatus);
            return;
        }
        
        // For full booking form, validate additional fields
        if (form.id === 'bookingForm') {
            if (!firstName.value.trim()) {
                showFormError('Please enter your first name', formStatus);
                return;
            }
            
            if (!lastName.value.trim()) {
                showFormError('Please enter your last name', formStatus);
                return;
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                showFormError('Please enter a valid email address', formStatus);
                return;
            }
            
            if (!phone.value.trim()) {
                showFormError('Please enter your phone number', formStatus);
                return;
            }
        }
        
        // Show loading state
        formStatus.textContent = 'Processing your booking...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        
        // Simulate API call (in a real app, use fetch or AJAX)
        setTimeout(() => {
            if (form.id === 'bookingForm') {
                // For full booking form, show success message and close modal
                showFormSuccess('Your booking has been confirmed! We have sent the details to your email.', formStatus);
                
                setTimeout(() => {
                    bookingModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }, 2000);
            } else {
                // For quick booking form, redirect to full booking form with prefilled values
                showFormSuccess('Rooms are available for your selected dates!', formStatus);
                
                // Prefill the booking modal
                if (bookingForm) {
                    document.getElementById('modal-check-in').value = checkIn.value;
                    document.getElementById('modal-check-out').value = checkOut.value;
                    document.getElementById('modal-guests').value = guests.value;
                    document.getElementById('modal-room-type').value = roomType.value;
                    
                    // Open the modal
                    setTimeout(() => {
                        bookingModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }, 1000);
                }
            }
        }, 1500);
    }

    function showFormError(message, element) {
        const formStatus = element.classList.contains('form-status') ? element : document.createElement('div');
        formStatus.textContent = message;
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        
        if (!element.classList.contains('form-status')) {
            element.insertAdjacentElement('afterend', formStatus);
        }
        
        // Focus on the problematic field
        if (element.focus) {
            element.focus();
        }
    }

    function showFormSuccess(message, element) {
        element.textContent = message;
        element.className = 'form-status success';
        element.style.display = 'block';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Set minimum date for booking forms (today)
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
        
        // Set default check-in to today and check-out to tomorrow
        if (input.id === 'check-in' || input.id === 'modal-check-in') {
            input.value = today;
        }
        
        if (input.id === 'check-out' || input.id === 'modal-check-out') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            input.value = tomorrow.toISOString().split('T')[0];
        }
    });

    // Initialize current slide on page load
    showSlide(0);
    showTestimonial(0);

    // Accessibility improvements
    document.querySelectorAll('img').forEach(img => {
        if (!img.alt) {
            img.alt = 'Hotel image';
        }
    });
});