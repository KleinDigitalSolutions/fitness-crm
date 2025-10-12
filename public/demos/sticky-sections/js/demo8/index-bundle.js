// Demo 8 - Sticky Sections Animation
(function() {
    'use strict';

    console.log('Demo8 script loaded');

    // Wait for all dependencies
    function waitForDependencies() {
        return new Promise((resolve) => {
            let checkCount = 0;
            const maxChecks = 50;

            const check = () => {
                checkCount++;
                if (typeof gsap !== 'undefined' &&
                    typeof ScrollTrigger !== 'undefined' &&
                    typeof Lenis !== 'undefined' &&
                    typeof imagesLoaded !== 'undefined') {
                    console.log('All dependencies loaded');
                    resolve();
                } else if (checkCount < maxChecks) {
                    setTimeout(check, 100);
                } else {
                    console.error('Dependencies timeout:', {
                        gsap: typeof gsap !== 'undefined',
                        ScrollTrigger: typeof ScrollTrigger !== 'undefined',
                        Lenis: typeof Lenis !== 'undefined',
                        imagesLoaded: typeof imagesLoaded !== 'undefined'
                    });
                    resolve(); // Resolve anyway to avoid hanging
                }
            };
            check();
        });
    }

    // Preload images utility
    const preloadImages = (selector = 'img') => {
        return new Promise((resolve) => {
            const images = document.querySelectorAll(selector);
            if (images.length === 0 || typeof imagesLoaded === 'undefined') {
                resolve();
                return;
            }
            imagesLoaded(images, {background: true}, resolve);
        });
    };

    // Variable to store the Lenis smooth scrolling object
    let lenis;

    // Initializes Lenis for smooth scrolling with specific properties
    const initSmoothScrolling = () => {
        lenis = new Lenis({
            lerp: 0.2,
            smoothWheel: true
        });

        lenis.on('scroll', () => ScrollTrigger.update());

        const scrollFn = (time) => {
            lenis.raf(time);
            requestAnimationFrame(scrollFn);
        };
        requestAnimationFrame(scrollFn);

        console.log('Lenis initialized');
    };

    // Function to handle scroll-triggered animations
    const scroll = () => {
        const contentElements = document.querySelectorAll('.content--sticky');

        console.log('Found sticky elements:', contentElements.length);

        contentElements.forEach((el, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'center center',
                    end: 'max',
                    scrub: true,
                    markers: false // Set to true for debugging
                }
            })
            .to(el, {
                ease: 'none',
                startAt: {filter: 'blur(0px)'},
                filter: 'blur(3px)',
                scrollTrigger: {
                    trigger: el,
                    start: 'center center',
                    end: '+=100%',
                    scrub: true
                }
            }, 0)
            .to(el, {
                ease: 'none',
                scale: 0.4,
                yPercent: -50
            }, 0);

            console.log(`Animation set for element ${index + 1}`);
        });
    };

    // Initialization function
    const init = async () => {
        console.log('Initializing demo8...');
        await waitForDependencies();

        await preloadImages('.content__img');
        document.body.classList.remove('loading');

        initSmoothScrolling();
        scroll();

        console.log('Demo8 initialized successfully');
    };

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
