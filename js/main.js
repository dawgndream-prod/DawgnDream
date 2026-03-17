/**
 * DawgnDream — Official Website Main Script
 * Handles: Mobile Menu, Interactive Background, Parallax, Nav Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initMusicBackground();
    initParallax();
    highlightCurrentPage();
});

/**
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('active');
        if (isOpen) {
            menu.classList.remove('active');
            menu.classList.add('hidden');
            menu.style.opacity = '0';
            document.body.style.overflow = '';
        } else {
            menu.classList.remove('hidden');
            setTimeout(() => {
                menu.classList.add('active');
                menu.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menu.classList.add('hidden');
            menu.style.opacity = '0';
            document.body.style.overflow = '';
        });
    });
}

/**
 * Interactive Music Notes Background (Antigravity-style)
 */
function initMusicBackground() {
    const canvas = document.getElementById('music-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    const notes = ['♪', '♫', '♬', '♩'];

    class Particle {
        constructor(x, y) {
            this.originX = x;
            this.originY = y;
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.note = notes[Math.floor(Math.random() * notes.length)];
            this.size = Math.random() * 10 + 10;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.friction = 0.95;
            this.spring = 0.05;
        }

        update() {
            // Distance to mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 2;
                this.vy -= Math.sin(angle) * force * 2;
            }

            // Spring back to origin
            this.vx += (this.originX - this.x) * this.spring;
            this.vy += (this.originY - this.y) * this.spring;

            this.vx *= this.friction;
            this.vy *= this.friction;

            this.x += this.vx;
            this.y += this.vy;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.font = `${this.size}px serif`;
            ctx.fillText(this.note, this.x, this.y);
        }
    }

    function init() {
        particles = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const spacing = 60;
        for (let x = spacing / 2; x < canvas.width; x += spacing) {
            for (let y = spacing / 2; y < canvas.height; y += spacing) {
                particles.push(new Particle(x, y));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', init);

    init();
    animate();
}

/**
 * Parallax Effect for Hero Name
 */
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (layers.length === 0) return;

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 1;
            layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

/**
 * Navigation Highlighting
 */
function highlightCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-pill-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) {
            link.classList.add('active-pill');
        } else {
            link.classList.remove('active-pill');
        }
    });
}
