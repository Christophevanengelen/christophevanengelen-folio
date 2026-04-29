/* liquid-glass.js  v=lg1
 * Apple-style Liquid Glass for christophevanengelen.be
 *
 * What this does
 * ─────────────
 * Chromium: SVG feDisplacementMap behind each [data-glass] element
 *   → backdrop-filter: url(#id) bends the content visible through the glass
 *   → scale attribute animates on hover (thick→thin glass feeling)
 * All browsers: spring-physics specular highlight tracks the mouse
 *   → ::before radial-gradient driven by --lg-sx / --lg-sy CSS custom props
 * Mobile: DeviceOrientation replaces mouse (iOS 13+ permission handled)
 * Safari / Firefox: CSS blur fallback (.lg-fallback), specular still works
 */

(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────────── */
  var MAP_SIZE  = 256;    // displacement-map canvas resolution
  var SPRING_K  = 0.10;   // spring stiffness  (higher = snappier)
  var SPRING_D  = 0.78;   // spring damping    (higher = less bounce)
  var HOVER_DUR = 280;    // ms for inflate
  var LEAVE_DUR = 360;    // ms for deflate

  /* ── Displacement-map generator ─────────────────────────────────────── */
  /* Returns a PNG data-URL with:
   * R channel → X displacement  (128 = no displacement)
   * G channel → Y displacement  (128 = no displacement)
   * Shape: inward-bending squircle lens — edges refract toward center */
  function buildDisplacementMap () {
    var c   = document.createElement('canvas');
    c.width = c.height = MAP_SIZE;
    var ctx = c.getContext('2d');
    var img = ctx.createImageData(MAP_SIZE, MAP_SIZE);
    var px  = img.data;

    for (var py = 0; py < MAP_SIZE; py++) {
      for (var ppx = 0; ppx < MAP_SIZE; ppx++) {
        var nx  = (ppx / (MAP_SIZE - 1)) * 2 - 1;  // [-1 .. 1]
        var ny  = (py  / (MAP_SIZE - 1)) * 2 - 1;
        // Squircle SDF (superellipse n=4): fills the tile to corners
        var sq  = Math.pow(
          Math.pow(Math.abs(nx), 4) + Math.pow(Math.abs(ny), 4), 0.25);
        var len = Math.sqrt(nx * nx + ny * ny) || 1e-6;
        // Lens profile: zero displacement at center, max at edge
        var mag = Math.pow(Math.min(sq, 1.0), 1.8) * 0.55;
        // Inward direction (convex-lens bending)
        var dx  = -(nx / len) * mag;
        var dy  = -(ny / len) * mag;
        var i   = (py * MAP_SIZE + ppx) * 4;
        px[i]     = Math.round((dx * 0.5 + 0.5) * 255);  // R
        px[i + 1] = Math.round((dy * 0.5 + 0.5) * 255);  // G
        px[i + 2] = 128;
        px[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL('image/png');
  }

  /* ── Feature detection ───────────────────────────────────────────────── */
  // Chromium supports backdrop-filter: url(#svgId).
  // Safari / Firefox only support blur(), brightness(), etc.
  var HAS_URL_BACKDROP = (function () {
    try {
      var el = document.createElement('div');
      el.style.backdropFilter = 'url(#x)';
      return el.style.backdropFilter.indexOf('url') >= 0;
    } catch (e) { return false; }
  }());

  /* ── SVG filter factory ──────────────────────────────────────────────── */
  var NS         = 'http://www.w3.org/2000/svg';
  var svgDefs    = null;
  var mapDataUrl = null;
  var filterIdx  = 0;

  function ensureSvg () {
    if (svgDefs) return svgDefs;
    mapDataUrl = buildDisplacementMap();
    var svg  = document.createElementNS(NS, 'svg');
    svg.id   = 'lg-filters-svg';
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText =
      'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;opacity:0;';
    var defs = document.createElementNS(NS, 'defs');
    svg.appendChild(defs);
    document.body.appendChild(svg);
    svgDefs = defs;
    return defs;
  }

  function createFilter (scale) {
    var defs = ensureSvg();
    var id   = 'lg-f' + (++filterIdx);

    var filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', id);
    // Slightly larger than element so displaced pixels at edges are visible
    filter.setAttribute('x', '-6%');   filter.setAttribute('width',  '112%');
    filter.setAttribute('y', '-6%');   filter.setAttribute('height', '112%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    var feImg = document.createElementNS(NS, 'feImage');
    feImg.setAttribute('href',                 mapDataUrl);
    feImg.setAttribute('result',              'dmap');
    feImg.setAttribute('x',                   '0%');
    feImg.setAttribute('y',                   '0%');
    feImg.setAttribute('width',               '100%');
    feImg.setAttribute('height',              '100%');
    feImg.setAttribute('preserveAspectRatio', 'none');  // stretch to element

    var feDmap = document.createElementNS(NS, 'feDisplacementMap');
    feDmap.setAttribute('in',              'SourceGraphic');  // backdrop snapshot
    feDmap.setAttribute('in2',             'dmap');
    feDmap.setAttribute('scale',           String(scale));
    feDmap.setAttribute('xChannelSelector','R');
    feDmap.setAttribute('yChannelSelector','G');

    filter.appendChild(feImg);
    filter.appendChild(feDmap);
    defs.appendChild(filter);
    return { id: id, feDmap: feDmap };
  }

  /* ── Spring physics ──────────────────────────────────────────────────── */
  function Spring (k, d) {
    this.k  = k;  this.d  = d;
    this.x  = 0;  this.y  = 0;
    this.vx = 0;  this.vy = 0;
    this.tx = 0;  this.ty = 0;
  }
  Spring.prototype.target = function (x, y) { this.tx = x; this.ty = y; };
  Spring.prototype.tick   = function () {
    this.vx = (this.vx + (this.tx - this.x) * this.k) * this.d;
    this.vy = (this.vy + (this.ty - this.y) * this.k) * this.d;
    this.x += this.vx;
    this.y += this.vy;
  };

  /* ── Scale-animation helper ──────────────────────────────────────────── */
  function animScale (feDmap, fromScale, toScale, dur, onComplete) {
    var start = performance.now();
    var prev  = null;
    function step (now) {
      var t  = Math.min((now - start) / dur, 1.0);
      var ep = 1 - Math.pow(1 - t, 3);          // ease-out-cubic
      var v  = fromScale + (toScale - fromScale) * ep;
      if (feDmap) feDmap.setAttribute('scale', v.toFixed(2));
      if (t < 1.0) {
        prev = requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    }
    if (prev) cancelAnimationFrame(prev);
    prev = requestAnimationFrame(step);
    return function cancel () { cancelAnimationFrame(prev); };
  }

  /* ── Main init ───────────────────────────────────────────────────────── */
  var items   = [];
  var spring  = new Spring(SPRING_K, SPRING_D);
  var mouseX  = 0;
  var mouseY  = 0;

  function init () {
    var nodes = document.querySelectorAll('[data-glass]');
    if (!nodes.length) return;

    mouseX = window.innerWidth  / 2;
    mouseY = window.innerHeight / 2;
    spring.x = mouseX; spring.y = mouseY;

    [].forEach.call(nodes, function (el) {
      var baseScale = parseFloat(el.getAttribute('data-lg-scale') || '18');
      var f         = null;
      var curScale  = baseScale;
      var cancelAnim = null;

      el.classList.add('lg-item');

      if (HAS_URL_BACKDROP) {
        f = createFilter(baseScale);
        // Compound: SVG displacement + subtle blur + saturation boost
        var compound = 'url(#' + f.id + ') blur(3px) saturate(1.35) brightness(1.04)';
        el.style.backdropFilter       = compound;
        el.style.webkitBackdropFilter = compound;
        el.classList.add('lg-active');
      } else {
        el.classList.add('lg-fallback');
      }

      el.addEventListener('mouseenter', function () {
        el.classList.add('lg-hover');
        if (cancelAnim) cancelAnim();
        var from = curScale;
        cancelAnim = animScale(f ? f.feDmap : null, from, baseScale * 1.72, HOVER_DUR,
          function () { curScale = baseScale * 1.72; cancelAnim = null; });
      });

      el.addEventListener('mouseleave', function () {
        el.classList.remove('lg-hover');
        if (cancelAnim) cancelAnim();
        var from = curScale;
        cancelAnim = animScale(f ? f.feDmap : null, from, baseScale, LEAVE_DUR,
          function () { curScale = baseScale; cancelAnim = null; });
      });

      items.push({ el: el });
    });

    /* ── Mouse tracking ── */
    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    /* ── Gyroscope (mobile) ── */
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+: needs a user gesture before we can listen
        document.addEventListener('touchstart', function askPermission () {
          DeviceOrientationEvent.requestPermission()
            .then(function (state) { if (state === 'granted') bindGyro(); })
            .catch(function () {});
          document.removeEventListener('touchstart', askPermission);
        }, { once: true, passive: true });
      } else {
        bindGyro();
      }
    }

    startLoop();
  }

  function bindGyro () {
    window.addEventListener('deviceorientation', function (e) {
      var beta  = e.beta  || 0;  // front-back tilt: -180..180
      var gamma = e.gamma || 0;  // left-right tilt: -90..90
      mouseX = window.innerWidth  / 2 + (gamma / 90) * (window.innerWidth  / 2);
      mouseY = window.innerHeight / 2 + ((beta - 45) / 90) * (window.innerHeight / 2);
    }, { passive: true });
  }

  function startLoop () {
    (function tick () {
      spring.target(mouseX, mouseY);
      spring.tick();
      for (var i = 0; i < items.length; i++) {
        var el   = items[i].el;
        var rect = el.getBoundingClientRect();
        el.style.setProperty('--lg-sx', (spring.x - rect.left) + 'px');
        el.style.setProperty('--lg-sy', (spring.y - rect.top)  + 'px');
      }
      requestAnimationFrame(tick);
    }());
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
