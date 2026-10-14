/**
 * Interactive Scripts for Dipesha Ajay Wani Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Theme (White / Black)
    initTheme();

    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // 2. Typing Effect for Hero Subtitle (Clean: Only Full Stack Developer & B.Tech Computer Engineer)
    const words = [
        "Full Stack Developer",
        "B.Tech Computer Engineer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typed-text');

    function typeEffect() {
        if (!typedElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1800; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // 3. Navbar scroll effect & Active Link Spy
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scrolled header background
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active navigation link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 5. Desktop Cursor Ambient Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }
});

// ==================== WHITE & BLACK THEME CONTROLLER ====================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme, false);

    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme, true);
}

function applyTheme(theme, notify = false) {
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    const mobileThemeText = document.getElementById('mobile-theme-text');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('portfolio-theme', 'light');

        if (themeIcon) {
            themeIcon.className = 'fa-solid fa-moon text-indigo-500';
        }
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('title', 'Switch to Black (Dark) Theme');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.className = 'fa-solid fa-moon text-indigo-500';
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Switch to Black Theme';
        }

        if (notify) {
            showToast('☀️ White (Light) Theme activated');
        }
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('portfolio-theme', 'dark');

        if (themeIcon) {
            themeIcon.className = 'fa-solid fa-sun text-amber-400';
        }
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('title', 'Switch to White (Light) Theme');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.className = 'fa-solid fa-sun text-amber-400';
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Switch to White Theme';
        }

        if (notify) {
            showToast('🌙 Black (Dark) Theme activated');
        }
    }
}

// Toast notification helper
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
}

// Copy to clipboard function
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(successMsg);
    });
}

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
    const message = document.getElementById('message').value;

    const mailtoUrl = `mailto:dipeshawani7@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

    showToast("Opening email client to send your message...");

    setTimeout(() => {
        window.location.href = mailtoUrl;
    }, 800);

    // Optional form reset
    document.getElementById('contact-form').reset();
}

// Project Modal Handler
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');

    if (projectId === 'vishwa') {
        modalContent.innerHTML = `
            <div class="space-y-5">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                    <i class="fa-solid fa-star text-amber-400"></i> Featured Full Stack Project
                </div>
                <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Vishwa Event Decoration System
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed">
                    <strong>Vishwa Event Decoration System</strong> is a full-stack web application developed to revolutionize how event decorators manage bookings, display decoration designs, and communicate with clients.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                    <div class="p-4 rounded-xl bg-dark-surface border border-slate-800">
                        <h4 class="font-bold text-white text-sm mb-1"><i class="fa-solid fa-layer-group text-cyan-400 mr-2"></i>Frontend & UX</h4>
                        <p class="text-xs text-slate-400">Developed with <strong>React.js, HTML5, CSS3, and JavaScript</strong>. Designed responsive layouts in <strong>Figma</strong> for maximum aesthetic appeal.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-dark-surface border border-slate-800">
                        <h4 class="font-bold text-white text-sm mb-1"><i class="fa-solid fa-server text-emerald-400 mr-2"></i>Backend Logic</h4>
                        <p class="text-xs text-slate-400">Powered by <strong>Node.js</strong> RESTful endpoints handling client requests, quotation inquiries, and booking details.</p>
                    </div>
                </div>

                <div class="space-y-2">
                    <h4 class="font-bold text-white text-sm">Key Capabilities:</h4>
                    <ul class="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
                        <li>Showcase categorized decoration portfolios (Weddings, Receptions, Haldi, Birthdays, Corporate Galas).</li>
                        <li>Automated booking inquiry form calculating tentative availability and gathering client event requirements.</li>
                        <li>High-resolution image gallery with fast loading and responsive mobile views.</li>
                        <li>Client testimonial section and direct WhatsApp / Call consultation integration.</li>
                    </ul>
                </div>

                <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div class="text-xs text-slate-400">
                        Developed by: <strong class="text-white">Dipesha Ajay Wani</strong>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <a href="https://github.com/dipeshawani" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-dark-surface hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all">
                            <i class="fa-brands fa-github text-sm"></i> GitHub Repo
                        </a>
                        <a href="mailto:dipeshawani7@gmail.com?subject=Inquiry%20regarding%20Vishwa%20Event%20Decoration%20System" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold">
                            Inquire About Project
                        </a>
                        <button onclick="closeProjectModal()" class="px-4 py-2 rounded-xl bg-dark-surface border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});
