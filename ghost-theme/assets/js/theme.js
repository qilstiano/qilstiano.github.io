/* Light/dark color-scheme toggle. The initial value is applied inline in the
   <head> to avoid a flash; this just wires the toggle button and persists the
   choice. Defaults to dark. */
(function () {
    'use strict';

    function current() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    function apply(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        try { localStorage.setItem('gc-theme', mode); } catch (e) {}
    }

    /* Post-card behavior. On hover-capable devices the preview opens on hover
       (CSS) and clicking the header navigates to the post. On touch devices the
       first tap opens the preview; the "continue reading" link then navigates. */
    function wireCards() {
        var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
        var heads = document.querySelectorAll('[data-card-toggle]');
        for (var i = 0; i < heads.length; i++) {
            heads[i].addEventListener('click', function (e) {
                var card = e.currentTarget.closest('[data-card]');
                if (!card) return;
                if (canHover) {
                    var url = card.getAttribute('data-card-url');
                    if (url) window.location.href = url;
                    return;
                }
                var open = card.classList.toggle('is-open');
                e.currentTarget.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (open) {
                    var others = document.querySelectorAll('[data-card].is-open');
                    for (var j = 0; j < others.length; j++) {
                        if (others[j] !== card) {
                            others[j].classList.remove('is-open');
                            var b = others[j].querySelector('[data-card-toggle]');
                            if (b) b.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        }
    }

    /* Background parallax: scrolling down nudges the fixed photo upward (and
       back down when scrolling up), via the --bg-shift custom property. */
    function wireParallax() {
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;
        var root = document.documentElement;
        var FACTOR = 0.12;   /* px of image shift per px scrolled */
        var MAX = 90;        /* clamp so it never drifts past the mask padding */
        var ticking = false;

        function update() {
            ticking = false;
            var y = window.scrollY || window.pageYOffset || 0;
            var shift = -y * FACTOR;
            if (shift < -MAX) shift = -MAX;
            if (shift > MAX) shift = MAX;
            root.style.setProperty('--bg-shift', shift.toFixed(1) + 'px');
        }
        function onScroll() {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
    }

    function boot() {
        var toggles = document.querySelectorAll('[data-theme-toggle]');
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener('click', function () {
                apply(current() === 'dark' ? 'light' : 'dark');
            });
        }
        wireCards();
        wireParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
