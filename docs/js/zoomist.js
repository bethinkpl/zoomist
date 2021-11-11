/*!
 * zoomist.js v1.0.0
 * https://github.com/cotton123236/zoomist#readme
 *
 * Copyright 2021-present Wilson Wu
 * Released under the MIT license
 *
 * Date: 2021-11-11T15:23:34.942Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Zoomist = factory());
})(this, (function () { 'use strict';

  const NAME = 'zoomist';
  const MODULES$1 = ['slider', 'zoomer'];
  const CLASS_CONTAINER = `${NAME}-container`;
  const CLASS_WRAPPER = `${NAME}-wrapper`;
  const CLASS_IMAGE = `${NAME}-image`;
  const CLASS_SLIDER = `${NAME}-slider`;
  const CLASS_SLIDER_MAIN = `${NAME}-slider-main`;
  const CLASS_SLIDER_BAR = `${NAME}-slider-bar`;
  const CLASS_SLIDER_BUTTON = `${NAME}-slider-button`;
  const CLASS_ZOOMER = `${NAME}-zoomer`;
  const CLASS_ZOOMER_IN = `${NAME}-in-zoomer`;
  const CLASS_ZOOMER_OUT = `${NAME}-out-zoomer`;
  const CLASS_ZOOMER_DISABLE = `${NAME}-zoomer-disable`;
  const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  const IS_TOUCH = IS_BROWSER && window.document.documentElement ? 'ontouchstart' in window.document.documentElement : false;
  const EVENT_TOUCH_START = IS_TOUCH ? 'touchstart' : 'mousedown';
  const EVENT_TOUCH_MOVE = IS_TOUCH ? 'touchmove' : 'mousemove';
  const EVENT_TOUCH_END = IS_TOUCH ? 'touchend touchcancel' : 'mouseup';
  const EVENT_RESIZE = 'resize';
  const EVENT_WHEEL = 'wheel';

  var DEFAULT_OPTIONS = {
    fill: 'cover',
    src: 'data-zoomist-src',
    draggable: true,
    bounds: true,
    zoomRatio: 0.1,
    maxRatio: false,
    wheel: true
  };
  const DEFAULT_SLIDER_OPTIONS = {
    el: CLASS_SLIDER,
    direction: 'horizontal',
    // 'vertical',
    maxRatio: 2
  };
  const DEFAULT_ZOOMER_OPTIONS = {
    inEl: CLASS_ZOOMER_IN,
    outEl: CLASS_ZOOMER_OUT,
    disableOnBounds: true
  };

  const isObject = value => {
    return typeof value === 'object' && value !== null;
  }; // check value is a plain object

  const isPlainObject = value => {
    if (!isObject(value)) return false;

    try {
      const {
        constructor
      } = value;
      const {
        prototype
      } = constructor;
      const {
        hasOwnProperty
      } = Object.prototype;
      return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }; // set object key and value

  const setObject = (obj, value) => {
    if (!obj) obj = {};

    for (const [k, v] of Object.entries(value)) {
      obj[k] = v;
    }
  }; // make a new object from old object

  const getNewObject = value => {
    return Object.assign({}, value);
  }; // check value is string and not empty

  const isString = value => {
    return typeof value === 'string' && value !== '';
  }; // check value is number and not NaN

  const isNumber = value => {
    return typeof value === 'number' && !isNaN(value);
  }; // check element is exist

  const isElementExist = value => {
    return getElement(value) !== null;
  }; // if value is an element then return value, if not then query value

  const getElement = value => {
    return value instanceof HTMLElement ? value : document.querySelector(value);
  }; // check value is img tag or not

  const setStyle = (element, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      element.style[k] = isNumber(v) ? `${v}px` : v;
    }
  }; // get mouse pageX and pageY

  const getPointer = event => {
    return {
      x: !IS_TOUCH ? event.pageX : event.touches[0].pageX,
      y: !IS_TOUCH ? event.pageY : event.touches[0].pageY,
      clientX: !IS_TOUCH ? event.clientX : event.touches[0].clientX,
      clientY: !IS_TOUCH ? event.clientY : event.touches[0].clientY
    };
  }; // get transformX

  const getTransformX = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  }; // get transformY

  const getTransformY = target => {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }; // like .toFixed(2)

  const roundToTwo = value => {
    return +(Math.round(value + "e+2") + "e-2");
  }; // limit value

  const minmax = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  }; // first letter to uppercase

  const upperFirstLetter = value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  var METHODS = {
    /**
     * get container (element) data
     * @returns {Object}
     */
    getContainerData() {
      return getNewObject(this.data.containerData);
    },

    /**
     * get image data
     * @returns {Object}
     */
    getImageData() {
      return getNewObject(this.data.imageData);
    },

    /**
     * get slider value
     * @returns {Number}
     */
    getSliderValue() {
      return this.options.slider.value;
    },

    /**
     * zoom
     * zoomRatio - zoomin when pass a positive number, zoomout when pass a negative number
     * pointer - a object which return from getPoiner()
     * @param {Number, Object} 
     */
    zoom(zoomRatio, pointer) {
      const {
        image,
        data,
        options,
        ratio
      } = this;
      if (options.bounds && ratio === 1 && zoomRatio < 0) return;
      if (options.maxRatio && ratio === options.maxRatio && zoomRatio > 0) return;
      const {
        originImageData
      } = data;
      const containerData = this.getContainerData();
      const imageData = this.getImageData();
      const imageRect = image.getBoundingClientRect();
      const calcRatio = roundToTwo(ratio * (zoomRatio + 1));
      const newRatio = options.bounds && calcRatio < 1 ? 1 : options.maxRatio && calcRatio > options.maxRatio ? options.maxRatio : calcRatio;
      const newZoomRatio = newRatio / ratio - 1;
      const newWidth = originImageData.width * newRatio;
      const newHeight = originImageData.height * newRatio;
      const newLeft = (containerData.width - newWidth) / 2;
      const newTop = (containerData.height - newHeight) / 2;
      const distanceX = pointer ? (imageData.width / 2 - pointer.clientX + imageRect.left) * newZoomRatio + getTransformX(image) : getTransformX(image);
      const distanceY = pointer ? (imageData.height / 2 - pointer.clientY + imageRect.top) * newZoomRatio + getTransformY(image) : getTransformY(image);
      const transformX = options.bounds ? minmax(distanceX, newLeft, -newLeft) : distanceX;
      const transformY = options.bounds ? minmax(distanceY, newTop, -newTop) : distanceY;
      const newData = {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      };
      setObject(data.imageData, newData);
      setStyle(image, Object.assign({}, newData, {
        transform: `translate(${transformX}px, ${transformY}px)`
      }));
      this.ratio = newRatio;

      if (options.slider) {
        const {
          slider
        } = options;
        const ratioPercentage = roundToTwo(1 - (slider.maxRatio - newRatio) / (slider.maxRatio - 1)) * 100;
        slider.value = ratioPercentage;
        this.slideTo(ratioPercentage);
      }

      if (options.zoomer.disableOnBounds) {
        const {
          zoomer,
          bounds,
          maxRatio
        } = options;
        const {
          zoomerInEl,
          zoomerOutEl
        } = zoomer;
        bounds && this.ratio === 1 ? zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerOutEl.classList.remove(CLASS_ZOOMER_DISABLE);
        this.ratio === maxRatio ? zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerInEl.classList.remove(CLASS_ZOOMER_DISABLE);
      }

      return this;
    },

    /**
     * zoomTo (zoom to a specific ratio)
     * zoomRatio - zoomin when pass a number more than 1, zoomout when pass a number less than 1
     * @param {Number} 
     */
    zoomTo(zoomRatio) {
      const {
        ratio
      } = this;

      if (zoomRatio !== ratio) {
        const calcRatio = zoomRatio / ratio - 1;
        this.zoom(calcRatio);
      }

      return this;
    },

    /**
     * slideTo (only work on the slider)
     * value - a numer between 0-100
     * @param {Number}
     */
    slideTo(value) {
      const {
        options
      } = this;
      if (!options.slider) return;
      const {
        slider
      } = options;
      const position = slider.direction === 'horizontal' ? 'left' : 'top';
      const distance = minmax(value, 0, 100);
      slider.sliderButton.style[position] = `${distance}%`;
      return this;
    }

  };

  var bindEvents = (zoomist => {
    const {
      element,
      wrapper,
      image,
      options,
      data
    } = zoomist;
    const {
      containerData,
      imageData,
      originImageData
    } = data; // set image size on window resize

    const resize = () => {
      const widthRatio = element.offsetWidth / containerData.width;
      const heightRatio = element.offsetHeight / containerData.height;
      const originImageWidth = originImageData.width * widthRatio;
      const originImageHeight = originImageData.height * heightRatio;
      const originImageLeft = originImageData.left * widthRatio;
      const originImageTop = originImageData.top * heightRatio;
      const imageWidth = imageData.width * widthRatio;
      const imageHeight = imageData.height * heightRatio;
      const imageLeft = imageData.left * widthRatio;
      const imageTop = imageData.top * heightRatio;
      const transformX = getTransformX(image) * widthRatio;
      const transformY = getTransformY(image) * heightRatio;
      setObject(containerData, {
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      setObject(originImageData, {
        width: originImageWidth,
        height: originImageHeight,
        left: originImageLeft,
        top: originImageTop
      });
      setObject(imageData, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop
      });
      setStyle(zoomist.image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop,
        transform: `translate(${transformX}px, ${transformY}px)`
      });
    };

    window.addEventListener(EVENT_RESIZE, resize); // set image drag event

    zoomist.dragging = false;
    zoomist.data.dragData = {
      startX: 0,
      startY: 0,
      transX: 0,
      transY: 0
    };
    if (options.fill === 'contain' && options.bounds) options.bounds = false;
    const {
      dragData
    } = data;

    const dragStart = e => {
      if (!options.draggable) return;
      if (e.which !== 1) return;
      setObject(dragData, {
        startX: getPointer(e).x,
        startY: getPointer(e).y,
        transX: getTransformX(image),
        transY: getTransformY(image)
      });
      zoomist.dragging = true;
      document.addEventListener(EVENT_TOUCH_MOVE, dragMove);
      document.addEventListener(EVENT_TOUCH_END, dragEnd);
    };

    const dragMove = e => {
      if (!zoomist.dragging) return;
      const pageX = getPointer(e).x;
      const pageY = getPointer(e).y;

      if (options.bounds) {
        const minPageX = dragData.startX - (dragData.transX - imageData.left);
        const maxPageX = dragData.startX - (dragData.transX + imageData.left);
        const minPageY = dragData.startY - (dragData.transY - imageData.top);
        const maxPageY = dragData.startY - (dragData.transY + imageData.top);
        if (pageX < minPageX) dragData.startX += pageX - minPageX;
        if (pageX > maxPageX) dragData.startX += pageX - maxPageX;
        if (pageY < minPageY) dragData.startY += pageY - minPageY;
        if (pageY > maxPageY) dragData.startY += pageY - maxPageY;
      }

      const transformX = pageX - dragData.startX + dragData.transX;
      const transformY = pageY - dragData.startY + dragData.transY;
      image.style.transform = `translate(${transformX}px, ${transformY}px)`;
    };

    const dragEnd = () => {
      zoomist.dragging = false;
      document.removeEventListener(EVENT_TOUCH_MOVE, dragMove);
      document.removeEventListener(EVENT_TOUCH_END, dragEnd);
    };

    wrapper.addEventListener(EVENT_TOUCH_START, dragStart); // set zomm on mousewheel event

    zoomist.wheeling = false;

    const wheel = e => {
      if (!options.wheelable) return;
      const {
        zoomRatio
      } = options;
      if (zoomist.wheeling) return; // prevent wheeling too fast

      zoomist.wheeling = true;
      setTimeout(() => {
        zoomist.wheeling = false;
      }, 30);
      let delta;
      if (e.deltaY) delta = e.deltaY > 0 ? -1 : 1;else if (e.wheelDelta) delta = e.wheelDelta / 120;else if (e.detail) delta = e.detail > 0 ? -1 : 1;
      zoomist.zoom(delta * zoomRatio, getPointer(e));
    };

    element.addEventListener(EVENT_WHEEL, wheel);
  }); // slider events

  const sliderEvents = zoomist => {
    const {
      slider
    } = zoomist.options; // events

    slider.sliding = false;
    const isHorizontal = slider.direction === 'horizontal';

    const slideHandler = e => {
      const rect = slider.sliderMain.getBoundingClientRect();
      const mousePoint = isHorizontal ? getPointer(e).clientX : getPointer(e).clientY;
      const sliderTotal = isHorizontal ? rect.width : rect.height;
      const sliderStart = isHorizontal ? rect.left : rect.top;
      const percentage = minmax(roundToTwo((mousePoint - sliderStart) / sliderTotal), 0, 1);
      const minRatio = zoomist.ratio < 1 ? zoomist.ratio : 1;
      const maxRatio = zoomist.ratio > slider.maxRatio ? zoomist.ratio : slider.maxRatio;
      const ratio = (maxRatio - minRatio) * percentage + minRatio;
      zoomist.zoomTo(ratio);
    };

    const slideStart = e => {
      slideHandler(e);
      slider.sliding = true;
      document.addEventListener(EVENT_TOUCH_MOVE, slideMove);
      document.addEventListener(EVENT_TOUCH_END, slideEnd);
    };

    const slideMove = e => {
      if (!slider.sliding) return;
      slideHandler(e);
    };

    const slideEnd = e => {
      slider.sliding = false;
      document.removeEventListener(EVENT_TOUCH_MOVE, slideMove);
      document.removeEventListener(EVENT_TOUCH_END, slideEnd);
    };

    slider.sliderMain.addEventListener(EVENT_TOUCH_START, slideStart);
  }; // zoomer events

  const zoomerEvents = zoomist => {
    const {
      options
    } = zoomist;
    const {
      zoomer,
      zoomRatio,
      bounds,
      maxRatio
    } = options;
    zoomer.zoomerInEl.addEventListener('click', () => {
      zoomist.zoom(zoomRatio);
    });
    zoomer.zoomerOutEl.addEventListener('click', () => {
      zoomist.zoom(-zoomRatio);
    });
  };

  const sliderTemp = `
  <div class="${CLASS_SLIDER_MAIN}">
    <span class="${CLASS_SLIDER_BAR}"></span>
    <span class="${CLASS_SLIDER_BUTTON}"></span>
  </div>
`;

  var MODULES = {
    createModules() {
      const {
        options
      } = this;
      MODULES$1.forEach(module => {
        if (options[module]) this[`create${upperFirstLetter(module)}`]();
      });
    },

    createSlider() {
      const {
        element,
        options
      } = this;
      options.slider = Object.assign(DEFAULT_SLIDER_OPTIONS, options.slider);
      const {
        slider
      } = options;
      if (options.maxRatio) Object.assign(options.slider, {
        maxRatio: options.maxRatio
      });
      if (slider.direction !== 'horizontal' && slider.direction !== 'vertical') slider.direction = 'horizontal';
      slider.value = 0; // mount

      if (slider.mounted) slider.sliderMain.remove();
      const isCustomEl = slider.el && isElementExist(slider.el);
      const sliderEl = isCustomEl ? getElement(slider.el) : document.createElement('div');
      if (!isCustomEl) sliderEl.classList.add(CLASS_SLIDER);
      sliderEl.innerHTML = sliderTemp;
      slider.sliderEl = sliderEl;
      slider.sliderMain = sliderEl.querySelector(`.${CLASS_SLIDER_MAIN}`);
      slider.sliderBar = sliderEl.querySelector(`.${CLASS_SLIDER_BAR}`);
      slider.sliderButton = sliderEl.querySelector(`.${CLASS_SLIDER_BUTTON}`);
      slider.sliderMain.classList.add(`${CLASS_SLIDER}-${slider.direction}`); // events

      sliderEvents(this);
      slider.mounted = true; // render

      if (!isCustomEl) element.append(sliderEl);
    },

    createZoomer() {
      const {
        element,
        options
      } = this;
      options.zoomer = Object.assign(DEFAULT_ZOOMER_OPTIONS, options.zoomer);
      const {
        zoomer
      } = options; // mount

      if (zoomer.mounted && zoomer.zoomerEl) zoomer.sliderMain.remove();
      const isCustomInEl = zoomer.inEl && isElementExist(zoomer.inEl);
      const isCustomOutEl = zoomer.outEl && isElementExist(zoomer.outEl);
      const zoomerInEl = isCustomInEl ? getElement(zoomer.inEl) : document.createElement('div');
      const zoomerOutEl = isCustomOutEl ? getElement(zoomer.outEl) : document.createElement('div');
      if (!isCustomInEl) zoomerInEl.classList.add(CLASS_ZOOMER_IN);
      if (!isCustomOutEl) zoomerOutEl.classList.add(CLASS_ZOOMER_OUT);
      zoomer.zoomerInEl = zoomerInEl;
      zoomer.zoomerOutEl = zoomerOutEl;

      if (zoomer.disableOnBounds) {
        const {
          bounds,
          maxRatio
        } = options;
        if (bounds && this.ratio === 1) zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE);
        if (this.ratio === maxRatio) zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE);
      } // events


      zoomerEvents(this);
      zoomer.mounted = true; // render

      if (!isCustomInEl || !isCustomOutEl) {
        const zoomerEl = document.createElement('div');
        zoomerEl.classList.add(CLASS_ZOOMER);
        if (!isCustomInEl) zoomerEl.append(zoomerInEl);
        if (!isCustomOutEl) zoomerEl.append(zoomerOutEl);
        zoomer.zoomerEl = zoomerEl;
        element.append(zoomerEl);
      }
    }

  };

  class Zoomist {
    /**
     * 
     * @param {Element} element - target element 
     * @param {Object} options - the configuration options
     */
    constructor(element, options = {}) {
      if (!element) throw new Error('The first argument is required.');
      if (!isElementExist(element)) throw new Error('This element is not exist.');
      this.element = getElement(element);
      this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options);
      this.init();
    }

    init() {
      const {
        element,
        options
      } = this;
      if (element[NAME]) return;
      element[NAME] = this;
      const src = options.src = isString(options.src) ? options.src : DEFAULT_OPTIONS.src;
      const url = element.getAttribute(src);
      element.removeAttribute(src);
      this.create(url);
    }

    create(url) {
      if (!url) return;
      const {
        element
      } = this;
      const {
        offsetWidth,
        offsetHeight
      } = element;
      this.url = url;
      this.data = {};
      this.data.containerData = {
        width: offsetWidth,
        height: offsetHeight,
        aspectRatio: offsetWidth / offsetHeight
      };
      this.ratio = 1;
      this.mount();
    }

    mount() {
      if (this.mounted) return;
      const {
        options,
        data,
        url
      } = this;
      const {
        containerData
      } = data;
      const {
        fill,
        maxRatio
      } = options;
      if (this.wrapper) this.wrapper.remove();
      const wrapper = document.createElement('div');
      wrapper.classList.add(CLASS_WRAPPER);
      const image = document.createElement('img');
      image.classList.add(CLASS_IMAGE);
      image.src = url;

      image.onload = () => {
        this.wrapper = wrapper;
        this.image = image;
        const {
          naturalWidth,
          naturalHeight
        } = image;
        const imageRatio = naturalWidth / naturalHeight; // get base on width or height

        let baseSide;
        if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover';
        if (options.fill !== 'contain') baseSide = containerData.aspectRatio === imageRatio ? 'both' : containerData.aspectRatio > imageRatio ? 'width' : 'height';
        if (options.fill === 'contain') baseSide = containerData.aspectRatio === imageRatio ? 'both' : containerData.aspectRatio > imageRatio ? 'height' : 'width'; // calculate the image width, height, left, top

        const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? containerData.width : containerData.height * imageRatio;
        const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? containerData.height : containerData.width / imageRatio;
        const imageLeft = (containerData.width - imageWidth) / 2;
        const imageTop = (containerData.height - imageHeight) / 2;
        this.data.originImageData = {
          naturalWidth,
          naturalHeight,
          aspectRatio: imageRatio,
          width: imageWidth,
          height: imageHeight,
          left: imageLeft,
          top: imageTop
        };
        this.data.imageData = Object.assign({}, this.data.originImageData);
        setStyle(image, {
          width: imageWidth,
          height: imageHeight,
          left: imageLeft,
          top: imageTop
        }); // if has maxRatio

        if ((!isNumber(maxRatio) || maxRatio <= 1) && maxRatio !== false) options.maxRatio = false;
        bindEvents(this);
        this.mounted = true;
        this.render();
      };
    }

    render() {
      const {
        element,
        wrapper,
        image,
        options
      } = this;
      element.classList.add(CLASS_CONTAINER);
      wrapper.append(image);
      element.append(wrapper);
      this.createModules();
    }

  }

  Object.assign(Zoomist.prototype, METHODS, MODULES);

  return Zoomist;

}));
