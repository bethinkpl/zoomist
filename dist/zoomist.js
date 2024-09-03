var Gt = Object.defineProperty;
var jt = (s, t, e) => t in s ? Gt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var v = (s, t, e) => (jt(s, typeof t != "symbol" ? t + "" : t, e), e), Pt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var S = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var b = (s, t, e) => (Pt(s, t, "access private method"), e);
const rt = (s) => document.contains(V(s)), Xt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: n } = Object.prototype;
    return t && e && n.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, Ot = (s) => typeof s == "function", B = (s) => !isNaN(Number(s)), lt = (s) => s == null, V = (s) => s instanceof HTMLElement ? s : document.querySelector(s), ct = (s, t) => t ? s.closest(`.${t}`) : null, D = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, Z = (s) => ({
  clientX: [...s].map((t) => t.clientX).reduce((t, e) => t + e) / s.length,
  clientY: [...s].map((t) => t.clientY).reduce((t, e) => t + e) / s.length
}), R = (s) => {
  const { width: t, height: e, top: n, left: o, bottom: r } = s.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: n,
    left: o,
    bottom: r
  };
}, Tt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, C = (s, t) => {
  for (const [e, n] of Object.entries(t))
    typeof n == "string" && s.style.setProperty(e, n);
}, M = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s.setAttribute(e, n);
}, T = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s[e] = n;
}, X = (s, t, e) => Math.min(Math.max(s, t), e), w = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, vt = (s) => {
  throw new Error(s);
}, ht = (s) => console.warn(s), y = (s = "div", t, e, n) => {
  const o = document.createElement(s);
  return t && o.classList.add(...t.split(" ")), e && M(o, e), n && (o.innerHTML = n), o;
}, p = "zoomist", Ft = `${p}-container`, Dt = `${p}-wrapper`, dt = `${p}-image`, qt = `${p}-not-draggable`, Kt = `${p}-not-wheelable`, I = `${p}-slider`, Jt = `${p}-slider-wrapper`, Qt = `${p}-slider-bar`, te = `${p}-slider-button`, U = `${p}-zoomer`, ee = `${p}-zoomer-button`, gt = `${p}-zoomer-icon`, ut = `${p}-zoomer-in`, mt = `${p}-zoomer-out`, ft = `${p}-zoomer-reset`, se = `${p}-zoomer-disabled`, ne = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, _t = {
  tabindex: "0",
  role: "button",
  type: "button",
  "aria-disabled": "false"
}, ie = {
  ..._t,
  "aria-label": "button for zoom in zoomist"
}, oe = {
  ..._t,
  "aria-label": "button for zoom out zoomist"
}, ae = {
  ..._t,
  "aria-label": "button for reset zoomist scale"
}, re = typeof window < "u" && typeof window.document < "u", z = re && "ontouchstart" in window, le = z ? "touchstart" : "mousedown", W = z ? "touchmove" : "mousemove", H = z ? "touchend" : "mouseup", ce = "wheel", he = ["left", "right", "center"], de = ["top", "bottom", "center"], wt = "--scale", Yt = "--translate-x", Rt = "--translate-y", ue = "--value", zt = {
  // set is dblClickable or not
  dblClickable: !1,
  // set is draggable or not
  draggable: !0,
  // set is wheelable or not
  wheelable: !0,
  // set is pinchable or not
  pinchable: !0,
  // set image stuck on bounds
  bounds: !0,
  // the ratio of zooming at one time
  zoomRatio: 0.1,
  // the ratio of zooming when double-clicked on image
  dblClickZoomRatio: 1,
  // the max scale of zoomist-image (must be number larger then initScale)
  maxScale: 10,
  // the min scale of zoomist-image (must be number smaller then initScale)
  minScale: 1,
  // set initial scale of zoomist-image
  initScale: null,
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: !1,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: !1,
  // elements matched this class will not be dragged.
  disableDraggingClass: qt,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: Kt
}, me = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, fe = {
  el: `.${I}`
}, ge = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: se
}, _e = {
  el: `.${U}`,
  inEl: `.${ut}`,
  outEl: `.${mt}`,
  resetEl: `.${ft}`
}, pe = {
  // invoked when zoomist instance ready
  ready: null,
  // invoked when reset methods be used
  reset: null,
  // invoked when image changes it's size
  resize: null,
  // invoked before destroy methods be used
  beforeDestroy: null,
  // invoked after destroy methods be used
  destroy: null,
  // invoked after double click on image
  dblClick: null,
  // invoked before update methods be used
  beforeUpdate: null,
  // invoked when update methods be used
  update: null,
  // invoked when image is zooming
  zoom: null,
  // invoked when wheeling
  wheel: null,
  // invoked when mousedown on wrapper
  dragStart: null,
  // invoked when dragging the image
  drag: null,
  // invoked when mouseup on wrapper
  dragEnd: null,
  // invoked when mousedown on wrapper
  pinchStart: null,
  // invoked when pinching the image
  pinch: null,
  // invoked when mouseup on wrapper
  pinchEnd: null,
  // invoked when mousedown on slider
  slideStart: null,
  // invoked when sliding the slider
  slide: null,
  // invoked when mouseup on slider
  slideEnd: null
}, Ee = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, Se = `
<svg viewBox="0 0 12 12" class="${gt}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, be = `
<svg viewBox="0 0 12 12" class="${gt}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, Oe = `
<svg viewBox="0 0 12 12" class="${gt}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, Te = {
  on(s, t) {
    if (!t || !Ot(t))
      return this;
    const { __events__: e } = this;
    return s.split(" ").forEach((n) => {
      const o = n;
      e[o] || (e[o] = []), e[o].push(t);
    }), this;
  },
  emit(s, ...t) {
    const { __events__: e } = this;
    return e[s] ? (e[s].forEach((n) => {
      Ot(n) && n.apply(this, t);
    }), this) : this;
  },
  zoom(s, t) {
    const { scale: e } = this.transform, n = this.useFixedRatio(w(e * (s + 1)));
    return e === n ? this : (this.zoomTo(n, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: n, translateX: o, translateY: r }, options: { bounds: a } } = this;
    if (s = this.useFixedRatio(s), s === n)
      return this;
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: c, clientY: h } = t, { top: d, left: i, width: l, height: m } = R(e), { width: u, height: f } = this.getImageDiff(), E = s / n - 1, _ = (l / 2 - c + i) * E + o, g = (m / 2 - h + d) * E + r, O = a ? X(_, u, -u) : _, Y = a ? X(g, f, -f) : g;
    return T(this.transform, {
      translateX: O,
      translateY: Y
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: n } } = this, { x: o, y: r } = s, { width: a, height: c } = this.getImageDiff();
    if (B(o)) {
      const h = e + o, d = t ? X(h, a, -a) : h;
      this.transform.translateX = d;
    }
    if (B(r)) {
      const h = n + r, d = t ? X(h, c, -c) : h;
      this.transform.translateY = d;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t } } = this, { x: e, y: n } = s, { width: o, height: r } = this.getImageDiff();
    if (B(e)) {
      const a = Number(e), c = t ? X(a, o, -o) : a;
      this.transform.translateX = c;
    }
    if (he.some((a) => a === e)) {
      const c = {
        left: -o,
        right: o,
        center: 0
      }[e];
      this.transform.translateX = c;
    }
    if (B(n)) {
      const a = Number(n), c = t ? X(a, r, -r) : a;
      this.transform.translateY = c;
    }
    if (de.some((a) => a === n)) {
      const c = {
        top: -r,
        bottom: r,
        center: 0
      }[n];
      this.transform.translateY = c;
    }
    return this;
  },
  slideTo(s) {
    const { options: { minScale: t, maxScale: e } } = this, n = (e - t) * s / 100 + t;
    return this.zoomTo(n), this;
  },
  reset() {
    const { options: { initScale: s } } = this;
    return T(this.transform, {
      scale: s,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(s = !1) {
    const { element: t, image: e, controller: n } = this;
    return this.mounted && (this.emit("beforeDestroy", this), n.abort(), this.destroyModules(), s && e && (this.reset(), e.removeAttribute("style")), t[p] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(s) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, e.abort(), this.destroyModules(), s && (this.options = Object.assign({}, zt, Xt(s) && s)), this.init(), this.emit("update", this), this;
  },
  getImageData() {
    return { ...this.data.imageData };
  },
  getContainerData() {
    return { ...this.data.containerData };
  },
  getSliderValue() {
    const { __modules__: { slider: s } } = this;
    return s && s.value !== void 0 ? s.value : null;
  },
  isOnBoundTop() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t * -1 === w(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === w(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === w(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === w(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(w(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(w(e));
  },
  isOnMinScale() {
    const { options: { minScale: s } } = this, { transform: { scale: t } } = this;
    return t === s;
  },
  isOnMaxScale() {
    const { options: { maxScale: s } } = this, { transform: { scale: t } } = this;
    return t === s;
  },
  // private methods
  getImageDiff() {
    const { width: s, height: t } = this.getContainerData(), { width: e, height: n } = this.getImageData();
    return {
      width: (s - e) / 2,
      height: (t - n) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: s } = this, { top: t, left: e, width: n, height: o } = R(s);
    return {
      clientX: e + n / 2,
      clientY: t + o / 2
    };
  },
  // private methods
  getScaleRatio() {
    const { transform: { scale: s }, options: { minScale: t, maxScale: e } } = this;
    return (s - t) / (e - t);
  },
  // private methods
  useFixedRatio(s) {
    const { options: { minScale: t, maxScale: e } } = this;
    return X(s, t, e);
  }
}, { defineProperty: k } = Object;
var G, Lt, j, At, P, Ct, F, yt, q, Mt, K, It, J, xt, Q, $t, tt, Nt, et, Bt, st, Zt, nt, Wt, it, Ht, ot, kt;
class ve {
  constructor(t, e) {
    // create initial data
    S(this, G);
    // mount elements and bind events
    S(this, j);
    // resize, drag, pinch, wheel
    S(this, P);
    // on wheel
    S(this, F);
    S(this, q);
    S(this, K);
    // on drag (mouse)
    S(this, J);
    // on touch (pinch and touchmove)
    S(this, Q);
    // resize observer on element
    S(this, tt);
    // check modules and create
    S(this, et);
    // mount slider
    S(this, st);
    // slider events
    S(this, nt);
    // mount zoomer
    S(this, it);
    // zoomer event
    S(this, ot);
    v(this, "element");
    v(this, "options");
    v(this, "wrapper");
    v(this, "image");
    v(this, "mounted");
    v(this, "data");
    v(this, "transform");
    v(this, "states");
    v(this, "controller");
    v(this, "__events__");
    v(this, "__modules__");
    t || vt("The first argument is required."), rt(t) || vt(`Element ${t} is not exist.`), this.element = V(t), this.options = Object.assign({}, zt, Xt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: n, maxScale: o, initScale: r } } = this;
    if (t[p])
      return;
    t[p] = this;
    const a = t.querySelector(`.${Dt}`), c = t.querySelector(`.${dt}`);
    if (!a)
      return ht(`${p} needs a ".${Dt}" element.`);
    if (!c)
      return ht(`${p} needs a ".${dt}" element.`);
    this.options.minScale = e && n < 1 ? 1 : n, this.options.maxScale = Math.max(o, n), this.options.initScale = X(r || n, n, o), this.wrapper = a, this.image = c, b(this, G, Lt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var r, a;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: n } = t;
    e === `.${I}` ? (r = t.sliderEl) == null || r.remove() : (a = t.sliderTrack) == null || a.remove(), n == null || n.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: n, outEl: o, resetEl: r }, controller: a, zoomerEl: c, zoomerInEl: h, zoomerOutEl: d, zoomerResetEl: i } = t, l = (m, u, f) => {
      m === `.${u}` && (f == null || f.remove());
    };
    [
      { target: e, className: U, el: c },
      { target: n, className: ut, el: h },
      { target: o, className: mt, el: d },
      { target: r, className: ft, el: i }
    ].forEach((m) => l(m.target, m.className, m.el)), a == null || a.abort(), t.mounted = !1;
  }
}
G = new WeakSet(), Lt = function() {
  const { wrapper: t, image: e, options: n } = this, { draggable: o, pinchable: r } = n, { offsetWidth: a, offsetHeight: c } = t, { offsetWidth: h, offsetHeight: d } = e, { width: i, height: l } = R(e);
  if (!h || !d)
    return ht(`The width or height of ${dt} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: h,
      originHeight: d,
      width: i,
      height: l
    },
    containerData: {
      width: a,
      height: c
    },
    dblTouchData: {
      lastTouchTime: 0
    }
  }, z && (o || r) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !z && o && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...pe }, n.on)
    for (const [m, u] of Object.entries(n.on))
      this.__events__[m] = [u];
  if (this.__modules__ = { ...Ee }, n.slider) {
    const m = n.slider === !0 ? fe : n.slider;
    this.__modules__.slider = {
      options: Object.assign({}, me, m)
    };
  }
  if (n.zoomer) {
    const m = n.zoomer === !0 ? _e : n.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, ge, m)
    };
  }
  this.controller = new AbortController(), b(this, j, At).call(this);
}, j = new WeakSet(), At = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: n, maxScale: o, initScale: r }, __modules__: { slider: a, zoomer: c } } = this, h = this;
  C(e, {
    transform: `
        translateX(var(${Yt}, 0px))
        translateY(var(${Rt}, 0px))
        scale(var(${wt}, 0))`
  }), k(this.transform, "scale", {
    get() {
      return h.transform.__scale__;
    },
    set(d) {
      const i = h.useFixedRatio(d);
      if (!(lt(i) || h.transform.__scale__ === i)) {
        if (h.transform.__scale__ = i, C(e, { [wt]: i.toString() }), T(h.data.imageData, {
          width: R(e).width,
          height: R(e).height
        }), a) {
          const l = Math.round(h.getScaleRatio() * 100);
          a.value = l;
        }
        if (c && c.options.disabledClass) {
          const { zoomerInEl: l, zoomerOutEl: m, zoomerResetEl: u, options: { disabledClass: f } } = c;
          l && (l.classList[i === o ? "add" : "remove"](f), M(l, { "aria-disabled": i === o ? "true" : "false" })), m && (m.classList[i === n ? "add" : "remove"](f), M(m, { "aria-disabled": i === n ? "true" : "false" })), u && (u.classList[i === r ? "add" : "remove"](f), M(u, { "aria-disabled": i === r ? "true" : "false" }));
        }
      }
    }
  }), k(this.transform, "translateX", {
    get() {
      return h.transform.__translateX__;
    },
    set(d) {
      const i = w(d);
      lt(i) || h.transform.__translateX__ === i || (h.transform.__translateX__ = i, C(e, { [Yt]: `${i}px` }));
    }
  }), k(this.transform, "translateY", {
    get() {
      return h.transform.__translateY__;
    },
    set(d) {
      const i = w(d);
      lt(i) || h.transform.__translateY__ === i || (h.transform.__translateY__ = i, C(e, { [Rt]: `${i}px` }));
    }
  }), b(this, P, Ct).call(this), b(this, et, Bt).call(this), T(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(Ft), this.mounted = !0, this.emit("ready", this);
}, P = new WeakSet(), Ct = function() {
  const { element: t, image: e, wrapper: n, options: o, controller: { signal: r } } = this, { draggable: a, pinchable: c, wheelable: h, dblClickable: d } = o;
  if (this.states = {}, h) {
    this.states.wheeling = !1;
    const i = (l) => b(this, F, yt).call(this, l);
    n.addEventListener(ce, i, { signal: r, passive: !1 });
  }
  if (z && (a || c)) {
    a && (this.states.dragging = !1), c && (this.states.pinching = !1);
    const i = (l) => b(this, Q, $t).call(this, l);
    t.addEventListener("touchstart", i, { signal: r });
  }
  if (!z && a) {
    this.states.dragging = !1;
    const i = (l) => b(this, J, xt).call(this, l);
    t.addEventListener("mousedown", i, { signal: r });
  }
  if (z && d && e) {
    const i = (l) => b(this, K, It).call(this, l);
    e.addEventListener("touchstart", i, { signal: r });
  }
  if (!z && d && e) {
    const i = (l) => b(this, q, Mt).call(this, l);
    e.addEventListener("dblclick", i, { signal: r });
  }
  b(this, tt, Nt).call(this);
}, F = new WeakSet(), yt = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: n, disableWheelingClass: o } } = this, r = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (n) {
    const a = this.isOnMinScale(), c = this.isOnMaxScale();
    a && r === -1 || c && r === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ct(t.target, o) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 15), this.zoom(r * e, D(t)), this.emit("wheel", this, this.transform.scale, t));
}, q = new WeakSet(), Mt = function(t) {
  t.preventDefault();
  const { options: { dblClickZoomRatio: e } } = this;
  this.isOnMinScale() ? this.zoom(e, D(t)) : this.zoom(-1), this.emit("dblClick", this, this.transform.scale, t);
}, K = new WeakSet(), It = function(t) {
  if (t.preventDefault(), t.touches.length === 1)
    if (Date.now() - this.data.dblTouchData.lastTouchTime < 300) {
      const { options: { dblClickZoomRatio: e } } = this;
      this.isOnMinScale() ? this.zoom(e, D(t)) : this.zoom(-1), this.data.dblTouchData.lastTouchTime = 0, this.emit("dblClick", this, this.transform.scale, t);
    } else
      this.data.dblTouchData.lastTouchTime = Date.now();
}, J = new WeakSet(), xt = function(t) {
  const { data: e, transform: n, options: { disableDraggingClass: o } } = this, { dragData: r, imageData: a } = e;
  if (!r || !a)
    return;
  const c = (i) => {
    i && i.button !== 0 || this.options.draggable && (i.preventDefault(), !ct(i.target, o) && (T(r, {
      startX: D(i).clientX,
      startY: D(i).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, i), document.addEventListener(W, h), document.addEventListener(H, d)));
  }, h = (i) => {
    if (i.touches || !this.states.dragging)
      return;
    i.preventDefault();
    const l = D(i).clientX, m = D(i).clientY, u = l - r.startX + n.translateX, f = m - r.startY + n.translateY;
    this.moveTo({ x: u, y: f }), T(r, {
      startX: D(i).clientX,
      startY: D(i).clientY
    }), this.emit("drag", this, { x: u, y: f }, i);
  }, d = (i) => {
    i.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, i), document.removeEventListener(W, h), document.removeEventListener(H, d));
  };
  c(t);
}, Q = new WeakSet(), $t = function(t) {
  const { data: e, transform: n, options: { maxScale: o, minScale: r, draggable: a, pinchable: c, bounds: h, dragReleaseOnBounds: d, disableDraggingClass: i } } = this, { touchData: l, imageData: m } = e;
  if (!l || !m)
    return;
  const u = (_) => {
    const g = _.touches;
    if (!g || !this.options.draggable)
      return;
    if (h && d) {
      const x = this.isOnBoundX(), $ = this.isOnBoundY();
      g.length === 1 && (x || $) || _.preventDefault();
    } else
      _.preventDefault();
    if (ct(_.target, i) && g.length <= 1)
      return;
    const { top: O, left: Y } = R(this.image), { width: L, height: A } = this.getImageDiff();
    T(l, {
      hypot: Tt(g),
      startX: Z(g).clientX,
      startY: Z(g).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: O,
      imageLeft: Y,
      widthDiff: L,
      heightDiff: A
    }), a && (this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, _)), c && g.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, n.scale, _)), document.addEventListener("touchmove", f), document.addEventListener("touchend", E);
  }, f = (_) => {
    const g = _.touches;
    if (!g)
      return;
    const { states: { dragging: O, pinching: Y } } = this, { top: L, left: A } = R(this.image), { width: x, height: $ } = this.getImageDiff(), N = Tt(g), pt = N ? N / l.hypot : 1, at = this.useFixedRatio(pt * n.scale), Et = Z(g).clientX + l.prevX, St = Z(g).clientY + l.prevY;
    if (Y && g.length === 2 && this.zoomTo(at, !1), O) {
      const bt = at !== o && at !== r && c ? pt : 1, Vt = w(Et - l.imageLeft - (x - l.widthDiff) - (l.startX - l.imageLeft) * bt + n.translateX), Ut = w(St - l.imageTop - ($ - l.heightDiff) - (l.startY - l.imageTop) * bt + n.translateY);
      this.moveTo({ x: Vt, y: Ut });
    }
    T(l, {
      hypot: N,
      startX: Et,
      startY: St,
      imageTop: L,
      imageLeft: A,
      widthDiff: x,
      heightDiff: $
    }), Y && g.length === 2 && this.emit("pinch", this, n.scale, _), O && this.emit("drag", this, { x: n.translateX, y: n.translateY }, _);
  }, E = (_) => {
    const g = _.touches;
    if (!g)
      return;
    const { states: { dragging: O, pinching: Y } } = this;
    if (O && !g.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, _)), Y && g.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, n.scale, _)), O && g.length === 1) {
      const L = D(_).clientX, A = D(_).clientY;
      T(l, {
        prevX: l.startX - L,
        prevY: l.startY - A
      });
    }
    g.length || (document.removeEventListener("touchmove", f), document.removeEventListener("touchend", E));
  };
  u(t);
}, tt = new WeakSet(), Nt = function() {
  const { wrapper: t, image: e, transform: n } = this;
  new ResizeObserver(() => {
    const { offsetWidth: r, offsetHeight: a } = t, { width: c, height: h } = this.getContainerData();
    if (r === c && a === h)
      return;
    const d = n.translateX, i = n.translateY;
    if (d) {
      const E = r / c * d;
      this.transform.translateX = E;
    }
    if (i) {
      const E = a / h * i;
      this.transform.translateY = E;
    }
    const { offsetWidth: l, offsetHeight: m } = e, { width: u, height: f } = R(e);
    T(this.data.containerData, {
      width: r,
      height: a
    }), T(this.data.imageData, {
      originWidth: l,
      originHeight: m,
      width: u,
      height: f
    }), this.emit("resize", this);
  }).observe(t);
}, et = new WeakSet(), Bt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && b(this, st, Zt).call(this), e && b(this, it, Ht).call(this);
}, st = new WeakSet(), Zt = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, direction: o } } = e, r = n === `.${I}`;
  if (!n || !r && !rt(n))
    return;
  const a = r ? y("div", I) : V(n), c = y("div", Jt), h = y("span", Qt), d = y("span", te, { ...ne, "aria-orientation": o });
  a.classList.add(`${I}-${o}`), k(e, "value", {
    get() {
      return e.__value__;
    },
    set(i) {
      e.__value__ !== i && (e.__value__ = i, C(a, { [ue]: i.toString() }), M(d, { "aria-valuenow": i.toString() }));
    }
  }), T(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: a,
    sliderTrack: c,
    sliderButton: d
  }), b(this, nt, Wt).call(this), c.append(h, d), a.append(c), r && t.append(a), e.mounted = !0;
}, nt = new WeakSet(), Wt = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: n } } = this;
  if (!n)
    return;
  const { options: { direction: o }, controller: r, sliderEl: a, sliderTrack: c } = n;
  if (!a || !c)
    return;
  const h = o === "vertical", d = (u) => {
    const f = R(c), E = f[h ? "height" : "width"], _ = f[h ? "bottom" : "left"], g = D(u)[h ? "clientY" : "clientX"], O = w(X((g - _) * (h ? -1 : 1) / E, 0, 1));
    return (e - t) * O + t;
  }, i = (u) => {
    if (u instanceof MouseEvent && u.button !== 0)
      return;
    n.sliding = !0;
    const f = d(u);
    this.zoomTo(f), this.emit("slideStart", this, this.getSliderValue(), u), document.addEventListener(W, l), document.addEventListener(H, m);
  }, l = (u) => {
    if (!n.sliding)
      return;
    const f = d(u);
    this.zoomTo(f), this.emit("slide", this, this.getSliderValue(), u);
  }, m = (u) => {
    this.emit("slideEnd", this, this.getSliderValue(), u), n.sliding = !1, document.removeEventListener(W, l), document.removeEventListener(H, m);
  };
  a.addEventListener(le, i, { signal: r == null ? void 0 : r.signal });
}, it = new WeakSet(), Ht = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, inEl: o, outEl: r, resetEl: a } } = e, c = [o, r, a], h = (u, f, E, _, g) => {
    const O = u === `.${E}`;
    return !u || !O && !rt(u) ? null : (E = c.includes(u) ? `${E} ${ee}` : E, O ? y(f, E, _, g) : V(u));
  }, d = h(n, "div", U), i = h(o, "button", ut, ie, Se), l = h(r, "button", mt, oe, be), m = h(a, "button", ft, ae, Oe);
  T(e, {
    controller: new AbortController(),
    zoomerEl: d,
    zoomerInEl: i,
    zoomerOutEl: l,
    zoomerResetEl: m
  }), d && (i && d.append(i), l && d.append(l), m && d.append(m), n === `.${U}` && t.append(d)), b(this, ot, kt).call(this), e.mounted = !0;
}, ot = new WeakSet(), kt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, n = this;
  if (!e)
    return;
  const { controller: o, zoomerInEl: r, zoomerOutEl: a, zoomerResetEl: c } = e;
  r && r.addEventListener("click", () => {
    n.zoom(t);
  }, { signal: o == null ? void 0 : o.signal }), a && a.addEventListener("click", () => {
    n.zoom(-t);
  }, { signal: o == null ? void 0 : o.signal }), c && c.addEventListener("click", () => {
    n.reset();
  }, { signal: o == null ? void 0 : o.signal });
};
Object.assign(ve.prototype, Te);
export {
  ve as default
};
