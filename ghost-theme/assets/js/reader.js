/* Reader-page enhancements:
   1. Reading-progress bar tracking scroll through the article body.
   2. Auto table of contents from the article's H2/H3 headings, shown inline at
      the top and mirrored into a sticky right-side panel that fades in (with a
      pixelated dissolve) once the inline TOC scrolls out of view. */
(function () {
    'use strict';

    function boot() {
        var content = document.querySelector('.gc-content');
        var bar = document.querySelector('[data-reading-progress]');
        var pctEl = document.querySelector('[data-reading-pct]');
        var toc = document.querySelector('[data-toc]');
        var tocList = document.querySelector('[data-toc-list]');
        var tocSticky = document.querySelector('[data-toc-sticky]');
        if (!content) return;

        /* ---- Build the inline TOC from headings ---- */
        var headings = [];      /* { el, links: [inlineLink, stickyLink] } */
        if (toc && tocList) {
            var nodes = content.querySelectorAll('h2, h3');
            for (var i = 0; i < nodes.length; i++) {
                var h = nodes[i];
                if (!h.id) {
                    h.id = 'h-' + i + '-' + (h.textContent || '')
                        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
                }
                var li = document.createElement('li');
                li.className = 'gc-toc-item lvl-' + h.tagName.toLowerCase();
                var a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                a.className = 'gc-toc-link';
                li.appendChild(a);
                tocList.appendChild(li);
                headings.push({ el: h, links: [a] });
            }
            if (headings.length >= 2) toc.hidden = false;
        }

        /* ---- Mirror into the sticky panel ---- */
        var hasSticky = false;
        if (tocSticky && headings.length >= 2) {
            var title = document.createElement('div');
            title.className = 'gc-toc-title';
            title.textContent = '// contents';
            var list = document.createElement('ul');
            list.className = 'gc-toc-list';
            for (var k = 0; k < headings.length; k++) {
                var sLi = document.createElement('li');
                sLi.className = 'gc-toc-item lvl-' + headings[k].el.tagName.toLowerCase();
                var sA = document.createElement('a');
                sA.href = '#' + headings[k].el.id;
                sA.textContent = headings[k].el.textContent;
                sA.className = 'gc-toc-link';
                sLi.appendChild(sA);
                list.appendChild(sLi);
                headings[k].links.push(sA);
            }
            tocSticky.appendChild(title);
            tocSticky.appendChild(list);
            tocSticky.hidden = false;    /* present in layout; visibility via class */
            hasSticky = true;
        }

        /* ---- Progress + active heading + sticky reveal ---- */
        var ticking = false;
        var stickyOn = false;

        function update() {
            ticking = false;
            var rect = content.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            var total = rect.height - vh;
            var scrolled = -rect.top;
            var pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : (rect.top <= 0 ? 1 : 0);

            if (bar) bar.style.width = (pct * 100).toFixed(2) + '%';
            if (pctEl) pctEl.textContent = Math.round(pct * 100) + '%';

            if (headings.length) {
                var activeIndex = 0;
                var line = vh * 0.3;
                for (var i = 0; i < headings.length; i++) {
                    if (headings[i].el.getBoundingClientRect().top <= line) activeIndex = i;
                }
                for (var j = 0; j < headings.length; j++) {
                    var isActive = j === activeIndex;
                    var links = headings[j].links;
                    for (var l = 0; l < links.length; l++) links[l].classList.toggle('active', isActive);
                }
            }

            /* Reveal the sticky TOC once the inline one is scrolled above view. */
            if (hasSticky && toc) {
                var show = toc.getBoundingClientRect().bottom < 0;
                if (show !== stickyOn) {
                    stickyOn = show;
                    tocSticky.classList.toggle('is-visible', show);
                }
            }
        }

        function onScroll() {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();

        /* Smooth-scroll TOC clicks (delegated across both TOCs). */
        function onTocClick(e) {
            var a = e.target.closest('a');
            if (!a) return;
            var id = decodeURIComponent((a.getAttribute('href') || '').slice(1));
            var target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            var y = window.scrollY + target.getBoundingClientRect().top - 16;
            window.scrollTo({ top: y, behavior: 'smooth' });
            history.replaceState(null, '', '#' + id);
        }
        if (tocList) tocList.addEventListener('click', onTocClick);
        if (tocSticky) tocSticky.addEventListener('click', onTocClick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
