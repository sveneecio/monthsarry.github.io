// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Start Journey button
const startJourneyBtn = document.getElementById('startJourney');
if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', function() {
        const journeySection = document.querySelector('#journey');
        if (journeySection) {
            journeySection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Image Modal functionality
const imageModal = document.getElementById('imageModal');
if (imageModal) {
    imageModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const imageSrc = button.getAttribute('src');
        const modalImage = document.getElementById('modalImage');
        if (modalImage && imageSrc) {
            modalImage.src = imageSrc;
        }
    });
}

// Load More Photos functionality
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        const galleryRow = document.querySelector('.gallery-section .row');
        if (galleryRow) {
            const newImages = [
                'https://source.unsplash.com/random/400x400/?couple,romantic',
                'https://source.unsplash.com/random/400x400/?couple,date',
                'https://source.unsplash.com/random/400x400/?couple,love'
            ];

            newImages.forEach(src => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="gallery-item">
                        <img src="${src}" alt="Gallery Image" class="img-fluid rounded" data-bs-toggle="modal" data-bs-target="#imageModal">
                    </div>
                `;
                galleryRow.appendChild(col);
            });
        }
    });
}

// Special Message Button
const showLoveMessageBtn = document.getElementById('showLoveMessage');
if (showLoveMessageBtn) {
    showLoveMessageBtn.addEventListener('click', function() {
        const messages = [
            "You make every day special!",
            "You're the best thing that's ever happened to me!",
            "I fall in love with you more every day!",
            "You're my favorite person in the whole world!",
            "Thank you for being you!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Create and show toast notification
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        
        toastContainer.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-pink text-white">
                    <strong class="me-auto">Special Message</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body bg-light-pink">
                    ${randomMessage}
                </div>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toastContainer.remove();
        }, 3000);
    });
}

// Add animation to timeline cards on scroll
const animateOnScroll = () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    animateOnScroll();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});