// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Recommendation form functionality
    const recommendationForm = document.getElementById('recommendationForm');
    const recommendationsContainer = document.querySelector('.recommendations-container');

    recommendationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const recommenderName = document.getElementById('recommenderName').value.trim();
        const recommendationText = document.getElementById('recommendationText').value.trim();
        
        if (recommendationText === '') {
            alert('Please enter a recommendation message.');
            return;
        }
        
        // Create new recommendation card
        const newRecommendation = document.createElement('div');
        newRecommendation.className = 'recommendation-card';
        
        let recommendationHTML = `<p>"${recommendationText}"</p>`;
        if (recommenderName) {
            recommendationHTML += `<p style="text-align: right; margin-top: 15px; font-weight: bold; color: #667eea;">- ${recommenderName}</p>`;
        }
        
        newRecommendation.innerHTML = recommendationHTML;
        
        // Add animation effect
        newRecommendation.style.opacity = '0';
        newRecommendation.style.transform = 'translateY(20px)';
        
        // Insert the new recommendation at the beginning
        recommendationsContainer.insertBefore(newRecommendation, recommendationsContainer.firstChild);
        
        // Animate in
        setTimeout(() => {
            newRecommendation.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            newRecommendation.style.opacity = '1';
            newRecommendation.style.transform = 'translateY(0)';
        }, 10);
        
        // Clear form
        recommendationForm.reset();
        
        // Show success message
        showNotification('Thank you for your recommendation!');
    });

    // Scroll to top button functionality
    createScrollToTopButton();

    // Add active navigation highlighting
    highlightActiveNavigation();
});

// Function to create scroll to top button
function createScrollToTopButton() {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.innerHTML = '🏠';
    scrollTopButton.setAttribute('aria-label', 'Scroll to home');
    scrollTopButton.setAttribute('title', 'Back to Home');
    document.body.appendChild(scrollTopButton);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function to highlight active navigation
function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Function to show notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some interactive effects on skill cards
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect to the main heading
document.addEventListener('DOMContentLoaded', function() {
    const heading = document.querySelector('.about-text h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});