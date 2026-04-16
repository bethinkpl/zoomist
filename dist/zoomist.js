var jt = Object.defineProperty;
var Pt = (s, t, e) => t in s ? jt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var w = (s, t, e) => (Pt(s, typeof t != "symbol" ? t + "" : t, e), e), Ft = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var b = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var T = (s, t, e) => (Ft(s, t, "access private method"), e);
const lt = (s) => document.contains(U(s)), zt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: i } = Object.prototype;
    return t && e && i.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, Ot = (s) => typeof s == "function", W = (s) => !isNaN(Number(s)), ct = (s) => s == null, U = (s) => s instanceof HTMLElement ? s : document.querySelector(s), ht = (s, t) => t ? s.closest(`.${t}`) : null, R = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, H = (s) => ({
  clientX: [...s].map((t) => t.clientX).reduce((t, e) => t + e) / s.length,
  clientY: [...s].map((t) => t.clientY).reduce((t, e) => t + e) / s.length
}), z = (s) => {
  const { width: t, height: e, top: i, left: o, bottom: a } = s.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: i,
    left: o,
    bottom: a
  };
}, vt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, M = (s, t) => {
  for (const [e, i] of Object.entries(t))
    typeof i == "string" && s.style.setProperty(e, i);
}, I = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s.setAttribute(e, i);
}, D = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s[e] = i;
}, X = (s, t, e) => Math.min(Math.max(s, t), e), Y = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, Dt = (s) => {
  throw new Error(s);
}, dt = (s) => console.warn(s), y = (s = "div", t, e, i) => {
  const o = document.createElement(s);
  return t && o.classList.add(...t.split(" ")), e && I(o, e), i && (o.innerHTML = i), o;
}, p = "zoomist", qt = `${p}-container`, wt = `${p}-wrapper`, ut = `${p}-image`, Kt = `${p}-not-draggable`, Jt = `${p}-not-wheelable`, x = `${p}-slider`, Qt = `${p}-slider-wrapper`, te = `${p}-slider-bar`, ee = `${p}-slider-button`, G = `${p}-zoomer`, se = `${p}-zoomer-button`, _t = `${p}-zoomer-icon`, mt = `${p}-zoomer-in`, ft = `${p}-zoomer-out`, gt = `${p}-zoomer-reset`, ie = `${p}-zoomer-disabled`, ne = {
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
}, oe = {
  ...pt,
  "aria-label": "button for zoom in zoomist"
}, ae = {
  ...pt,
  "aria-label": "button for zoom out zoomist"
}, re = {
  ...pt,
  "aria-label": "button for reset zoomist scale"
}, le = typeof window < "u" && typeof window.document < "u", L = le && "ontouchstart" in window, ce = L ? "touchstart" : "mousedown", Z = L ? "touchmove" : "mousemove", k = L ? "touchend" : "mouseup", he = "wheel", de = ["left", "right", "center"], ue = ["top", "bottom", "center"], Rt = "--scale", Yt = "--translate-x", Xt = "--translate-y", me = "--value", Lt = {
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
  disableDraggingClass: Kt,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: Jt
}, fe = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ge = {
  el: `.${x}`
}, _e = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: ie
}, pe = {
  el: `.${G}`,
  inEl: `.${mt}`,
  outEl: `.${ft}`,
  resetEl: `.${gt}`
}, Ee = {
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
}, Se = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}, be = `
<svg viewBox="0 0 12 12" class="${_t}">
  <polygon points="12,5.5 6.5,5.5 6.5,0 5.5,0 5.5,5.5 0,5.5 0,6.5 5.5,6.5 5.5,12 6.5,12 6.5,6.5 12,6.5 "/>
</svg>
`, Te = `
<svg viewBox="0 0 12 12" class="${_t}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, Oe = `
<svg viewBox="0 0 12 12" class="${_t}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, ve = {
  on(s, t) {
    if (!t || !Ot(t))
      return this;
    const { __events__: e } = this;
    return s.split(" ").forEach((i) => {
      const o = i;
      e[o] || (e[o] = []), e[o].push(t);
    }), this;
  },
  emit(s, ...t) {
    const { __events__: e } = this;
    return e[s] ? (e[s].forEach((i) => {
      Ot(i) && i.apply(this, t);
    }), this) : this;
  },
  zoom(s, t) {
    const { scale: e } = this.transform, i = this.useFixedRatio(Y(e * (s + 1)));
    return e === i ? this : (this.zoomTo(i, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: i, translateX: o, translateY: a }, options: { bounds: r } } = this;
    if (s = this.useFixedRatio(s), s === i)
      return this;
    const d = this.getImageDiff();
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: l, clientY: h } = t, { top: n, left: g, width: c, height: u } = z(e), { width: f, height: E } = this.getImageDiff(), { panAtMinScale: A } = this.options;
    let _, m;
    if (A) {
      const { width: S, height: O } = this.getClampedImageDiff();
      if (r) {
        const v = S < 0 && d.width < 0 ? o * (S / d.width) : 0, C = O < 0 && d.height < 0 ? a * (O / d.height) : 0;
        _ = X(v, S, -S), m = X(C, O, -O);
      } else {
        const v = s / i - 1;
        _ = (c / 2 - l + g) * v + o, m = (u / 2 - h + n) * v + a;
      }
    } else {
      const S = s / i - 1, O = (c / 2 - l + g) * S + o, v = (u / 2 - h + n) * S + a;
      _ = r ? X(O, f, -f) : O, m = r ? X(v, E, -E) : v;
    }
    return D(this.transform, {
      translateX: _,
      translateY: m
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: i } } = this, { x: o, y: a } = s, { width: r, height: d } = this.getClampedImageDiff();
    if (W(o)) {
      const l = e + o;
      this.transform.translateX = t ? X(l, r, -r) : l;
    }
    if (W(a)) {
      const l = i + a;
      this.transform.translateY = t ? X(l, d, -d) : l;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t } } = this, { x: e, y: i } = s, { width: o, height: a } = this.getClampedImageDiff();
    return W(e) && (this.transform.translateX = t ? X(Number(e), o, -o) : Number(e)), de.some((r) => r === e) && (this.transform.translateX = { left: -o, right: o, center: 0 }[e]), W(i) && (this.transform.translateY = t ? X(Number(i), a, -a) : Number(i)), ue.some((r) => r === i) && (this.transform.translateY = { top: -a, bottom: a, center: 0 }[i]), this;
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
    const { element: t, image: e, controller: i } = this;
    return this.mounted && (this.emit("beforeDestroy", this), i.abort(), this.destroyModules(), s && e && (this.reset(), e.removeAttribute("style")), t[p] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(s) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, e.abort(), this.destroyModules(), s && (this.options = Object.assign({}, Lt, zt(s) && s)), this.init(), this.emit("update", this), this;
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
    return t * -1 === Y(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === Y(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === Y(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === Y(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(Y(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(Y(e));
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
    const { element: s } = this, { top: t, left: e, width: i, height: o } = z(s);
    return {
      clientX: e + i / 2,
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
}, { defineProperty: V } = Object;
var j, At, P, Ct, F, Mt, q, yt, K, It, J, xt, Q, $t, tt, Nt, et, Bt, st, Wt, it, Ht, nt, Zt, ot, kt, at, Vt;
class De {
  constructor(t, e) {
    // create initial data
    b(this, j);
    // mount elements and bind events
    b(this, P);
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
    t || Dt("The first argument is required."), lt(t) || Dt(`Element ${t} is not exist.`), this.element = U(t), this.options = Object.assign({}, Lt, zt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: i, maxScale: o, initScale: a } } = this;
    if (t[p])
      return;
    t[p] = this;
    const r = t.querySelector(`.${wt}`), d = t.querySelector(`.${ut}`);
    if (!r)
      return dt(`${p} needs a ".${wt}" element.`);
    if (!d)
      return dt(`${p} needs a ".${ut}" element.`);
    this.options.minScale = e && i < 1 ? 1 : i, this.options.maxScale = Math.max(o, i), this.options.initScale = X(a || i, i, o), this.wrapper = r, this.image = d, T(this, j, At).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var a, r;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: i } = t;
    e === `.${x}` ? (a = t.sliderEl) == null || a.remove() : (r = t.sliderTrack) == null || r.remove(), i == null || i.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: i, outEl: o, resetEl: a }, controller: r, zoomerEl: d, zoomerInEl: l, zoomerOutEl: h, zoomerResetEl: n } = t, g = (c, u, f) => {
      c === `.${u}` && (f == null || f.remove());
    };
    [
      { target: e, className: G, el: d },
      { target: i, className: mt, el: l },
      { target: o, className: ft, el: h },
      { target: a, className: gt, el: n }
    ].forEach((c) => g(c.target, c.className, c.el)), r == null || r.abort(), t.mounted = !1;
  }
}
j = new WeakSet(), At = function() {
  const { wrapper: t, image: e, options: i } = this, { draggable: o, pinchable: a } = i, { offsetWidth: r, offsetHeight: d } = t, { offsetWidth: l, offsetHeight: h } = e, { width: n, height: g } = z(e);
  if (!l || !h)
    return dt(`The width or height of ${ut} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: l,
      originHeight: h,
      width: n,
      height: g
    },
    containerData: {
      width: r,
      height: d
    },
    dblTouchData: {
      lastTouchTime: 0
    }
  }, L && (o || a) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !L && o && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...Ee }, i.on)
    for (const [c, u] of Object.entries(i.on))
      this.__events__[c] = [u];
  if (this.__modules__ = { ...Se }, i.slider) {
    const c = i.slider === !0 ? ge : i.slider;
    this.__modules__.slider = {
      options: Object.assign({}, fe, c)
    };
  }
  if (i.zoomer) {
    const c = i.zoomer === !0 ? pe : i.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, _e, c)
    };
  }
  this.controller = new AbortController(), T(this, P, Ct).call(this);
}, P = new WeakSet(), Ct = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: i, maxScale: o, initScale: a }, __modules__: { slider: r, zoomer: d } } = this, l = this;
  M(e, {
    transform: `
        translateX(var(${Yt}, 0px))
        translateY(var(${Xt}, 0px))
        scale(var(${Rt}, 0))`
  }), V(this.transform, "scale", {
    get() {
      return l.transform.__scale__;
    },
    set(h) {
      const n = l.useFixedRatio(h);
      if (!(ct(n) || l.transform.__scale__ === n)) {
        if (l.transform.__scale__ = n, M(e, { [Rt]: n.toString() }), D(l.data.imageData, {
          width: z(e).width,
          height: z(e).height
        }), r) {
          const g = Math.round(l.getScaleRatio() * 100);
          r.value = g;
        }
        if (d && d.options.disabledClass) {
          const { zoomerInEl: g, zoomerOutEl: c, zoomerResetEl: u, options: { disabledClass: f } } = d;
          g && (g.classList[n === o ? "add" : "remove"](f), I(g, { "aria-disabled": n === o ? "true" : "false" })), c && (c.classList[n === i ? "add" : "remove"](f), I(c, { "aria-disabled": n === i ? "true" : "false" })), u && (u.classList[n === a ? "add" : "remove"](f), I(u, { "aria-disabled": n === a ? "true" : "false" }));
        }
      }
    }
  }), V(this.transform, "translateX", {
    get() {
      return l.transform.__translateX__;
    },
    set(h) {
      const n = Y(h);
      ct(n) || l.transform.__translateX__ === n || (l.transform.__translateX__ = n, M(e, { [Yt]: `${n}px` }));
    }
  }), V(this.transform, "translateY", {
    get() {
      return l.transform.__translateY__;
    },
    set(h) {
      const n = Y(h);
      ct(n) || l.transform.__translateY__ === n || (l.transform.__translateY__ = n, M(e, { [Xt]: `${n}px` }));
    }
  }), T(this, F, Mt).call(this), T(this, st, Wt).call(this), D(this.transform, {
    scale: a,
    translateX: 0,
    translateY: 0
  }), t.classList.add(qt), this.options.initialAlign && this.moveTo(this.options.initialAlign), this.mounted = !0, this.emit("ready", this);
}, F = new WeakSet(), Mt = function() {
  const { element: t, wrapper: e, options: i, controller: { signal: o } } = this, { draggable: a, pinchable: r, wheelable: d, dblClickable: l } = i;
  if (this.states = {}, d) {
    this.states.wheeling = !1;
    const h = (n) => T(this, q, yt).call(this, n);
    e.addEventListener(he, h, { signal: o, passive: !1 });
  }
  if (L && (a || r)) {
    a && (this.states.dragging = !1), r && (this.states.pinching = !1);
    const h = (n) => T(this, tt, Nt).call(this, n);
    t.addEventListener("touchstart", h, { signal: o });
  }
  if (!L && a) {
    this.states.dragging = !1;
    const h = (n) => T(this, Q, $t).call(this, n);
    t.addEventListener("mousedown", h, { signal: o });
  }
  if (L && l && e) {
    const h = (n) => T(this, J, xt).call(this, n);
    e.addEventListener("touchstart", h, { signal: o });
  }
  if (!L && l && e) {
    const h = (n) => T(this, K, It).call(this, n);
    e.addEventListener("dblclick", h, { signal: o });
  }
  T(this, et, Bt).call(this);
}, q = new WeakSet(), yt = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: i, disableWheelingClass: o } } = this, a = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (i) {
    const r = this.isOnMinScale(), d = this.isOnMaxScale();
    r && a === -1 || d && a === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ht(t.target, o) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 15), this.zoom(a * e, R(t)), this.emit("wheel", this, this.transform.scale, t));
}, K = new WeakSet(), It = function(t) {
  t.preventDefault();
  const { options: { dblClickZoomRatio: e } } = this;
  this.isOnMinScale() ? this.zoom(e, R(t)) : this.zoom(-1), this.emit("dblClick", this, this.transform.scale, t);
}, J = new WeakSet(), xt = function(t) {
  if (t.touches.length === 1)
    if (Date.now() - this.data.dblTouchData.lastTouchTime < 300) {
      t.preventDefault();
      const { options: { dblClickZoomRatio: e } } = this;
      this.isOnMinScale() ? this.zoom(e, R(t)) : this.zoom(-1), this.data.dblTouchData.lastTouchTime = 0, this.emit("dblClick", this, this.transform.scale, t);
    } else
      this.data.dblTouchData.lastTouchTime = Date.now();
}, Q = new WeakSet(), $t = function(t) {
  const { data: e, transform: i, options: { disableDraggingClass: o } } = this, { dragData: a, imageData: r } = e;
  if (!a || !r)
    return;
  const d = (n) => {
    n && n.button !== 0 || this.options.draggable && (n.preventDefault(), !ht(n.target, o) && (D(a, {
      startX: R(n).clientX,
      startY: R(n).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, n), document.addEventListener(Z, l), document.addEventListener(k, h)));
  }, l = (n) => {
    if (n.touches || !this.states.dragging)
      return;
    n.preventDefault();
    const g = R(n).clientX, c = R(n).clientY, u = g - a.startX + i.translateX, f = c - a.startY + i.translateY;
    this.moveTo({ x: u, y: f }), D(a, {
      startX: R(n).clientX,
      startY: R(n).clientY
    }), this.emit("drag", this, { x: u, y: f }, n);
  }, h = (n) => {
    n.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, n), document.removeEventListener(Z, l), document.removeEventListener(k, h));
  };
  d(t);
}, tt = new WeakSet(), Nt = function(t) {
  const { data: e, transform: i, options: { maxScale: o, minScale: a, draggable: r, pinchable: d, bounds: l, dragReleaseOnBounds: h, disableDraggingClass: n, allowTouchToBubble: g } } = this, { touchData: c, imageData: u } = e;
  if (!c || !u)
    return;
  const f = (_) => {
    const m = _.touches;
    if (!m || !this.options.draggable)
      return;
    if (l && h) {
      const $ = this.isOnBoundX(), N = this.isOnBoundY();
      m.length === 1 && ($ || N) || _.preventDefault();
    } else
      g || _.preventDefault();
    if (ht(_.target, n) && m.length <= 1)
      return;
    const { top: S, left: O } = z(this.image), { width: v, height: C } = this.getImageDiff();
    D(c, {
      hypot: vt(m),
      startX: H(m).clientX,
      startY: H(m).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: S,
      imageLeft: O,
      widthDiff: v,
      heightDiff: C
    }), r && (this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, _)), d && m.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, i.scale, _)), document.addEventListener("touchmove", E), document.addEventListener("touchend", A);
  }, E = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: S, pinching: O } } = this, { top: v, left: C } = z(this.image), { width: $, height: N } = this.getImageDiff(), B = vt(m), Et = B ? B / c.hypot : 1, rt = this.useFixedRatio(Et * i.scale), St = H(m).clientX + c.prevX, bt = H(m).clientY + c.prevY;
    if (O && m.length === 2 && this.zoomTo(rt, !1), S) {
      const Tt = rt !== o && rt !== a && d ? Et : 1, Ut = Y(St - c.imageLeft - ($ - c.widthDiff) - (c.startX - c.imageLeft) * Tt + i.translateX), Gt = Y(bt - c.imageTop - (N - c.heightDiff) - (c.startY - c.imageTop) * Tt + i.translateY);
      this.moveTo({ x: Ut, y: Gt });
    }
    D(c, {
      hypot: B,
      startX: St,
      startY: bt,
      imageTop: v,
      imageLeft: C,
      widthDiff: $,
      heightDiff: N
    }), O && m.length === 2 && this.emit("pinch", this, i.scale, _), S && this.emit("drag", this, { x: i.translateX, y: i.translateY }, _);
  }, A = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: S, pinching: O } } = this;
    if (S && !m.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, _)), O && m.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, i.scale, _)), S && m.length === 1) {
      const v = R(_).clientX, C = R(_).clientY;
      D(c, {
        prevX: c.startX - v,
        prevY: c.startY - C
      });
    }
    m.length || (document.removeEventListener("touchmove", E), document.removeEventListener("touchend", A));
  };
  f(t);
}, et = new WeakSet(), Bt = function() {
  const { wrapper: t, image: e, transform: i } = this;
  new ResizeObserver(() => {
    const { offsetWidth: a, offsetHeight: r } = t, { width: d, height: l } = this.getContainerData();
    if (a === d && r === l)
      return;
    const h = i.translateX, n = i.translateY;
    if (h) {
      const E = a / d * h;
      this.transform.translateX = E;
    }
    if (n) {
      const E = r / l * n;
      this.transform.translateY = E;
    }
    const { offsetWidth: g, offsetHeight: c } = e, { width: u, height: f } = z(e);
    D(this.data.containerData, {
      width: a,
      height: r
    }), D(this.data.imageData, {
      originWidth: g,
      originHeight: c,
      width: u,
      height: f
    }), this.emit("resize", this);
  }).observe(t);
}, st = new WeakSet(), Wt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && T(this, it, Ht).call(this), e && T(this, ot, kt).call(this);
}, it = new WeakSet(), Ht = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, direction: o } } = e, a = i === `.${x}`;
  if (!i || !a && !lt(i))
    return;
  const r = a ? y("div", x) : U(i), d = y("div", Qt), l = y("span", te), h = y("span", ee, { ...ne, "aria-orientation": o });
  r.classList.add(`${x}-${o}`), V(e, "value", {
    get() {
      return e.__value__;
    },
    set(n) {
      e.__value__ !== n && (e.__value__ = n, M(r, { [me]: n.toString() }), I(h, { "aria-valuenow": n.toString() }));
    }
  }), D(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: r,
    sliderTrack: d,
    sliderButton: h
  }), T(this, nt, Zt).call(this), d.append(l, h), r.append(d), a && t.append(r), e.mounted = !0;
}, nt = new WeakSet(), Zt = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: i } } = this;
  if (!i)
    return;
  const { options: { direction: o }, controller: a, sliderEl: r, sliderTrack: d } = i;
  if (!r || !d)
    return;
  const l = o === "vertical", h = (u) => {
    const f = z(d), E = f[l ? "height" : "width"], A = f[l ? "bottom" : "left"], _ = R(u)[l ? "clientY" : "clientX"], m = Y(X((_ - A) * (l ? -1 : 1) / E, 0, 1));
    return (e - t) * m + t;
  }, n = (u) => {
    if (u instanceof MouseEvent && u.button !== 0)
      return;
    i.sliding = !0;
    const f = h(u);
    this.zoomTo(f), this.emit("slideStart", this, this.getSliderValue(), u), document.addEventListener(Z, g), document.addEventListener(k, c);
  }, g = (u) => {
    if (!i.sliding)
      return;
    const f = h(u);
    this.zoomTo(f), this.emit("slide", this, this.getSliderValue(), u);
  }, c = (u) => {
    this.emit("slideEnd", this, this.getSliderValue(), u), i.sliding = !1, document.removeEventListener(Z, g), document.removeEventListener(k, c);
  };
  r.addEventListener(ce, n, { signal: a == null ? void 0 : a.signal });
}, ot = new WeakSet(), kt = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, inEl: o, outEl: a, resetEl: r } } = e, d = [o, a, r], l = (u, f, E, A, _) => {
    const m = u === `.${E}`;
    return !u || !m && !lt(u) ? null : (E = d.includes(u) ? `${E} ${se}` : E, m ? y(f, E, A, _) : U(u));
  }, h = l(i, "div", G), n = l(o, "button", mt, oe, be), g = l(a, "button", ft, ae, Te), c = l(r, "button", gt, re, Oe);
  D(e, {
    controller: new AbortController(),
    zoomerEl: h,
    zoomerInEl: n,
    zoomerOutEl: g,
    zoomerResetEl: c
  }), h && (n && h.append(n), g && h.append(g), c && h.append(c), i === `.${G}` && t.append(h)), T(this, at, Vt).call(this), e.mounted = !0;
}, at = new WeakSet(), Vt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, i = this;
  if (!e)
    return;
  const { controller: o, zoomerInEl: a, zoomerOutEl: r, zoomerResetEl: d } = e;
  a && a.addEventListener("click", () => {
    i.zoom(t);
  }, { signal: o == null ? void 0 : o.signal }), r && r.addEventListener("click", () => {
    i.zoom(-t);
  }, { signal: o == null ? void 0 : o.signal }), d && d.addEventListener("click", () => {
    i.reset();
  }, { signal: o == null ? void 0 : o.signal });
};
Object.assign(De.prototype, ve);
export {
  De as default
};
