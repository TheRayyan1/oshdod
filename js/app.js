document.addEventListener('DOMContentLoaded', function() {
    // Animation for elements with 'animate' class
    const animateElements = document.querySelectorAll('.animate');
    
    // Apply initial state
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element) && element.style.opacity === '0') {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle (for future responsive design)
    const createMobileNav = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        header.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('mobile-active');
            this.innerHTML = nav.classList.contains('mobile-active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    };
    
    // Only create mobile nav for smaller screens
    if (window.innerWidth < 768) {
        createMobileNav();
    }
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.mobile-nav-toggle')) {
                createMobileNav();
            }
        } else {
            const mobileToggle = document.querySelector('.mobile-nav-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.remove('mobile-active');
            }
        }
    });
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});