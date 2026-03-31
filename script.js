/* =========================================================================
   1. MENU FIXO E ALTERAÇÃO DE COR (STICKY HEADER)
   ========================================================================= */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* =========================================================================
   2. MENU MOBILE (HAMBÚRGUER)
   ========================================================================= */
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    
    const icon = menuBtn.querySelector('i');
    if(navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-xmark');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});

/* =========================================================================
   3. ANIMAÇÕES DE APARECER NO SCROLL (REVEAL)
   ========================================================================= */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 
});

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

/* =========================================================================
   4. BOTÃO VOLTAR AO TOPO
   ========================================================================= */
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================================================
   5. ENVIO DE FORMULÁRIO PARA O WHATSAPP (SUGESTÃO 3)
   ========================================================================= */
const whatsappForm = document.getElementById('whatsapp-form');

if(whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que a página recarregue ao clicar em enviar

        // Captura os valores que o usuário digitou
        const nome = document.getElementById('form-nome').value;
        const servico = document.getElementById('form-servico').value;
        const mensagem = document.getElementById('form-mensagem').value;

        // Formata a mensagem que vai chegar no WhatsApp da JLF
        const textoWhatsApp = `Olá, JLF! Me chamo *${nome}*.\n\nPreciso de um serviço de: *${servico}*.\n\n*Detalhes:* ${mensagem}`;
        
        // Codifica o texto para o formato de URL (substitui espaços, quebras de linha, etc)
        const textoCodificado = encodeURIComponent(textoWhatsApp);
        
        // ATENÇÃO: Substitua pelo número real do WhatsApp da JLF (Apenas números, com DDI e DDD)
        const numeroJLF = "5511999999999";
        
        // Monta o link final e abre em uma nova aba
        const url = `https://wa.me/${numeroJLF}?text=${textoCodificado}`;
        window.open(url, '_blank');
        
        // Limpa o formulário após o envio
        whatsappForm.reset();
    });
}