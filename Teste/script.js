document.addEventListener('DOMContentLoaded', function() {
    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== MOBILE MENU ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .step, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // ========== TESTIMONIALS CAROUSEL ==========
    const testimonialsData = [
        {
            quote: "Serviço impecável! Meu sofá ficou como novo. A equipe foi pontual, profissional e extremamente cuidadosa. Recomendo!",
            name: "Maria Silva",
            role: "Residencial - São Paulo"
        },
        {
            quote: "Contratamos para o escritório e superou expectativas. Todos os estofados ficaram renovados. Ótimo custo-benefício.",
            name: "Carlos Santos",
            role: "Empresarial - Rio de Janeiro"
        },
        {
            quote: "Meu colchão estava com ácaros que causavam alergia. Depois da limpeza, meu sono melhorou 100%. Profissionais excelentes!",
            name: "Ana Oliveira",
            role: "Residencial - Belo Horizonte"
        },
        {
            quote: "Serviço rápido e eficiente. O carro ficou com cheiro de novo. Agradeço pela qualidade e pontualidade!",
            name: "Roberto Almeida",
            role: "Automotivo - Curitiba"
        },
        {
            quote: "Como dona de um pequeno hotel, preciso de serviços confiáveis. A Limpo Estofados nunca decepcionou. Ótimo trabalho!",
            name: "Fernanda Costa",
            role: "Hoteleiro - Florianópolis"
        }
    ];

    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsDots = document.getElementById('testimonialsDots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    let autoSlideInterval;

    // Initialize testimonials
    function initTestimonials() {
        testimonialsData.forEach((testimonial, index) => {
            // Create testimonial card
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="quote">"</div>
                <p>${testimonial.quote}</p>
                <h4>${testimonial.name}</h4>
                <p class="text-gradient">${testimonial.role}</p>
            `;
            testimonialsTrack.appendChild(testimonialCard);

            // Create dot
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            testimonialsDots.appendChild(dot);
        });

        startAutoSlide();
    }

    function updateSlidePosition() {
        testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        if (currentSlide < 0) currentSlide = testimonialsData.length - 1;
        if (currentSlide >= testimonialsData.length) currentSlide = 0;
        updateSlidePosition();
        resetAutoSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize and set up event listeners
    initTestimonials();
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Pause auto slide on hover
    testimonialsTrack.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // ========== GALLERY MODAL ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ========== FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Obrigado! Em breve entraremos em contato para fornecer seu orçamento.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // ========== CREATE PARTICLES ==========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.animation = `float ${duration}s ease-in-out infinite`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== FLOATING ELEMENTS HOVER EFFECT ==========
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) rotate(0deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            const rotation = element.style.getPropertyValue('--rotation');
            element.style.transform = `rotate(${rotation})`;
        });
    });
});