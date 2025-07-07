// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the trip website functionality
    initializeTripWebsite();
});

function initializeTripWebsite() {
    // Get all detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    
    // Add click event listeners to each card header
    detailCards.forEach(card => {
        const header = card.querySelector('.detail-header');
        
        header.addEventListener('click', function() {
            // Toggle the active class on the card
            toggleCard(card);
        });
        
        // Add hover effect
        header.addEventListener('mouseenter', function() {
            addHoverEffect(card);
        });
        
        header.addEventListener('mouseleave', function() {
            removeHoverEffect(card);
        });
    });
    
    // Add smooth scrolling for any internal links
    addSmoothScrolling();
    
    // Add fade-in animation for cards when they come into view
    addScrollAnimations();
    
    // Add some interactive features
    addInteractiveFeatures();
}

function toggleCard(card) {
    const isActive = card.classList.contains('active');
    
    if (isActive) {
        // Close the card
        card.classList.remove('active');
        card.style.transform = 'scale(1)';
    } else {
        // Close all other cards first
        document.querySelectorAll('.detail-card.active').forEach(activeCard => {
            activeCard.classList.remove('active');
            activeCard.style.transform = 'scale(1)';
        });
        
        // Open this card
        card.classList.add('active');
        card.style.transform = 'scale(1.02)';
        
        // Add a slight delay before scrolling to ensure the card is expanded
        setTimeout(() => {
            scrollToCard(card);
        }, 300);
    }
}

function scrollToCard(card) {
    const cardTop = card.offsetTop;
    const offset = 100; // Offset from top
    
    window.scrollTo({
        top: cardTop - offset,
        behavior: 'smooth'
    });
}

function addHoverEffect(card) {
    if (!card.classList.contains('active')) {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
    }
}

function removeHoverEffect(card) {
    if (!card.classList.contains('active')) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }
}

function addSmoothScrolling() {
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all destination cards and detail cards
    document.querySelectorAll('.destination-card, .detail-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function addInteractiveFeatures() {
    // Add click-to-copy functionality for confirmation numbers
    addCopyToClipboard();
    
    // Add countdown timer to trip
    addCountdownTimer();
    
    // Add weather emoji animation
    addWeatherAnimation();
    
    // Add flight status simulation
    addFlightStatusSimulation();
}

function addCopyToClipboard() {
    // Find all confirmation numbers and make them clickable
    const confirmations = document.querySelectorAll('.hotel-info p');
    
    confirmations.forEach(p => {
        if (p.textContent.includes('Confirmation:')) {
            p.style.cursor = 'pointer';
            p.style.transition = 'background-color 0.3s ease';
            p.title = 'Click to copy confirmation number';
            
            p.addEventListener('click', function() {
                const confirmationNumber = this.textContent.split('#')[1];
                if (confirmationNumber) {
                    navigator.clipboard.writeText(confirmationNumber.trim()).then(() => {
                        showCopyNotification(this);
                    });
                }
            });
            
            p.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e3f2fd';
                this.style.borderRadius = '4px';
                this.style.padding = '2px 4px';
            });
            
            p.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.padding = '0';
            });
        }
    });
}

function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.style.cssText = `
        position: absolute;
        background: #4caf50;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        animation: fadeInOut 2s ease;
    `;
    
    const rect = element.getBoundingClientRect();
    notification.style.left = rect.left + 'px';
    notification.style.top = (rect.top - 30) + 'px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

function addCountdownTimer() {
    const tripDate = new Date('2025-03-15T10:30:00');
    const tripDatesElement = document.querySelector('.trip-dates span');
    
    function updateCountdown() {
        const now = new Date();
        const difference = tripDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            if (days > 0) {
                tripDatesElement.innerHTML = `March 15 - 25, 2025 <br><small style="font-size: 0.8em; opacity: 0.8;">✨ ${days} days, ${hours} hours to go!</small>`;
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

function addWeatherAnimation() {
    // Add floating animation to weather-related emojis
    const weatherEmojis = document.querySelectorAll('.destination-emoji');
    
    weatherEmojis.forEach((emoji, index) => {
        emoji.style.animation = `float 3s ease-in-out infinite`;
        emoji.style.animationDelay = `${index * 0.5}s`;
    });
}

function addFlightStatusSimulation() {
    // Add a simple flight status indicator
    const flightItems = document.querySelectorAll('.flight-item');
    
    flightItems.forEach(item => {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'flight-status';
        statusIndicator.innerHTML = '<span class="status-dot"></span> On Time';
        statusIndicator.style.cssText = `
            margin-top: 10px;
            font-size: 0.9em;
            color: #28a745;
            display: flex;
            align-items: center;
        `;
        
        const statusDot = statusIndicator.querySelector('.status-dot');
        statusDot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #28a745;
            margin-right: 5px;
            animation: pulse 2s infinite;
        `;
        
        item.appendChild(statusIndicator);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close all open cards
        document.querySelectorAll('.detail-card.active').forEach(card => {
            card.classList.remove('active');
            card.style.transform = 'scale(1)';
        });
    }
});

// Add touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        // Add subtle feedback for swipes
        document.body.style.transform = `translateY(${swipeDistance > 0 ? -2 : 2}px)`;
        setTimeout(() => {
            document.body.style.transform = 'translateY(0)';
        }, 150);
    }
}

// Add loading animation
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-size: 2rem;
            opacity: 1;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
                <div>Loading your trip...</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 1000);
});

console.log('🎉 Trip website loaded successfully! Have an amazing journey! ✈️');
