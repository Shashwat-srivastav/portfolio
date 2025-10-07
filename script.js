// ===== Terminal Preloader =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelector('.terminal-preloader').classList.add('hidden');
    }, 3500); // Hide after 3.5 seconds
});

// ===== Smooth Scroll & Active Navigation =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

// Update active nav on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-nav');
                    link.style.color = 'var(--terminal-green)';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Terminal typing effect
function setupTerminalTypingEffect() {
    const commandLines = document.querySelectorAll('.command-line:not(.active)');
    
    commandLines.forEach(line => {
        const commandText = line.querySelector('.command');
        const originalText = commandText.textContent;
        commandText.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                commandText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    });
}

// Terminal ticker animation
function setupTickerAnimation() {
    const ticker = document.querySelector('.terminal-ticker');
    if (ticker) {
        const tickerContent = ticker.querySelector('.ticker-content');
        const tickerWidth = tickerContent.offsetWidth;
        const containerWidth = ticker.offsetWidth;
        
        if (tickerWidth > containerWidth) {
            tickerContent.style.animationDuration = `${tickerWidth / 50}s`;
        }
    }
}

// Initialize terminal animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupTerminalTypingEffect, 500);
    setupTickerAnimation();
});

// ===== Number Count-Up Animation =====
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // Format number with commas
        const formatted = Math.floor(current).toLocaleString();
        element.textContent = formatted + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Terminal-style counters with typewriter effect
function terminalCountUp(element, end, duration = 1500, prefix = '', suffix = '') {
    // Reset the content
    const originalContent = element.textContent;
    element.textContent = '0';
    
    const endValue = parseInt(end);
    const increment = Math.max(1, Math.floor(endValue / 30));
    let current = 0;
    
    // Add typewriter sound effect
    const typeSound = () => {
        // In a real implementation, you could add actual sound effects here
    };
    
    const timer = setInterval(() => {
        typeSound();
        current += increment;
        
        if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
        }
        
        element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    }, duration / 30);
}

// Observer for all metric animations
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle regular metrics
            const metricValues = entry.target.querySelectorAll('.metric-value[data-target]');
            metricValues.forEach(valueElement => {
                const target = parseInt(valueElement.getAttribute('data-target'));
                animateCounter(valueElement, 0, target, 2000);
            });
            
            // Handle terminal metrics
            const terminalMetrics = entry.target.querySelectorAll('.metrics-terminal .metric-value[data-target]');
            terminalMetrics.forEach((metric, index) => {
                const target = metric.getAttribute('data-target');
                setTimeout(() => {
                    terminalCountUp(metric, target, 1000);
                }, index * 200); // Stagger the animations
            });
            
            // Handle project metrics
            const projectMetrics = entry.target.querySelectorAll('.metrics-grid .metric-box-value');
            projectMetrics.forEach((metric, index) => {
                const originalText = metric.textContent;
                metric.textContent = '';
                
                setTimeout(() => {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < originalText.length) {
                            metric.textContent += originalText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }, index * 100);
            });
            
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe all metric containers
document.addEventListener('DOMContentLoaded', () => {
    const metricContainers = document.querySelectorAll('.metrics-ticker, .metrics-terminal, .project-metrics');
    metricContainers.forEach(container => {
        metricsObserver.observe(container);
    });
});

// ===== Fade-in Animations on Scroll =====
const fadeElements = document.querySelectorAll('.achievement-card, .project-card, .experience-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            }, index * 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===== Terminal Chart Animations =====
function animateTerminalCharts() {
    const strategyCharts = document.querySelectorAll('.strategy-chart');
    
    strategyCharts.forEach(chart => {
        const strategyLine = chart.querySelector('.strategy-line');
        
        if (strategyLine) {
            strategyLine.style.opacity = '0';
            strategyLine.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                strategyLine.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
                strategyLine.style.opacity = '1';
                strategyLine.style.transform = 'translateX(0)';
            }, 300);
        }
    });
    
    // Animate algorithm nodes
    const algoVisuals = document.querySelectorAll('.algo-visual');
    algoVisuals.forEach(visual => {
        const nodes = visual.querySelectorAll('.node');
        
        nodes.forEach((node, index) => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0)';
            
            setTimeout(() => {
                node.style.transition = 'all 0.5s ease-out';
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
            }, 500 + (index * 200));
        });
    });
    
    // Animate code lines
    const codeVisuals = document.querySelectorAll('.code-visual');
    codeVisuals.forEach(visual => {
        const lines = visual.querySelectorAll('.code-line');
        
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.3s ease-out';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    });
}

// Observe terminal chart elements
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a small delay to make the animation more noticeable
            setTimeout(() => {
                animateTerminalCharts();
            }, 300);
            
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Cursor blinking effect
function setupCursorBlinking() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 530);
    });
}

// Initialize all terminal animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe terminal chart containers
    const chartContainers = document.querySelectorAll('.project-visualization');
    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
    
    // Setup cursor blinking
    setupCursorBlinking();
});

// ===== Mobile Menu Toggle with Terminal Effect =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Terminal effect sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 100);
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===== Parallax Effect on Hero =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===== Add Hover Sound Effect (Optional - Commented Out) =====
// Uncomment if you want subtle UI sounds
/*
const hoverElements = document.querySelectorAll('.btn, .nav-link, .achievement-card, .project-card');
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE=');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.1;
        hoverSound.play().catch(() => {});
    });
});
*/

// ===== Smooth Scroll to Section =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Add Gradient Animation to Hero Badge =====
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    let hue = 180; // Start with cyan
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        heroBadge.style.borderColor = `hsla(${hue}, 70%, 50%, 0.3)`;
    }, 50);
}

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Trigger confetti or special effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// ===== Performance Optimization: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Add Current Year to Footer =====
const footerYear = document.querySelector('.footer-content p');
if (footerYear && footerYear.textContent.includes('2025')) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
console.log('%cInterested in how this portfolio was built?', 'color: #a1a1aa; font-size: 14px;');
console.log('%cLet\'s connect: shashwat1322001@gmail.com', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%c\nStats:', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
console.log('• Avenir-HKU: Round 2 Finalist (1000+ participants, 200+ universities)');
console.log('• Flipkart Grid 6.0: Top 79 / 500,000+');
console.log('• Resume Platform: 2,700+ users served');
console.log('• Product Analyzer: 98.25% accuracy');

// ===== Track Scroll Depth (Analytics-Ready) =====
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    maxScrollDepth = Math.max(maxScrollDepth, Math.floor(scrollPercentage));
    
    // You can send this to analytics
    // Example: gtag('event', 'scroll_depth', { depth: maxScrollDepth });
});

window.addEventListener('beforeunload', () => {
    console.log(`Max scroll depth: ${maxScrollDepth}%`);
});

// ===== Initialize =====
console.log('✨ Portfolio initialized successfully');
updateActiveNav();
