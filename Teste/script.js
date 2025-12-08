// Antes & Depois Interativo
document.querySelectorAll('.comparison-slider').forEach(slider => {
    const before = slider.querySelector('.before');
    const after = slider.querySelector('.after');
    const handle = slider.querySelector('.handle');
    let isActive = false;

    const move = (clientX) => {
        if (!isActive) return;
        const rect = slider.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        if (percent >= 0 && percent <= 100) {
            after.style.clipPath = `polygon(${percent}% 0%, 100% 0%, 100% 100%, ${percent}% 100%)`;
            handle.style.left = percent + '%';
        }
    };

    slider.addEventListener('mousedown', () => isActive = true);
    slider.addEventListener('touchstart', e => { isActive = true; move(e.touches[0].clientX); });
    document.addEventListener('mouseup', () => isActive = false);
    document.addEventListener('touchend', () => isActive = false);
    slider.addEventListener('mousemove', e => move(e.clientX));
    slider.addEventListener('touchmove', e => { e.preventDefault(); move(e.touches[0].clientX); });

    // Inicia no meio
    after.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    handle.style.left = '50%';
});

// Formulário com alerta
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! Em até 5 minutos entraremos em contato pelo WhatsApp!');
    this.reset();
});

// Header scroll
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('shadow', window.scrollY > 50);
});