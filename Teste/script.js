// Slider Antes/Depois totalmente revisado e corrigido
document.querySelectorAll('.comparison-slider').forEach(slider => {
    const beforeContainer = slider.querySelector('.before-container');
    const handle = slider.querySelector('.handle');

    let isDragging = false;

    const move = (clientX) => {
        const rect = slider.getBoundingClientRect();

        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percent = (x / rect.width) * 100;

        beforeContainer.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
        handle.style.left = `${percent}%`;
    };

    const start = (clientX) => {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        handle.style.cursor = 'grabbing';
        move(clientX);
    };

    const stop = () => {
        isDragging = false;
        slider.style.cursor = 'ew-resize';
        handle.style.cursor = 'grab';
    };

    slider.addEventListener("mousedown", e => {
        e.preventDefault();
        start(e.clientX);
    });

    document.addEventListener("mousemove", e => {
        if (isDragging) move(e.clientX);
    });

    document.addEventListener("mouseup", stop);

    // TOUCH
    slider.addEventListener("touchstart", e => {
        e.preventDefault();
        start(e.touches[0].clientX);
    });

    document.addEventListener("touchmove", e => {
        if (isDragging) move(e.touches[0].clientX);
    });

    document.addEventListener("touchend", stop);

    // Inicia no meio
    move(window.innerWidth / 2);
});

/* Formulário */
document.getElementById('contactForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert("Mensagem enviada! Em breve retornamos pelo WhatsApp!");
    this.reset();
});

/* Header com sombra */
window.addEventListener("scroll", () => {
    document.getElementById("header")
        .classList.toggle("shadow", window.scrollY > 50);
});

/* Contador animado */
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.getAttribute('data-count') > 99 ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Inicia o contador quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateCounter, 1000);
});

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Inicializar AOS
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
}