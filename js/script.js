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
        card.style.transform = '