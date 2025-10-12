// Show darkroom iframe after portal animation
document.addEventListener('DOMContentLoaded', function() {
    // Wait for portal animation to complete (demo1.js handles this)
    setTimeout(function() {
        const iframe = document.getElementById('darkroom-iframe');
        const content = document.querySelector('.content');

        // Check if content has 'is-active' class (added by demo1.js)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (content.classList.contains('is-active')) {
                        iframe.style.opacity = '1';
                        iframe.style.pointerEvents = 'auto';
                    }
                }
            });
        });

        observer.observe(content, { attributes: true });
    }, 100);
});
