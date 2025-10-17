/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

function initCoverflow() {
    console.log('[initCoverflow] Starting initialization');
    // Coverflow functionality - re-query DOM so injected items are recognized
    const items = Array.from(document.querySelectorAll('.coverflow-item'));
    console.log('[initCoverflow] Found', items.length, 'coverflow items');
    const dotsContainer = document.getElementById('dots');
    const currentTitle = document.getElementById('current-title');
    const currentDescription = document.getElementById('current-description');
    const container = document.querySelector('.coverflow-container');
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    let currentIndex = Math.floor(items.length / 2);
    let isAnimating = false;

    // Mobile menu toggle
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
    }

    // Default image data - can be overridden by dynamic loader if desired
    const imageData = items.map((it, idx) => ({
        title: it.dataset.title || `Project ${idx+1}`,
        description: it.dataset.excerpt || ''
    }));

    // Create dots
    dotsContainer && (dotsContainer.innerHTML = '');
    items.forEach((_, index) => {
        if (!dotsContainer) return;
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goToIndex(index);
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));
    let autoplayInterval = null;
    let isPlaying = false;
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    // Add click handlers to coverflow items to open repo URLs
    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // If clicking the active/center item, open the repo URL
            if (index === currentIndex) {
                const repoUrl = item.dataset.repo || item.getAttribute('data-repo');
                if (repoUrl) {
                    window.open(repoUrl, '_blank', 'noopener,noreferrer');
                } else {
                    console.warn('No repo URL found for project:', item.dataset.title);
                }
            } else {
                // If clicking a side item, navigate to it
                goToIndex(index);
            }
        });
        
        // Add cursor pointer style to indicate clickability
        item.style.cursor = 'pointer';
    });

    function updateCoverflow() {
        if (isAnimating) return;
        if (items.length === 0) return;
        isAnimating = true;

        items.forEach((item, index) => {
            let offset = index - currentIndex;

            if (offset > items.length / 2) {
                offset = offset - items.length;
            }
            else if (offset < -items.length / 2) {
                offset = offset + items.length;
            }

            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);

            let translateX = offset * 330; // Increased for wider 3:2 aspect ratio images
            let translateZ = -absOffset * 200;
            let rotateY = -sign * Math.min(absOffset * 60, 60);
            let opacity = 1 - (absOffset * 0.2);
            let scale = 1 - (absOffset * 0.1);

            if (absOffset > 3) {
                opacity = 0;
                translateX = sign * 1200; // Increased for wider spacing
            }

            item.style.transform = `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            item.style.opacity = opacity;
            item.style.zIndex = 100 - absOffset;

            item.classList.toggle('active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        const currentData = imageData[currentIndex] || { title: '', description: '' };
        currentTitle && (currentTitle.textContent = currentData.title);
        currentDescription && (currentDescription.textContent = currentData.description);

        if (currentTitle) currentTitle.style.animation = 'none';
        if (currentDescription) currentDescription.style.animation = 'none';
        setTimeout(() => {
            if (currentTitle) currentTitle.style.animation = 'fadeIn 0.6s forwards';
            if (currentDescription) currentDescription.style.animation = 'fadeIn 0.6s forwards';
        }, 10);

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function navigate(direction) {
        if (isAnimating || items.length === 0) return;

        currentIndex = currentIndex + direction;

        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        } else if (currentIndex >= items.length) {
            currentIndex = 0;
        }

        updateCoverflow();
    }

    function goToIndex(index) {
        if (isAnimating || index === currentIndex || items.length === 0) return;
        currentIndex = index;
        updateCoverflow();
    }

    // Keyboard navigation
    if (container) {
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    // Click on items to select
    items.forEach((item, index) => {
        item.addEventListener('click', () => goToIndex(index));
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;

    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;

            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;

            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;

            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 30;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            handleUserInteraction();

            if (diffX > 0) {
                navigate(1);
            } else {
                navigate(-1);
            }
        }
    }

    // Initialize images and reflections
    items.forEach((item, index) => {
        const img = item.querySelector('img');
        const reflection = item.querySelector('.reflection');

        if (!img) return;

        img.onload = function() {
            this.parentElement.classList.remove('image-loading');
            if (reflection) {
                reflection.style.setProperty('--bg-image', `url(${this.src})`);
                reflection.style.backgroundImage = `url(${this.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            }
        };

        img.onerror = function() {
            this.parentElement.classList.add('image-loading');
        };
    });

    // Autoplay functionality
    function startAutoplay() {
        if (items.length === 0) return;
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCoverflow();
        }, 10000);
        isPlaying = true;
        playIcon && (playIcon.style.display = 'none');
        pauseIcon && (pauseIcon.style.display = 'block');
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        isPlaying = false;
        playIcon && (playIcon.style.display = 'block');
        pauseIcon && (pauseIcon.style.display = 'none');
    }

    function toggleAutoplay() {
        if (isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    function handleUserInteraction() {
        stopAutoplay();
    }

    // Add event listeners to stop autoplay on manual navigation
    items.forEach((item) => {
        item.addEventListener('click', handleUserInteraction);
    });

    const navPrev = document.querySelector('.nav-button.prev');
    const navNext = document.querySelector('.nav-button.next');
    navPrev && navPrev.addEventListener('click', handleUserInteraction);
    navNext && navNext.addEventListener('click', handleUserInteraction);

    dots.forEach((dot) => {
        dot.addEventListener('click', handleUserInteraction);
    });

    container && container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            handleUserInteraction();
        }
    });

    // Smooth scrolling and active menu item
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-item');
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Update active menu item on scroll
    function updateActiveMenuItem() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    if (!item.classList.contains('external')) {
                        item.classList.remove('active');
                    }
                });
                if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                    menuItems[index].classList.add('active');
                }
            }
        });

        // Header background on scroll
        if (window.scrollY > 50) {
            header && header.classList.add('scrolled');
        } else {
            header && header.classList.remove('scrolled');
        }

        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollToTopBtn && scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn && scrollToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateActiveMenuItem);

    // Smooth scroll to section
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('href');

            // Check if it's an internal link (starts with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // External links will open normally in new tab
        });
    });

    // Logo click to scroll to top
    const logoContainer = document.querySelector('.logo-container');
    logoContainer && logoContainer.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll to top button
    scrollToTopBtn && scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form submission
    function handleSubmit(event) {
        event.preventDefault();
        alert("Thank you for your message! We'll get back to you soon.");
        event.target.reset();
    }

    // Initialize if there are items
    if (items.length > 0) {
        console.log('[initCoverflow] Calling updateCoverflow()');
        updateCoverflow();
        container && container.focus();
        startAutoplay();
        console.log('[initCoverflow] Initialization complete');
    } else {
        console.warn('[initCoverflow] No items found - skipping initialization');
    }

    // Expose control functions for external scripts
    window.navigate = navigate;
    window.toggleAutoplay = toggleAutoplay;
    window.goToIndex = goToIndex;
    window.initCoverflow = initCoverflow;
}

// DO NOT auto-run - let load-projects.js control initialization
// This prevents race condition where we initialize with empty DOM before dynamic items are injected
// If you want to use this with static HTML, call initCoverflow() manually after DOM loads