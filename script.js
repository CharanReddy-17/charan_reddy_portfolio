/* =====================================================================
   COMPLETE PORTFOLIO JAVASCRIPT
   ===================================================================== */

// ── Progress Bar ──────────────────────────────────────────────────────
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ── Navbar Scroll Effect ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ───────────────────────────────────────────────────────
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.getElementById('navLinks');
const mobileBtnIcon = mobileBtn.querySelector('i');

mobileBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    mobileBtnIcon.className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtnIcon.className = 'ti ti-menu-2';
    });
});

// ── Particle Constellation Background ────────────────────────────────
(function () {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles, mouse = { x: -9999, y: -9999 };

    const CONFIG = {
        count:        110,
        speed:        0.35,
        dotRadius:    2,
        lineDistance: 130,
        mouseRadius:  160,
        dotColor:     'rgba(0,255,178,',
        lineColor:    'rgba(0,195,255,',
    };

    class Particle {
        constructor() { this.reset(true); }
        reset(initial) {
            this.x  = Math.random() * W;
            this.y  = initial ? Math.random() * H : -10;
            this.vx = (Math.random() - 0.5) * CONFIG.speed;
            this.vy = (Math.random() - 0.5) * CONFIG.speed;
            this.r  = Math.random() * CONFIG.dotRadius + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.mouseRadius) {
                const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
                this.x += dx / dist * force * 2.5;
                this.y += dy / dist * force * 2.5;
            }
            this.x += this.vx;
            this.y += this.vy;
            // Bounce off edges
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
            this.x = Math.max(0, Math.min(W, this.x));
            this.y = Math.max(0, Math.min(H, this.y));
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = CONFIG.dotColor + this.alpha + ')';
            ctx.fill();
        }
    }

    function init() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        particles = Array.from({ length: CONFIG.count }, () => new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.lineDistance) {
                    const opacity = (1 - dist / CONFIG.lineDistance) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = CONFIG.lineColor + opacity + ')';
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        // Subtle dark base gradient per frame
        ctx.fillStyle = '#05050F';
        ctx.fillRect(0, 0, W, H);
        drawLines();
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    init();
    animate();
})();

// ── Cursor Glow ───────────────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor glow with lerp
function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';

        cursorGlow.style.top  = glowY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ── Typed Text Effect ─────────────────────────────────────────────────
const roles = ['Problem Solver', 'Data Science Enthusiast', 'CSE Student'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeRole() {
    if (!typedEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeRole, delay);
}
setTimeout(typeRole, 800);

// ── Scroll Reveal ─────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObs.observe(el));

// Hero always visible
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal, #hero').forEach(el => el.classList.add('active'));
    }, 100);
});

// ── Skills Tabs ───────────────────────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeTab = document.getElementById('tab-' + target);
        if (activeTab) {
            activeTab.classList.add('active');
            // Animate skill bars when tab becomes visible
            animateSkillBars(activeTab);
        }
    });
});

// ── Skill Bar Animations ──────────────────────────────────────────────
function animateSkillBars(container) {
    const fills = container.querySelectorAll('.skill-bar-fill');
    fills.forEach((fill, i) => {
        const width = fill.dataset.width;
        setTimeout(() => {
            fill.style.width = width + '%';
        }, i * 120);
    });
}

// Animate initial tab's bars when skills section enters view
const skillsSection = document.getElementById('skills');
const skillsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) animateSkillBars(activeTab);
        skillsObs.disconnect();
    }
}, { threshold: 0.3 });
if (skillsSection) skillsObs.observe(skillsSection);

// ── 3D Tilt on Project Cards ──────────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ── Profile Photo Upload ──────────────────────────────────────────────
const photoInput = document.getElementById('photoInput');
const profileImg = document.getElementById('profileImg');
const photoPlaceholder = document.getElementById('photoPlaceholder');

if (photoInput) {
    photoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                profileImg.classList.remove('hidden');
                const label = photoPlaceholder.querySelector('.photo-upload-label');
                if (label) label.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
}

// ── Contact Form (EmailJS) ────────────────────────────────────────────
// ⚠️  Replace the three YOUR_... values below with your EmailJS credentials
const EMAILJS_PUBLIC_KEY  = '2QRKAqyisHwqwwv3N';
const EMAILJS_SERVICE_ID  = 'service_killm23';
const EMAILJS_TEMPLATE_ID = 'template_oaj1b2a';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('contactName').value.trim();
        const email   = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        // Validate required fields
        const requiredInputs = [
            document.getElementById('contactName'),
            document.getElementById('contactEmail'),
            document.getElementById('contactMessage')
        ];
        let valid = true;
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ff4d6d';
                input.style.animation   = 'shake 0.4s ease';
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.animation   = '';
                }, 600);
            }
        });
        if (!valid) return;

        // Send via EmailJS
        submitBtn.disabled     = true;
        submitBtn.innerHTML    = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite"></i> Sending...';

        const templateParams = {
            from_name:    name,
            from_email:   email,
            subject:      subject || 'Portfolio Contact',
            message:      message,
            to_name:      'Charan Reddy',
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                contactForm.reset();
                submitBtn.disabled  = false;
                submitBtn.innerHTML = '<i class="ti ti-send"></i> Send Message';
                formSuccess.textContent = '✅ Message sent! I\'ll get back to you soon.';
                formSuccess.classList.add('show');
                setTimeout(() => formSuccess.classList.remove('show'), 6000);
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                submitBtn.disabled  = false;
                submitBtn.innerHTML = '<i class="ti ti-send"></i> Send Message';
                formSuccess.textContent = '❌ Something went wrong. Please email me directly!';
                formSuccess.style.color = '#ff4d6d';
                formSuccess.classList.add('show');
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    formSuccess.style.color = '';
                }, 6000);
            });
    });
}

// ── Active Nav Link on Scroll ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.btn-contact)');

const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkEls.forEach(link => {
                link.classList.toggle('active-nav', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => navObs.observe(s));

// Add active-nav style
const navStyle = document.createElement('style');
navStyle.textContent = '.nav-link.active-nav { color: var(--text-1); } .nav-link.active-nav::after { width:100%; }';
document.head.appendChild(navStyle);

// ── Keyframe injection for modal animations ───────────────────────────
const extraStyles = document.createElement('style');
extraStyles.textContent = `
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
@keyframes spin  { to{transform:rotate(360deg)} }
`;
document.head.appendChild(extraStyles);
