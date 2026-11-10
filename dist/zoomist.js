var qt = Object.defineProperty;
var Kt = (s, t, e) => t in s ? qt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var w = (s, t, e) => (Kt(s, typeof t != "symbol" ? t + "" : t, e), e), Jt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var b = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var T = (s, t, e) => (Jt(s, t, "access private method"), e);
const lt = (s) => document.contains(P(s)), Lt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: i } = Object.prototype;
    return t && e && i.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, Ot = (s) => typeof s == "function", B = (s) => !isNaN(Number(s)), ct = (s) => s == null, P = (s) => s instanceof HTMLElement ? s : document.querySelector(s), ht = (s, t) => t ? s.closest(`.${t}`) : null, R = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, H = (s) => ({
  clientX: [...s].map((t) => t.clientX).reduce((t, e) => t + e) / s.length,
  clientY: [...s].map((t) => t.clientY).reduce((t, e) => t + e) / s.length
}), L = (s) => {
  const { width: t, height: e, top: i, left: n, bottom: o } = s.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: i,
    left: n,
    bottom: o
  };
}, vt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, C = (s, t) => {
  for (const [e, i] of Object.entries(t))
    typeof i == "string" && s.style.setProperty(e, i);
}, I = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s.setAttribute(e, i);
}, D = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s[e] = i;
}, Y = (s, t, e) => Math.min(Math.max(s, t), e), A = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, Dt = (s) => {
  throw new Error(s);
}, dt = (s) => console.warn(s), y = (s = "div", t, e, i) => {
  const n = document.createElement(s);
  return t && n.classList.add(...t.split(" ")), e && I(n, e), i && (n.innerHTML = i), n;
}, p = "zoomist", Qt = `${p}-container`, wt = `${p}-wrapper`, ut = `${p}-image`, te = `${p}-not-draggable`, ee = `${p}-not-wheelable`, $ = `${p}-slider`, se = `${p}-slider-wrapper`, ie = `${p}-slider-bar`, ne = `${p}-slider-button`, G = `${p}-zoomer`, oe = `${p}-zoomer-button`, _t = `${p}-zoomer-icon`, mt = `${p}-zoomer-in`, ft = `${p}-zoomer-out`, gt = `${p}-zoomer-reset`, ae = `${p}-zoomer-disabled`, re = {
  tabindex: "0",
  role: "slider",
  "aria-label": "slider for zoomist",
  "aria-valuemin": "0",
  "aria-valuemax": "100",
  "aria-valuenow": "0",
  "aria-disabled": "false"
}, pt = {
  tabindex: "0",
  role: "button",
  type: "button",
  "aria-disabled": "false"
}, le = {
  ...pt,
  "aria-label": "button for zoom in zoomist"
}, ce = {
  ...pt,
  "aria-label": "button for zoom out zoomist"
}, he = {
  ...pt,
  "aria-label": "button for reset zoomist scale"
}, de = typeof window < "u" && typeof window.document < "u", X = de && "ontouchstart" in window, ue = X ? "touchstart" : "mousedown", Z = X ? "touchmove" : "mousemove", V = X ? "touchend" : "mouseup", me = "wheel", fe = ["left", "right", "center"], ge = ["top", "bottom", "center"], Rt = "--scale", At = "--translate-x", Yt = "--translate-y", Xt = `--${p}-image-scale`, zt = `--${p}-image-translate-x`, Ct = `--${p}-image-translate-y`, _e = "--value", Mt = {
  // set is clickable or not
  allowTouchToBubble: !1,
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
  // set initial alignment of zoomist-image: { x?: 'left'|'center'|'right', y?: 'top'|'center'|'bottom' }
  initialAlign: null,
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: !1,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: !1,
  // if set to true, allow panning image when image overflows wrapper at min scale (e.g. fitOrientation mode)
  panAtMinScale: !1,
  // elements matched this class will not be dragged.
  disableDraggingClass: te,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: ee
}, pe = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, Ee = {
  el: `.${$}`
}, Se = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: ae
}, be = {
  el: `.${G}`,
  inEl: `.${mt}`,
  outEl: `.${ft}`,
  resetEl: `.${gt}`
}, Te = {
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
}, Oe = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, ve = `
<svg viewBox="0 0 12 12" class="${_t}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, De = `
<svg viewBox="0 0 12 12" class="${_t}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, we = `
<svg viewBox="0 0 12 12" class="${_t}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, Re = {
  on(s, t) {
    if (!t || !Ot(t))
      return this;
    const { __events__: e } = this;
    return s.split(" ").forEach((i) => {
      const n = i;
      e[n] || (e[n] = []), e[n].push(t);
    }), this;
  },
  emit(s, ...t) {
    const { __events__: e } = this;
    return e[s] ? (e[s].forEach((i) => {
      Ot(i) && i.apply(this, t);
    }), this) : this;
  },
  zoom(s, t) {
    const { scale: e } = this.transform, i = this.useFixedRatio(A(e * (s + 1)));
    return e === i ? this : (this.zoomTo(i, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: i, translateX: n, translateY: o }, options: { bounds: r } } = this;
    if (s = this.useFixedRatio(s), s === i)
      return this;
    const d = this.getImageDiff();
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: u, clientY: l } = t, { top: a, left: h, width: c, height: m } = L(e), { width: g, height: E } = this.getImageDiff(), { panAtMinScale: z } = this.options;
    let _, f;
    if (z) {
      const { width: S, height: O } = this.getClampedImageDiff();
      if (r) {
        const v = S < 0 && d.width < 0 ? n * (S / d.width) : 0, M = O < 0 && d.height < 0 ? o * (O / d.height) : 0;
        _ = Y(v, S, -S), f = Y(M, O, -O);
      } else {
        const v = s / i - 1;
        _ = (c / 2 - u + h) * v + n, f = (m / 2 - l + a) * v + o;
      }
    } else {
      const S = s / i - 1, O = (c / 2 - u + h) * S + n, v = (m / 2 - l + a) * S + o;
      _ = r ? Y(O, g, -g) : O, f = r ? Y(v, E, -E) : v;
    }
    return D(this.transform, {
      translateX: _,
      translateY: f
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: i } } = this, { x: n, y: o } = s, { width: r, height: d } = this.getClampedImageDiff();
    if (B(n)) {
      const u = e + n;
      this.transform.translateX = t ? Y(u, r, -r) : u;
    }
    if (B(o)) {
      const u = i + o;
      this.transform.translateY = t ? Y(u, d, -d) : u;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t } } = this, { x: e, y: i } = s, { width: n, height: o } = this.getClampedImageDiff();
    return B(e) && (this.transform.translateX = t ? Y(Number(e), n, -n) : Number(e)), fe.some((r) => r === e) && (this.transform.translateX = { left: -n, right: n, center: 0 }[e]), B(i) && (this.transform.translateY = t ? Y(Number(i), o, -o) : Number(i)), ge.some((r) => r === i) && (this.transform.translateY = { top: -o, bottom: o, center: 0 }[i]), this;
  },
  slideTo(s) {
    const { options: { minScale: t, maxScale: e } } = this, i = (e - t) * s / 100 + t;
    return this.zoomTo(i), this;
  },
  reset() {
    const { options: { initScale: s } } = this;
    return D(this.transform, {
      scale: s,
      translateX: 0,
      translateY: 0
    }), this.emit("reset", this), this;
  },
  destroy(s = !1) {
    const { element: t, wrapper: e, image: i, controller: n } = this;
    if (!this.mounted)
      return null;
    if (this.emit("beforeDestroy", this), n.abort(), this.destroyModules(), s && i) {
      this.reset(), i.removeAttribute("style");
      for (const o of [Xt, zt, Ct])
        e.style.removeProperty(o);
    }
    return t[p] = null, this.mounted = !1, this.emit("destroy", this), null;
  },
  update(s) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, e.abort(), this.destroyModules(), s && (this.options = Object.assign({}, Mt, Lt(s) && s)), this.init(), this.emit("update", this), this;
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
    return t * -1 === A(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === A(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === A(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === A(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(A(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(A(e));
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
  getClampedImageDiff() {
    const { width: s, height: t } = this.getImageDiff();
    return {
      width: Math.min(s, 0),
      height: Math.min(t, 0)
    };
  },
  // private methods
  getImageDiff() {
    const { width: s, height: t } = this.getContainerData(), { width: e, height: i } = this.getImageData();
    return {
      width: (s - e) / 2,
      height: (t - i) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: s } = this, { top: t, left: e, width: i, height: n } = L(s);
    return {
      clientX: e + i / 2,
      clientY: t + n / 2
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
    return Y(s, t, e);
  }
}, { defineProperty: k } = Object;
var U, yt, j, It, F, $t, q, xt, K, Nt, J, Wt, Q, Bt, tt, Ht, et, Zt, st, Vt, it, kt, nt, Pt, ot, Gt, at, Ut;
class Ae {
  constructor(t, e) {
    // create initial data
    b(this, U);
    // mount elements and bind events
    b(this, j);
    // resize, drag, pinch, wheel
    b(this, F);
    // on wheel
    b(this, q);
    b(this, K);
    b(this, J);
    // on drag (mouse)
    b(this, Q);
    // on touch (pinch and touchmove)
    b(this, tt);
    // resize observer on element
    b(this, et);
    // check modules and create
    b(this, st);
    // mount slider
    b(this, it);
    // slider events
    b(this, nt);
    // mount zoomer
    b(this, ot);
    // zoomer event
    b(this, at);
    w(this, "element");
    w(this, "options");
    w(this, "wrapper");
    w(this, "image");
    w(this, "mounted");
    w(this, "data");
    w(this, "transform");
    w(this, "states");
    w(this, "controller");
    w(this, "__events__");
    w(this, "__modules__");
    t || Dt("The first argument is required."), lt(t) || Dt(`Element ${t} is not exist.`), this.element = P(t), this.options = Object.assign({}, Mt, Lt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: i, maxScale: n, initScale: o } } = this;
    if (t[p])
      return;
    t[p] = this;
    const r = t.querySelector(`.${wt}`), d = t.querySelector(`.${ut}`);
    if (!r)
      return dt(`${p} needs a ".${wt}" element.`);
    if (!d)
      return dt(`${p} needs a ".${ut}" element.`);
    this.options.minScale = e && i < 1 ? 1 : i, this.options.maxScale = Math.max(n, i), this.options.initScale = Y(o || i, i, n), this.wrapper = r, this.image = d, T(this, U, yt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var o, r;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: i } = t;
    e === `.${$}` ? (o = t.sliderEl) == null || o.remove() : (r = t.sliderTrack) == null || r.remove(), i == null || i.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: i, outEl: n, resetEl: o }, controller: r, zoomerEl: d, zoomerInEl: u, zoomerOutEl: l, zoomerResetEl: a } = t, h = (c, m, g) => {
      c === `.${m}` && (g == null || g.remove());
    };
    [
      { target: e, className: G, el: d },
      { target: i, className: mt, el: u },
      { target: n, className: ft, el: l },
      { target: o, className: gt, el: a }
    ].forEach((c) => h(c.target, c.className, c.el)), r == null || r.abort(), t.mounted = !1;
  }
}
U = new WeakSet(), yt = function() {
  const { wrapper: t, image: e, options: i } = this, { draggable: n, pinchable: o } = i, { offsetWidth: r, offsetHeight: d } = t, { offsetWidth: u, offsetHeight: l } = e, { width: a, height: h } = L(e);
  if (!u || !l)
    return dt(`The width or height of ${ut} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: u,
      originHeight: l,
      width: a,
      height: h
    },
    containerData: {
      width: r,
      height: d
    },
    dblTouchData: {
      lastTouchTime: 0
    }
  }, X && (n || o) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !X && n && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...Te }, i.on)
    for (const [c, m] of Object.entries(i.on))
      this.__events__[c] = [m];
  if (this.__modules__ = { ...Oe }, i.slider) {
    const c = i.slider === !0 ? Ee : i.slider;
    this.__modules__.slider = {
      options: Object.assign({}, pe, c)
    };
  }
  if (i.zoomer) {
    const c = i.zoomer === !0 ? be : i.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, Se, c)
    };
  }
  this.controller = new AbortController(), T(this, j, It).call(this);
}, j = new WeakSet(), It = function() {
  if (this.mounted)
    return;
  const { element: t, wrapper: e, image: i, options: { minScale: n, maxScale: o, initScale: r }, __modules__: { slider: d, zoomer: u } } = this, l = this;
  C(i, {
    transform: `
        translateX(var(${At}, 0px))
        translateY(var(${Yt}, 0px))
        scale(var(${Rt}, 0))`
  }), k(this.transform, "scale", {
    get() {
      return l.transform.__scale__;
    },
    set(a) {
      const h = l.useFixedRatio(a);
      if (!(ct(h) || l.transform.__scale__ === h)) {
        if (l.transform.__scale__ = h, C(i, { [Rt]: h.toString() }), C(e, { [Xt]: h.toString() }), D(l.data.imageData, {
          width: L(i).width,
          height: L(i).height
        }), d) {
          const c = Math.round(l.getScaleRatio() * 100);
          d.value = c;
        }
        if (u && u.options.disabledClass) {
          const { zoomerInEl: c, zoomerOutEl: m, zoomerResetEl: g, options: { disabledClass: E } } = u;
          c && (c.classList[h === o ? "add" : "remove"](E), I(c, { "aria-disabled": h === o ? "true" : "false" })), m && (m.classList[h === n ? "add" : "remove"](E), I(m, { "aria-disabled": h === n ? "true" : "false" })), g && (g.classList[h === r ? "add" : "remove"](E), I(g, { "aria-disabled": h === r ? "true" : "false" }));
        }
      }
    }
  }), k(this.transform, "translateX", {
    get() {
      return l.transform.__translateX__;
    },
    set(a) {
      const h = A(a);
      ct(h) || l.transform.__translateX__ === h || (l.transform.__translateX__ = h, C(i, { [At]: `${h}px` }), C(e, { [zt]: `${h}px` }));
    }
  }), k(this.transform, "translateY", {
    get() {
      return l.transform.__translateY__;
    },
    set(a) {
      const h = A(a);
      ct(h) || l.transform.__translateY__ === h || (l.transform.__translateY__ = h, C(i, { [Yt]: `${h}px` }), C(e, { [Ct]: `${h}px` }));
    }
  }), T(this, F, $t).call(this), T(this, st, Vt).call(this), D(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(Qt), this.options.initialAlign && this.moveTo(this.options.initialAlign), this.mounted = !0, this.emit("ready", this);
}, F = new WeakSet(), $t = function() {
  const { element: t, wrapper: e, options: i, controller: { signal: n } } = this, { draggable: o, pinchable: r, wheelable: d, dblClickable: u } = i;
  if (this.states = {}, d) {
    this.states.wheeling = !1;
    const l = (a) => T(this, q, xt).call(this, a);
    e.addEventListener(me, l, { signal: n, passive: !1 });
  }
  if (X && (o || r)) {
    o && (this.states.dragging = !1), r && (this.states.pinching = !1);
    const l = (a) => T(this, tt, Ht).call(this, a);
    t.addEventListener("touchstart", l, { signal: n });
  }
  if (!X && o) {
    this.states.dragging = !1;
    const l = (a) => T(this, Q, Bt).call(this, a);
    t.addEventListener("mousedown", l, { signal: n });
  }
  if (X && u && e) {
    const l = (a) => T(this, J, Wt).call(this, a);
    e.addEventListener("touchstart", l, { signal: n });
  }
  if (!X && u && e) {
    const l = (a) => T(this, K, Nt).call(this, a);
    e.addEventListener("dblclick", l, { signal: n });
  }
  T(this, et, Zt).call(this);
}, q = new WeakSet(), xt = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: i, disableWheelingClass: n } } = this, o = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (i) {
    const r = this.isOnMinScale(), d = this.isOnMaxScale();
    r && o === -1 || d && o === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ht(t.target, n) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 15), this.zoom(o * e, R(t)), this.emit("wheel", this, this.transform.scale, t));
}, K = new WeakSet(), Nt = function(t) {
  t.preventDefault();
  const { options: { dblClickZoomRatio: e } } = this;
  this.isOnMinScale() ? this.zoom(e, R(t)) : this.zoom(-1), this.emit("dblClick", this, this.transform.scale, t);
}, J = new WeakSet(), Wt = function(t) {
  if (t.touches.length === 1)
    if (Date.now() - this.data.dblTouchData.lastTouchTime < 300) {
      t.preventDefault();
      const { options: { dblClickZoomRatio: e } } = this;
      this.isOnMinScale() ? this.zoom(e, R(t)) : this.zoom(-1), this.data.dblTouchData.lastTouchTime = 0, this.emit("dblClick", this, this.transform.scale, t);
    } else
      this.data.dblTouchData.lastTouchTime = Date.now();
}, Q = new WeakSet(), Bt = function(t) {
  const { data: e, transform: i, options: { disableDraggingClass: n } } = this, { dragData: o, imageData: r } = e;
  if (!o || !r)
    return;
  const d = (a) => {
    a && a.button !== 0 || this.options.draggable && (a.preventDefault(), !ht(a.target, n) && (D(o, {
      startX: R(a).clientX,
      startY: R(a).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, a), document.addEventListener(Z, u), document.addEventListener(V, l)));
  }, u = (a) => {
    if (a.touches || !this.states.dragging)
      return;
    a.preventDefault();
    const h = R(a).clientX, c = R(a).clientY, m = h - o.startX + i.translateX, g = c - o.startY + i.translateY;
    this.moveTo({ x: m, y: g }), D(o, {
      startX: R(a).clientX,
      startY: R(a).clientY
    }), this.emit("drag", this, { x: m, y: g }, a);
  }, l = (a) => {
    a.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, a), document.removeEventListener(Z, u), document.removeEventListener(V, l));
  };
  d(t);
}, tt = new WeakSet(), Ht = function(t) {
  const { data: e, transform: i, options: { maxScale: n, minScale: o, draggable: r, pinchable: d, bounds: u, dragReleaseOnBounds: l, disableDraggingClass: a, allowTouchToBubble: h } } = this, { touchData: c, imageData: m } = e;
  if (!c || !m)
    return;
  const g = (_) => {
    const f = _.touches;
    if (!f || !this.options.draggable)
      return;
    if (u && l) {
      const x = this.isOnBoundX(), N = this.isOnBoundY();
      f.length === 1 && (x || N) || _.preventDefault();
    } else
      h || _.preventDefault();
    if (ht(_.target, a) && f.length <= 1)
      return;
    const { top: S, left: O } = L(this.image), { width: v, height: M } = this.getImageDiff();
    D(c, {
      hypot: vt(f),
      startX: H(f).clientX,
      startY: H(f).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: S,
      imageLeft: O,
      widthDiff: v,
      heightDiff: M
    }), r && (this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, _)), d && f.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, i.scale, _)), document.addEventListener("touchmove", E), document.addEventListener("touchend", z);
  }, E = (_) => {
    const f = _.touches;
    if (!f)
      return;
    const { states: { dragging: S, pinching: O } } = this, { top: v, left: M } = L(this.image), { width: x, height: N } = this.getImageDiff(), W = vt(f), Et = W ? W / c.hypot : 1, rt = this.useFixedRatio(Et * i.scale), St = H(f).clientX + c.prevX, bt = H(f).clientY + c.prevY;
    if (O && f.length === 2 && this.zoomTo(rt, !1), S) {
      const Tt = rt !== n && rt !== o && d ? Et : 1, jt = A(St - c.imageLeft - (x - c.widthDiff) - (c.startX - c.imageLeft) * Tt + i.translateX), Ft = A(bt - c.imageTop - (N - c.heightDiff) - (c.startY - c.imageTop) * Tt + i.translateY);
      this.moveTo({ x: jt, y: Ft });
    }
    D(c, {
      hypot: W,
      startX: St,
      startY: bt,
      imageTop: v,
      imageLeft: M,
      widthDiff: x,
      heightDiff: N
    }), O && f.length === 2 && this.emit("pinch", this, i.scale, _), S && this.emit("drag", this, { x: i.translateX, y: i.translateY }, _);
  }, z = (_) => {
    const f = _.touches;
    if (!f)
      return;
    const { states: { dragging: S, pinching: O } } = this;
    if (S && !f.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, _)), O && f.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, i.scale, _)), S && f.length === 1) {
      const v = R(_).clientX, M = R(_).clientY;
      D(c, {
        prevX: c.startX - v,
        prevY: c.startY - M
      });
    }
    f.length || (document.removeEventListener("touchmove", E), document.removeEventListener("touchend", z));
  };
  g(t);
}, et = new WeakSet(), Zt = function() {
  const { wrapper: t, image: e, transform: i } = this;
  new ResizeObserver(() => {
    const { offsetWidth: o, offsetHeight: r } = t, { width: d, height: u } = this.getContainerData();
    if (o === d && r === u)
      return;
    const l = i.translateX, a = i.translateY;
    if (l) {
      const E = o / d * l;
      this.transform.translateX = E;
    }
    if (a) {
      const E = r / u * a;
      this.transform.translateY = E;
    }
    const { offsetWidth: h, offsetHeight: c } = e, { width: m, height: g } = L(e);
    D(this.data.containerData, {
      width: o,
      height: r
    }), D(this.data.imageData, {
      originWidth: h,
      originHeight: c,
      width: m,
      height: g
    }), this.emit("resize", this);
  }).observe(t);
}, st = new WeakSet(), Vt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && T(this, it, kt).call(this), e && T(this, ot, Gt).call(this);
}, it = new WeakSet(), kt = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, direction: n } } = e, o = i === `.${$}`;
  if (!i || !o && !lt(i))
    return;
  const r = o ? y("div", $) : P(i), d = y("div", se), u = y("span", ie), l = y("span", ne, { ...re, "aria-orientation": n });
  r.classList.add(`${$}-${n}`), k(e, "value", {
    get() {
      return e.__value__;
    },
    set(a) {
      e.__value__ !== a && (e.__value__ = a, C(r, { [_e]: a.toString() }), I(l, { "aria-valuenow": a.toString() }));
    }
  }), D(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: r,
    sliderTrack: d,
    sliderButton: l
  }), T(this, nt, Pt).call(this), d.append(u, l), r.append(d), o && t.append(r), e.mounted = !0;
}, nt = new WeakSet(), Pt = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: i } } = this;
  if (!i)
    return;
  const { options: { direction: n }, controller: o, sliderEl: r, sliderTrack: d } = i;
  if (!r || !d)
    return;
  const u = n === "vertical", l = (m) => {
    const g = L(d), E = g[u ? "height" : "width"], z = g[u ? "bottom" : "left"], _ = R(m)[u ? "clientY" : "clientX"], f = A(Y((_ - z) * (u ? -1 : 1) / E, 0, 1));
    return (e - t) * f + t;
  }, a = (m) => {
    if (m instanceof MouseEvent && m.button !== 0)
      return;
    i.sliding = !0;
    const g = l(m);
    this.zoomTo(g), this.emit("slideStart", this, this.getSliderValue(), m), document.addEventListener(Z, h), document.addEventListener(V, c);
  }, h = (m) => {
    if (!i.sliding)
      return;
    const g = l(m);
    this.zoomTo(g), this.emit("slide", this, this.getSliderValue(), m);
  }, c = (m) => {
    this.emit("slideEnd", this, this.getSliderValue(), m), i.sliding = !1, document.removeEventListener(Z, h), document.removeEventListener(V, c);
  };
  r.addEventListener(ue, a, { signal: o == null ? void 0 : o.signal });
}, ot = new WeakSet(), Gt = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, inEl: n, outEl: o, resetEl: r } } = e, d = [n, o, r], u = (m, g, E, z, _) => {
    const f = m === `.${E}`;
    return !m || !f && !lt(m) ? null : (E = d.includes(m) ? `${E} ${oe}` : E, f ? y(g, E, z, _) : P(m));
  }, l = u(i, "div", G), a = u(n, "button", mt, le, ve), h = u(o, "button", ft, ce, De), c = u(r, "button", gt, he, we);
  D(e, {
    controller: new AbortController(),
    zoomerEl: l,
    zoomerInEl: a,
    zoomerOutEl: h,
    zoomerResetEl: c
  }), l && (a && l.append(a), h && l.append(h), c && l.append(c), i === `.${G}` && t.append(l)), T(this, at, Ut).call(this), e.mounted = !0;
}, at = new WeakSet(), Ut = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, i = this;
  if (!e)
    return;
  const { controller: n, zoomerInEl: o, zoomerOutEl: r, zoomerResetEl: d } = e;
  o && o.addEventListener("click", () => {
    i.zoom(t);
  }, { signal: n == null ? void 0 : n.signal }), r && r.addEventListener("click", () => {
    i.zoom(-t);
  }, { signal: n == null ? void 0 : n.signal }), d && d.addEventListener("click", () => {
    i.reset();
  }, { signal: n == null ? void 0 : n.signal });
};
Object.assign(Ae.prototype, Re);
export {
  Ae as default
};
