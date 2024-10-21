var jt = Object.defineProperty;
var Pt = (s, t, e) => t in s ? jt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var O = (s, t, e) => (Pt(s, typeof t != "symbol" ? t + "" : t, e), e), Ft = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var S = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
};
var b = (s, t, e) => (Ft(s, t, "access private method"), e);
const lt = (s) => document.contains(U(s)), zt = (s) => {
  if (!s)
    return !1;
  try {
    const { constructor: t } = s, { prototype: e } = t, { hasOwnProperty: n } = Object.prototype;
    return t && e && n.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}, Ot = (s) => typeof s == "function", Z = (s) => !isNaN(Number(s)), ct = (s) => s == null, U = (s) => s instanceof HTMLElement ? s : document.querySelector(s), ht = (s, t) => t ? s.closest(`.${t}`) : null, v = (s) => {
  const t = "touches" in s ? s.touches[0] : s;
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}, W = (s) => ({
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
}, vt = (s) => s.length >= 2 ? Math.hypot(s[0].clientX - s[1].clientX, s[0].clientY - s[1].clientY) : 0, y = (s, t) => {
  for (const [e, n] of Object.entries(t))
    typeof n == "string" && s.style.setProperty(e, n);
}, I = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s.setAttribute(e, n);
}, T = (s, t) => {
  for (const [e, n] of Object.entries(t))
    s[e] = n;
}, X = (s, t, e) => Math.min(Math.max(s, t), e), D = (s) => {
  const t = +(Math.round(+(s + "e+2")) + "e-2");
  return isNaN(t) ? 0 : t;
}, Dt = (s) => {
  throw new Error(s);
}, dt = (s) => console.warn(s), M = (s = "div", t, e, n) => {
  const o = document.createElement(s);
  return t && o.classList.add(...t.split(" ")), e && I(o, e), n && (o.innerHTML = n), o;
}, p = "zoomist", qt = `${p}-container`, wt = `${p}-wrapper`, ut = `${p}-image`, Kt = `${p}-not-draggable`, Jt = `${p}-not-wheelable`, x = `${p}-slider`, Qt = `${p}-slider-wrapper`, te = `${p}-slider-bar`, ee = `${p}-slider-button`, G = `${p}-zoomer`, se = `${p}-zoomer-button`, _t = `${p}-zoomer-icon`, mt = `${p}-zoomer-in`, ft = `${p}-zoomer-out`, gt = `${p}-zoomer-reset`, ne = `${p}-zoomer-disabled`, ie = {
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
}, le = typeof window < "u" && typeof window.document < "u", z = le && "ontouchstart" in window, ce = z ? "touchstart" : "mousedown", H = z ? "touchmove" : "mousemove", k = z ? "touchend" : "mouseup", he = "wheel", de = ["left", "right", "center"], ue = ["top", "bottom", "center"], Yt = "--scale", Rt = "--translate-x", Xt = "--translate-y", me = "--value", Lt = {
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
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: !1,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: !1,
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
  disabledClass: ne
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
    const { scale: e } = this.transform, n = this.useFixedRatio(D(e * (s + 1)));
    return e === n ? this : (this.zoomTo(n, t), this);
  },
  zoomTo(s, t = !0) {
    const { image: e, transform: { scale: n, translateX: o, translateY: r }, options: { bounds: a } } = this;
    if (s = this.useFixedRatio(s), s === n)
      return this;
    if (this.transform.scale = s, !t)
      return this.emit("zoom", this, this.transform.scale), this;
    t = typeof t == "boolean" ? this.getContainerCenterClient() : t;
    const { clientX: h, clientY: l } = t, { top: c, left: i, width: g, height: d } = R(e), { width: u, height: f } = this.getImageDiff(), E = s / n - 1, Y = (g / 2 - h + i) * E + o, _ = (d / 2 - l + c) * E + r, m = a ? X(Y, u, -u) : Y, w = a ? X(_, f, -f) : _;
    return T(this.transform, {
      translateX: m,
      translateY: w
    }), this.emit("zoom", this, this.transform.scale), this;
  },
  move(s) {
    const { options: { bounds: t }, transform: { translateX: e, translateY: n } } = this, { x: o, y: r } = s, { width: a, height: h } = this.getImageDiff();
    if (Z(o)) {
      const l = e + o, c = t ? X(l, a, -a) : l;
      this.transform.translateX = c;
    }
    if (Z(r)) {
      const l = n + r, c = t ? X(l, h, -h) : l;
      this.transform.translateY = c;
    }
    return this;
  },
  moveTo(s) {
    const { options: { bounds: t } } = this, { x: e, y: n } = s, { width: o, height: r } = this.getImageDiff();
    if (Z(e)) {
      const a = Number(e), h = t ? X(a, o, -o) : a;
      this.transform.translateX = h;
    }
    if (de.some((a) => a === e)) {
      const h = {
        left: -o,
        right: o,
        center: 0
      }[e];
      this.transform.translateX = h;
    }
    if (Z(n)) {
      const a = Number(n), h = t ? X(a, r, -r) : a;
      this.transform.translateY = h;
    }
    if (ue.some((a) => a === n)) {
      const h = {
        top: -r,
        bottom: r,
        center: 0
      }[n];
      this.transform.translateY = h;
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
    return t * -1 === D(e);
  },
  isOnBoundBottom() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return t === D(e);
  },
  isOnBoundLeft() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t * -1 === D(e);
  },
  isOnBoundRight() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return t === D(e);
  },
  isOnBoundX() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateX: t } } = this, { width: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(D(e));
  },
  isOnBoundY() {
    const { options: { bounds: s } } = this;
    if (!s)
      return !1;
    const { transform: { translateY: t } } = this, { height: e } = this.getImageDiff();
    return Math.abs(t) === Math.abs(D(e));
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
}, { defineProperty: V } = Object;
var j, At, P, Ct, F, yt, q, Mt, K, It, J, xt, Q, $t, tt, Nt, et, Bt, st, Zt, nt, Wt, it, Ht, ot, kt, at, Vt;
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
    S(this, nt);
    // slider events
    S(this, it);
    // mount zoomer
    S(this, ot);
    // zoomer event
    S(this, at);
    O(this, "element");
    O(this, "options");
    O(this, "wrapper");
    O(this, "image");
    O(this, "mounted");
    O(this, "data");
    O(this, "transform");
    O(this, "states");
    O(this, "controller");
    O(this, "__events__");
    O(this, "__modules__");
    t || Dt("The first argument is required."), lt(t) || Dt(`Element ${t} is not exist.`), this.element = U(t), this.options = Object.assign({}, Lt, zt(e) && e), this.init();
  }
  // check zoomist-image is exist
  init() {
    const { element: t } = this, { options: { bounds: e, minScale: n, maxScale: o, initScale: r } } = this;
    if (t[p])
      return;
    t[p] = this;
    const a = t.querySelector(`.${wt}`), h = t.querySelector(`.${ut}`);
    if (!a)
      return dt(`${p} needs a ".${wt}" element.`);
    if (!h)
      return dt(`${p} needs a ".${ut}" element.`);
    this.options.minScale = e && n < 1 ? 1 : n, this.options.maxScale = Math.max(o, n), this.options.initScale = X(r || n, n, o), this.wrapper = a, this.image = h, b(this, j, At).call(this);
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
    e === `.${x}` ? (r = t.sliderEl) == null || r.remove() : (a = t.sliderTrack) == null || a.remove(), n == null || n.abort(), t.mounted = !1;
  }
  // destroy zoomer
  destroyZoomer() {
    const { __modules__: { zoomer: t } } = this;
    if (!t || !t.mounted)
      return;
    const { options: { el: e, inEl: n, outEl: o, resetEl: r }, controller: a, zoomerEl: h, zoomerInEl: l, zoomerOutEl: c, zoomerResetEl: i } = t, g = (d, u, f) => {
      d === `.${u}` && (f == null || f.remove());
    };
    [
      { target: e, className: G, el: h },
      { target: n, className: mt, el: l },
      { target: o, className: ft, el: c },
      { target: r, className: gt, el: i }
    ].forEach((d) => g(d.target, d.className, d.el)), a == null || a.abort(), t.mounted = !1;
  }
}
j = new WeakSet(), At = function() {
  const { wrapper: t, image: e, options: n } = this, { draggable: o, pinchable: r } = n, { offsetWidth: a, offsetHeight: h } = t, { offsetWidth: l, offsetHeight: c } = e, { width: i, height: g } = R(e);
  if (!l || !c)
    return dt(`The width or height of ${ut} should not be 0.`);
  if (this.transform = {
    scale: 0,
    translateX: 0,
    translateY: 0
  }, this.data = {
    imageData: {
      originWidth: l,
      originHeight: c,
      width: i,
      height: g
    },
    containerData: {
      width: a,
      height: h
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
  }), this.__events__ = { ...Ee }, n.on)
    for (const [d, u] of Object.entries(n.on))
      this.__events__[d] = [u];
  if (this.__modules__ = { ...Se }, n.slider) {
    const d = n.slider === !0 ? ge : n.slider;
    this.__modules__.slider = {
      options: Object.assign({}, fe, d)
    };
  }
  if (n.zoomer) {
    const d = n.zoomer === !0 ? pe : n.zoomer;
    this.__modules__.zoomer = {
      options: Object.assign({}, _e, d)
    };
  }
  this.controller = new AbortController(), b(this, P, Ct).call(this);
}, P = new WeakSet(), Ct = function() {
  if (this.mounted)
    return;
  const { element: t, image: e, options: { minScale: n, maxScale: o, initScale: r }, __modules__: { slider: a, zoomer: h } } = this, l = this;
  y(e, {
    transform: `
        translateX(var(${Rt}, 0px))
        translateY(var(${Xt}, 0px))
        scale(var(${Yt}, 0))`
  }), V(this.transform, "scale", {
    get() {
      return l.transform.__scale__;
    },
    set(c) {
      const i = l.useFixedRatio(c);
      if (!(ct(i) || l.transform.__scale__ === i)) {
        if (l.transform.__scale__ = i, y(e, { [Yt]: i.toString() }), T(l.data.imageData, {
          width: R(e).width,
          height: R(e).height
        }), a) {
          const g = Math.round(l.getScaleRatio() * 100);
          a.value = g;
        }
        if (h && h.options.disabledClass) {
          const { zoomerInEl: g, zoomerOutEl: d, zoomerResetEl: u, options: { disabledClass: f } } = h;
          g && (g.classList[i === o ? "add" : "remove"](f), I(g, { "aria-disabled": i === o ? "true" : "false" })), d && (d.classList[i === n ? "add" : "remove"](f), I(d, { "aria-disabled": i === n ? "true" : "false" })), u && (u.classList[i === r ? "add" : "remove"](f), I(u, { "aria-disabled": i === r ? "true" : "false" }));
        }
      }
    }
  }), V(this.transform, "translateX", {
    get() {
      return l.transform.__translateX__;
    },
    set(c) {
      const i = D(c);
      ct(i) || l.transform.__translateX__ === i || (l.transform.__translateX__ = i, y(e, { [Rt]: `${i}px` }));
    }
  }), V(this.transform, "translateY", {
    get() {
      return l.transform.__translateY__;
    },
    set(c) {
      const i = D(c);
      ct(i) || l.transform.__translateY__ === i || (l.transform.__translateY__ = i, y(e, { [Xt]: `${i}px` }));
    }
  }), b(this, F, yt).call(this), b(this, st, Zt).call(this), T(this.transform, {
    scale: r,
    translateX: 0,
    translateY: 0
  }), t.classList.add(qt), this.mounted = !0, this.emit("ready", this);
}, F = new WeakSet(), yt = function() {
  const { element: t, wrapper: e, options: n, controller: { signal: o } } = this, { draggable: r, pinchable: a, wheelable: h, dblClickable: l } = n;
  if (this.states = {}, h) {
    this.states.wheeling = !1;
    const c = (i) => b(this, q, Mt).call(this, i);
    e.addEventListener(he, c, { signal: o, passive: !1 });
  }
  if (z && (r || a)) {
    r && (this.states.dragging = !1), a && (this.states.pinching = !1);
    const c = (i) => b(this, tt, Nt).call(this, i);
    t.addEventListener("touchstart", c, { signal: o });
  }
  if (!z && r) {
    this.states.dragging = !1;
    const c = (i) => b(this, Q, $t).call(this, i);
    t.addEventListener("mousedown", c, { signal: o });
  }
  if (z && l && e) {
    const c = (i) => b(this, J, xt).call(this, i);
    e.addEventListener("touchstart", c, { signal: o });
  }
  if (!z && l && e) {
    const c = (i) => b(this, K, It).call(this, i);
    e.addEventListener("dblclick", c, { signal: o });
  }
  b(this, et, Bt).call(this);
}, q = new WeakSet(), Mt = function(t) {
  const { options: { zoomRatio: e, wheelReleaseOnMinMax: n, disableWheelingClass: o } } = this, r = (t.deltaY || t.detail) > 0 ? -1 : 1;
  if (n) {
    const a = this.isOnMinScale(), h = this.isOnMaxScale();
    a && r === -1 || h && r === 1 || t.preventDefault();
  } else
    t.preventDefault();
  this.states.wheeling || ht(t.target, o) || (this.states.wheeling = !0, setTimeout(() => {
    this.states.wheeling = !1;
  }, 15), this.zoom(r * e, v(t)), this.emit("wheel", this, this.transform.scale, t));
}, K = new WeakSet(), It = function(t) {
  t.preventDefault();
  const { options: { dblClickZoomRatio: e } } = this;
  this.isOnMinScale() ? this.zoom(e, v(t)) : this.zoom(-1), this.emit("dblClick", this, this.transform.scale, t);
}, J = new WeakSet(), xt = function(t) {
  if (t.touches.length === 1)
    if (Date.now() - this.data.dblTouchData.lastTouchTime < 300) {
      t.preventDefault();
      const { options: { dblClickZoomRatio: e } } = this;
      this.isOnMinScale() ? this.zoom(e, v(t)) : this.zoom(-1), this.data.dblTouchData.lastTouchTime = 0, this.emit("dblClick", this, this.transform.scale, t);
    } else
      this.data.dblTouchData.lastTouchTime = Date.now();
}, Q = new WeakSet(), $t = function(t) {
  const { data: e, transform: n, options: { disableDraggingClass: o } } = this, { dragData: r, imageData: a } = e;
  if (!r || !a)
    return;
  const h = (i) => {
    i && i.button !== 0 || this.options.draggable && (i.preventDefault(), !ht(i.target, o) && (T(r, {
      startX: v(i).clientX,
      startY: v(i).clientY
    }), this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, i), document.addEventListener(H, l), document.addEventListener(k, c)));
  }, l = (i) => {
    if (i.touches || !this.states.dragging)
      return;
    i.preventDefault();
    const g = v(i).clientX, d = v(i).clientY, u = g - r.startX + n.translateX, f = d - r.startY + n.translateY;
    this.moveTo({ x: u, y: f }), T(r, {
      startX: v(i).clientX,
      startY: v(i).clientY
    }), this.emit("drag", this, { x: u, y: f }, i);
  }, c = (i) => {
    i.touches || (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, i), document.removeEventListener(H, l), document.removeEventListener(k, c));
  };
  h(t);
}, tt = new WeakSet(), Nt = function(t) {
  const { data: e, transform: n, options: { maxScale: o, minScale: r, draggable: a, pinchable: h, bounds: l, dragReleaseOnBounds: c, disableDraggingClass: i, allowTouchToBubble: g } } = this, { touchData: d, imageData: u } = e;
  if (!d || !u)
    return;
  const f = (_) => {
    const m = _.touches;
    if (!m || !this.options.draggable)
      return;
    if (l && c) {
      const $ = this.isOnBoundX(), N = this.isOnBoundY();
      m.length === 1 && ($ || N) || _.preventDefault();
    } else
      g || _.preventDefault();
    if (ht(_.target, i) && m.length <= 1)
      return;
    const { top: w, left: L } = R(this.image), { width: A, height: C } = this.getImageDiff();
    T(d, {
      hypot: vt(m),
      startX: W(m).clientX,
      startY: W(m).clientY,
      prevX: 0,
      prevY: 0,
      imageTop: w,
      imageLeft: L,
      widthDiff: A,
      heightDiff: C
    }), a && (this.states.dragging = !0, this.emit("dragStart", this, { x: n.translateX, y: n.translateY }, _)), h && m.length === 2 && (this.states.pinching = !0, this.emit("pinchStart", this, n.scale, _)), document.addEventListener("touchmove", E), document.addEventListener("touchend", Y);
  }, E = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: w, pinching: L } } = this, { top: A, left: C } = R(this.image), { width: $, height: N } = this.getImageDiff(), B = vt(m), Et = B ? B / d.hypot : 1, rt = this.useFixedRatio(Et * n.scale), St = W(m).clientX + d.prevX, bt = W(m).clientY + d.prevY;
    if (L && m.length === 2 && this.zoomTo(rt, !1), w) {
      const Tt = rt !== o && rt !== r && h ? Et : 1, Ut = D(St - d.imageLeft - ($ - d.widthDiff) - (d.startX - d.imageLeft) * Tt + n.translateX), Gt = D(bt - d.imageTop - (N - d.heightDiff) - (d.startY - d.imageTop) * Tt + n.translateY);
      this.moveTo({ x: Ut, y: Gt });
    }
    T(d, {
      hypot: B,
      startX: St,
      startY: bt,
      imageTop: A,
      imageLeft: C,
      widthDiff: $,
      heightDiff: N
    }), L && m.length === 2 && this.emit("pinch", this, n.scale, _), w && this.emit("drag", this, { x: n.translateX, y: n.translateY }, _);
  }, Y = (_) => {
    const m = _.touches;
    if (!m)
      return;
    const { states: { dragging: w, pinching: L } } = this;
    if (w && !m.length && (this.states.dragging = !1, this.emit("dragEnd", this, { x: n.translateX, y: n.translateY }, _)), L && m.length < 2 && (this.states.pinching = !1, this.emit("pinchEnd", this, n.scale, _)), w && m.length === 1) {
      const A = v(_).clientX, C = v(_).clientY;
      T(d, {
        prevX: d.startX - A,
        prevY: d.startY - C
      });
    }
    m.length || (document.removeEventListener("touchmove", E), document.removeEventListener("touchend", Y));
  };
  f(t);
}, et = new WeakSet(), Bt = function() {
  const { wrapper: t, image: e, transform: n } = this;
  new ResizeObserver(() => {
    const { offsetWidth: r, offsetHeight: a } = t, { width: h, height: l } = this.getContainerData();
    if (r === h && a === l)
      return;
    const c = n.translateX, i = n.translateY;
    if (c) {
      const E = r / h * c;
      this.transform.translateX = E;
    }
    if (i) {
      const E = a / l * i;
      this.transform.translateY = E;
    }
    const { offsetWidth: g, offsetHeight: d } = e, { width: u, height: f } = R(e);
    T(this.data.containerData, {
      width: r,
      height: a
    }), T(this.data.imageData, {
      originWidth: g,
      originHeight: d,
      width: u,
      height: f
    }), this.emit("resize", this);
  }).observe(t);
}, st = new WeakSet(), Zt = function() {
  const { slider: t, zoomer: e } = this.__modules__;
  t && b(this, nt, Wt).call(this), e && b(this, ot, kt).call(this);
}, nt = new WeakSet(), Wt = function() {
  const { element: t, __modules__: { slider: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, direction: o } } = e, r = n === `.${x}`;
  if (!n || !r && !lt(n))
    return;
  const a = r ? M("div", x) : U(n), h = M("div", Qt), l = M("span", te), c = M("span", ee, { ...ie, "aria-orientation": o });
  a.classList.add(`${x}-${o}`), V(e, "value", {
    get() {
      return e.__value__;
    },
    set(i) {
      e.__value__ !== i && (e.__value__ = i, y(a, { [me]: i.toString() }), I(c, { "aria-valuenow": i.toString() }));
    }
  }), T(e, {
    value: this.getScaleRatio() * 100,
    controller: new AbortController(),
    sliding: !1,
    sliderEl: a,
    sliderTrack: h,
    sliderButton: c
  }), b(this, it, Ht).call(this), h.append(l, c), a.append(h), r && t.append(a), e.mounted = !0;
}, it = new WeakSet(), Ht = function() {
  const { options: { minScale: t, maxScale: e }, __modules__: { slider: n } } = this;
  if (!n)
    return;
  const { options: { direction: o }, controller: r, sliderEl: a, sliderTrack: h } = n;
  if (!a || !h)
    return;
  const l = o === "vertical", c = (u) => {
    const f = R(h), E = f[l ? "height" : "width"], Y = f[l ? "bottom" : "left"], _ = v(u)[l ? "clientY" : "clientX"], m = D(X((_ - Y) * (l ? -1 : 1) / E, 0, 1));
    return (e - t) * m + t;
  }, i = (u) => {
    if (u instanceof MouseEvent && u.button !== 0)
      return;
    n.sliding = !0;
    const f = c(u);
    this.zoomTo(f), this.emit("slideStart", this, this.getSliderValue(), u), document.addEventListener(H, g), document.addEventListener(k, d);
  }, g = (u) => {
    if (!n.sliding)
      return;
    const f = c(u);
    this.zoomTo(f), this.emit("slide", this, this.getSliderValue(), u);
  }, d = (u) => {
    this.emit("slideEnd", this, this.getSliderValue(), u), n.sliding = !1, document.removeEventListener(H, g), document.removeEventListener(k, d);
  };
  a.addEventListener(ce, i, { signal: r == null ? void 0 : r.signal });
}, ot = new WeakSet(), kt = function() {
  const { element: t, __modules__: { zoomer: e } } = this;
  if (!e || e.mounted)
    return;
  const { options: { el: n, inEl: o, outEl: r, resetEl: a } } = e, h = [o, r, a], l = (u, f, E, Y, _) => {
    const m = u === `.${E}`;
    return !u || !m && !lt(u) ? null : (E = h.includes(u) ? `${E} ${se}` : E, m ? M(f, E, Y, _) : U(u));
  }, c = l(n, "div", G), i = l(o, "button", mt, oe, be), g = l(r, "button", ft, ae, Te), d = l(a, "button", gt, re, Oe);
  T(e, {
    controller: new AbortController(),
    zoomerEl: c,
    zoomerInEl: i,
    zoomerOutEl: g,
    zoomerResetEl: d
  }), c && (i && c.append(i), g && c.append(g), d && c.append(d), n === `.${G}` && t.append(c)), b(this, at, Vt).call(this), e.mounted = !0;
}, at = new WeakSet(), Vt = function() {
  const { options: { zoomRatio: t }, __modules__: { zoomer: e } } = this, n = this;
  if (!e)
    return;
  const { controller: o, zoomerInEl: r, zoomerOutEl: a, zoomerResetEl: h } = e;
  r && r.addEventListener("click", () => {
    n.zoom(t);
  }, { signal: o == null ? void 0 : o.signal }), a && a.addEventListener("click", () => {
    n.zoom(-t);
  }, { signal: o == null ? void 0 : o.signal }), h && h.addEventListener("click", () => {
    n.reset();
  }, { signal: o == null ? void 0 : o.signal });
};
Object.assign(De.prototype, ve);
export {
  De as default
};
