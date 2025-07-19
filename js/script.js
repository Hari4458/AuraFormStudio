// AuraForm Studio - Main JavaScript File
// Solo Leveling Inspired Animations and Interactions

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const serviceCards = document.querySelectorAll('.service-card');
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const messenger = document.getElementById('messenger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize animations after loading
            initializeAnimations();
        }, 800);
    }, 2000);
});

// Initialize all animations and interactions
function initializeAnimations() {
    createParticles();
    initScrollAnimations();
    initServiceCardAnimations();
    initGallery();
    initFormAnimations();
    initMessengerAnimation();
    initNavbarScrollEffect();
}

// Particle System
function createParticles() {
    const particlesBg = document.getElementById('particles-bg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00bfff' : '#9d4edd'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
            box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
        `;
        particlesBg.appendChild(particle);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Navigation functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Multi-page navigation
function navigateToPage(url) {
    window.location.href = url;
}

// Smooth scrolling for same-page anchors
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle navigation for both pages and sections
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a same-page anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        }
        // For other pages, let the default behavior handle it
    });
});

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQ if on contact page
if (document.querySelector('.faq-section')) {
    initFAQ();
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different sections
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-in');
                }
                
                if (entry.target.classList.contains('stat-fill')) {
                    animateStatBars();
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item, .badge, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Service card hover animations
function initServiceCardAnimations() {
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create energy burst effect
            createEnergyBurst(card);
            
            // Add glow animation
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 191, 255, 0.4), 0 0 30px rgba(0, 191, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
        });
    });
}

// Energy burst effect for service cards
function createEnergyBurst(element) {
    const burst = document.createElement('div');
    burst.className = 'energy-burst';
    burst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 191, 255, 0.3), transparent);
        pointer-events: none;
        z-index: 0;
        animation: energyBurst 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(burst);
    
    // Add energy burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes energyBurst {
            0% {
                width: 0;
                height: 0;
                transform: translate(-50%, -50%);
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                transform: translate(-50%, -50%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        if (burst.parentElement) {
            burst.parentElement.removeChild(burst);
        }
    }, 600);
}

// Stat bar animations
function animateStatBars() {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.transition = 'width 2s ease';
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Gallery functionality
function initGallery() {
    // Extended gallery data
    const galleryData = [
        {
            id: 1,
            title: "Mystic Brand Identity",
            category: "brand",
            image: "https://via.placeholder.com/400x300/1a1a1a/00bfff?text=Mystic+Brand",
            description: "Complete brand transformation with magical elements"
        },
        {
            id: 2,
            title: "Legendary Logo Design",
            category: "logo",
            image: "https://via.placeholder.com/400x300/1a1a1a/9d4edd?text=Epic+Logo",
            description: "Iconic symbol representing ultimate power"
        },
        {
            id: 3,
            title: "Epic Poster Creation",
            category: "poster",
            image: "https://via.placeholder.com/400x300/1a1a1a/00ffff?text=Epic+Poster",
            description: "Visual narrative that commands attention"
        },
        {
            id: 4,
            title: "Hunter's Web Portal",
            category: "web",
            image: "https://via.placeholder.com/400x300/1a1a1a/00bfff?text=Web+Portal",
            description: "Digital gateway to another realm"
        },
        {
            id: 5,
            title: "Power Brand System",
            category: "brand",
            image: "https://via.placeholder.com/400x300/1a1a1a/9d4edd?text=Brand+System",
            description: "Unified brand experience across dimensions"
        },
        {
            id: 6,
            title: "Awakened Logo",
            category: "logo",
            image: "https://via.placeholder.com/400x300/1a1a1a/00ffff?text=Awakened+Logo",
            description: "Symbol of transformed potential"
        },
        {
            id: 7,
            title: "Creative Artwork",
            category: "creative",
            image: "https://via.placeholder.com/400x300/1a1a1a/00bfff?text=Creative+Art",
            description: "Original artwork with anime inspiration"
        },
        {
            id: 8,
            title: "Event Poster Design",
            category: "poster",
            image: "https://via.placeholder.com/400x300/1a1a1a/9d4edd?text=Event+Poster",
            description: "Dynamic poster for special events"
        },
        {
            id: 9,
            title: "Gaming Website",
            category: "web",
            image: "https://via.placeholder.com/400x300/1a1a1a/00ffff?text=Gaming+Web",
            description: "Immersive gaming website design"
        },
        {
            id: 10,
            title: "Tech Startup Logo",
            category: "logo",
            image: "https://via.placeholder.com/400x300/1a1a1a/00bfff?text=Tech+Logo",
            description: "Modern logo for technology company"
        },
        {
            id: 11,
            title: "Fantasy Illustration",
            category: "creative",
            image: "https://via.placeholder.com/400x300/1a1a1a/9d4edd?text=Fantasy+Art",
            description: "Epic fantasy character illustration"
        },
        {
            id: 12,
            title: "Concert Poster",
            category: "poster",
            image: "https://via.placeholder.com/400x300/1a1a1a/00ffff?text=Concert+Poster",
            description: "Vibrant poster for music concert"
        }
    ];

    let currentItems = 6; // Initially show 6 items
    let currentFilter = 'all';

    // Render gallery items
    function renderGallery(items, limit = null) {
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        const itemsToShow = limit ? items.slice(0, limit) : items;
        
        itemsToShow.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="gallery-img">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-category">${item.category.toUpperCase()}</p>
                    </div>
                </div>
            `;
            
            // Add click event for lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(item);
            });
            
            // Add hover transformation effect
            galleryItem.addEventListener('mouseenter', () => {
                galleryItem.style.transform = 'scale(1.05) rotateY(5deg)';
                galleryItem.style.transition = 'transform 0.3s ease';
            });
            
            galleryItem.addEventListener('mouseleave', () => {
                galleryItem.style.transform = 'scale(1) rotateY(0deg)';
            });
            
            galleryGrid.appendChild(galleryItem);
        });

        // Update load more button visibility
        updateLoadMoreButton(items, limit);
    }

    // Update load more button
    function updateLoadMoreButton(items, limit) {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            if (limit && limit < items.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentItems += 6;
            const filteredItems = currentFilter === 'all' ? galleryData : 
                galleryData.filter(item => item.category === currentFilter);
            renderGallery(filteredItems, currentItems);
        });
    }

    // Filter functionality
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentFilter = btn.getAttribute('data-filter');
                currentItems = 6; // Reset to initial count
                
                const filteredItems = currentFilter === 'all' ? galleryData : 
                    galleryData.filter(item => item.category === currentFilter);
                
                // Add filter animation
                if (galleryGrid) {
                    galleryGrid.style.opacity = '0';
                    galleryGrid.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        renderGallery(filteredItems, currentItems);
                        galleryGrid.style.opacity = '1';
                        galleryGrid.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        });
    }

    // Initial render
    if (galleryGrid) {
        renderGallery(galleryData, currentItems);
    }
}

// Lightbox functionality
function openLightbox(item) {
    lightboxImg.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
    lightbox.style.display = 'block';
    
    // Add opening animation
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ESC key to close lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// Form animations and functionality
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Handle select field labels properly
        if (input.tagName === 'SELECT') {
            // Check initial state
            updateSelectLabel(input);
            
            input.addEventListener('change', () => {
                updateSelectLabel(input);
                if (input.value) {
                    input.parentElement.classList.add('has-content');
                    createTypingEffect(input);
                } else {
                    input.parentElement.classList.remove('has-content');
                }
            });
        } else {
            // Typing animation effect for inputs and textareas
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.parentElement.classList.add('has-content');
                    createTypingEffect(input);
                } else {
                    input.parentElement.classList.remove('has-content');
                }
            });
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            createFocusGlow(input);
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
    
    // Handle checkbox functionality
    initCheckboxes();
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Initialize checkbox functionality
function initCheckboxes() {
    const checkboxContainers = document.querySelectorAll('.checkbox-container');
    
    checkboxContainers.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        const checkmark = container.querySelector('.checkmark');
        
        if (checkbox && checkmark) {
            // Handle clicks on the entire container (including the text)
            container.addEventListener('click', function(e) {
                // Prevent double triggering when clicking directly on the checkbox
                if (e.target === checkbox) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle the checkbox
                checkbox.checked = !checkbox.checked;
                updateCheckboxVisuals(checkbox, checkmark);
            });
            
            // Handle direct checkbox changes
            checkbox.addEventListener('change', function() {
                updateCheckboxVisuals(checkbox, checkmark);
            });
            
            // Initialize the visual state
            updateCheckboxVisuals(checkbox, checkmark);
        }
    });
}

// Update checkbox visuals
function updateCheckboxVisuals(checkbox, checkmark) {
    if (checkbox.checked) {
        checkmark.classList.add('checked');
        checkmark.style.background = 'var(--accent-blue)';
        checkmark.style.borderColor = 'var(--accent-cyan)';
        checkmark.style.boxShadow = 'var(--glow-blue)';
    } else {
        checkmark.classList.remove('checked');
        checkmark.style.background = 'transparent';
        checkmark.style.borderColor = 'var(--accent-blue)';
        checkmark.style.boxShadow = 'none';
    }
}

// Helper function to update select field labels
function updateSelectLabel(selectElement) {
    const label = selectElement.parentElement.querySelector('label');
    if (selectElement.value && selectElement.value !== '') {
        selectElement.parentElement.classList.add('has-content');
    } else {
        selectElement.parentElement.classList.remove('has-content');
    }
}

// Typing effect for form inputs
function createTypingEffect(input) {
    const effect = document.createElement('div');
    effect.className = 'typing-effect';
    effect.style.cssText = `
        position: absolute;
        top: 50%;
        right: 1rem;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 191, 255, 0.5), transparent);
        transform: translateY(-50%);
        animation: typingPulse 0.3s ease;
        pointer-events: none;
    `;
    
    input.parentElement.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentElement) {
            effect.parentElement.removeChild(effect);
        }
    }, 300);
}

// Focus glow effect
function createFocusGlow(input) {
    const glow = input.parentElement.querySelector('.input-glow');
    if (glow) {
        glow.style.opacity = '1';
    }
}

// Checkbox glow effect
function createCheckboxGlow(checkmark) {
    const effect = document.createElement('div');
    effect.className = 'checkbox-glow-effect';
    effect.style.cssText = `
        position: absolute;
        top: -5px;
        left: -5px;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: radial-gradient(circle, rgba(0, 191, 255, 0.3), transparent);
        animation: checkboxPulse 0.6s ease;
        pointer-events: none;
        z-index: 0;
    `;
    
    checkmark.style.position = 'relative';
    checkmark.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentElement) {
            effect.parentElement.removeChild(effect);
        }
    }, 600);
}

// Form submission with epic animation
function handleFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Change button to loading state
    submitBtn.innerHTML = `
        <span class="btn-text">Initiating Quest...</span>
        <div class="loading-spinner"></div>
    `;
    submitBtn.disabled = true;
    
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Simulate form processing
    setTimeout(() => {
        submitBtn.innerHTML = `
            <span class="btn-text">Quest Complete! ⚡</span>
        `;
        submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00bfff)';
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, var(--accent-blue), var(--accent-purple))';
        }, 3000);
    }, 2000);
}

// Success message animation
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <div class="success-icon">⚡</div>
            <h3>Quest Initiated Successfully!</h3>
            <p>Our design hunters will contact you soon.</p>
        </div>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 26, 26, 0.95);
        border: 2px solid #00bfff;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        z-index: 10001;
        box-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
        backdrop-filter: blur(10px);
        animation: successAppear 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'successDisappear 0.5s ease';
        setTimeout(() => {
            if (message.parentElement) {
                message.parentElement.removeChild(message);
            }
        }, 500);
    }, 3000);
}

// Messenger functionality
function initMessengerAnimation() {
    messenger.addEventListener('click', () => {
        // Create chat bubble animation
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `
            <div class="bubble-content">
                <p>Ready to start your design quest?</p>
                <div class="bubble-options">
                    <button onclick="scrollToSection('contact')">Let's Begin!</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Maybe Later</button>
                </div>
            </div>
        `;
        bubble.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            background: rgba(26, 26, 26, 0.95);
            border: 1px solid #00bfff;
            border-radius: 15px;
            padding: 1.5rem;
            max-width: 300px;
            z-index: 1001;
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
            backdrop-filter: blur(10px);
            animation: bubbleAppear 0.3s ease;
        `;
        
        document.body.appendChild(bubble);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (bubble.parentElement) {
                bubble.style.animation = 'bubbleDisappear 0.3s ease';
                setTimeout(() => {
                    if (bubble.parentElement) {
                        bubble.parentElement.removeChild(bubble);
                    }
                }, 300);
            }
        }, 10000);
    });
}

// Parallax effect for floating elements
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-rune');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Initialize parallax effects
initParallaxEffects();

// Additional CSS animations via JavaScript
function addDynamicStyles() {
    const dynamicStyles = `
        @keyframes typingPulse {
            0% { transform: translateY(-50%) scale(0); opacity: 0; }
            50% { transform: translateY(-50%) scale(1); opacity: 1; }
            100% { transform: translateY(-50%) scale(0); opacity: 0; }
        }
        
        @keyframes glowPulse {
            0% { opacity: 0.1; }
            50% { opacity: 0.3; }
            100% { opacity: 0.1; }
        }
        
        @keyframes successAppear {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes successDisappear {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
        
        @keyframes bubbleAppear {
            0% { opacity: 0; transform: translateY(20px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bubbleDisappear {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(20px) scale(0.8); }
        }
        
        .success-content {
            color: #fff;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #00bfff;
            text-shadow: 0 0 20px #00bfff;
        }
        
        .success-content h3 {
            font-family: 'Orbitron', monospace;
            color: #00bfff;
            margin-bottom: 0.5rem;
        }
        
        .bubble-content p {
            color: #fff;
            margin-bottom: 1rem;
        }
        
        .bubble-options {
            display: flex;
            gap: 0.5rem;
        }
        
        .bubble-options button {
            background: linear-gradient(45deg, #00bfff, #9d4edd);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: transform 0.2s ease;
        }
        
        .bubble-options button:hover {
            transform: scale(1.05);
        }
        
        .animate-in {
            animation: serviceCardIn 0.8s ease forwards;
        }
        
        @keyframes serviceCardIn {
            0% {
                opacity: 0;
                transform: translateY(50px) rotateX(30deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
}

// Initialize dynamic styles
addDynamicStyles();

// Advanced scroll-triggered animations
function initAdvancedScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('section-active');
                
                // Trigger specific animations based on section
                if (section.id === 'services') {
                    triggerServiceAnimations();
                } else if (section.id === 'about') {
                    triggerAboutAnimations();
                } else if (section.id === 'gallery') {
                    triggerGalleryAnimations();
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function triggerServiceAnimations() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `serviceCardIn 0.8s ease forwards`;
        }, index * 100);
    });
}

function triggerAboutAnimations() {
    setTimeout(() => {
        animateStatBars();
    }, 500);
}

function triggerGalleryAnimations() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize advanced scroll animations
initAdvancedScrollAnimations();

// Power-up effect for buttons
function addPowerUpEffect() {
    const buttons = document.querySelectorAll('.cta-button, .submit-btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const powerRing = document.createElement('div');
            powerRing.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border: 2px solid #00bfff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: powerRingExpand 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.appendChild(powerRing);
            
            setTimeout(() => {
                if (powerRing.parentElement) {
                    powerRing.parentElement.removeChild(powerRing);
                }
            }, 600);
        });
    });
    
    // Add power ring animation
    const powerRingStyle = document.createElement('style');
    powerRingStyle.textContent = `
        @keyframes powerRingExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(powerRingStyle);
}

// Initialize power-up effects
addPowerUpEffect();

// Console message for developers
console.log(`
🔥 AuraForm Studio - Solo Leveling Inspired Website 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Features Loaded:
• Particle Background System
• Epic Scroll Animations
• Power-up Button Effects
• Dynamic Form Interactions
• Gallery with Lightbox
• Responsive Mobile Design
• Loading Screen Animation

⚡ Hunter Level: S-Rank
💎 Design Power: Maximum
🎯 Client Satisfaction: 100%

Ready to unleash creativity! 🚀
`);

// Export functions for external use
window.AuraFormStudio = {
    scrollToSection,
    createEnergyBurst,
    showSuccessMessage,
    initializeAnimations
};
