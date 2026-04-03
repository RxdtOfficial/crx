document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Set active link based on current URL
  const currentPath = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });

  // Scroll Reveal Animation (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // Flowing Particles Canvas Animation (for Hero sections)
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * -1 - 0.5; // Flow upwards
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Reset if out of bounds
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(37, 99, 235, ${this.alpha})`; // blue-mid
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
              let dx = particles[i].x - particles[j].x;
              let dy = particles[i].y - particles[j].y;
              let distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 120) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 - distance/1200})`; // green
                  ctx.lineWidth = 1;
                  ctx.moveTo(particles[i].x, particles[i].y);
                  ctx.lineTo(particles[j].x, particles[j].y);
                  ctx.stroke();
              }
          }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Contact Form WhatsApp Redirect
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const whatsapp = document.getElementById('whatsapp').value;
      const empresa = document.getElementById('empresa').value;
      const objetivo = document.getElementById('objetivo').value;
      
      // SUBSTITUA PELO NUMERO REAL DA EMPRESA (COM DDD, SEM ESPAÇOS OU TRAÇOS)
      const numeroVendas = "5511999999999"; 
      
      const mensagem = `Olá! Quero estruturar o crescimento da minha empresa.%0A%0A*Nome:* ${nome}%0A*WhatsApp:* ${whatsapp}%0A*Empresa:* ${empresa}%0A*Desafio/Objetivo:* ${objetivo}`;
      
      const url = `https://wa.me/${numeroVendas}?text=${mensagem}`;
      window.open(url, '_blank'); // Abre em nova aba
    });
  }
});
