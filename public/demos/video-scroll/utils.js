// Video Scroll Utilities
export const utils = {
    device: {
        isTouch: () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
    },
    dom: {
        resolveElement: (selector) => {
            if (typeof selector === 'string') {
                return document.querySelector(selector);
            }
            return selector;
        }
    },
    css: {
        getLVH: () => {
            return window.innerHeight || document.documentElement.clientHeight;
        }
    },
    system: {
        nextTick: (callback, context = null, delay = 0) => {
            return setTimeout(() => callback.call(context), delay);
        },
        clearInterval: (handle) => {
            clearTimeout(handle);
        }
    },
    url: {
        validateLinks: (links, hostDomains) => {
            // Validate external links
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                const href = link.getAttribute('href');
                if (href && href.startsWith('http')) {
                    const isHostDomain = hostDomains.some(domain => href.includes(domain));
                    if (!isHostDomain) {
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                }
            }
        }
    }
};
