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
    document.querySelectorAll('.service-card, .step').forEach(el => {
        observer.observe(el);
    });

    // ========== NOVA GALERIA INFINITA ==========
    const galleryItems = [
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Sofá Residencial',
            description: 'Estado antes da higienização'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Sofá Renovado',
            description: 'Resultado após limpeza profunda'
        },
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Colchão Antigo',
            description: 'Acumulo de ácaros e sujeira'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1616628188550-8d7518d2746c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Colchão Higienizado',
            description: 'Limpeza completa e desinfecção'
        },
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Estofado Automotivo',
            description: 'Manchas e odores acumulados'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Interior Renovado',
            description: 'Aspecto de novo restaurado'
        },
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Poltrona de Escritório',
            description: 'Desgaste e sujeira visível'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Poltrona Restaurada',
            description: 'Cor e textura revitalizadas'
        },
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Estofado Corporativo',
            description: 'Uso intenso e manchas'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Ambiente Profissional',
            description: 'Limpeza completa e higienização'
        },
        {
            type: 'before',
            image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Cadeira de Restaurante',
            description: 'Acúmulo de gordura e resíduos'
        },
        {
            type: 'after',
            image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Cadeira Higienizada',
            description: 'Proteção antimancha aplicada'
        }
    ];

    const galleryTrack = document.getElementById('galleryTrack');
    
    function initGallery() {
        // Duplicamos os itens para criar o efeito infinito
        const galleryItemsDuplicated = [...galleryItems, ...galleryItems, ...galleryItems];
        
        galleryItemsDuplicated.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-badge ${item.type === 'before' ? 'badge-before' : 'badge-after'}">
                    ${item.type === 'before' ? 'ANTES' : 'DEPOIS'}
                </div>
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryTrack.appendChild(galleryItem);
        });
    }

    initGallery();

    // ========== CARROSSEL DE DEPOIMENTOS INFINITO ==========
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
        },
        {
            quote: "Atendimento excepcional! Minha poltrona favorita estava irreconhecível e agora parece que acabei de comprar. Incrível!",
            name: "Ricardo Lima",
            role: "Residencial - Campinas"
        },
        {
            quote: "Profissionais muito bem treinados, equipamentos modernos e resultado acima da expectativa. Voltarei a contratar!",
            name: "Patrícia Mendes",
            role: "Consultório - São Paulo"
        },
        {
            quote: "Sofá de 5 anos parecendo novo! O processo de secagem foi rápido e não precisei ficar sem usar o móvel por muito tempo.",
            name: "João Pereira",
            role: "Residencial - Santos"
        }
    ];

    const testimonialsTrack = document.getElementById('testimonialsTrack');
    
    function initTestimonials() {
        // Duplicamos os depoimentos para criar o efeito infinito
        const testimonialsDuplicated = [...testimonialsData, ...testimonialsData, ...testimonialsData];
        
        testimonialsDuplicated.forEach((testimonial, index) => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="quote">"</div>
                <p>${testimonial.quote}</p>
                <h4>${testimonial.name}</h4>
                <p class="text-gradient">${testimonial.role}</p>
            `;
            testimonialsTrack.appendChild(testimonialCard);
        });
    }

    initTestimonials();

    // ========== GALLERY MODAL ==========
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    galleryTrack.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const imgSrc = galleryItem.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
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

    // ========== AUTO-PLAY CONTROLS ==========
    let isGalleryPaused = false;
    let isTestimonialsPaused = false;

    const galleryContainer = document.querySelector('.gallery-container');
    const testimonialsContainer = document.querySelector('.testimonials-container');

    // Pause on hover (already handled by CSS, but adding JS for extra control)
    galleryContainer.addEventListener('mouseenter', () => {
        isGalleryPaused = true;
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isGalleryPaused = false;
    });

    testimonialsContainer.addEventListener('mouseenter', () => {
        isTestimonialsPaused = true;
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        isTestimonialsPaused = false;
    });
});