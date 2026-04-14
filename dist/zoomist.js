var jt = Object.defineProperty;
var Pt = (s, t, e) => t in s ? jt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var w = (s, t, e) => (Pt(s, typeof t != "symbol" ? t + "" : t, e), e), Ft = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var S = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var b = (s, t, e) => (Ft(s, t, "access private method"), e);
const lt = (s) => document.contains(U(s)), Mt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: i } = Object.prototype;
    return t && e && i.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, vt = (s) => typeof s == "function", W = (s) => !isNaN(Number(s)), ct = (s) => s == null, U = (s) => s instanceof HTMLElement ? s : document.querySelector(s), ht = (s, t) => t ? s.closest(`.${t}`) : null, Y = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, H = (s) => ({
  clientX: [...s].map((t) => t.clientX).reduce((t, e) => t + e) / s.length,
  clientY: [...s].map((t) => t.clientY).reduce((t, e) => t + e) / s.length
}), A = (s) => {
  const { width: t, height: e, top: i, left: o, bottom: r } = s.getBoundingClientRect();
  return {
    width: t,
    height: e,
    top: i,
    left: o,
    bottom: r
  };
}, Tt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, I = (s, t) => {
  for (const [e, i] of Object.entries(t))
    typeof i == "string" && s.style.setProperty(e, i);
}, $ = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s.setAttribute(e, i);
}, T = (s, t) => {
  for (const [e, i] of Object.entries(t))
    s[e] = i;
}, X = (s, t, e) => Math.min(Math.max(s, t), e), R = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, Dt = (s) => {
  throw new Error(s);
}, dt = (s) => console.warn(s), x = (s = "div", t, e, i) => {
  const o = document.createElement(s);
  return t && o.classList.add(...t.split(" ")), e && $(o, e), i && (o.innerHTML = i), o;
}, p = "zoomist", qt = `${p}-container`, wt = `${p}-wrapper`, ut = `${p}-image`, Kt = `${p}-not-draggable`, Jt = `${p}-not-wheelable`, N = `${p}-slider`, Qt = `${p}-slider-wrapper`, te = `${p}-slider-bar`, ee = `${p}-slider-button`, G = `${p}-zoomer`, se = `${p}-zoomer-button`, _t = `${p}-zoomer-icon`, ft = `${p}-zoomer-in`, mt = `${p}-zoomer-out`, gt = `${p}-zoomer-reset`, ie = `${p}-zoomer-disabled`, ne = {
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
}, le = typeof window < "u" && typeof window.document < "u", C = le && "ontouchstart" in window, ce = C ? "touchstart" : "mousedown", Z = C ? "touchmove" : "mousemove", k = C ? "touchend" : "mouseup", he = "wheel", de = ["left", "right", "center"], ue = ["top", "bottom", "center"], Yt = "--scale", Rt = "--translate-x", Xt = "--translate-y", fe = "--value", zt = {
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
}, me = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: "horizontal"
}, ge = {
  el: `.${N}`
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
  inEl: `.${ft}`,
  outEl: `.${mt}`,
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
`, Oe = `
<svg viewBox="0 0 12 12" class="${_t}">
  <rect y="5.5" width="12" height="1"/>
</svg>
`, ve = `
<svg viewBox="0 0 12 12" class="${_t}">
  <path d="m7.45,1.27l.35-.22c.26-.17.34-.52.17-.78-.17-.27-.52-.34-.78-.17l-1.54.99-.19.13-.11.46,1.12,1.75c.11.17.29.26.48.26.1,0,.21-.03.31-.09.26-.17.34-.52.17-.78l-.29-.46c1.85.5,3.22,2.17,3.22,4.18,0,2.39-1.95,4.34-4.34,4.34S1.66,8.92,1.66,6.52c0-1.15.44-2.23,1.25-3.05.22-.22.22-.58,0-.8-.22-.22-.58-.22-.8,0-1.02,1.03-1.58,2.4-1.58,3.85,0,3.02,2.46,5.48,5.48,5.48s5.48-2.46,5.48-5.48c0-2.51-1.71-4.62-4.02-5.26Z"/>
</svg>
`, Te = {
  on(s, t) {
    if (!t || !vt(t))
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
      vt(i) && i.apply(this, t);
    }), this) : this;
  },
  zoom(s, t) {
    const { scale: e } = this.transform, i = this.useFixedRatio(R(e * (s + 1)));
    return e === i ? this : (this.zoomTo(i, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: i, translateX: o, translateY: r }, options: { bounds: l } } = this;
    if (s = this.useFixedRatio(s), s === i)
      return this;
    const d = this.getImageDiff();
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: c, clientY: a } = t, { top: n, left: f, width: h, height: u } = A(e), { width: g, height: E } = this.getImageDiff(), { panAtMinScale: M } = this.options, _ = this.isOnMinScale();
    let m, D;
    if (l && M) {
      const O = Math.min(g, 0), v = Math.min(E, 0), z = O < 0 && d.width < 0 ? o * (O / d.width) : 0, L = v < 0 && d.height < 0 ? r * (v / d.height) : 0;
      m = X(z, O, -O), D = X(L, v, -v);
    } else {
      const O = s / i - 1, v = (h / 2 - c + f) * O + o, z = (u / 2 - a + n) * O + r, L = l && _ && !M ? 0 : g, y = l && _ && !M ? 0 : E;
      m = l ? X(v, L, -L) : v, D = l ? X(z, y, -y) : z;
    }
    return T(this.transform, {
      translateX: m,
      translateY: D
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t, panAtMinScale: e }, transform: { translateX: i, translateY: o } } = this, { x: r, y: l } = s, { width: d, height: c } = this.getImageDiff(), a = t && this.isOnMinScale() && !e ? 0 : d, n = t && this.isOnMinScale() && !e ? 0 : c;
    if (W(r)) {
      const f = i + r, h = t ? X(f, a, -a) : f;
      this.transform.translateX = h;
    }
    if (W(l)) {
      const f = o + l, h = t ? X(f, n, -n) : f;
      this.transform.translateY = h;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t, panAtMinScale: e } } = this, { x: i, y: o } = s, { width: r, height: l } = this.getImageDiff(), d = t && this.isOnMinScale() && !e ? 0 : Math.min(r, 0), c = t && this.isOnMinScale() && !e ? 0 : Math.min(l, 0);
    if (W(i)) {
      const a = Number(i), n = t ? X(a, d, -d) : a;
      this.transform.translateX = n;
    }
    if (de.some((a) => a === i)) {
      const n = {
        left: -d,
        right: d,
        center: 0
      }[i];
      this.transform.translateX = n;
    }
    if (W(o)) {
      const a = Number(o), n = t ? X(a, c, -c) : a;
      this.transform.translateY = n;
    }
    if (ue.some((a) => a === o)) {
      const n = {
        top: -c,
        bottom: c,
        center: 0
      }[o];
      this.transform.translateY = n;
    }
    return this;
  },
  slideTo(s) {
    const { options: { minScale: t, maxScale: e } } = this, i = (e - t) * s / 100 + t;
    return this.zoomTo(i), this;
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
    const { element: t, image: e, controller: i } = this;
    return this.mounted && (this.emit("beforeDestroy", this), i.abort(), this.destroyModules(), s && e && (this.reset(), e.removeAttribute("style")), t[p] = null, this.mounted = !1, this.emit("destroy", this)), null;
  },
  update(s) {
    const { element: t, controller: e } = this;
    return this.emit("beforeUpdate", this), t[p] = null, this.mounted = !1, e.abort(), this.destroyModules(), s && (this.options = Object.assign({}, zt, Mt(s) && s)), this.init(), this.emit("update", this), this;
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
    return t * -1 === R(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === R(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === R(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === R(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(R(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(R(e));
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
    const { width: s, height: t } = this.getContainerData(), { width: e, height: i } = this.getImageData();
    return {
      width: (s - e) / 2,
      height: (t - i) / 2
    };
  },
  // private methods
  getContainerCenterClient() {
    const { element: s } = this, { top: t, left: e, width: i, height: o } = A(s);
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
var j, Lt, P, At, F, Ct, q, yt, K, It, J, xt, Q, $t, tt, Nt, et, Bt, st, Wt, it, Ht, nt, Zt, ot, kt, at, Vt;
class De {
  constructor(t, e) {
    // create initial data
    S(this, j);
    // mount elements and bind events
    S(this, P);
    // resize, drag, pinch, wheel
    S(this, F);
    // on wheel
    S(this, q);
    S(this, K);
    S(this, J);
    // on drag (mouse)
    S(this, Q);
    // on touch (pinch and touchmove)
    S(this, tt);
    // resize observer on element
    S(this, et);
    // check modules and create
    S(this, st);
    // mount slider
    S(this, it);
    // slider events
    S(this, nt);
    // mount zoomer
    S(this, ot);
    // zoomer event
    S(this, at);
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
    t || Dt("The first argument is required."), lt(t) || Dt(`Element ${t} is not exist.`), this.element = U(t), this.options = Object.assign({}, zt, Mt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: i, maxScale: o, initScale: r } } = this;
    if (t[p])
      return;
    t[p] = this;
    const l = t.querySelector(`.${wt}`), d = t.querySelector(`.${ut}`);
    if (!l)
      return dt(`${p} needs a ".${wt}" element.`);
    if (!d)
      return dt(`${p} needs a ".${ut}" element.`);
    this.options.minScale = e && i < 1 ? 1 : i, this.options.maxScale = Math.max(o, i), this.options.initScale = X(r || i, i, o), this.wrapper = l, this.image = d, b(this, j, Lt).call(this);
  }
  // destory modules
  destroyModules() {
    const { slider: t, zoomer: e } = this.__modules__;
    t && this.destroySlider(), e && this.destroyZoomer();
  }
  // destroy slider
  destroySlider() {
    var r, l;
    const { __modules__: { slider: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e }, controller: i } = t;
    e === `.${N}` ? (r = t.sliderEl) == null || r.remove() : (l = t.sliderTrack) == null || l.remove(), i == null || i.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: i, outEl: o, resetEl: r }, controller: l, zoomerEl: d, zoomerInEl: c, zoomerOutEl: a, zoomerResetEl: n } = t, f = (h, u, g) => {
      h === `.${u}` && (g == null || g.remove());
    };
    [
      { target: e, className: G, el: d },
      { target: i, className: ft, el: c },
      { target: o, className: mt, el: a },
      { target: r, className: gt, el: n }
    ].forEach((h) => f(h.target, h.className, h.el)), l == null || l.abort(), t.mounted = !1;
  }
}
j = new WeakSet(), Lt = function() {
  const { wrapper: t, image: e, options: i } = this, { draggable: o, pinchable: r } = i, { offsetWidth: l, offsetHeight: d } = t, { offsetWidth: c, offsetHeight: a } = e, { width: n, height: f } = A(e);
  if (!c || !a)
    return dt(`The width or height of ${ut} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: c,
      originHeight: a,
      width: n,
      height: f
    },
    containerData: {
      width: l,
      height: d
    },
    dblTouchData: {
      lastTouchTime: 0
    }
  }, C && (o || r) && (this.data.touchData = {
    hypot: 0,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    imageTop: 0,
    imageLeft: 0,
    widthDiff: 0,
    heightDiff: 0
  }), !C && o && (this.data.dragData = {
    startX: 0,
    startY: 0
  }), this.__events__ = { ...Ee }, i.on)
    for (const [h, u] of Object.entries(i.on))
      this.__events__[h] = [u];
  if (this.__modules__ = { ...Se }, i.slider) {
    const h = i.slider === !0 ? ge : i.slider;
    this.__modules__.slider = {
      options: Object.assign({}, me, h)
    };
  }
  if (i.zoomer) {
    const h = i.zoomer === !0 ? pe : i.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, _e, h)
    };
  }
  this.controller = new AbortController(), b(this, P, At).call(this);
}, P = new WeakSet(), At = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: i, maxScale: o, initScale: r }, __modules__: { slider: l, zoomer: d } } = this, c = this;
  I(e, {
    transform: `
        translateX(var(${Rt}, 0px))
        translateY(var(${Xt}, 0px))
        scale(var(${Yt}, 0))`
  }), V(this.transform, "scale", {
    get() {
      return c.transform.__scale__;
    },
    set(a) {
      const n = c.useFixedRatio(a);
      if (!(ct(n) || c.transform.__scale__ === n)) {
        if (c.transform.__scale__ = n, I(e, { [Yt]: n.toString() }), T(c.data.imageData, {
          width: A(e).width,
          height: A(e).height
        }), l) {
          const f = Math.round(c.getScaleRatio() * 100);
          l.value = f;
        }
        if (d && d.options.disabledClass) {
          const { zoomerInEl: f, zoomerOutEl: h, zoomerResetEl: u, options: { disabledClass: g } } = d;
          f && (f.classList[n === o ? "add" : "remove"](g), $(f, { "aria-disabled": n === o ? "true" : "false" })), h && (h.classList[n === i ? "add" : "remove"](g), $(h, { "aria-disabled": n === i ? "true" : "false" })), u && (u.classList[n === r ? "add" : "remove"](g), $(u, { "aria-disabled": n === r ? "true" : "false" }));
        }
      }
    }
  }), V(this.transform, "translateX", {
    get() {
      return c.transform.__translateX__;
    },
    set(a) {
      const n = R(a);
      ct(n) || c.transform.__translateX__ === n || (c.transform.__translateX__ = n, I(e, { [Rt]: `${n}px` }));
    }
  }), V(this.transform, "translateY", {
    get() {
      return c.transform.__translateY__;
    },
    set(a) {
      const n = R(a);
      ct(n) || c.transform.__translateY__ === n || (c.transform.__translateY__ = n, I(e, { [Xt]: `${n}px` }));
    }
  }), b(this, F, Ct).call(this), b(this, st, Wt).call(this), T(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(qt), this.options.initialAlign && this.moveTo(this.options.initialAlign), this.mounted = !0, this.emit("ready", this);
}, F = new WeakSet(), Ct = function() {
  const { element: t, wrapper: e, options: i, controller: { signal: o } } = this, { draggable: r, pinchable: l, wheelable: d, dblClickable: c } = i;
  if (this.states = {}, d) {
    this.states.wheeling = !1;
    const a = (n) => b(this, q, yt).call(this, n);
    e.addEventListener(he, a, { signal: o, passive: !1 });
  }
  if (C && (r || l)) {
    r && (this.states.dragging = !1), l && (this.states.pinching = !1);
    const a = (n) => b(this, tt, Nt).call(this, n);
    t.addEventListener("touchstart", a, { signal: o });
  }
  if (!C && r) {
    this.states.dragging = !1;
    const a = (n) => b(this, Q, $t).call(this, n);
    t.addEventListener("mousedown", a, { signal: o });
  }
  if (C && c && e) {
    const a = (n) => b(this, J, xt).call(this, n);
    e.addEventListener("touchstart", a, { signal: o });
  }
  if (!C && c && e) {
    const a = (n) => b(this, K, It).call(this, n);
    e.addEventListener("dblclick", a, { signal: o });
  }
  b(this, et, Bt).call(this);
}, q = new WeakSet(), yt = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: i, disableWheelingClass: o } } = this, r = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (i) {
    const l = this.isOnMinScale(), d = this.isOnMaxScale();
    l && r === -1 || d && r === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ht(t.target, o) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 15), this.zoom(r * e, Y(t)), this.emit("wheel", this, this.transform.scale, t));
}, K = new WeakSet(), It = function(t) {
  t.preventDefault();
  const { options: { dblClickZoomRatio: e } } = this;
  this.isOnMinScale() ? this.zoom(e, Y(t)) : this.zoom(-1), this.emit("dblClick", this, this.transform.scale, t);
}, J = new WeakSet(), xt = function(t) {
  if (t.touches.length === 1)
    if (Date.now() - this.data.dblTouchData.lastTouchTime < 300) {
      t.preventDefault();
      const { options: { dblClickZoomRatio: e } } = this;
      this.isOnMinScale() ? this.zoom(e, Y(t)) : this.zoom(-1), this.data.dblTouchData.lastTouchTime = 0, this.emit("dblClick", this, this.transform.scale, t);
    } else
      this.data.dblTouchData.lastTouchTime = Date.now();
}, Q = new WeakSet(), $t = function(t) {
  const { data: e, transform: i, options: { disableDraggingClass: o } } = this, { dragData: r, imageData: l } = e;
  if (!r || !l)
    return;
  const d = (n) => {
    n && n.button !== 0 || this.options.draggable && (n.preventDefault(), !ht(n.target, o) && (T(r, {
      startX: Y(n).clientX,
      startY: Y(n).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, n), document.addEventListener(Z, c), document.addEventListener(k, a)));
  }, c = (n) => {
    if (n.touches || !this.states.dragging)
      return;
    n.preventDefault();
    const f = Y(n).clientX, h = Y(n).clientY, u = f - r.startX + i.translateX, g = h - r.startY + i.translateY;
    this.moveTo({ x: u, y: g }), T(r, {
      startX: Y(n).clientX,
      startY: Y(n).clientY
    }), this.emit("drag", this, { x: u, y: g }, n);
  }, a = (n) => {
    n.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, n), document.removeEventListener(Z, c), document.removeEventListener(k, a));
  };
  d(t);
}, tt = new WeakSet(), Nt = function(t) {
  const { data: e, transform: i, options: { maxScale: o, minScale: r, draggable: l, pinchable: d, bounds: c, dragReleaseOnBounds: a, disableDraggingClass: n, allowTouchToBubble: f } } = this, { touchData: h, imageData: u } = e;
  if (!h || !u)
    return;
  const g = (_) => {
    const m = _.touches;
    if (!m || !this.options.draggable)
      return;
    if (c && a) {
      const L = this.isOnBoundX(), y = this.isOnBoundY();
      m.length === 1 && (L || y) || _.preventDefault();
    } else
      f || _.preventDefault();
    if (ht(_.target, n) && m.length <= 1)
      return;
    const { top: D, left: O } = A(this.image), { width: v, height: z } = this.getImageDiff();
    T(h, {
      hypot: Tt(m),
      startX: H(m).clientX,
      startY: H(m).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: D,
      imageLeft: O,
      widthDiff: v,
      heightDiff: z
    }), l && (this.states.dragging = !0, this.emit("dragStart", this, { x: i.translateX, y: i.translateY }, _)), d && m.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, i.scale, _)), document.addEventListener("touchmove", E), document.addEventListener("touchend", M);
  }, E = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: D, pinching: O } } = this, { top: v, left: z } = A(this.image), { width: L, height: y } = this.getImageDiff(), B = Tt(m), Et = B ? B / h.hypot : 1, rt = this.useFixedRatio(Et * i.scale), St = H(m).clientX + h.prevX, bt = H(m).clientY + h.prevY;
    if (O && m.length === 2 && this.zoomTo(rt, !1), D) {
      const Ot = rt !== o && rt !== r && d ? Et : 1, Ut = R(St - h.imageLeft - (L - h.widthDiff) - (h.startX - h.imageLeft) * Ot + i.translateX), Gt = R(bt - h.imageTop - (y - h.heightDiff) - (h.startY - h.imageTop) * Ot + i.translateY);
      this.moveTo({ x: Ut, y: Gt });
    }
    T(h, {
      hypot: B,
      startX: St,
      startY: bt,
      imageTop: v,
      imageLeft: z,
      widthDiff: L,
      heightDiff: y
    }), O && m.length === 2 && this.emit("pinch", this, i.scale, _), D && this.emit("drag", this, { x: i.translateX, y: i.translateY }, _);
  }, M = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: D, pinching: O } } = this;
    if (D && !m.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: i.translateX, y: i.translateY }, _)), O && m.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, i.scale, _)), D && m.length === 1) {
      const v = Y(_).clientX, z = Y(_).clientY;
      T(h, {
        prevX: h.startX - v,
        prevY: h.startY - z
      });
    }
    m.length || (document.removeEventListener("touchmove", E), document.removeEventListener("touchend", M));
  };
  g(t);
}, et = new WeakSet(), Bt = function() {
  const { wrapper: t, image: e, transform: i } = this;
  new ResizeObserver(() => {
    const { offsetWidth: r, offsetHeight: l } = t, { width: d, height: c } = this.getContainerData();
    if (r === d && l === c)
      return;
    const a = i.translateX, n = i.translateY;
    if (a) {
      const E = r / d * a;
      this.transform.translateX = E;
    }
    if (n) {
      const E = l / c * n;
      this.transform.translateY = E;
    }
    const { offsetWidth: f, offsetHeight: h } = e, { width: u, height: g } = A(e);
    T(this.data.containerData, {
      width: r,
      height: l
    }), T(this.data.imageData, {
      originWidth: f,
      originHeight: h,
      width: u,
      height: g
    }), this.emit("resize", this);
  }).observe(t);
}, st = new WeakSet(), Wt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && b(this, it, Ht).call(this), e && b(this, ot, kt).call(this);
}, it = new WeakSet(), Ht = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, direction: o } } = e, r = i === `.${N}`;
  if (!i || !r && !lt(i))
    return;
  const l = r ? x("div", N) : U(i), d = x("div", Qt), c = x("span", te), a = x("span", ee, { ...ne, "aria-orientation": o });
  l.classList.add(`${N}-${o}`), V(e, "value", {
    get() {
      return e.__value__;
    },
    set(n) {
      e.__value__ !== n && (e.__value__ = n, I(l, { [fe]: n.toString() }), $(a, { "aria-valuenow": n.toString() }));
    }
  }), T(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: l,
    sliderTrack: d,
    sliderButton: a
  }), b(this, nt, Zt).call(this), d.append(c, a), l.append(d), r && t.append(l), e.mounted = !0;
}, nt = new WeakSet(), Zt = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: i } } = this;
  if (!i)
    return;
  const { options: { direction: o }, controller: r, sliderEl: l, sliderTrack: d } = i;
  if (!l || !d)
    return;
  const c = o === "vertical", a = (u) => {
    const g = A(d), E = g[c ? "height" : "width"], M = g[c ? "bottom" : "left"], _ = Y(u)[c ? "clientY" : "clientX"], m = R(X((_ - M) * (c ? -1 : 1) / E, 0, 1));
    return (e - t) * m + t;
  }, n = (u) => {
    if (u instanceof MouseEvent && u.button !== 0)
      return;
    i.sliding = !0;
    const g = a(u);
    this.zoomTo(g), this.emit("slideStart", this, this.getSliderValue(), u), document.addEventListener(Z, f), document.addEventListener(k, h);
  }, f = (u) => {
    if (!i.sliding)
      return;
    const g = a(u);
    this.zoomTo(g), this.emit("slide", this, this.getSliderValue(), u);
  }, h = (u) => {
    this.emit("slideEnd", this, this.getSliderValue(), u), i.sliding = !1, document.removeEventListener(Z, f), document.removeEventListener(k, h);
  };
  l.addEventListener(ce, n, { signal: r == null ? void 0 : r.signal });
}, ot = new WeakSet(), kt = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: i, inEl: o, outEl: r, resetEl: l } } = e, d = [o, r, l], c = (u, g, E, M, _) => {
    const m = u === `.${E}`;
    return !u || !m && !lt(u) ? null : (E = d.includes(u) ? `${E} ${se}` : E, m ? x(g, E, M, _) : U(u));
  }, a = c(i, "div", G), n = c(o, "button", ft, oe, be), f = c(r, "button", mt, ae, Oe), h = c(l, "button", gt, re, ve);
  T(e, {
    controller: new AbortController(),
    zoomerEl: a,
    zoomerInEl: n,
    zoomerOutEl: f,
    zoomerResetEl: h
  }), a && (n && a.append(n), f && a.append(f), h && a.append(h), i === `.${G}` && t.append(a)), b(this, at, Vt).call(this), e.mounted = !0;
}, at = new WeakSet(), Vt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, i = this;
  if (!e)
    return;
  const { controller: o, zoomerInEl: r, zoomerOutEl: l, zoomerResetEl: d } = e;
  r && r.addEventListener("click", () => {
    i.zoom(t);
  }, { signal: o == null ? void 0 : o.signal }), l && l.addEventListener("click", () => {
    i.zoom(-t);
  }, { signal: o == null ? void 0 : o.signal }), d && d.addEventListener("click", () => {
    i.reset();
  }, { signal: o == null ? void 0 : o.signal });
};
Object.assign(De.prototype, Te);
export {
  De as default
};
