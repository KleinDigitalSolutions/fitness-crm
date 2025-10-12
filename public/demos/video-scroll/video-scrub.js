// GSAP Video Scrubbing Module
import { utils } from './utils.js';

export const createVideoScrub = () => {
    let DOM = {
        el: null,
        pin: null,
        trigger: null,
        overlayTrack: null,
        video: null,
        preloader: null,
    };

    let scrollTrigger = null;
    let observer = null;
    let isVisible = false;
    let isVideoInitialized = false;
    let videoDuration = 1;
    let lastOverlayHeight = null;
    let cueElements = [];
    let lastProgress = 0;
    let scrollDirection = 'down';

    const options = {
        selector: null,
        trigger: null,
        startOffset: null,
        duration: null,
        scrollFactor: 1,
    };

    const initialize = (opts = {}) => {
        reset();
        Object.assign(options, opts);

        const el = utils.dom.resolveElement(options.selector);
        if (!el) {
            console.warn('[createVideoScrub] Invalid or missing selector.');
            return;
        }

        DOM.el = el;
        DOM.pin = el.querySelector('.sv-pin-container');
        DOM.trigger = el.querySelector(options.trigger) || DOM.pin;
        DOM.video = el.querySelector('.sv-video');
        DOM.overlayTrack = el.querySelector('.sv-overlay-track');
        DOM.preloader = el.querySelector('.sv-preloader');

        if (!DOM.pin || !DOM.video) {
            console.warn('[createVideoScrub] Missing .sv-pin-container or <video>.');
            return;
        }

        const durationFromOptions = parseFloat(options.duration);
        const durationFromAttr = parseFloat(DOM.el.getAttribute('data-duration'));

        if (Number.isFinite(durationFromOptions) && durationFromOptions > 0) {
            videoDuration = durationFromOptions;
        } else if (Number.isFinite(durationFromAttr) && durationFromAttr > 0) {
            videoDuration = durationFromAttr;
        } else {
            console.warn('[createVideoScrub] No valid duration found; using default of 1s.');
        }

        observeVisibility(DOM.el);
        setupCues();
        setupScrollTrigger();
    };

    const reset = () => {
        observer?.disconnect();
        scrollTrigger?.kill();

        DOM = {
            el: null,
            pin: null,
            trigger: null,
            overlayTrack: null,
            video: null,
            preloader: null,
        };

        scrollTrigger = null;
        observer = null;
        isVisible = false;
        isVideoInitialized = false;
        lastOverlayHeight = null;
    };

    const observeVisibility = (target) => {
        let hasTriggered = false;
        let debounceHandle = null;

        observer = new IntersectionObserver(([entry]) => {
            if (debounceHandle) {
                utils.system.clearInterval(debounceHandle);
            }

            debounceHandle = utils.system.nextTick(() => {
                isVisible = entry?.isIntersecting === true;

                if (isVisible && !hasTriggered) {
                    hasTriggered = true;

                    if (DOM.video.preload !== 'metadata') {
                        DOM.video.preload = 'metadata';
                        DOM.video.load();
                    }

                    setupVideo();
                }

                if (hasTriggered) {
                    isVisible ? unlockVideo() : lockVideo();
                }
            });
        }, {
            threshold: 0.01,
            rootMargin: '0px 0px -0.01% 0px',
        });

        observer.observe(target);
    };

    const unlockVideo = () => {
        const video = DOM.video;
        if (!video || typeof video.play !== 'function') return;

        const promise = video.play();
        if (promise?.then) {
            promise.then(() => video.pause()).catch(() => {});
        }
    };

    const lockVideo = () => {
        const video = DOM.video;
        if (!video || video.paused) return;
        video.pause();
    };

    const setupVideo = () => {
        if (isVideoInitialized) return;

        DOM.el.classList.add('video-loading');

        const finalize = () => {
            isVideoInitialized = true;
            DOM.video.pause();
            updateOverlayTrack();
            DOM.el.classList.remove('video-loading');
            DOM.el.classList.add('video-ready');

            if (DOM.preloader) {
                DOM.preloader.style.opacity = '0';

                utils.system.nextTick(() => {
                    if (DOM.preloader?.parentNode) {
                        DOM.preloader.parentNode.removeChild(DOM.preloader);
                        DOM.preloader = null;
                    }
                }, null, 350);
            }
        };

        const tryFinalize = () => {
            if (DOM.video.readyState >= 2) {
                finalize();
                DOM.video.removeEventListener('loadeddata', tryFinalize);
            }
        };

        const waitForReady = () => {
            if (isVideoInitialized) return;
            if (DOM.video.readyState >= 2) {
                finalize();
            } else {
                requestAnimationFrame(waitForReady);
            }
        };

        DOM.video.addEventListener('loadeddata', tryFinalize, { once: true });
        requestAnimationFrame(waitForReady);
    };

    const setupScrollTrigger = () => {
        if (scrollTrigger || !DOM.overlayTrack || !DOM.pin) return;

        const getLVH = utils.css.getLVH;

        scrollTrigger = ScrollTrigger.create({
            trigger: DOM.trigger,
            pin: DOM.pin,
            start: () => `center ${options.startOffset ?? 0.5 * getLVH()}px`,
            end: () => {
                updateOverlayTrack();
                return `+=${DOM.overlayTrack.offsetHeight - DOM.pin.offsetHeight}`;
            },
            scrub: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const current = self.progress;
                scrollDirection = current > lastProgress ? 'down' : 'up';
                lastProgress = current;

                updateVideoTime(current);
                updateCueVisibility(current);
            }
        });
    };

    const setupCues = () => {
        cueElements.length = 0;

        const nodes = DOM.pin.querySelectorAll('[data-cue-start][data-cue-end]');
        let index = 0;
        let count = nodes.length;
        let el, content, start, end;

        for (index; index < count; index++) {
            el = nodes[index];
            content = el.querySelector('.sv-cue-content');
            if (!content) continue;

            start = parseFloat(el.getAttribute('data-cue-start'));
            end = parseFloat(el.getAttribute('data-cue-end'));
            if (Number.isFinite(start) && Number.isFinite(end)) {
                cueElements.push({
                    el,
                    content,
                    start,
                    end,
                    active: false
                });
            }
        }
    };

    const updateCueVisibility = (progress) => {
        const currentTime = progress * videoDuration;
        const totalCues = cueElements.length;

        const isScrollingDown = scrollDirection === 'down';
        const yActive = isScrollingDown ? 50 : -50;
        const yInactive = isScrollingDown ? -50 : 50;

        let i = 0;
        let activeCue = null;
        let cue = null;
        let content = null;

        for (i = 0; i < totalCues; i++) {
            cue = cueElements[i];
            if (currentTime >= cue.start && currentTime < cue.end) {
                activeCue = cue;
                break;
            }
        }

        for (i = 0; i < totalCues; i++) {
            cue = cueElements[i];
            content = cue.content;

            if (cue === activeCue) {
                if (!cue.active) {
                    cue.active = true;

                    for (let j = 0; j < totalCues; j++) {
                        const otherCue = cueElements[j];
                        if (otherCue !== cue && otherCue.active) {
                            otherCue.active = false;
                            gsap.killTweensOf(otherCue.content);
                            gsap.set(otherCue.content, { opacity: 0, y: 0 });
                        }
                    }

                    gsap.set(content, {
                        opacity: 0,
                        y: yActive,
                    });

                    gsap.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                }

            } else if (cue.active) {
                cue.active = false;
                gsap.killTweensOf(content);

                gsap.to(content, {
                    opacity: 0,
                    y: yInactive,
                    duration: 0.3,
                    ease: 'power1.inOut',
                    overwrite: true,
                    onComplete: () => {
                        gsap.set(content, { y: 0 });
                    },
                });
            }
        }
    };

    const updateVideoTime = (progress) => {
        if (!isVisible || !DOM.video) return;
        DOM.video.currentTime = Math.min(Math.max(progress, 0), 1) * videoDuration;
    };

    const updateOverlayTrack = () => {
        if (!DOM.overlayTrack || !DOM.pin) return;

        const pinHeight = DOM.pin.offsetHeight;
        const scrollFactor = options.scrollFactor || 1;
        const totalHeight = (pinHeight * videoDuration) * scrollFactor;

        const newHeight = `${totalHeight - pinHeight}px`;
        if (newHeight === lastOverlayHeight) return;

        DOM.overlayTrack.style.setProperty('--track-offset-y', `-${pinHeight}px`);
        DOM.overlayTrack.style.setProperty('--track-height', newHeight);
        lastOverlayHeight = newHeight;
    };

    const update = () => {
        updateOverlayTrack();
    };

    return {
        initialize,
        update,
    };
};
