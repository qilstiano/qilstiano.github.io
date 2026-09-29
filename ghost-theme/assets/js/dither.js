/* Animated dithered pixel banner — two-tone, driven by the theme's CSS
   variables. Builds a quantized ramp from --bg to --accent (so it's orange in
   dark mode, blue in light mode) and rebuilds the ramp when the color scheme
   changes. Ordered (Bayer) dither, one putImageData per frame, ~30fps, pauses
   off-screen or when the tab is hidden. Auto-attaches to every
   <canvas class="dither-canvas">. */
(function () {
    'use strict';

    var PIXEL = 5;          /* on-screen size of each fat pixel (CSS upscales) */
    var FPS = 30;
    var FRAME_MS = 1000 / FPS;
    var BANDS = 6;          /* quantization levels bg -> accent */

    var BAYER = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ];

    function parseColor(str) {
        str = (str || '').trim();
        var m;
        if ((m = str.match(/^#([0-9a-f]{3})$/i))) {
            return [parseInt(m[1][0] + m[1][0], 16), parseInt(m[1][1] + m[1][1], 16), parseInt(m[1][2] + m[1][2], 16)];
        }
        if ((m = str.match(/^#([0-9a-f]{6})$/i))) {
            return [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)];
        }
        if ((m = str.match(/rgba?\(([^)]+)\)/i))) {
            var p = m[1].split(',');
            return [parseInt(p[0], 10) || 0, parseInt(p[1], 10) || 0, parseInt(p[2], 10) || 0];
        }
        return [0, 0, 0];
    }

    /* Ramp from bg to accent, then push a little past accent toward white so the
       brightest band pops. */
    function buildPalette() {
        var cs = getComputedStyle(document.documentElement);
        var bg = parseColor(cs.getPropertyValue('--bg'));
        var accent = parseColor(cs.getPropertyValue('--accent'));
        var pal = [];
        for (var i = 0; i < BANDS; i++) {
            var t = i / (BANDS - 1);
            /* ease so most bands sit near the accent, with a dark toe */
            var e = t * t * (3 - 2 * t);
            var hi = i === BANDS - 1 ? 1 : e;
            pal.push([
                Math.round(bg[0] + (accent[0] - bg[0]) * hi + (i === BANDS - 1 ? (255 - accent[0]) * 0.25 : 0)),
                Math.round(bg[1] + (accent[1] - bg[1]) * hi + (i === BANDS - 1 ? (255 - accent[1]) * 0.25 : 0)),
                Math.round(bg[2] + (accent[2] - bg[2]) * hi + (i === BANDS - 1 ? (255 - accent[2]) * 0.25 : 0))
            ]);
        }
        return pal;
    }

    function initCanvas(canvas) {
        var ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        /* Thin divider lines get a finer pixel grid than the big banner. */
        var isLine = canvas.classList.contains('dither-canvas-line');
        var pixel = isLine ? 3 : PIXEL;

        /* Per-canvas randomization so every divider animates out of sync:
           a random time seed, animation speed, and spatial phase offsets. */
        var seed = Math.random() * 1000;
        var speed = 0.7 + Math.random() * 0.9;
        var phaseU = Math.random() * Math.PI * 2;
        var phaseV = Math.random() * Math.PI * 2;

        var raf = 0, cols = 0, rows = 0, image = null;
        var visible = true, lastFrame = 0;
        var pointer = { x: 0.5, y: 0.5, active: false };
        var ripples = [];
        var palette = buildPalette();

        function resize() {
            var rect = canvas.getBoundingClientRect();
            cols = Math.max(1, Math.ceil(rect.width / pixel));
            rows = Math.max(1, Math.ceil(rect.height / pixel));
            canvas.width = cols;
            canvas.height = rows;
            image = ctx.createImageData(cols, rows);
            var d = image.data;
            for (var i = 3; i < d.length; i += 4) d[i] = 255;
        }
        resize();
        window.addEventListener('resize', resize);

        /* Rebuild the palette when the theme toggles (data-theme attr changes). */
        var mo = new MutationObserver(function () { palette = buildPalette(); });
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        var start = performance.now();

        function draw(now) {
            if (!image) return;
            var time = (now - start) / 1000 * speed + seed;
            var px = pointer, rip = ripples, d = image.data;
            var pal = palette, maxBand = pal.length - 1;

            for (var gy = 0; gy < rows; gy++) {
                var v = gy / rows;
                var bayerRow = BAYER[gy & 3];
                var bias = (1 - v) * 0.35;
                for (var gx = 0; gx < cols; gx++) {
                    var u = gx / cols;
                    var value =
                        0.5 +
                        0.25 * Math.sin(u * 8 + phaseU + time * 1.5) +
                        0.25 * Math.sin(v * 6 + phaseV - time * 1.1) +
                        0.2 * Math.sin((u + v) * 10 + time * 2.0);

                    if (px.active) {
                        var dx = u - px.x, dy = v - px.y, dd = dx * dx + dy * dy;
                        if (dd < 0.25) value += (0.5 - Math.sqrt(dd)) * 0.9;
                    }
                    for (var i = 0; i < rip.length; i++) {
                        var r = rip[i];
                        var age = (now - r.t) / 1000;
                        var rdx = u - r.x, rdy = v - r.y;
                        var dist = Math.sqrt(rdx * rdx + rdy * rdy);
                        if (dist < age * 1.2) value += Math.sin(dist * 30 - age * 12) * Math.max(0, 0.4 - age * 0.25);
                    }

                    value = value * 0.7 + bias;
                    if (value < 0) value = 0; else if (value > 1) value = 1;

                    var threshold = (bayerRow[gx & 3] + 0.5) / 16;
                    var band = Math.floor(value * maxBand);
                    if (value * maxBand - band > threshold) band++;
                    if (band > maxBand) band = maxBand;

                    var c = pal[band];
                    var o = (gy * cols + gx) * 4;
                    d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2];
                }
            }
            ctx.putImageData(image, 0, 0);
        }

        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function loop(now) {
            raf = requestAnimationFrame(loop);
            if (!visible) return;
            if (now - lastFrame < FRAME_MS) return;
            lastFrame = now;
            if (ripples.length) ripples = ripples.filter(function (r) { return now - r.t < 1600; });
            draw(now);
        }
        if (reduce) {
            /* Static single frame; still rebuilds on theme change. */
            draw(performance.now());
            mo.disconnect();
            new MutationObserver(function () { palette = buildPalette(); draw(performance.now()); })
                .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        } else {
            raf = requestAnimationFrame(loop);
        }

        var io = new IntersectionObserver(function (e) { visible = e[0] ? e[0].isIntersecting : true; }, { threshold: 0 });
        io.observe(canvas);
        document.addEventListener('visibilitychange', function () { if (document.hidden) visible = false; });

        function toLocal(cx, cy) {
            var rect = canvas.getBoundingClientRect();
            return { x: (cx - rect.left) / rect.width, y: (cy - rect.top) / rect.height };
        }
        canvas.addEventListener('mousemove', function (e) { var p = toLocal(e.clientX, e.clientY); pointer = { x: p.x, y: p.y, active: true }; });
        canvas.addEventListener('mouseleave', function () { pointer.active = false; });
        canvas.addEventListener('mousedown', function (e) { var p = toLocal(e.clientX, e.clientY); ripples.push({ x: p.x, y: p.y, t: performance.now() }); });
        function onTouch(e) {
            var t = e.touches[0]; if (!t) return;
            var p = toLocal(t.clientX, t.clientY);
            pointer = { x: p.x, y: p.y, active: true };
            ripples.push({ x: p.x, y: p.y, t: performance.now() });
        }
        canvas.addEventListener('touchstart', onTouch, { passive: true });
        canvas.addEventListener('touchmove', onTouch, { passive: true });
    }

    function boot() {
        var canvases = document.querySelectorAll('canvas.dither-canvas');
        for (var i = 0; i < canvases.length; i++) initCanvas(canvases[i]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
