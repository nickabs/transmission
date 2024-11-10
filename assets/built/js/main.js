var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/photoswipe/dist/photoswipe.esm.js
var photoswipe_esm_exports = {};
__export(photoswipe_esm_exports, {
  default: () => PhotoSwipe
});
function createElement2(className, tagName, appendToEl) {
  const el = document.createElement(tagName);
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  return el;
}
function equalizePoints(p1, p2) {
  p1.x = p2.x;
  p1.y = p2.y;
  if (p2.id !== void 0) {
    p1.id = p2.id;
  }
  return p1;
}
function roundPoint(p) {
  p.x = Math.round(p.x);
  p.y = Math.round(p.y);
}
function getDistanceBetween(p1, p2) {
  const x = Math.abs(p1.x - p2.x);
  const y = Math.abs(p1.y - p2.y);
  return Math.sqrt(x * x + y * y);
}
function pointsEqual(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function toTransformString2(x, y, scale) {
  let propValue = `translate3d(${x}px,${y || 0}px,0)`;
  if (scale !== void 0) {
    propValue += ` scale3d(${scale},${scale},1)`;
  }
  return propValue;
}
function setTransform(el, x, y, scale) {
  el.style.transform = toTransformString2(x, y, scale);
}
function setTransitionStyle(el, prop, duration, ease) {
  el.style.transition = prop ? `${prop} ${duration}ms ${ease || defaultCSSEasing}` : "none";
}
function setWidthHeight2(el, w, h) {
  el.style.width = typeof w === "number" ? `${w}px` : w;
  el.style.height = typeof h === "number" ? `${h}px` : h;
}
function removeTransitionStyle(el) {
  setTransitionStyle(el);
}
function decodeImage(img) {
  if ("decode" in img) {
    return img.decode().catch(() => {
    });
  }
  if (img.complete) {
    return Promise.resolve(img);
  }
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
function specialKeyUsed2(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function getElementsFromOption2(option, legacySelector, parent = document) {
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === "string" ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}
function isSafari2() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
function getViewportSize2(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function parsePaddingOption2(prop, options, viewportSize, itemData, index) {
  let paddingValue = 0;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
    if (options[legacyPropName]) {
      paddingValue = options[legacyPropName];
    }
  }
  return Number(paddingValue) || 0;
}
function getPanAreaSize2(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption2("left", options, viewportSize, itemData, index) - parsePaddingOption2("right", options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption2("top", options, viewportSize, itemData, index) - parsePaddingOption2("bottom", options, viewportSize, itemData, index)
  };
}
function project(initialVelocity, decelerationRate) {
  return initialVelocity * decelerationRate / (1 - decelerationRate);
}
function getZoomPointsCenter(p, p1, p2) {
  p.x = (p1.x + p2.x) / 2;
  p.y = (p1.y + p2.y) / 2;
  return p;
}
function didTapOnMainContent(event) {
  return !!/** @type {HTMLElement} */
  event.target.closest(".pswp__container");
}
function addElementHTML(htmlData) {
  if (typeof htmlData === "string") {
    return htmlData;
  }
  if (!htmlData || !htmlData.isCustomSVG) {
    return "";
  }
  const svgData = htmlData;
  let out = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
  out = out.split("%d").join(
    /** @type {string} */
    svgData.size || 32
  );
  if (svgData.outlineID) {
    out += '<use class="pswp__icn-shadow" xlink:href="#' + svgData.outlineID + '"/>';
  }
  out += svgData.inner;
  out += "</svg>";
  return out;
}
function initArrowButton(element, pswp, isNextButton) {
  element.classList.add("pswp__button--arrow");
  element.setAttribute("aria-controls", "pswp__items");
  pswp.on("change", () => {
    if (!pswp.options.loop) {
      if (isNextButton) {
        element.disabled = !(pswp.currIndex < pswp.getNumItems() - 1);
      } else {
        element.disabled = !(pswp.currIndex > 0);
      }
    }
  });
}
function setZoomedIn(el, isZoomedIn) {
  el.classList.toggle("pswp--zoomed-in", isZoomedIn);
}
function getBoundsByElement(el) {
  const thumbAreaRect = el.getBoundingClientRect();
  return {
    x: thumbAreaRect.left,
    y: thumbAreaRect.top,
    w: thumbAreaRect.width
  };
}
function getCroppedBoundsByElement(el, imageWidth, imageHeight) {
  const thumbAreaRect = el.getBoundingClientRect();
  const hRatio = thumbAreaRect.width / imageWidth;
  const vRatio = thumbAreaRect.height / imageHeight;
  const fillZoomLevel = hRatio > vRatio ? hRatio : vRatio;
  const offsetX = (thumbAreaRect.width - imageWidth * fillZoomLevel) / 2;
  const offsetY = (thumbAreaRect.height - imageHeight * fillZoomLevel) / 2;
  const bounds = {
    x: thumbAreaRect.left + offsetX,
    y: thumbAreaRect.top + offsetY,
    w: imageWidth * fillZoomLevel
  };
  bounds.innerRect = {
    w: thumbAreaRect.width,
    h: thumbAreaRect.height,
    x: offsetX,
    y: offsetY
  };
  return bounds;
}
function getThumbBounds(index, itemData, instance) {
  const event = instance.dispatch("thumbBounds", {
    index,
    itemData,
    instance
  });
  if (event.thumbBounds) {
    return event.thumbBounds;
  }
  const {
    element
  } = itemData;
  let thumbBounds;
  let thumbnail;
  if (element && instance.options.thumbSelector !== false) {
    const thumbSelector = instance.options.thumbSelector || "img";
    thumbnail = element.matches(thumbSelector) ? element : (
      /** @type {HTMLElement | null} */
      element.querySelector(thumbSelector)
    );
  }
  thumbnail = instance.applyFilters("thumbEl", thumbnail, itemData, index);
  if (thumbnail) {
    if (!itemData.thumbCropped) {
      thumbBounds = getBoundsByElement(thumbnail);
    } else {
      thumbBounds = getCroppedBoundsByElement(thumbnail, itemData.width || itemData.w || 0, itemData.height || itemData.h || 0);
    }
  }
  return instance.applyFilters("thumbBounds", thumbBounds, itemData, index);
}
function lazyLoadData2(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  let zoomLevel;
  const {
    options
  } = instance;
  if (options) {
    zoomLevel = new ZoomLevel2(options, itemData, -1);
    let viewportSize;
    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize2(options, instance);
    }
    const panAreaSize = getPanAreaSize2(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }
  content.lazyLoad();
  if (zoomLevel) {
    content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
  }
  return content;
}
function lazyLoadSlide2(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch("lazyLoadSlide", {
    index,
    itemData
  }).defaultPrevented) {
    return;
  }
  return lazyLoadData2(itemData, instance, index);
}
var defaultCSSEasing, LOAD_STATE2, supportsPassive, DOMEvents, PanBounds, MAX_IMAGE_WIDTH2, ZoomLevel2, Slide, PAN_END_FRICTION, VERTICAL_DRAG_FRICTION, MIN_RATIO_TO_CLOSE, MIN_NEXT_SLIDE_SPEED, DragHandler, UPPER_ZOOM_FRICTION, LOWER_ZOOM_FRICTION, ZoomHandler, TapHandler, AXIS_SWIPE_HYSTERISIS, DOUBLE_TAP_DELAY, MIN_TAP_DISTANCE, Gestures, MAIN_SCROLL_END_FRICTION, MainScroll, KeyboardKeyCodesMap, getKeyboardEventKey, Keyboard, DEFAULT_EASING, CSSAnimation, DEFAULT_NATURAL_FREQUENCY, DEFAULT_DAMPING_RATIO, SpringEaser, SpringAnimation, Animations, ScrollWheel, UIElement, arrowPrev, arrowNext, closeButton, zoomButton, loadingIndicator, counterIndicator, UI, PhotoSwipeEvent2, Eventable2, Placeholder2, Content2, MIN_SLIDES_TO_CACHE, ContentLoader, PhotoSwipeBase2, MIN_OPACITY, Opener, defaultOptions, PhotoSwipe;
var init_photoswipe_esm = __esm({
  "node_modules/photoswipe/dist/photoswipe.esm.js"() {
    defaultCSSEasing = "cubic-bezier(.4,0,.22,1)";
    LOAD_STATE2 = {
      IDLE: "idle",
      LOADING: "loading",
      LOADED: "loaded",
      ERROR: "error"
    };
    supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: () => {
          supportsPassive = true;
        }
      }));
    } catch (e) {
    }
    DOMEvents = class {
      constructor() {
        this._pool = [];
      }
      /**
       * Adds event listeners
       *
       * @param {PoolItem['target']} target
       * @param {PoolItem['type']} type Can be multiple, separated by space.
       * @param {PoolItem['listener']} listener
       * @param {PoolItem['passive']} [passive]
       */
      add(target, type, listener, passive) {
        this._toggleListener(target, type, listener, passive);
      }
      /**
       * Removes event listeners
       *
       * @param {PoolItem['target']} target
       * @param {PoolItem['type']} type
       * @param {PoolItem['listener']} listener
       * @param {PoolItem['passive']} [passive]
       */
      remove(target, type, listener, passive) {
        this._toggleListener(target, type, listener, passive, true);
      }
      /**
       * Removes all bound events
       */
      removeAll() {
        this._pool.forEach((poolItem) => {
          this._toggleListener(poolItem.target, poolItem.type, poolItem.listener, poolItem.passive, true, true);
        });
        this._pool = [];
      }
      /**
       * Adds or removes event
       *
       * @private
       * @param {PoolItem['target']} target
       * @param {PoolItem['type']} type
       * @param {PoolItem['listener']} listener
       * @param {PoolItem['passive']} [passive]
       * @param {boolean} [unbind] Whether the event should be added or removed
       * @param {boolean} [skipPool] Whether events pool should be skipped
       */
      _toggleListener(target, type, listener, passive, unbind, skipPool) {
        if (!target) {
          return;
        }
        const methodName = unbind ? "removeEventListener" : "addEventListener";
        const types = type.split(" ");
        types.forEach((eType) => {
          if (eType) {
            if (!skipPool) {
              if (unbind) {
                this._pool = this._pool.filter((poolItem) => {
                  return poolItem.type !== eType || poolItem.listener !== listener || poolItem.target !== target;
                });
              } else {
                this._pool.push({
                  target,
                  type: eType,
                  listener,
                  passive
                });
              }
            }
            const eventOptions = supportsPassive ? {
              passive: passive || false
            } : false;
            target[methodName](eType, listener, eventOptions);
          }
        });
      }
    };
    PanBounds = class {
      /**
       * @param {Slide} slide
       */
      constructor(slide) {
        this.slide = slide;
        this.currZoomLevel = 1;
        this.center = /** @type {Point} */
        {
          x: 0,
          y: 0
        };
        this.max = /** @type {Point} */
        {
          x: 0,
          y: 0
        };
        this.min = /** @type {Point} */
        {
          x: 0,
          y: 0
        };
      }
      /**
       * _getItemBounds
       *
       * @param {number} currZoomLevel
       */
      update(currZoomLevel) {
        this.currZoomLevel = currZoomLevel;
        if (!this.slide.width) {
          this.reset();
        } else {
          this._updateAxis("x");
          this._updateAxis("y");
          this.slide.pswp.dispatch("calcBounds", {
            slide: this.slide
          });
        }
      }
      /**
       * _calculateItemBoundsForAxis
       *
       * @param {Axis} axis
       */
      _updateAxis(axis) {
        const {
          pswp
        } = this.slide;
        const elSize = this.slide[axis === "x" ? "width" : "height"] * this.currZoomLevel;
        const paddingProp = axis === "x" ? "left" : "top";
        const padding = parsePaddingOption2(paddingProp, pswp.options, pswp.viewportSize, this.slide.data, this.slide.index);
        const panAreaSize = this.slide.panAreaSize[axis];
        this.center[axis] = Math.round((panAreaSize - elSize) / 2) + padding;
        this.max[axis] = elSize > panAreaSize ? Math.round(panAreaSize - elSize) + padding : this.center[axis];
        this.min[axis] = elSize > panAreaSize ? padding : this.center[axis];
      }
      // _getZeroBounds
      reset() {
        this.center.x = 0;
        this.center.y = 0;
        this.max.x = 0;
        this.max.y = 0;
        this.min.x = 0;
        this.min.y = 0;
      }
      /**
       * Correct pan position if it's beyond the bounds
       *
       * @param {Axis} axis x or y
       * @param {number} panOffset
       * @returns {number}
       */
      correctPan(axis, panOffset) {
        return clamp(panOffset, this.max[axis], this.min[axis]);
      }
    };
    MAX_IMAGE_WIDTH2 = 4e3;
    ZoomLevel2 = class {
      /**
       * @param {PhotoSwipeOptions} options PhotoSwipe options
       * @param {SlideData} itemData Slide data
       * @param {number} index Slide index
       * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
       */
      constructor(options, itemData, index, pswp) {
        this.pswp = pswp;
        this.options = options;
        this.itemData = itemData;
        this.index = index;
        this.panAreaSize = null;
        this.elementSize = null;
        this.fit = 1;
        this.fill = 1;
        this.vFill = 1;
        this.initial = 1;
        this.secondary = 1;
        this.max = 1;
        this.min = 1;
      }
      /**
       * Calculate initial, secondary and maximum zoom level for the specified slide.
       *
       * It should be called when either image or viewport size changes.
       *
       * @param {number} maxWidth
       * @param {number} maxHeight
       * @param {Point} panAreaSize
       */
      update(maxWidth, maxHeight, panAreaSize) {
        const elementSize = {
          x: maxWidth,
          y: maxHeight
        };
        this.elementSize = elementSize;
        this.panAreaSize = panAreaSize;
        const hRatio = panAreaSize.x / elementSize.x;
        const vRatio = panAreaSize.y / elementSize.y;
        this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
        this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
        this.vFill = Math.min(1, vRatio);
        this.initial = this._getInitial();
        this.secondary = this._getSecondary();
        this.max = Math.max(this.initial, this.secondary, this._getMax());
        this.min = Math.min(this.fit, this.initial, this.secondary);
        if (this.pswp) {
          this.pswp.dispatch("zoomLevelsUpdate", {
            zoomLevels: this,
            slideData: this.itemData
          });
        }
      }
      /**
       * Parses user-defined zoom option.
       *
       * @private
       * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
       * @returns { number | undefined }
       */
      _parseZoomLevelOption(optionPrefix) {
        const optionName = (
          /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
          optionPrefix + "ZoomLevel"
        );
        const optionValue = this.options[optionName];
        if (!optionValue) {
          return;
        }
        if (typeof optionValue === "function") {
          return optionValue(this);
        }
        if (optionValue === "fill") {
          return this.fill;
        }
        if (optionValue === "fit") {
          return this.fit;
        }
        return Number(optionValue);
      }
      /**
       * Get zoom level to which image will be zoomed after double-tap gesture,
       * or when user clicks on zoom icon,
       * or mouse-click on image itself.
       * If you return 1 image will be zoomed to its original size.
       *
       * @private
       * @return {number}
       */
      _getSecondary() {
        let currZoomLevel = this._parseZoomLevelOption("secondary");
        if (currZoomLevel) {
          return currZoomLevel;
        }
        currZoomLevel = Math.min(1, this.fit * 3);
        if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH2) {
          currZoomLevel = MAX_IMAGE_WIDTH2 / this.elementSize.x;
        }
        return currZoomLevel;
      }
      /**
       * Get initial image zoom level.
       *
       * @private
       * @return {number}
       */
      _getInitial() {
        return this._parseZoomLevelOption("initial") || this.fit;
      }
      /**
       * Maximum zoom level when user zooms
       * via zoom/pinch gesture,
       * via cmd/ctrl-wheel or via trackpad.
       *
       * @private
       * @return {number}
       */
      _getMax() {
        return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
      }
    };
    Slide = class {
      /**
       * @param {SlideData} data
       * @param {number} index
       * @param {PhotoSwipe} pswp
       */
      constructor(data, index, pswp) {
        this.data = data;
        this.index = index;
        this.pswp = pswp;
        this.isActive = index === pswp.currIndex;
        this.currentResolution = 0;
        this.panAreaSize = {
          x: 0,
          y: 0
        };
        this.pan = {
          x: 0,
          y: 0
        };
        this.isFirstSlide = this.isActive && !pswp.opener.isOpen;
        this.zoomLevels = new ZoomLevel2(pswp.options, data, index, pswp);
        this.pswp.dispatch("gettingData", {
          slide: this,
          data: this.data,
          index
        });
        this.content = this.pswp.contentLoader.getContentBySlide(this);
        this.container = createElement2("pswp__zoom-wrap", "div");
        this.holderElement = null;
        this.currZoomLevel = 1;
        this.width = this.content.width;
        this.height = this.content.height;
        this.heavyAppended = false;
        this.bounds = new PanBounds(this);
        this.prevDisplayedWidth = -1;
        this.prevDisplayedHeight = -1;
        this.pswp.dispatch("slideInit", {
          slide: this
        });
      }
      /**
       * If this slide is active/current/visible
       *
       * @param {boolean} isActive
       */
      setIsActive(isActive) {
        if (isActive && !this.isActive) {
          this.activate();
        } else if (!isActive && this.isActive) {
          this.deactivate();
        }
      }
      /**
       * Appends slide content to DOM
       *
       * @param {HTMLElement} holderElement
       */
      append(holderElement) {
        this.holderElement = holderElement;
        this.container.style.transformOrigin = "0 0";
        if (!this.data) {
          return;
        }
        this.calculateSize();
        this.load();
        this.updateContentSize();
        this.appendHeavy();
        this.holderElement.appendChild(this.container);
        this.zoomAndPanToInitial();
        this.pswp.dispatch("firstZoomPan", {
          slide: this
        });
        this.applyCurrentZoomPan();
        this.pswp.dispatch("afterSetContent", {
          slide: this
        });
        if (this.isActive) {
          this.activate();
        }
      }
      load() {
        this.content.load(false);
        this.pswp.dispatch("slideLoad", {
          slide: this
        });
      }
      /**
       * Append "heavy" DOM elements
       *
       * This may depend on a type of slide,
       * but generally these are large images.
       */
      appendHeavy() {
        const {
          pswp
        } = this;
        const appendHeavyNearby = true;
        if (this.heavyAppended || !pswp.opener.isOpen || pswp.mainScroll.isShifted() || !this.isActive && !appendHeavyNearby) {
          return;
        }
        if (this.pswp.dispatch("appendHeavy", {
          slide: this
        }).defaultPrevented) {
          return;
        }
        this.heavyAppended = true;
        this.content.append();
        this.pswp.dispatch("appendHeavyContent", {
          slide: this
        });
      }
      /**
       * Triggered when this slide is active (selected).
       *
       * If it's part of opening/closing transition -
       * activate() will trigger after the transition is ended.
       */
      activate() {
        this.isActive = true;
        this.appendHeavy();
        this.content.activate();
        this.pswp.dispatch("slideActivate", {
          slide: this
        });
      }
      /**
       * Triggered when this slide becomes inactive.
       *
       * Slide can become inactive only after it was active.
       */
      deactivate() {
        this.isActive = false;
        this.content.deactivate();
        if (this.currZoomLevel !== this.zoomLevels.initial) {
          this.calculateSize();
        }
        this.currentResolution = 0;
        this.zoomAndPanToInitial();
        this.applyCurrentZoomPan();
        this.updateContentSize();
        this.pswp.dispatch("slideDeactivate", {
          slide: this
        });
      }
      /**
       * The slide should destroy itself, it will never be used again.
       * (unbind all events and destroy internal components)
       */
      destroy() {
        this.content.hasSlide = false;
        this.content.remove();
        this.container.remove();
        this.pswp.dispatch("slideDestroy", {
          slide: this
        });
      }
      resize() {
        if (this.currZoomLevel === this.zoomLevels.initial || !this.isActive) {
          this.calculateSize();
          this.currentResolution = 0;
          this.zoomAndPanToInitial();
          this.applyCurrentZoomPan();
          this.updateContentSize();
        } else {
          this.calculateSize();
          this.bounds.update(this.currZoomLevel);
          this.panTo(this.pan.x, this.pan.y);
        }
      }
      /**
       * Apply size to current slide content,
       * based on the current resolution and scale.
       *
       * @param {boolean} [force] if size should be updated even if dimensions weren't changed
       */
      updateContentSize(force) {
        const scaleMultiplier = this.currentResolution || this.zoomLevels.initial;
        if (!scaleMultiplier) {
          return;
        }
        const width = Math.round(this.width * scaleMultiplier) || this.pswp.viewportSize.x;
        const height = Math.round(this.height * scaleMultiplier) || this.pswp.viewportSize.y;
        if (!this.sizeChanged(width, height) && !force) {
          return;
        }
        this.content.setDisplayedSize(width, height);
      }
      /**
       * @param {number} width
       * @param {number} height
       */
      sizeChanged(width, height) {
        if (width !== this.prevDisplayedWidth || height !== this.prevDisplayedHeight) {
          this.prevDisplayedWidth = width;
          this.prevDisplayedHeight = height;
          return true;
        }
        return false;
      }
      /** @returns {HTMLImageElement | HTMLDivElement | null | undefined} */
      getPlaceholderElement() {
        var _this$content$placeho;
        return (_this$content$placeho = this.content.placeholder) === null || _this$content$placeho === void 0 ? void 0 : _this$content$placeho.element;
      }
      /**
       * Zoom current slide image to...
       *
       * @param {number} destZoomLevel Destination zoom level.
       * @param {Point} [centerPoint]
       * Transform origin center point, or false if viewport center should be used.
       * @param {number | false} [transitionDuration] Transition duration, may be set to 0.
       * @param {boolean} [ignoreBounds] Minimum and maximum zoom levels will be ignored.
       */
      zoomTo(destZoomLevel, centerPoint, transitionDuration, ignoreBounds) {
        const {
          pswp
        } = this;
        if (!this.isZoomable() || pswp.mainScroll.isShifted()) {
          return;
        }
        pswp.dispatch("beforeZoomTo", {
          destZoomLevel,
          centerPoint,
          transitionDuration
        });
        pswp.animations.stopAllPan();
        const prevZoomLevel = this.currZoomLevel;
        if (!ignoreBounds) {
          destZoomLevel = clamp(destZoomLevel, this.zoomLevels.min, this.zoomLevels.max);
        }
        this.setZoomLevel(destZoomLevel);
        this.pan.x = this.calculateZoomToPanOffset("x", centerPoint, prevZoomLevel);
        this.pan.y = this.calculateZoomToPanOffset("y", centerPoint, prevZoomLevel);
        roundPoint(this.pan);
        const finishTransition = () => {
          this._setResolution(destZoomLevel);
          this.applyCurrentZoomPan();
        };
        if (!transitionDuration) {
          finishTransition();
        } else {
          pswp.animations.startTransition({
            isPan: true,
            name: "zoomTo",
            target: this.container,
            transform: this.getCurrentTransform(),
            onComplete: finishTransition,
            duration: transitionDuration,
            easing: pswp.options.easing
          });
        }
      }
      /**
       * @param {Point} [centerPoint]
       */
      toggleZoom(centerPoint) {
        this.zoomTo(this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial, centerPoint, this.pswp.options.zoomAnimationDuration);
      }
      /**
       * Updates zoom level property and recalculates new pan bounds,
       * unlike zoomTo it does not apply transform (use applyCurrentZoomPan)
       *
       * @param {number} currZoomLevel
       */
      setZoomLevel(currZoomLevel) {
        this.currZoomLevel = currZoomLevel;
        this.bounds.update(this.currZoomLevel);
      }
      /**
       * Get pan position after zoom at a given `point`.
       *
       * Always call setZoomLevel(newZoomLevel) beforehand to recalculate
       * pan bounds according to the new zoom level.
       *
       * @param {'x' | 'y'} axis
       * @param {Point} [point]
       * point based on which zoom is performed, usually refers to the current mouse position,
       * if false - viewport center will be used.
       * @param {number} [prevZoomLevel] Zoom level before new zoom was applied.
       * @returns {number}
       */
      calculateZoomToPanOffset(axis, point, prevZoomLevel) {
        const totalPanDistance = this.bounds.max[axis] - this.bounds.min[axis];
        if (totalPanDistance === 0) {
          return this.bounds.center[axis];
        }
        if (!point) {
          point = this.pswp.getViewportCenterPoint();
        }
        if (!prevZoomLevel) {
          prevZoomLevel = this.zoomLevels.initial;
        }
        const zoomFactor = this.currZoomLevel / prevZoomLevel;
        return this.bounds.correctPan(axis, (this.pan[axis] - point[axis]) * zoomFactor + point[axis]);
      }
      /**
       * Apply pan and keep it within bounds.
       *
       * @param {number} panX
       * @param {number} panY
       */
      panTo(panX, panY) {
        this.pan.x = this.bounds.correctPan("x", panX);
        this.pan.y = this.bounds.correctPan("y", panY);
        this.applyCurrentZoomPan();
      }
      /**
       * If the slide in the current state can be panned by the user
       * @returns {boolean}
       */
      isPannable() {
        return Boolean(this.width) && this.currZoomLevel > this.zoomLevels.fit;
      }
      /**
       * If the slide can be zoomed
       * @returns {boolean}
       */
      isZoomable() {
        return Boolean(this.width) && this.content.isZoomable();
      }
      /**
       * Apply transform and scale based on
       * the current pan position (this.pan) and zoom level (this.currZoomLevel)
       */
      applyCurrentZoomPan() {
        this._applyZoomTransform(this.pan.x, this.pan.y, this.currZoomLevel);
        if (this === this.pswp.currSlide) {
          this.pswp.dispatch("zoomPanUpdate", {
            slide: this
          });
        }
      }
      zoomAndPanToInitial() {
        this.currZoomLevel = this.zoomLevels.initial;
        this.bounds.update(this.currZoomLevel);
        equalizePoints(this.pan, this.bounds.center);
        this.pswp.dispatch("initialZoomPan", {
          slide: this
        });
      }
      /**
       * Set translate and scale based on current resolution
       *
       * @param {number} x
       * @param {number} y
       * @param {number} zoom
       * @private
       */
      _applyZoomTransform(x, y, zoom) {
        zoom /= this.currentResolution || this.zoomLevels.initial;
        setTransform(this.container, x, y, zoom);
      }
      calculateSize() {
        const {
          pswp
        } = this;
        equalizePoints(this.panAreaSize, getPanAreaSize2(pswp.options, pswp.viewportSize, this.data, this.index));
        this.zoomLevels.update(this.width, this.height, this.panAreaSize);
        pswp.dispatch("calcSlideSize", {
          slide: this
        });
      }
      /** @returns {string} */
      getCurrentTransform() {
        const scale = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
        return toTransformString2(this.pan.x, this.pan.y, scale);
      }
      /**
       * Set resolution and re-render the image.
       *
       * For example, if the real image size is 2000x1500,
       * and resolution is 0.5 - it will be rendered as 1000x750.
       *
       * Image with zoom level 2 and resolution 0.5 is
       * the same as image with zoom level 1 and resolution 1.
       *
       * Used to optimize animations and make
       * sure that browser renders image in the highest quality.
       * Also used by responsive images to load the correct one.
       *
       * @param {number} newResolution
       */
      _setResolution(newResolution) {
        if (newResolution === this.currentResolution) {
          return;
        }
        this.currentResolution = newResolution;
        this.updateContentSize();
        this.pswp.dispatch("resolutionChanged");
      }
    };
    PAN_END_FRICTION = 0.35;
    VERTICAL_DRAG_FRICTION = 0.6;
    MIN_RATIO_TO_CLOSE = 0.4;
    MIN_NEXT_SLIDE_SPEED = 0.5;
    DragHandler = class {
      /**
       * @param {Gestures} gestures
       */
      constructor(gestures) {
        this.gestures = gestures;
        this.pswp = gestures.pswp;
        this.startPan = {
          x: 0,
          y: 0
        };
      }
      start() {
        if (this.pswp.currSlide) {
          equalizePoints(this.startPan, this.pswp.currSlide.pan);
        }
        this.pswp.animations.stopAll();
      }
      change() {
        const {
          p1,
          prevP1,
          dragAxis
        } = this.gestures;
        const {
          currSlide
        } = this.pswp;
        if (dragAxis === "y" && this.pswp.options.closeOnVerticalDrag && currSlide && currSlide.currZoomLevel <= currSlide.zoomLevels.fit && !this.gestures.isMultitouch) {
          const panY = currSlide.pan.y + (p1.y - prevP1.y);
          if (!this.pswp.dispatch("verticalDrag", {
            panY
          }).defaultPrevented) {
            this._setPanWithFriction("y", panY, VERTICAL_DRAG_FRICTION);
            const bgOpacity = 1 - Math.abs(this._getVerticalDragRatio(currSlide.pan.y));
            this.pswp.applyBgOpacity(bgOpacity);
            currSlide.applyCurrentZoomPan();
          }
        } else {
          const mainScrollChanged = this._panOrMoveMainScroll("x");
          if (!mainScrollChanged) {
            this._panOrMoveMainScroll("y");
            if (currSlide) {
              roundPoint(currSlide.pan);
              currSlide.applyCurrentZoomPan();
            }
          }
        }
      }
      end() {
        const {
          velocity
        } = this.gestures;
        const {
          mainScroll,
          currSlide
        } = this.pswp;
        let indexDiff = 0;
        this.pswp.animations.stopAll();
        if (mainScroll.isShifted()) {
          const mainScrollShiftDiff = mainScroll.x - mainScroll.getCurrSlideX();
          const currentSlideVisibilityRatio = mainScrollShiftDiff / this.pswp.viewportSize.x;
          if (velocity.x < -MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio < 0 || velocity.x < 0.1 && currentSlideVisibilityRatio < -0.5) {
            indexDiff = 1;
            velocity.x = Math.min(velocity.x, 0);
          } else if (velocity.x > MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio > 0 || velocity.x > -0.1 && currentSlideVisibilityRatio > 0.5) {
            indexDiff = -1;
            velocity.x = Math.max(velocity.x, 0);
          }
          mainScroll.moveIndexBy(indexDiff, true, velocity.x);
        }
        if (currSlide && currSlide.currZoomLevel > currSlide.zoomLevels.max || this.gestures.isMultitouch) {
          this.gestures.zoomLevels.correctZoomPan(true);
        } else {
          this._finishPanGestureForAxis("x");
          this._finishPanGestureForAxis("y");
        }
      }
      /**
       * @private
       * @param {'x' | 'y'} axis
       */
      _finishPanGestureForAxis(axis) {
        const {
          velocity
        } = this.gestures;
        const {
          currSlide
        } = this.pswp;
        if (!currSlide) {
          return;
        }
        const {
          pan,
          bounds
        } = currSlide;
        const panPos = pan[axis];
        const restoreBgOpacity = this.pswp.bgOpacity < 1 && axis === "y";
        const decelerationRate = 0.995;
        const projectedPosition = panPos + project(velocity[axis], decelerationRate);
        if (restoreBgOpacity) {
          const vDragRatio = this._getVerticalDragRatio(panPos);
          const projectedVDragRatio = this._getVerticalDragRatio(projectedPosition);
          if (vDragRatio < 0 && projectedVDragRatio < -MIN_RATIO_TO_CLOSE || vDragRatio > 0 && projectedVDragRatio > MIN_RATIO_TO_CLOSE) {
            this.pswp.close();
            return;
          }
        }
        const correctedPanPosition = bounds.correctPan(axis, projectedPosition);
        if (panPos === correctedPanPosition) {
          return;
        }
        const dampingRatio = correctedPanPosition === projectedPosition ? 1 : 0.82;
        const initialBgOpacity = this.pswp.bgOpacity;
        const totalPanDist = correctedPanPosition - panPos;
        this.pswp.animations.startSpring({
          name: "panGesture" + axis,
          isPan: true,
          start: panPos,
          end: correctedPanPosition,
          velocity: velocity[axis],
          dampingRatio,
          onUpdate: (pos) => {
            if (restoreBgOpacity && this.pswp.bgOpacity < 1) {
              const animationProgressRatio = 1 - (correctedPanPosition - pos) / totalPanDist;
              this.pswp.applyBgOpacity(clamp(initialBgOpacity + (1 - initialBgOpacity) * animationProgressRatio, 0, 1));
            }
            pan[axis] = Math.floor(pos);
            currSlide.applyCurrentZoomPan();
          }
        });
      }
      /**
       * Update position of the main scroll,
       * or/and update pan position of the current slide.
       *
       * Should return true if it changes (or can change) main scroll.
       *
       * @private
       * @param {'x' | 'y'} axis
       * @returns {boolean}
       */
      _panOrMoveMainScroll(axis) {
        const {
          p1,
          dragAxis,
          prevP1,
          isMultitouch
        } = this.gestures;
        const {
          currSlide,
          mainScroll
        } = this.pswp;
        const delta = p1[axis] - prevP1[axis];
        const newMainScrollX = mainScroll.x + delta;
        if (!delta || !currSlide) {
          return false;
        }
        if (axis === "x" && !currSlide.isPannable() && !isMultitouch) {
          mainScroll.moveTo(newMainScrollX, true);
          return true;
        }
        const {
          bounds
        } = currSlide;
        const newPan = currSlide.pan[axis] + delta;
        if (this.pswp.options.allowPanToNext && dragAxis === "x" && axis === "x" && !isMultitouch) {
          const currSlideMainScrollX = mainScroll.getCurrSlideX();
          const mainScrollShiftDiff = mainScroll.x - currSlideMainScrollX;
          const isLeftToRight = delta > 0;
          const isRightToLeft = !isLeftToRight;
          if (newPan > bounds.min[axis] && isLeftToRight) {
            const wasAtMinPanPosition = bounds.min[axis] <= this.startPan[axis];
            if (wasAtMinPanPosition) {
              mainScroll.moveTo(newMainScrollX, true);
              return true;
            } else {
              this._setPanWithFriction(axis, newPan);
            }
          } else if (newPan < bounds.max[axis] && isRightToLeft) {
            const wasAtMaxPanPosition = this.startPan[axis] <= bounds.max[axis];
            if (wasAtMaxPanPosition) {
              mainScroll.moveTo(newMainScrollX, true);
              return true;
            } else {
              this._setPanWithFriction(axis, newPan);
            }
          } else {
            if (mainScrollShiftDiff !== 0) {
              if (mainScrollShiftDiff > 0) {
                mainScroll.moveTo(Math.max(newMainScrollX, currSlideMainScrollX), true);
                return true;
              } else if (mainScrollShiftDiff < 0) {
                mainScroll.moveTo(Math.min(newMainScrollX, currSlideMainScrollX), true);
                return true;
              }
            } else {
              this._setPanWithFriction(axis, newPan);
            }
          }
        } else {
          if (axis === "y") {
            if (!mainScroll.isShifted() && bounds.min.y !== bounds.max.y) {
              this._setPanWithFriction(axis, newPan);
            }
          } else {
            this._setPanWithFriction(axis, newPan);
          }
        }
        return false;
      }
      // If we move above - the ratio is negative
      // If we move below the ratio is positive
      /**
       * Relation between pan Y position and third of viewport height.
       *
       * When we are at initial position (center bounds) - the ratio is 0,
       * if position is shifted upwards - the ratio is negative,
       * if position is shifted downwards - the ratio is positive.
       *
       * @private
       * @param {number} panY The current pan Y position.
       * @returns {number}
       */
      _getVerticalDragRatio(panY) {
        var _this$pswp$currSlide$, _this$pswp$currSlide;
        return (panY - ((_this$pswp$currSlide$ = (_this$pswp$currSlide = this.pswp.currSlide) === null || _this$pswp$currSlide === void 0 ? void 0 : _this$pswp$currSlide.bounds.center.y) !== null && _this$pswp$currSlide$ !== void 0 ? _this$pswp$currSlide$ : 0)) / (this.pswp.viewportSize.y / 3);
      }
      /**
       * Set pan position of the current slide.
       * Apply friction if the position is beyond the pan bounds,
       * or if custom friction is defined.
       *
       * @private
       * @param {'x' | 'y'} axis
       * @param {number} potentialPan
       * @param {number} [customFriction] (0.1 - 1)
       */
      _setPanWithFriction(axis, potentialPan, customFriction) {
        const {
          currSlide
        } = this.pswp;
        if (!currSlide) {
          return;
        }
        const {
          pan,
          bounds
        } = currSlide;
        const correctedPan = bounds.correctPan(axis, potentialPan);
        if (correctedPan !== potentialPan || customFriction) {
          const delta = Math.round(potentialPan - pan[axis]);
          pan[axis] += delta * (customFriction || PAN_END_FRICTION);
        } else {
          pan[axis] = potentialPan;
        }
      }
    };
    UPPER_ZOOM_FRICTION = 0.05;
    LOWER_ZOOM_FRICTION = 0.15;
    ZoomHandler = class {
      /**
       * @param {Gestures} gestures
       */
      constructor(gestures) {
        this.gestures = gestures;
        this._startPan = {
          x: 0,
          y: 0
        };
        this._startZoomPoint = {
          x: 0,
          y: 0
        };
        this._zoomPoint = {
          x: 0,
          y: 0
        };
        this._wasOverFitZoomLevel = false;
        this._startZoomLevel = 1;
      }
      start() {
        const {
          currSlide
        } = this.gestures.pswp;
        if (currSlide) {
          this._startZoomLevel = currSlide.currZoomLevel;
          equalizePoints(this._startPan, currSlide.pan);
        }
        this.gestures.pswp.animations.stopAllPan();
        this._wasOverFitZoomLevel = false;
      }
      change() {
        const {
          p1,
          startP1,
          p2,
          startP2,
          pswp
        } = this.gestures;
        const {
          currSlide
        } = pswp;
        if (!currSlide) {
          return;
        }
        const minZoomLevel = currSlide.zoomLevels.min;
        const maxZoomLevel = currSlide.zoomLevels.max;
        if (!currSlide.isZoomable() || pswp.mainScroll.isShifted()) {
          return;
        }
        getZoomPointsCenter(this._startZoomPoint, startP1, startP2);
        getZoomPointsCenter(this._zoomPoint, p1, p2);
        let currZoomLevel = 1 / getDistanceBetween(startP1, startP2) * getDistanceBetween(p1, p2) * this._startZoomLevel;
        if (currZoomLevel > currSlide.zoomLevels.initial + currSlide.zoomLevels.initial / 15) {
          this._wasOverFitZoomLevel = true;
        }
        if (currZoomLevel < minZoomLevel) {
          if (pswp.options.pinchToClose && !this._wasOverFitZoomLevel && this._startZoomLevel <= currSlide.zoomLevels.initial) {
            const bgOpacity = 1 - (minZoomLevel - currZoomLevel) / (minZoomLevel / 1.2);
            if (!pswp.dispatch("pinchClose", {
              bgOpacity
            }).defaultPrevented) {
              pswp.applyBgOpacity(bgOpacity);
            }
          } else {
            currZoomLevel = minZoomLevel - (minZoomLevel - currZoomLevel) * LOWER_ZOOM_FRICTION;
          }
        } else if (currZoomLevel > maxZoomLevel) {
          currZoomLevel = maxZoomLevel + (currZoomLevel - maxZoomLevel) * UPPER_ZOOM_FRICTION;
        }
        currSlide.pan.x = this._calculatePanForZoomLevel("x", currZoomLevel);
        currSlide.pan.y = this._calculatePanForZoomLevel("y", currZoomLevel);
        currSlide.setZoomLevel(currZoomLevel);
        currSlide.applyCurrentZoomPan();
      }
      end() {
        const {
          pswp
        } = this.gestures;
        const {
          currSlide
        } = pswp;
        if ((!currSlide || currSlide.currZoomLevel < currSlide.zoomLevels.initial) && !this._wasOverFitZoomLevel && pswp.options.pinchToClose) {
          pswp.close();
        } else {
          this.correctZoomPan();
        }
      }
      /**
       * @private
       * @param {'x' | 'y'} axis
       * @param {number} currZoomLevel
       * @returns {number}
       */
      _calculatePanForZoomLevel(axis, currZoomLevel) {
        const zoomFactor = currZoomLevel / this._startZoomLevel;
        return this._zoomPoint[axis] - (this._startZoomPoint[axis] - this._startPan[axis]) * zoomFactor;
      }
      /**
       * Correct currZoomLevel and pan if they are
       * beyond minimum or maximum values.
       * With animation.
       *
       * @param {boolean} [ignoreGesture]
       * Wether gesture coordinates should be ignored when calculating destination pan position.
       */
      correctZoomPan(ignoreGesture) {
        const {
          pswp
        } = this.gestures;
        const {
          currSlide
        } = pswp;
        if (!(currSlide !== null && currSlide !== void 0 && currSlide.isZoomable())) {
          return;
        }
        if (this._zoomPoint.x === 0) {
          ignoreGesture = true;
        }
        const prevZoomLevel = currSlide.currZoomLevel;
        let destinationZoomLevel;
        let currZoomLevelNeedsChange = true;
        if (prevZoomLevel < currSlide.zoomLevels.initial) {
          destinationZoomLevel = currSlide.zoomLevels.initial;
        } else if (prevZoomLevel > currSlide.zoomLevels.max) {
          destinationZoomLevel = currSlide.zoomLevels.max;
        } else {
          currZoomLevelNeedsChange = false;
          destinationZoomLevel = prevZoomLevel;
        }
        const initialBgOpacity = pswp.bgOpacity;
        const restoreBgOpacity = pswp.bgOpacity < 1;
        const initialPan = equalizePoints({
          x: 0,
          y: 0
        }, currSlide.pan);
        let destinationPan = equalizePoints({
          x: 0,
          y: 0
        }, initialPan);
        if (ignoreGesture) {
          this._zoomPoint.x = 0;
          this._zoomPoint.y = 0;
          this._startZoomPoint.x = 0;
          this._startZoomPoint.y = 0;
          this._startZoomLevel = prevZoomLevel;
          equalizePoints(this._startPan, initialPan);
        }
        if (currZoomLevelNeedsChange) {
          destinationPan = {
            x: this._calculatePanForZoomLevel("x", destinationZoomLevel),
            y: this._calculatePanForZoomLevel("y", destinationZoomLevel)
          };
        }
        currSlide.setZoomLevel(destinationZoomLevel);
        destinationPan = {
          x: currSlide.bounds.correctPan("x", destinationPan.x),
          y: currSlide.bounds.correctPan("y", destinationPan.y)
        };
        currSlide.setZoomLevel(prevZoomLevel);
        const panNeedsChange = !pointsEqual(destinationPan, initialPan);
        if (!panNeedsChange && !currZoomLevelNeedsChange && !restoreBgOpacity) {
          currSlide._setResolution(destinationZoomLevel);
          currSlide.applyCurrentZoomPan();
          return;
        }
        pswp.animations.stopAllPan();
        pswp.animations.startSpring({
          isPan: true,
          start: 0,
          end: 1e3,
          velocity: 0,
          dampingRatio: 1,
          naturalFrequency: 40,
          onUpdate: (now) => {
            now /= 1e3;
            if (panNeedsChange || currZoomLevelNeedsChange) {
              if (panNeedsChange) {
                currSlide.pan.x = initialPan.x + (destinationPan.x - initialPan.x) * now;
                currSlide.pan.y = initialPan.y + (destinationPan.y - initialPan.y) * now;
              }
              if (currZoomLevelNeedsChange) {
                const newZoomLevel = prevZoomLevel + (destinationZoomLevel - prevZoomLevel) * now;
                currSlide.setZoomLevel(newZoomLevel);
              }
              currSlide.applyCurrentZoomPan();
            }
            if (restoreBgOpacity && pswp.bgOpacity < 1) {
              pswp.applyBgOpacity(clamp(initialBgOpacity + (1 - initialBgOpacity) * now, 0, 1));
            }
          },
          onComplete: () => {
            currSlide._setResolution(destinationZoomLevel);
            currSlide.applyCurrentZoomPan();
          }
        });
      }
    };
    TapHandler = class {
      /**
       * @param {Gestures} gestures
       */
      constructor(gestures) {
        this.gestures = gestures;
      }
      /**
       * @param {Point} point
       * @param {PointerEvent} originalEvent
       */
      click(point, originalEvent) {
        const targetClassList = (
          /** @type {HTMLElement} */
          originalEvent.target.classList
        );
        const isImageClick = targetClassList.contains("pswp__img");
        const isBackgroundClick = targetClassList.contains("pswp__item") || targetClassList.contains("pswp__zoom-wrap");
        if (isImageClick) {
          this._doClickOrTapAction("imageClick", point, originalEvent);
        } else if (isBackgroundClick) {
          this._doClickOrTapAction("bgClick", point, originalEvent);
        }
      }
      /**
       * @param {Point} point
       * @param {PointerEvent} originalEvent
       */
      tap(point, originalEvent) {
        if (didTapOnMainContent(originalEvent)) {
          this._doClickOrTapAction("tap", point, originalEvent);
        }
      }
      /**
       * @param {Point} point
       * @param {PointerEvent} originalEvent
       */
      doubleTap(point, originalEvent) {
        if (didTapOnMainContent(originalEvent)) {
          this._doClickOrTapAction("doubleTap", point, originalEvent);
        }
      }
      /**
       * @private
       * @param {Actions} actionName
       * @param {Point} point
       * @param {PointerEvent} originalEvent
       */
      _doClickOrTapAction(actionName, point, originalEvent) {
        var _this$gestures$pswp$e;
        const {
          pswp
        } = this.gestures;
        const {
          currSlide
        } = pswp;
        const actionFullName = (
          /** @type {AddPostfix<Actions, 'Action'>} */
          actionName + "Action"
        );
        const optionValue = pswp.options[actionFullName];
        if (pswp.dispatch(actionFullName, {
          point,
          originalEvent
        }).defaultPrevented) {
          return;
        }
        if (typeof optionValue === "function") {
          optionValue.call(pswp, point, originalEvent);
          return;
        }
        switch (optionValue) {
          case "close":
          case "next":
            pswp[optionValue]();
            break;
          case "zoom":
            currSlide === null || currSlide === void 0 || currSlide.toggleZoom(point);
            break;
          case "zoom-or-close":
            if (currSlide !== null && currSlide !== void 0 && currSlide.isZoomable() && currSlide.zoomLevels.secondary !== currSlide.zoomLevels.initial) {
              currSlide.toggleZoom(point);
            } else if (pswp.options.clickToCloseNonZoomable) {
              pswp.close();
            }
            break;
          case "toggle-controls":
            (_this$gestures$pswp$e = this.gestures.pswp.element) === null || _this$gestures$pswp$e === void 0 || _this$gestures$pswp$e.classList.toggle("pswp--ui-visible");
            break;
        }
      }
    };
    AXIS_SWIPE_HYSTERISIS = 10;
    DOUBLE_TAP_DELAY = 300;
    MIN_TAP_DISTANCE = 25;
    Gestures = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this.dragAxis = null;
        this.p1 = {
          x: 0,
          y: 0
        };
        this.p2 = {
          x: 0,
          y: 0
        };
        this.prevP1 = {
          x: 0,
          y: 0
        };
        this.prevP2 = {
          x: 0,
          y: 0
        };
        this.startP1 = {
          x: 0,
          y: 0
        };
        this.startP2 = {
          x: 0,
          y: 0
        };
        this.velocity = {
          x: 0,
          y: 0
        };
        this._lastStartP1 = {
          x: 0,
          y: 0
        };
        this._intervalP1 = {
          x: 0,
          y: 0
        };
        this._numActivePoints = 0;
        this._ongoingPointers = [];
        this._touchEventEnabled = "ontouchstart" in window;
        this._pointerEventEnabled = !!window.PointerEvent;
        this.supportsTouch = this._touchEventEnabled || this._pointerEventEnabled && navigator.maxTouchPoints > 1;
        this._numActivePoints = 0;
        this._intervalTime = 0;
        this._velocityCalculated = false;
        this.isMultitouch = false;
        this.isDragging = false;
        this.isZooming = false;
        this.raf = null;
        this._tapTimer = null;
        if (!this.supportsTouch) {
          pswp.options.allowPanToNext = false;
        }
        this.drag = new DragHandler(this);
        this.zoomLevels = new ZoomHandler(this);
        this.tapHandler = new TapHandler(this);
        pswp.on("bindEvents", () => {
          pswp.events.add(
            pswp.scrollWrap,
            "click",
            /** @type EventListener */
            this._onClick.bind(this)
          );
          if (this._pointerEventEnabled) {
            this._bindEvents("pointer", "down", "up", "cancel");
          } else if (this._touchEventEnabled) {
            this._bindEvents("touch", "start", "end", "cancel");
            if (pswp.scrollWrap) {
              pswp.scrollWrap.ontouchmove = () => {
              };
              pswp.scrollWrap.ontouchend = () => {
              };
            }
          } else {
            this._bindEvents("mouse", "down", "up");
          }
        });
      }
      /**
       * @private
       * @param {'mouse' | 'touch' | 'pointer'} pref
       * @param {'down' | 'start'} down
       * @param {'up' | 'end'} up
       * @param {'cancel'} [cancel]
       */
      _bindEvents(pref, down, up, cancel) {
        const {
          pswp
        } = this;
        const {
          events
        } = pswp;
        const cancelEvent = cancel ? pref + cancel : "";
        events.add(
          pswp.scrollWrap,
          pref + down,
          /** @type EventListener */
          this.onPointerDown.bind(this)
        );
        events.add(
          window,
          pref + "move",
          /** @type EventListener */
          this.onPointerMove.bind(this)
        );
        events.add(
          window,
          pref + up,
          /** @type EventListener */
          this.onPointerUp.bind(this)
        );
        if (cancelEvent) {
          events.add(
            pswp.scrollWrap,
            cancelEvent,
            /** @type EventListener */
            this.onPointerUp.bind(this)
          );
        }
      }
      /**
       * @param {PointerEvent} e
       */
      onPointerDown(e) {
        const isMousePointer = e.type === "mousedown" || e.pointerType === "mouse";
        if (isMousePointer && e.button > 0) {
          return;
        }
        const {
          pswp
        } = this;
        if (!pswp.opener.isOpen) {
          e.preventDefault();
          return;
        }
        if (pswp.dispatch("pointerDown", {
          originalEvent: e
        }).defaultPrevented) {
          return;
        }
        if (isMousePointer) {
          pswp.mouseDetected();
          this._preventPointerEventBehaviour(e, "down");
        }
        pswp.animations.stopAll();
        this._updatePoints(e, "down");
        if (this._numActivePoints === 1) {
          this.dragAxis = null;
          equalizePoints(this.startP1, this.p1);
        }
        if (this._numActivePoints > 1) {
          this._clearTapTimer();
          this.isMultitouch = true;
        } else {
          this.isMultitouch = false;
        }
      }
      /**
       * @param {PointerEvent} e
       */
      onPointerMove(e) {
        this._preventPointerEventBehaviour(e, "move");
        if (!this._numActivePoints) {
          return;
        }
        this._updatePoints(e, "move");
        if (this.pswp.dispatch("pointerMove", {
          originalEvent: e
        }).defaultPrevented) {
          return;
        }
        if (this._numActivePoints === 1 && !this.isDragging) {
          if (!this.dragAxis) {
            this._calculateDragDirection();
          }
          if (this.dragAxis && !this.isDragging) {
            if (this.isZooming) {
              this.isZooming = false;
              this.zoomLevels.end();
            }
            this.isDragging = true;
            this._clearTapTimer();
            this._updateStartPoints();
            this._intervalTime = Date.now();
            this._velocityCalculated = false;
            equalizePoints(this._intervalP1, this.p1);
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.drag.start();
            this._rafStopLoop();
            this._rafRenderLoop();
          }
        } else if (this._numActivePoints > 1 && !this.isZooming) {
          this._finishDrag();
          this.isZooming = true;
          this._updateStartPoints();
          this.zoomLevels.start();
          this._rafStopLoop();
          this._rafRenderLoop();
        }
      }
      /**
       * @private
       */
      _finishDrag() {
        if (this.isDragging) {
          this.isDragging = false;
          if (!this._velocityCalculated) {
            this._updateVelocity(true);
          }
          this.drag.end();
          this.dragAxis = null;
        }
      }
      /**
       * @param {PointerEvent} e
       */
      onPointerUp(e) {
        if (!this._numActivePoints) {
          return;
        }
        this._updatePoints(e, "up");
        if (this.pswp.dispatch("pointerUp", {
          originalEvent: e
        }).defaultPrevented) {
          return;
        }
        if (this._numActivePoints === 0) {
          this._rafStopLoop();
          if (this.isDragging) {
            this._finishDrag();
          } else if (!this.isZooming && !this.isMultitouch) {
            this._finishTap(e);
          }
        }
        if (this._numActivePoints < 2 && this.isZooming) {
          this.isZooming = false;
          this.zoomLevels.end();
          if (this._numActivePoints === 1) {
            this.dragAxis = null;
            this._updateStartPoints();
          }
        }
      }
      /**
       * @private
       */
      _rafRenderLoop() {
        if (this.isDragging || this.isZooming) {
          this._updateVelocity();
          if (this.isDragging) {
            if (!pointsEqual(this.p1, this.prevP1)) {
              this.drag.change();
            }
          } else {
            if (!pointsEqual(this.p1, this.prevP1) || !pointsEqual(this.p2, this.prevP2)) {
              this.zoomLevels.change();
            }
          }
          this._updatePrevPoints();
          this.raf = requestAnimationFrame(this._rafRenderLoop.bind(this));
        }
      }
      /**
       * Update velocity at 50ms interval
       *
       * @private
       * @param {boolean} [force]
       */
      _updateVelocity(force) {
        const time = Date.now();
        const duration = time - this._intervalTime;
        if (duration < 50 && !force) {
          return;
        }
        this.velocity.x = this._getVelocity("x", duration);
        this.velocity.y = this._getVelocity("y", duration);
        this._intervalTime = time;
        equalizePoints(this._intervalP1, this.p1);
        this._velocityCalculated = true;
      }
      /**
       * @private
       * @param {PointerEvent} e
       */
      _finishTap(e) {
        const {
          mainScroll
        } = this.pswp;
        if (mainScroll.isShifted()) {
          mainScroll.moveIndexBy(0, true);
          return;
        }
        if (e.type.indexOf("cancel") > 0) {
          return;
        }
        if (e.type === "mouseup" || e.pointerType === "mouse") {
          this.tapHandler.click(this.startP1, e);
          return;
        }
        const tapDelay = this.pswp.options.doubleTapAction ? DOUBLE_TAP_DELAY : 0;
        if (this._tapTimer) {
          this._clearTapTimer();
          if (getDistanceBetween(this._lastStartP1, this.startP1) < MIN_TAP_DISTANCE) {
            this.tapHandler.doubleTap(this.startP1, e);
          }
        } else {
          equalizePoints(this._lastStartP1, this.startP1);
          this._tapTimer = setTimeout(() => {
            this.tapHandler.tap(this.startP1, e);
            this._clearTapTimer();
          }, tapDelay);
        }
      }
      /**
       * @private
       */
      _clearTapTimer() {
        if (this._tapTimer) {
          clearTimeout(this._tapTimer);
          this._tapTimer = null;
        }
      }
      /**
       * Get velocity for axis
       *
       * @private
       * @param {'x' | 'y'} axis
       * @param {number} duration
       * @returns {number}
       */
      _getVelocity(axis, duration) {
        const displacement = this.p1[axis] - this._intervalP1[axis];
        if (Math.abs(displacement) > 1 && duration > 5) {
          return displacement / duration;
        }
        return 0;
      }
      /**
       * @private
       */
      _rafStopLoop() {
        if (this.raf) {
          cancelAnimationFrame(this.raf);
          this.raf = null;
        }
      }
      /**
       * @private
       * @param {PointerEvent} e
       * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
       */
      _preventPointerEventBehaviour(e, pointerType) {
        const preventPointerEvent = this.pswp.applyFilters("preventPointerEvent", true, e, pointerType);
        if (preventPointerEvent) {
          e.preventDefault();
        }
      }
      /**
       * Parses and normalizes points from the touch, mouse or pointer event.
       * Updates p1 and p2.
       *
       * @private
       * @param {PointerEvent | TouchEvent} e
       * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
       */
      _updatePoints(e, pointerType) {
        if (this._pointerEventEnabled) {
          const pointerEvent = (
            /** @type {PointerEvent} */
            e
          );
          const pointerIndex = this._ongoingPointers.findIndex((ongoingPointer) => {
            return ongoingPointer.id === pointerEvent.pointerId;
          });
          if (pointerType === "up" && pointerIndex > -1) {
            this._ongoingPointers.splice(pointerIndex, 1);
          } else if (pointerType === "down" && pointerIndex === -1) {
            this._ongoingPointers.push(this._convertEventPosToPoint(pointerEvent, {
              x: 0,
              y: 0
            }));
          } else if (pointerIndex > -1) {
            this._convertEventPosToPoint(pointerEvent, this._ongoingPointers[pointerIndex]);
          }
          this._numActivePoints = this._ongoingPointers.length;
          if (this._numActivePoints > 0) {
            equalizePoints(this.p1, this._ongoingPointers[0]);
          }
          if (this._numActivePoints > 1) {
            equalizePoints(this.p2, this._ongoingPointers[1]);
          }
        } else {
          const touchEvent = (
            /** @type {TouchEvent} */
            e
          );
          this._numActivePoints = 0;
          if (touchEvent.type.indexOf("touch") > -1) {
            if (touchEvent.touches && touchEvent.touches.length > 0) {
              this._convertEventPosToPoint(touchEvent.touches[0], this.p1);
              this._numActivePoints++;
              if (touchEvent.touches.length > 1) {
                this._convertEventPosToPoint(touchEvent.touches[1], this.p2);
                this._numActivePoints++;
              }
            }
          } else {
            this._convertEventPosToPoint(
              /** @type {PointerEvent} */
              e,
              this.p1
            );
            if (pointerType === "up") {
              this._numActivePoints = 0;
            } else {
              this._numActivePoints++;
            }
          }
        }
      }
      /** update points that were used during previous rAF tick
       * @private
       */
      _updatePrevPoints() {
        equalizePoints(this.prevP1, this.p1);
        equalizePoints(this.prevP2, this.p2);
      }
      /** update points at the start of gesture
       * @private
       */
      _updateStartPoints() {
        equalizePoints(this.startP1, this.p1);
        equalizePoints(this.startP2, this.p2);
        this._updatePrevPoints();
      }
      /** @private */
      _calculateDragDirection() {
        if (this.pswp.mainScroll.isShifted()) {
          this.dragAxis = "x";
        } else {
          const diff = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
          if (diff !== 0) {
            const axisToCheck = diff > 0 ? "x" : "y";
            if (Math.abs(this.p1[axisToCheck] - this.startP1[axisToCheck]) >= AXIS_SWIPE_HYSTERISIS) {
              this.dragAxis = axisToCheck;
            }
          }
        }
      }
      /**
       * Converts touch, pointer or mouse event
       * to PhotoSwipe point.
       *
       * @private
       * @param {Touch | PointerEvent} e
       * @param {Point} p
       * @returns {Point}
       */
      _convertEventPosToPoint(e, p) {
        p.x = e.pageX - this.pswp.offset.x;
        p.y = e.pageY - this.pswp.offset.y;
        if ("pointerId" in e) {
          p.id = e.pointerId;
        } else if (e.identifier !== void 0) {
          p.id = e.identifier;
        }
        return p;
      }
      /**
       * @private
       * @param {PointerEvent} e
       */
      _onClick(e) {
        if (this.pswp.mainScroll.isShifted()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    MAIN_SCROLL_END_FRICTION = 0.35;
    MainScroll = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this.x = 0;
        this.slideWidth = 0;
        this._currPositionIndex = 0;
        this._prevPositionIndex = 0;
        this._containerShiftIndex = -1;
        this.itemHolders = [];
      }
      /**
       * Position the scroller and slide containers
       * according to viewport size.
       *
       * @param {boolean} [resizeSlides] Whether slides content should resized
       */
      resize(resizeSlides) {
        const {
          pswp
        } = this;
        const newSlideWidth = Math.round(pswp.viewportSize.x + pswp.viewportSize.x * pswp.options.spacing);
        const slideWidthChanged = newSlideWidth !== this.slideWidth;
        if (slideWidthChanged) {
          this.slideWidth = newSlideWidth;
          this.moveTo(this.getCurrSlideX());
        }
        this.itemHolders.forEach((itemHolder, index) => {
          if (slideWidthChanged) {
            setTransform(itemHolder.el, (index + this._containerShiftIndex) * this.slideWidth);
          }
          if (resizeSlides && itemHolder.slide) {
            itemHolder.slide.resize();
          }
        });
      }
      /**
       * Reset X position of the main scroller to zero
       */
      resetPosition() {
        this._currPositionIndex = 0;
        this._prevPositionIndex = 0;
        this.slideWidth = 0;
        this._containerShiftIndex = -1;
      }
      /**
       * Create and append array of three items
       * that hold data about slides in DOM
       */
      appendHolders() {
        this.itemHolders = [];
        for (let i = 0; i < 3; i++) {
          const el = createElement2("pswp__item", "div", this.pswp.container);
          el.setAttribute("role", "group");
          el.setAttribute("aria-roledescription", "slide");
          el.setAttribute("aria-hidden", "true");
          el.style.display = i === 1 ? "block" : "none";
          this.itemHolders.push({
            el
            //index: -1
          });
        }
      }
      /**
       * Whether the main scroll can be horizontally swiped to the next or previous slide.
       * @returns {boolean}
       */
      canBeSwiped() {
        return this.pswp.getNumItems() > 1;
      }
      /**
       * Move main scroll by X amount of slides.
       * For example:
       *   `-1` will move to the previous slide,
       *    `0` will reset the scroll position of the current slide,
       *    `3` will move three slides forward
       *
       * If loop option is enabled - index will be automatically looped too,
       * (for example `-1` will move to the last slide of the gallery).
       *
       * @param {number} diff
       * @param {boolean} [animate]
       * @param {number} [velocityX]
       * @returns {boolean} whether index was changed or not
       */
      moveIndexBy(diff, animate, velocityX) {
        const {
          pswp
        } = this;
        let newIndex = pswp.potentialIndex + diff;
        const numSlides = pswp.getNumItems();
        if (pswp.canLoop()) {
          newIndex = pswp.getLoopedIndex(newIndex);
          const distance = (diff + numSlides) % numSlides;
          if (distance <= numSlides / 2) {
            diff = distance;
          } else {
            diff = distance - numSlides;
          }
        } else {
          if (newIndex < 0) {
            newIndex = 0;
          } else if (newIndex >= numSlides) {
            newIndex = numSlides - 1;
          }
          diff = newIndex - pswp.potentialIndex;
        }
        pswp.potentialIndex = newIndex;
        this._currPositionIndex -= diff;
        pswp.animations.stopMainScroll();
        const destinationX = this.getCurrSlideX();
        if (!animate) {
          this.moveTo(destinationX);
          this.updateCurrItem();
        } else {
          pswp.animations.startSpring({
            isMainScroll: true,
            start: this.x,
            end: destinationX,
            velocity: velocityX || 0,
            naturalFrequency: 30,
            dampingRatio: 1,
            //0.7,
            onUpdate: (x) => {
              this.moveTo(x);
            },
            onComplete: () => {
              this.updateCurrItem();
              pswp.appendHeavy();
            }
          });
          let currDiff = pswp.potentialIndex - pswp.currIndex;
          if (pswp.canLoop()) {
            const currDistance = (currDiff + numSlides) % numSlides;
            if (currDistance <= numSlides / 2) {
              currDiff = currDistance;
            } else {
              currDiff = currDistance - numSlides;
            }
          }
          if (Math.abs(currDiff) > 1) {
            this.updateCurrItem();
          }
        }
        return Boolean(diff);
      }
      /**
       * X position of the main scroll for the current slide
       * (ignores position during dragging)
       * @returns {number}
       */
      getCurrSlideX() {
        return this.slideWidth * this._currPositionIndex;
      }
      /**
       * Whether scroll position is shifted.
       * For example, it will return true if the scroll is being dragged or animated.
       * @returns {boolean}
       */
      isShifted() {
        return this.x !== this.getCurrSlideX();
      }
      /**
       * Update slides X positions and set their content
       */
      updateCurrItem() {
        var _this$itemHolders$;
        const {
          pswp
        } = this;
        const positionDifference = this._prevPositionIndex - this._currPositionIndex;
        if (!positionDifference) {
          return;
        }
        this._prevPositionIndex = this._currPositionIndex;
        pswp.currIndex = pswp.potentialIndex;
        let diffAbs = Math.abs(positionDifference);
        let tempHolder;
        if (diffAbs >= 3) {
          this._containerShiftIndex += positionDifference + (positionDifference > 0 ? -3 : 3);
          diffAbs = 3;
          this.itemHolders.forEach((itemHolder) => {
            var _itemHolder$slide;
            (_itemHolder$slide = itemHolder.slide) === null || _itemHolder$slide === void 0 || _itemHolder$slide.destroy();
            itemHolder.slide = void 0;
          });
        }
        for (let i = 0; i < diffAbs; i++) {
          if (positionDifference > 0) {
            tempHolder = this.itemHolders.shift();
            if (tempHolder) {
              this.itemHolders[2] = tempHolder;
              this._containerShiftIndex++;
              setTransform(tempHolder.el, (this._containerShiftIndex + 2) * this.slideWidth);
              pswp.setContent(tempHolder, pswp.currIndex - diffAbs + i + 2);
            }
          } else {
            tempHolder = this.itemHolders.pop();
            if (tempHolder) {
              this.itemHolders.unshift(tempHolder);
              this._containerShiftIndex--;
              setTransform(tempHolder.el, this._containerShiftIndex * this.slideWidth);
              pswp.setContent(tempHolder, pswp.currIndex + diffAbs - i - 2);
            }
          }
        }
        if (Math.abs(this._containerShiftIndex) > 50 && !this.isShifted()) {
          this.resetPosition();
          this.resize();
        }
        pswp.animations.stopAllPan();
        this.itemHolders.forEach((itemHolder, i) => {
          if (itemHolder.slide) {
            itemHolder.slide.setIsActive(i === 1);
          }
        });
        pswp.currSlide = (_this$itemHolders$ = this.itemHolders[1]) === null || _this$itemHolders$ === void 0 ? void 0 : _this$itemHolders$.slide;
        pswp.contentLoader.updateLazy(positionDifference);
        if (pswp.currSlide) {
          pswp.currSlide.applyCurrentZoomPan();
        }
        pswp.dispatch("change");
      }
      /**
       * Move the X position of the main scroll container
       *
       * @param {number} x
       * @param {boolean} [dragging]
       */
      moveTo(x, dragging) {
        if (!this.pswp.canLoop() && dragging) {
          let newSlideIndexOffset = (this.slideWidth * this._currPositionIndex - x) / this.slideWidth;
          newSlideIndexOffset += this.pswp.currIndex;
          const delta = Math.round(x - this.x);
          if (newSlideIndexOffset < 0 && delta > 0 || newSlideIndexOffset >= this.pswp.getNumItems() - 1 && delta < 0) {
            x = this.x + delta * MAIN_SCROLL_END_FRICTION;
          }
        }
        this.x = x;
        if (this.pswp.container) {
          setTransform(this.pswp.container, x);
        }
        this.pswp.dispatch("moveMainScroll", {
          x,
          dragging: dragging !== null && dragging !== void 0 ? dragging : false
        });
      }
    };
    KeyboardKeyCodesMap = {
      Escape: 27,
      z: 90,
      ArrowLeft: 37,
      ArrowUp: 38,
      ArrowRight: 39,
      ArrowDown: 40,
      Tab: 9
    };
    getKeyboardEventKey = (key, isKeySupported) => {
      return isKeySupported ? key : KeyboardKeyCodesMap[key];
    };
    Keyboard = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this._wasFocused = false;
        pswp.on("bindEvents", () => {
          if (pswp.options.trapFocus) {
            if (!pswp.options.initialPointerPos) {
              this._focusRoot();
            }
            pswp.events.add(
              document,
              "focusin",
              /** @type EventListener */
              this._onFocusIn.bind(this)
            );
          }
          pswp.events.add(
            document,
            "keydown",
            /** @type EventListener */
            this._onKeyDown.bind(this)
          );
        });
        const lastActiveElement = (
          /** @type {HTMLElement} */
          document.activeElement
        );
        pswp.on("destroy", () => {
          if (pswp.options.returnFocus && lastActiveElement && this._wasFocused) {
            lastActiveElement.focus();
          }
        });
      }
      /** @private */
      _focusRoot() {
        if (!this._wasFocused && this.pswp.element) {
          this.pswp.element.focus();
          this._wasFocused = true;
        }
      }
      /**
       * @private
       * @param {KeyboardEvent} e
       */
      _onKeyDown(e) {
        const {
          pswp
        } = this;
        if (pswp.dispatch("keydown", {
          originalEvent: e
        }).defaultPrevented) {
          return;
        }
        if (specialKeyUsed2(e)) {
          return;
        }
        let keydownAction;
        let axis;
        let isForward = false;
        const isKeySupported = "key" in e;
        switch (isKeySupported ? e.key : e.keyCode) {
          case getKeyboardEventKey("Escape", isKeySupported):
            if (pswp.options.escKey) {
              keydownAction = "close";
            }
            break;
          case getKeyboardEventKey("z", isKeySupported):
            keydownAction = "toggleZoom";
            break;
          case getKeyboardEventKey("ArrowLeft", isKeySupported):
            axis = "x";
            break;
          case getKeyboardEventKey("ArrowUp", isKeySupported):
            axis = "y";
            break;
          case getKeyboardEventKey("ArrowRight", isKeySupported):
            axis = "x";
            isForward = true;
            break;
          case getKeyboardEventKey("ArrowDown", isKeySupported):
            isForward = true;
            axis = "y";
            break;
          case getKeyboardEventKey("Tab", isKeySupported):
            this._focusRoot();
            break;
        }
        if (axis) {
          e.preventDefault();
          const {
            currSlide
          } = pswp;
          if (pswp.options.arrowKeys && axis === "x" && pswp.getNumItems() > 1) {
            keydownAction = isForward ? "next" : "prev";
          } else if (currSlide && currSlide.currZoomLevel > currSlide.zoomLevels.fit) {
            currSlide.pan[axis] += isForward ? -80 : 80;
            currSlide.panTo(currSlide.pan.x, currSlide.pan.y);
          }
        }
        if (keydownAction) {
          e.preventDefault();
          pswp[keydownAction]();
        }
      }
      /**
       * Trap focus inside photoswipe
       *
       * @private
       * @param {FocusEvent} e
       */
      _onFocusIn(e) {
        const {
          template
        } = this.pswp;
        if (template && document !== e.target && template !== e.target && !template.contains(
          /** @type {Node} */
          e.target
        )) {
          template.focus();
        }
      }
    };
    DEFAULT_EASING = "cubic-bezier(.4,0,.22,1)";
    CSSAnimation = class {
      /**
       * onComplete can be unpredictable, be careful about current state
       *
       * @param {CssAnimationProps} props
       */
      constructor(props) {
        var _props$prop;
        this.props = props;
        const {
          target,
          onComplete,
          transform,
          onFinish = () => {
          },
          duration = 333,
          easing = DEFAULT_EASING
        } = props;
        this.onFinish = onFinish;
        const prop = transform ? "transform" : "opacity";
        const propValue = (_props$prop = props[prop]) !== null && _props$prop !== void 0 ? _props$prop : "";
        this._target = target;
        this._onComplete = onComplete;
        this._finished = false;
        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._helperTimeout = setTimeout(() => {
          setTransitionStyle(target, prop, duration, easing);
          this._helperTimeout = setTimeout(() => {
            target.addEventListener("transitionend", this._onTransitionEnd, false);
            target.addEventListener("transitioncancel", this._onTransitionEnd, false);
            this._helperTimeout = setTimeout(() => {
              this._finalizeAnimation();
            }, duration + 500);
            target.style[prop] = propValue;
          }, 30);
        }, 0);
      }
      /**
       * @private
       * @param {TransitionEvent} e
       */
      _onTransitionEnd(e) {
        if (e.target === this._target) {
          this._finalizeAnimation();
        }
      }
      /**
       * @private
       */
      _finalizeAnimation() {
        if (!this._finished) {
          this._finished = true;
          this.onFinish();
          if (this._onComplete) {
            this._onComplete();
          }
        }
      }
      // Destroy is called automatically onFinish
      destroy() {
        if (this._helperTimeout) {
          clearTimeout(this._helperTimeout);
        }
        removeTransitionStyle(this._target);
        this._target.removeEventListener("transitionend", this._onTransitionEnd, false);
        this._target.removeEventListener("transitioncancel", this._onTransitionEnd, false);
        if (!this._finished) {
          this._finalizeAnimation();
        }
      }
    };
    DEFAULT_NATURAL_FREQUENCY = 12;
    DEFAULT_DAMPING_RATIO = 0.75;
    SpringEaser = class {
      /**
       * @param {number} initialVelocity Initial velocity, px per ms.
       *
       * @param {number} [dampingRatio]
       * Determines how bouncy animation will be.
       * From 0 to 1, 0 - always overshoot, 1 - do not overshoot.
       * "overshoot" refers to part of animation that
       * goes beyond the final value.
       *
       * @param {number} [naturalFrequency]
       * Determines how fast animation will slow down.
       * The higher value - the stiffer the transition will be,
       * and the faster it will slow down.
       * Recommended value from 10 to 50
       */
      constructor(initialVelocity, dampingRatio, naturalFrequency) {
        this.velocity = initialVelocity * 1e3;
        this._dampingRatio = dampingRatio || DEFAULT_DAMPING_RATIO;
        this._naturalFrequency = naturalFrequency || DEFAULT_NATURAL_FREQUENCY;
        this._dampedFrequency = this._naturalFrequency;
        if (this._dampingRatio < 1) {
          this._dampedFrequency *= Math.sqrt(1 - this._dampingRatio * this._dampingRatio);
        }
      }
      /**
       * @param {number} deltaPosition Difference between current and end position of the animation
       * @param {number} deltaTime Frame duration in milliseconds
       *
       * @returns {number} Displacement, relative to the end position.
       */
      easeFrame(deltaPosition, deltaTime) {
        let displacement = 0;
        let coeff;
        deltaTime /= 1e3;
        const naturalDumpingPow = Math.E ** (-this._dampingRatio * this._naturalFrequency * deltaTime);
        if (this._dampingRatio === 1) {
          coeff = this.velocity + this._naturalFrequency * deltaPosition;
          displacement = (deltaPosition + coeff * deltaTime) * naturalDumpingPow;
          this.velocity = displacement * -this._naturalFrequency + coeff * naturalDumpingPow;
        } else if (this._dampingRatio < 1) {
          coeff = 1 / this._dampedFrequency * (this._dampingRatio * this._naturalFrequency * deltaPosition + this.velocity);
          const dumpedFCos = Math.cos(this._dampedFrequency * deltaTime);
          const dumpedFSin = Math.sin(this._dampedFrequency * deltaTime);
          displacement = naturalDumpingPow * (deltaPosition * dumpedFCos + coeff * dumpedFSin);
          this.velocity = displacement * -this._naturalFrequency * this._dampingRatio + naturalDumpingPow * (-this._dampedFrequency * deltaPosition * dumpedFSin + this._dampedFrequency * coeff * dumpedFCos);
        }
        return displacement;
      }
    };
    SpringAnimation = class {
      /**
       * @param {SpringAnimationProps} props
       */
      constructor(props) {
        this.props = props;
        this._raf = 0;
        const {
          start,
          end,
          velocity,
          onUpdate,
          onComplete,
          onFinish = () => {
          },
          dampingRatio,
          naturalFrequency
        } = props;
        this.onFinish = onFinish;
        const easer = new SpringEaser(velocity, dampingRatio, naturalFrequency);
        let prevTime = Date.now();
        let deltaPosition = start - end;
        const animationLoop = () => {
          if (this._raf) {
            deltaPosition = easer.easeFrame(deltaPosition, Date.now() - prevTime);
            if (Math.abs(deltaPosition) < 1 && Math.abs(easer.velocity) < 50) {
              onUpdate(end);
              if (onComplete) {
                onComplete();
              }
              this.onFinish();
            } else {
              prevTime = Date.now();
              onUpdate(deltaPosition + end);
              this._raf = requestAnimationFrame(animationLoop);
            }
          }
        };
        this._raf = requestAnimationFrame(animationLoop);
      }
      // Destroy is called automatically onFinish
      destroy() {
        if (this._raf >= 0) {
          cancelAnimationFrame(this._raf);
        }
        this._raf = 0;
      }
    };
    Animations = class {
      constructor() {
        this.activeAnimations = [];
      }
      /**
       * @param {SpringAnimationProps} props
       */
      startSpring(props) {
        this._start(props, true);
      }
      /**
       * @param {CssAnimationProps} props
       */
      startTransition(props) {
        this._start(props);
      }
      /**
       * @private
       * @param {AnimationProps} props
       * @param {boolean} [isSpring]
       * @returns {Animation}
       */
      _start(props, isSpring) {
        const animation = isSpring ? new SpringAnimation(
          /** @type SpringAnimationProps */
          props
        ) : new CSSAnimation(
          /** @type CssAnimationProps */
          props
        );
        this.activeAnimations.push(animation);
        animation.onFinish = () => this.stop(animation);
        return animation;
      }
      /**
       * @param {Animation} animation
       */
      stop(animation) {
        animation.destroy();
        const index = this.activeAnimations.indexOf(animation);
        if (index > -1) {
          this.activeAnimations.splice(index, 1);
        }
      }
      stopAll() {
        this.activeAnimations.forEach((animation) => {
          animation.destroy();
        });
        this.activeAnimations = [];
      }
      /**
       * Stop all pan or zoom transitions
       */
      stopAllPan() {
        this.activeAnimations = this.activeAnimations.filter((animation) => {
          if (animation.props.isPan) {
            animation.destroy();
            return false;
          }
          return true;
        });
      }
      stopMainScroll() {
        this.activeAnimations = this.activeAnimations.filter((animation) => {
          if (animation.props.isMainScroll) {
            animation.destroy();
            return false;
          }
          return true;
        });
      }
      /**
       * Returns true if main scroll transition is running
       */
      // isMainScrollRunning() {
      //   return this.activeAnimations.some((animation) => {
      //     return animation.props.isMainScroll;
      //   });
      // }
      /**
       * Returns true if any pan or zoom transition is running
       */
      isPanRunning() {
        return this.activeAnimations.some((animation) => {
          return animation.props.isPan;
        });
      }
    };
    ScrollWheel = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        pswp.events.add(
          pswp.element,
          "wheel",
          /** @type EventListener */
          this._onWheel.bind(this)
        );
      }
      /**
       * @private
       * @param {WheelEvent} e
       */
      _onWheel(e) {
        e.preventDefault();
        const {
          currSlide
        } = this.pswp;
        let {
          deltaX,
          deltaY
        } = e;
        if (!currSlide) {
          return;
        }
        if (this.pswp.dispatch("wheel", {
          originalEvent: e
        }).defaultPrevented) {
          return;
        }
        if (e.ctrlKey || this.pswp.options.wheelToZoom) {
          if (currSlide.isZoomable()) {
            let zoomFactor = -deltaY;
            if (e.deltaMode === 1) {
              zoomFactor *= 0.05;
            } else {
              zoomFactor *= e.deltaMode ? 1 : 2e-3;
            }
            zoomFactor = 2 ** zoomFactor;
            const destZoomLevel = currSlide.currZoomLevel * zoomFactor;
            currSlide.zoomTo(destZoomLevel, {
              x: e.clientX,
              y: e.clientY
            });
          }
        } else {
          if (currSlide.isPannable()) {
            if (e.deltaMode === 1) {
              deltaX *= 18;
              deltaY *= 18;
            }
            currSlide.panTo(currSlide.pan.x - deltaX, currSlide.pan.y - deltaY);
          }
        }
      }
    };
    UIElement = class {
      /**
       * @param {PhotoSwipe} pswp
       * @param {UIElementData} data
       */
      constructor(pswp, data) {
        var _container;
        const name = data.name || data.className;
        let elementHTML = data.html;
        if (pswp.options[name] === false) {
          return;
        }
        if (typeof pswp.options[name + "SVG"] === "string") {
          elementHTML = pswp.options[name + "SVG"];
        }
        pswp.dispatch("uiElementCreate", {
          data
        });
        let className = "";
        if (data.isButton) {
          className += "pswp__button ";
          className += data.className || `pswp__button--${data.name}`;
        } else {
          className += data.className || `pswp__${data.name}`;
        }
        let tagName = data.isButton ? data.tagName || "button" : data.tagName || "div";
        tagName = /** @type {keyof HTMLElementTagNameMap} */
        tagName.toLowerCase();
        const element = createElement2(className, tagName);
        if (data.isButton) {
          if (tagName === "button") {
            element.type = "button";
          }
          let {
            title
          } = data;
          const {
            ariaLabel
          } = data;
          if (typeof pswp.options[name + "Title"] === "string") {
            title = pswp.options[name + "Title"];
          }
          if (title) {
            element.title = title;
          }
          const ariaText = ariaLabel || title;
          if (ariaText) {
            element.setAttribute("aria-label", ariaText);
          }
        }
        element.innerHTML = addElementHTML(elementHTML);
        if (data.onInit) {
          data.onInit(element, pswp);
        }
        if (data.onClick) {
          element.onclick = (e) => {
            if (typeof data.onClick === "string") {
              pswp[data.onClick]();
            } else if (typeof data.onClick === "function") {
              data.onClick(e, element, pswp);
            }
          };
        }
        const appendTo = data.appendTo || "bar";
        let container = pswp.element;
        if (appendTo === "bar") {
          if (!pswp.topBar) {
            pswp.topBar = createElement2("pswp__top-bar pswp__hide-on-close", "div", pswp.scrollWrap);
          }
          container = pswp.topBar;
        } else {
          element.classList.add("pswp__hide-on-close");
          if (appendTo === "wrapper") {
            container = pswp.scrollWrap;
          }
        }
        (_container = container) === null || _container === void 0 || _container.appendChild(pswp.applyFilters("uiElement", element, data));
      }
    };
    arrowPrev = {
      name: "arrowPrev",
      className: "pswp__button--arrow--prev",
      title: "Previous",
      order: 10,
      isButton: true,
      appendTo: "wrapper",
      html: {
        isCustomSVG: true,
        size: 60,
        inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
        outlineID: "pswp__icn-arrow"
      },
      onClick: "prev",
      onInit: initArrowButton
    };
    arrowNext = {
      name: "arrowNext",
      className: "pswp__button--arrow--next",
      title: "Next",
      order: 11,
      isButton: true,
      appendTo: "wrapper",
      html: {
        isCustomSVG: true,
        size: 60,
        inner: '<use xlink:href="#pswp__icn-arrow"/>',
        outlineID: "pswp__icn-arrow"
      },
      onClick: "next",
      onInit: (el, pswp) => {
        initArrowButton(el, pswp, true);
      }
    };
    closeButton = {
      name: "close",
      title: "Close",
      order: 20,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
        outlineID: "pswp__icn-close"
      },
      onClick: "close"
    };
    zoomButton = {
      name: "zoom",
      title: "Zoom",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        // eslint-disable-next-line max-len
        inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
        outlineID: "pswp__icn-zoom"
      },
      onClick: "toggleZoom"
    };
    loadingIndicator = {
      name: "preloader",
      appendTo: "bar",
      order: 7,
      html: {
        isCustomSVG: true,
        // eslint-disable-next-line max-len
        inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
        outlineID: "pswp__icn-loading"
      },
      onInit: (indicatorElement, pswp) => {
        let isVisible;
        let delayTimeout = null;
        const toggleIndicatorClass = (className, add) => {
          indicatorElement.classList.toggle("pswp__preloader--" + className, add);
        };
        const setIndicatorVisibility = (visible) => {
          if (isVisible !== visible) {
            isVisible = visible;
            toggleIndicatorClass("active", visible);
          }
        };
        const updatePreloaderVisibility = () => {
          var _pswp$currSlide;
          if (!((_pswp$currSlide = pswp.currSlide) !== null && _pswp$currSlide !== void 0 && _pswp$currSlide.content.isLoading())) {
            setIndicatorVisibility(false);
            if (delayTimeout) {
              clearTimeout(delayTimeout);
              delayTimeout = null;
            }
            return;
          }
          if (!delayTimeout) {
            delayTimeout = setTimeout(() => {
              var _pswp$currSlide2;
              setIndicatorVisibility(Boolean((_pswp$currSlide2 = pswp.currSlide) === null || _pswp$currSlide2 === void 0 ? void 0 : _pswp$currSlide2.content.isLoading()));
              delayTimeout = null;
            }, pswp.options.preloaderDelay);
          }
        };
        pswp.on("change", updatePreloaderVisibility);
        pswp.on("loadComplete", (e) => {
          if (pswp.currSlide === e.slide) {
            updatePreloaderVisibility();
          }
        });
        if (pswp.ui) {
          pswp.ui.updatePreloaderVisibility = updatePreloaderVisibility;
        }
      }
    };
    counterIndicator = {
      name: "counter",
      order: 5,
      onInit: (counterElement, pswp) => {
        pswp.on("change", () => {
          counterElement.innerText = pswp.currIndex + 1 + pswp.options.indexIndicatorSep + pswp.getNumItems();
        });
      }
    };
    UI = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this.isRegistered = false;
        this.uiElementsData = [];
        this.items = [];
        this.updatePreloaderVisibility = () => {
        };
        this._lastUpdatedZoomLevel = void 0;
      }
      init() {
        const {
          pswp
        } = this;
        this.isRegistered = false;
        this.uiElementsData = [closeButton, arrowPrev, arrowNext, zoomButton, loadingIndicator, counterIndicator];
        pswp.dispatch("uiRegister");
        this.uiElementsData.sort((a, b) => {
          return (a.order || 0) - (b.order || 0);
        });
        this.items = [];
        this.isRegistered = true;
        this.uiElementsData.forEach((uiElementData) => {
          this.registerElement(uiElementData);
        });
        pswp.on("change", () => {
          var _pswp$element;
          (_pswp$element = pswp.element) === null || _pswp$element === void 0 || _pswp$element.classList.toggle("pswp--one-slide", pswp.getNumItems() === 1);
        });
        pswp.on("zoomPanUpdate", () => this._onZoomPanUpdate());
      }
      /**
       * @param {UIElementData} elementData
       */
      registerElement(elementData) {
        if (this.isRegistered) {
          this.items.push(new UIElement(this.pswp, elementData));
        } else {
          this.uiElementsData.push(elementData);
        }
      }
      /**
       * Fired each time zoom or pan position is changed.
       * Update classes that control visibility of zoom button and cursor icon.
       *
       * @private
       */
      _onZoomPanUpdate() {
        const {
          template,
          currSlide,
          options
        } = this.pswp;
        if (this.pswp.opener.isClosing || !template || !currSlide) {
          return;
        }
        let {
          currZoomLevel
        } = currSlide;
        if (!this.pswp.opener.isOpen) {
          currZoomLevel = currSlide.zoomLevels.initial;
        }
        if (currZoomLevel === this._lastUpdatedZoomLevel) {
          return;
        }
        this._lastUpdatedZoomLevel = currZoomLevel;
        const currZoomLevelDiff = currSlide.zoomLevels.initial - currSlide.zoomLevels.secondary;
        if (Math.abs(currZoomLevelDiff) < 0.01 || !currSlide.isZoomable()) {
          setZoomedIn(template, false);
          template.classList.remove("pswp--zoom-allowed");
          return;
        }
        template.classList.add("pswp--zoom-allowed");
        const potentialZoomLevel = currZoomLevel === currSlide.zoomLevels.initial ? currSlide.zoomLevels.secondary : currSlide.zoomLevels.initial;
        setZoomedIn(template, potentialZoomLevel <= currZoomLevel);
        if (options.imageClickAction === "zoom" || options.imageClickAction === "zoom-or-close") {
          template.classList.add("pswp--click-to-zoom");
        }
      }
    };
    PhotoSwipeEvent2 = class {
      /**
       * @param {T} type
       * @param {PhotoSwipeEventsMap[T]} [details]
       */
      constructor(type, details) {
        this.type = type;
        this.defaultPrevented = false;
        if (details) {
          Object.assign(this, details);
        }
      }
      preventDefault() {
        this.defaultPrevented = true;
      }
    };
    Eventable2 = class {
      constructor() {
        this._listeners = {};
        this._filters = {};
        this.pswp = void 0;
        this.options = void 0;
      }
      /**
       * @template {keyof PhotoSwipeFiltersMap} T
       * @param {T} name
       * @param {PhotoSwipeFiltersMap[T]} fn
       * @param {number} priority
       */
      addFilter(name, fn, priority = 100) {
        var _this$_filters$name, _this$_filters$name2, _this$pswp;
        if (!this._filters[name]) {
          this._filters[name] = [];
        }
        (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
          fn,
          priority
        });
        (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
        (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
      }
      /**
       * @template {keyof PhotoSwipeFiltersMap} T
       * @param {T} name
       * @param {PhotoSwipeFiltersMap[T]} fn
       */
      removeFilter(name, fn) {
        if (this._filters[name]) {
          this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
        }
        if (this.pswp) {
          this.pswp.removeFilter(name, fn);
        }
      }
      /**
       * @template {keyof PhotoSwipeFiltersMap} T
       * @param {T} name
       * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
       * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
       */
      applyFilters(name, ...args) {
        var _this$_filters$name3;
        (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach((filter) => {
          args[0] = filter.fn.apply(this, args);
        });
        return args[0];
      }
      /**
       * @template {keyof PhotoSwipeEventsMap} T
       * @param {T} name
       * @param {EventCallback<T>} fn
       */
      on(name, fn) {
        var _this$_listeners$name, _this$pswp2;
        if (!this._listeners[name]) {
          this._listeners[name] = [];
        }
        (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn);
        (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
      }
      /**
       * @template {keyof PhotoSwipeEventsMap} T
       * @param {T} name
       * @param {EventCallback<T>} fn
       */
      off(name, fn) {
        var _this$pswp3;
        if (this._listeners[name]) {
          this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
        }
        (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
      }
      /**
       * @template {keyof PhotoSwipeEventsMap} T
       * @param {T} name
       * @param {PhotoSwipeEventsMap[T]} [details]
       * @returns {AugmentedEvent<T>}
       */
      dispatch(name, details) {
        var _this$_listeners$name2;
        if (this.pswp) {
          return this.pswp.dispatch(name, details);
        }
        const event = (
          /** @type {AugmentedEvent<T>} */
          new PhotoSwipeEvent2(name, details)
        );
        (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach((listener) => {
          listener.call(this, event);
        });
        return event;
      }
    };
    Placeholder2 = class {
      /**
       * @param {string | false} imageSrc
       * @param {HTMLElement} container
       */
      constructor(imageSrc, container) {
        this.element = createElement2("pswp__img pswp__img--placeholder", imageSrc ? "img" : "div", container);
        if (imageSrc) {
          const imgEl = (
            /** @type {HTMLImageElement} */
            this.element
          );
          imgEl.decoding = "async";
          imgEl.alt = "";
          imgEl.src = imageSrc;
          imgEl.setAttribute("role", "presentation");
        }
        this.element.setAttribute("aria-hidden", "true");
      }
      /**
       * @param {number} width
       * @param {number} height
       */
      setDisplayedSize(width, height) {
        if (!this.element) {
          return;
        }
        if (this.element.tagName === "IMG") {
          setWidthHeight2(this.element, 250, "auto");
          this.element.style.transformOrigin = "0 0";
          this.element.style.transform = toTransformString2(0, 0, width / 250);
        } else {
          setWidthHeight2(this.element, width, height);
        }
      }
      destroy() {
        var _this$element;
        if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
          this.element.remove();
        }
        this.element = null;
      }
    };
    Content2 = class {
      /**
       * @param {SlideData} itemData Slide data
       * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
       * @param {number} index
       */
      constructor(itemData, instance, index) {
        this.instance = instance;
        this.data = itemData;
        this.index = index;
        this.element = void 0;
        this.placeholder = void 0;
        this.slide = void 0;
        this.displayedImageWidth = 0;
        this.displayedImageHeight = 0;
        this.width = Number(this.data.w) || Number(this.data.width) || 0;
        this.height = Number(this.data.h) || Number(this.data.height) || 0;
        this.isAttached = false;
        this.hasSlide = false;
        this.isDecoding = false;
        this.state = LOAD_STATE2.IDLE;
        if (this.data.type) {
          this.type = this.data.type;
        } else if (this.data.src) {
          this.type = "image";
        } else {
          this.type = "html";
        }
        this.instance.dispatch("contentInit", {
          content: this
        });
      }
      removePlaceholder() {
        if (this.placeholder && !this.keepPlaceholder()) {
          setTimeout(() => {
            if (this.placeholder) {
              this.placeholder.destroy();
              this.placeholder = void 0;
            }
          }, 1e3);
        }
      }
      /**
       * Preload content
       *
       * @param {boolean} isLazy
       * @param {boolean} [reload]
       */
      load(isLazy, reload) {
        if (this.slide && this.usePlaceholder()) {
          if (!this.placeholder) {
            const placeholderSrc = this.instance.applyFilters(
              "placeholderSrc",
              // use  image-based placeholder only for the first slide,
              // as rendering (even small stretched thumbnail) is an expensive operation
              this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
              this
            );
            this.placeholder = new Placeholder2(placeholderSrc, this.slide.container);
          } else {
            const placeholderEl = this.placeholder.element;
            if (placeholderEl && !placeholderEl.parentElement) {
              this.slide.container.prepend(placeholderEl);
            }
          }
        }
        if (this.element && !reload) {
          return;
        }
        if (this.instance.dispatch("contentLoad", {
          content: this,
          isLazy
        }).defaultPrevented) {
          return;
        }
        if (this.isImageContent()) {
          this.element = createElement2("pswp__img", "img");
          if (this.displayedImageWidth) {
            this.loadImage(isLazy);
          }
        } else {
          this.element = createElement2("pswp__content", "div");
          this.element.innerHTML = this.data.html || "";
        }
        if (reload && this.slide) {
          this.slide.updateContentSize(true);
        }
      }
      /**
       * Preload image
       *
       * @param {boolean} isLazy
       */
      loadImage(isLazy) {
        var _this$data$src, _this$data$alt;
        if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
          content: this,
          isLazy
        }).defaultPrevented) {
          return;
        }
        const imageElement = (
          /** @type HTMLImageElement */
          this.element
        );
        this.updateSrcsetSizes();
        if (this.data.srcset) {
          imageElement.srcset = this.data.srcset;
        }
        imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : "";
        imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : "";
        this.state = LOAD_STATE2.LOADING;
        if (imageElement.complete) {
          this.onLoaded();
        } else {
          imageElement.onload = () => {
            this.onLoaded();
          };
          imageElement.onerror = () => {
            this.onError();
          };
        }
      }
      /**
       * Assign slide to content
       *
       * @param {Slide} slide
       */
      setSlide(slide) {
        this.slide = slide;
        this.hasSlide = true;
        this.instance = slide.pswp;
      }
      /**
       * Content load success handler
       */
      onLoaded() {
        this.state = LOAD_STATE2.LOADED;
        if (this.slide && this.element) {
          this.instance.dispatch("loadComplete", {
            slide: this.slide,
            content: this
          });
          if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
            this.append();
            this.slide.updateContentSize(true);
          }
          if (this.state === LOAD_STATE2.LOADED || this.state === LOAD_STATE2.ERROR) {
            this.removePlaceholder();
          }
        }
      }
      /**
       * Content load error handler
       */
      onError() {
        this.state = LOAD_STATE2.ERROR;
        if (this.slide) {
          this.displayError();
          this.instance.dispatch("loadComplete", {
            slide: this.slide,
            isError: true,
            content: this
          });
          this.instance.dispatch("loadError", {
            slide: this.slide,
            content: this
          });
        }
      }
      /**
       * @returns {Boolean} If the content is currently loading
       */
      isLoading() {
        return this.instance.applyFilters("isContentLoading", this.state === LOAD_STATE2.LOADING, this);
      }
      /**
       * @returns {Boolean} If the content is in error state
       */
      isError() {
        return this.state === LOAD_STATE2.ERROR;
      }
      /**
       * @returns {boolean} If the content is image
       */
      isImageContent() {
        return this.type === "image";
      }
      /**
       * Update content size
       *
       * @param {Number} width
       * @param {Number} height
       */
      setDisplayedSize(width, height) {
        if (!this.element) {
          return;
        }
        if (this.placeholder) {
          this.placeholder.setDisplayedSize(width, height);
        }
        if (this.instance.dispatch("contentResize", {
          content: this,
          width,
          height
        }).defaultPrevented) {
          return;
        }
        setWidthHeight2(this.element, width, height);
        if (this.isImageContent() && !this.isError()) {
          const isInitialSizeUpdate = !this.displayedImageWidth && width;
          this.displayedImageWidth = width;
          this.displayedImageHeight = height;
          if (isInitialSizeUpdate) {
            this.loadImage(false);
          } else {
            this.updateSrcsetSizes();
          }
          if (this.slide) {
            this.instance.dispatch("imageSizeChange", {
              slide: this.slide,
              width,
              height,
              content: this
            });
          }
        }
      }
      /**
       * @returns {boolean} If the content can be zoomed
       */
      isZoomable() {
        return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== LOAD_STATE2.ERROR, this);
      }
      /**
       * Update image srcset sizes attribute based on width and height
       */
      updateSrcsetSizes() {
        if (!this.isImageContent() || !this.element || !this.data.srcset) {
          return;
        }
        const image = (
          /** @type HTMLImageElement */
          this.element
        );
        const sizesWidth = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
        if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
          image.sizes = sizesWidth + "px";
          image.dataset.largestUsedSize = String(sizesWidth);
        }
      }
      /**
       * @returns {boolean} If content should use a placeholder (from msrc by default)
       */
      usePlaceholder() {
        return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
      }
      /**
       * Preload content with lazy-loading param
       */
      lazyLoad() {
        if (this.instance.dispatch("contentLazyLoad", {
          content: this
        }).defaultPrevented) {
          return;
        }
        this.load(true);
      }
      /**
       * @returns {boolean} If placeholder should be kept after content is loaded
       */
      keepPlaceholder() {
        return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
      }
      /**
       * Destroy the content
       */
      destroy() {
        this.hasSlide = false;
        this.slide = void 0;
        if (this.instance.dispatch("contentDestroy", {
          content: this
        }).defaultPrevented) {
          return;
        }
        this.remove();
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = void 0;
        }
        if (this.isImageContent() && this.element) {
          this.element.onload = null;
          this.element.onerror = null;
          this.element = void 0;
        }
      }
      /**
       * Display error message
       */
      displayError() {
        if (this.slide) {
          var _this$instance$option, _this$instance$option2;
          let errorMsgEl = createElement2("pswp__error-msg", "div");
          errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : "";
          errorMsgEl = /** @type {HTMLDivElement} */
          this.instance.applyFilters("contentErrorElement", errorMsgEl, this);
          this.element = createElement2("pswp__content pswp__error-msg-container", "div");
          this.element.appendChild(errorMsgEl);
          this.slide.container.innerText = "";
          this.slide.container.appendChild(this.element);
          this.slide.updateContentSize(true);
          this.removePlaceholder();
        }
      }
      /**
       * Append the content
       */
      append() {
        if (this.isAttached || !this.element) {
          return;
        }
        this.isAttached = true;
        if (this.state === LOAD_STATE2.ERROR) {
          this.displayError();
          return;
        }
        if (this.instance.dispatch("contentAppend", {
          content: this
        }).defaultPrevented) {
          return;
        }
        const supportsDecode = "decode" in this.element;
        if (this.isImageContent()) {
          if (supportsDecode && this.slide && (!this.slide.isActive || isSafari2())) {
            this.isDecoding = true;
            this.element.decode().catch(() => {
            }).finally(() => {
              this.isDecoding = false;
              this.appendImage();
            });
          } else {
            this.appendImage();
          }
        } else if (this.slide && !this.element.parentNode) {
          this.slide.container.appendChild(this.element);
        }
      }
      /**
       * Activate the slide,
       * active slide is generally the current one,
       * meaning the user can see it.
       */
      activate() {
        if (this.instance.dispatch("contentActivate", {
          content: this
        }).defaultPrevented || !this.slide) {
          return;
        }
        if (this.isImageContent() && this.isDecoding && !isSafari2()) {
          this.appendImage();
        } else if (this.isError()) {
          this.load(false, true);
        }
        if (this.slide.holderElement) {
          this.slide.holderElement.setAttribute("aria-hidden", "false");
        }
      }
      /**
       * Deactivate the content
       */
      deactivate() {
        this.instance.dispatch("contentDeactivate", {
          content: this
        });
        if (this.slide && this.slide.holderElement) {
          this.slide.holderElement.setAttribute("aria-hidden", "true");
        }
      }
      /**
       * Remove the content from DOM
       */
      remove() {
        this.isAttached = false;
        if (this.instance.dispatch("contentRemove", {
          content: this
        }).defaultPrevented) {
          return;
        }
        if (this.element && this.element.parentNode) {
          this.element.remove();
        }
        if (this.placeholder && this.placeholder.element) {
          this.placeholder.element.remove();
        }
      }
      /**
       * Append the image content to slide container
       */
      appendImage() {
        if (!this.isAttached) {
          return;
        }
        if (this.instance.dispatch("contentAppendImage", {
          content: this
        }).defaultPrevented) {
          return;
        }
        if (this.slide && this.element && !this.element.parentNode) {
          this.slide.container.appendChild(this.element);
        }
        if (this.state === LOAD_STATE2.LOADED || this.state === LOAD_STATE2.ERROR) {
          this.removePlaceholder();
        }
      }
    };
    MIN_SLIDES_TO_CACHE = 5;
    ContentLoader = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this.limit = Math.max(pswp.options.preload[0] + pswp.options.preload[1] + 1, MIN_SLIDES_TO_CACHE);
        this._cachedItems = [];
      }
      /**
       * Lazy load nearby slides based on `preload` option.
       *
       * @param {number} [diff] Difference between slide indexes that was changed recently, or 0.
       */
      updateLazy(diff) {
        const {
          pswp
        } = this;
        if (pswp.dispatch("lazyLoad").defaultPrevented) {
          return;
        }
        const {
          preload
        } = pswp.options;
        const isForward = diff === void 0 ? true : diff >= 0;
        let i;
        for (i = 0; i <= preload[1]; i++) {
          this.loadSlideByIndex(pswp.currIndex + (isForward ? i : -i));
        }
        for (i = 1; i <= preload[0]; i++) {
          this.loadSlideByIndex(pswp.currIndex + (isForward ? -i : i));
        }
      }
      /**
       * @param {number} initialIndex
       */
      loadSlideByIndex(initialIndex) {
        const index = this.pswp.getLoopedIndex(initialIndex);
        let content = this.getContentByIndex(index);
        if (!content) {
          content = lazyLoadSlide2(index, this.pswp);
          if (content) {
            this.addToCache(content);
          }
        }
      }
      /**
       * @param {Slide} slide
       * @returns {Content}
       */
      getContentBySlide(slide) {
        let content = this.getContentByIndex(slide.index);
        if (!content) {
          content = this.pswp.createContentFromData(slide.data, slide.index);
          this.addToCache(content);
        }
        content.setSlide(slide);
        return content;
      }
      /**
       * @param {Content} content
       */
      addToCache(content) {
        this.removeByIndex(content.index);
        this._cachedItems.push(content);
        if (this._cachedItems.length > this.limit) {
          const indexToRemove = this._cachedItems.findIndex((item) => {
            return !item.isAttached && !item.hasSlide;
          });
          if (indexToRemove !== -1) {
            const removedItem = this._cachedItems.splice(indexToRemove, 1)[0];
            removedItem.destroy();
          }
        }
      }
      /**
       * Removes an image from cache, does not destroy() it, just removes.
       *
       * @param {number} index
       */
      removeByIndex(index) {
        const indexToRemove = this._cachedItems.findIndex((item) => item.index === index);
        if (indexToRemove !== -1) {
          this._cachedItems.splice(indexToRemove, 1);
        }
      }
      /**
       * @param {number} index
       * @returns {Content | undefined}
       */
      getContentByIndex(index) {
        return this._cachedItems.find((content) => content.index === index);
      }
      destroy() {
        this._cachedItems.forEach((content) => content.destroy());
        this._cachedItems = [];
      }
    };
    PhotoSwipeBase2 = class extends Eventable2 {
      /**
       * Get total number of slides
       *
       * @returns {number}
       */
      getNumItems() {
        var _this$options;
        let numItems = 0;
        const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;
        if (dataSource && "length" in dataSource) {
          numItems = dataSource.length;
        } else if (dataSource && "gallery" in dataSource) {
          if (!dataSource.items) {
            dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
          }
          if (dataSource.items) {
            numItems = dataSource.items.length;
          }
        }
        const event = this.dispatch("numItems", {
          dataSource,
          numItems
        });
        return this.applyFilters("numItems", event.numItems, dataSource);
      }
      /**
       * @param {SlideData} slideData
       * @param {number} index
       * @returns {Content}
       */
      createContentFromData(slideData, index) {
        return new Content2(slideData, this, index);
      }
      /**
       * Get item data by index.
       *
       * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
       * For example, it may contain properties like
       * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
       *
       * @param {number} index
       * @returns {SlideData}
       */
      getItemData(index) {
        var _this$options2;
        const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
        let dataSourceItem = {};
        if (Array.isArray(dataSource)) {
          dataSourceItem = dataSource[index];
        } else if (dataSource && "gallery" in dataSource) {
          if (!dataSource.items) {
            dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
          }
          dataSourceItem = dataSource.items[index];
        }
        let itemData = dataSourceItem;
        if (itemData instanceof Element) {
          itemData = this._domElementToItemData(itemData);
        }
        const event = this.dispatch("itemData", {
          itemData: itemData || {},
          index
        });
        return this.applyFilters("itemData", event.itemData, index);
      }
      /**
       * Get array of gallery DOM elements,
       * based on childSelector and gallery element.
       *
       * @param {HTMLElement} galleryElement
       * @returns {HTMLElement[]}
       */
      _getGalleryDOMElements(galleryElement) {
        var _this$options3, _this$options4;
        if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
          return getElementsFromOption2(this.options.children, this.options.childSelector, galleryElement) || [];
        }
        return [galleryElement];
      }
      /**
       * Converts DOM element to item data object.
       *
       * @param {HTMLElement} element DOM element
       * @returns {SlideData}
       */
      _domElementToItemData(element) {
        const itemData = {
          element
        };
        const linkEl = (
          /** @type {HTMLAnchorElement} */
          element.tagName === "A" ? element : element.querySelector("a")
        );
        if (linkEl) {
          itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
          if (linkEl.dataset.pswpSrcset) {
            itemData.srcset = linkEl.dataset.pswpSrcset;
          }
          itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
          itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
          itemData.w = itemData.width;
          itemData.h = itemData.height;
          if (linkEl.dataset.pswpType) {
            itemData.type = linkEl.dataset.pswpType;
          }
          const thumbnailEl = element.querySelector("img");
          if (thumbnailEl) {
            var _thumbnailEl$getAttri;
            itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
            itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute("alt")) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : "";
          }
          if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
            itemData.thumbCropped = true;
          }
        }
        return this.applyFilters("domItemData", itemData, element, linkEl);
      }
      /**
       * Lazy-load by slide data
       *
       * @param {SlideData} itemData Data about the slide
       * @param {number} index
       * @returns {Content} Image that is being decoded or false.
       */
      lazyLoadData(itemData, index) {
        return lazyLoadData2(itemData, this, index);
      }
    };
    MIN_OPACITY = 3e-3;
    Opener = class {
      /**
       * @param {PhotoSwipe} pswp
       */
      constructor(pswp) {
        this.pswp = pswp;
        this.isClosed = true;
        this.isOpen = false;
        this.isClosing = false;
        this.isOpening = false;
        this._duration = void 0;
        this._useAnimation = false;
        this._croppedZoom = false;
        this._animateRootOpacity = false;
        this._animateBgOpacity = false;
        this._placeholder = void 0;
        this._opacityElement = void 0;
        this._cropContainer1 = void 0;
        this._cropContainer2 = void 0;
        this._thumbBounds = void 0;
        this._prepareOpen = this._prepareOpen.bind(this);
        pswp.on("firstZoomPan", this._prepareOpen);
      }
      open() {
        this._prepareOpen();
        this._start();
      }
      close() {
        if (this.isClosed || this.isClosing || this.isOpening) {
          return;
        }
        const slide = this.pswp.currSlide;
        this.isOpen = false;
        this.isOpening = false;
        this.isClosing = true;
        this._duration = this.pswp.options.hideAnimationDuration;
        if (slide && slide.currZoomLevel * slide.width >= this.pswp.options.maxWidthToAnimate) {
          this._duration = 0;
        }
        this._applyStartProps();
        setTimeout(() => {
          this._start();
        }, this._croppedZoom ? 30 : 0);
      }
      /** @private */
      _prepareOpen() {
        this.pswp.off("firstZoomPan", this._prepareOpen);
        if (!this.isOpening) {
          const slide = this.pswp.currSlide;
          this.isOpening = true;
          this.isClosing = false;
          this._duration = this.pswp.options.showAnimationDuration;
          if (slide && slide.zoomLevels.initial * slide.width >= this.pswp.options.maxWidthToAnimate) {
            this._duration = 0;
          }
          this._applyStartProps();
        }
      }
      /** @private */
      _applyStartProps() {
        const {
          pswp
        } = this;
        const slide = this.pswp.currSlide;
        const {
          options
        } = pswp;
        if (options.showHideAnimationType === "fade") {
          options.showHideOpacity = true;
          this._thumbBounds = void 0;
        } else if (options.showHideAnimationType === "none") {
          options.showHideOpacity = false;
          this._duration = 0;
          this._thumbBounds = void 0;
        } else if (this.isOpening && pswp._initialThumbBounds) {
          this._thumbBounds = pswp._initialThumbBounds;
        } else {
          this._thumbBounds = this.pswp.getThumbBounds();
        }
        this._placeholder = slide === null || slide === void 0 ? void 0 : slide.getPlaceholderElement();
        pswp.animations.stopAll();
        this._useAnimation = Boolean(this._duration && this._duration > 50);
        this._animateZoom = Boolean(this._thumbBounds) && (slide === null || slide === void 0 ? void 0 : slide.content.usePlaceholder()) && (!this.isClosing || !pswp.mainScroll.isShifted());
        if (!this._animateZoom) {
          this._animateRootOpacity = true;
          if (this.isOpening && slide) {
            slide.zoomAndPanToInitial();
            slide.applyCurrentZoomPan();
          }
        } else {
          var _options$showHideOpac;
          this._animateRootOpacity = (_options$showHideOpac = options.showHideOpacity) !== null && _options$showHideOpac !== void 0 ? _options$showHideOpac : false;
        }
        this._animateBgOpacity = !this._animateRootOpacity && this.pswp.options.bgOpacity > MIN_OPACITY;
        this._opacityElement = this._animateRootOpacity ? pswp.element : pswp.bg;
        if (!this._useAnimation) {
          this._duration = 0;
          this._animateZoom = false;
          this._animateBgOpacity = false;
          this._animateRootOpacity = true;
          if (this.isOpening) {
            if (pswp.element) {
              pswp.element.style.opacity = String(MIN_OPACITY);
            }
            pswp.applyBgOpacity(1);
          }
          return;
        }
        if (this._animateZoom && this._thumbBounds && this._thumbBounds.innerRect) {
          var _this$pswp$currSlide;
          this._croppedZoom = true;
          this._cropContainer1 = this.pswp.container;
          this._cropContainer2 = (_this$pswp$currSlide = this.pswp.currSlide) === null || _this$pswp$currSlide === void 0 ? void 0 : _this$pswp$currSlide.holderElement;
          if (pswp.container) {
            pswp.container.style.overflow = "hidden";
            pswp.container.style.width = pswp.viewportSize.x + "px";
          }
        } else {
          this._croppedZoom = false;
        }
        if (this.isOpening) {
          if (this._animateRootOpacity) {
            if (pswp.element) {
              pswp.element.style.opacity = String(MIN_OPACITY);
            }
            pswp.applyBgOpacity(1);
          } else {
            if (this._animateBgOpacity && pswp.bg) {
              pswp.bg.style.opacity = String(MIN_OPACITY);
            }
            if (pswp.element) {
              pswp.element.style.opacity = "1";
            }
          }
          if (this._animateZoom) {
            this._setClosedStateZoomPan();
            if (this._placeholder) {
              this._placeholder.style.willChange = "transform";
              this._placeholder.style.opacity = String(MIN_OPACITY);
            }
          }
        } else if (this.isClosing) {
          if (pswp.mainScroll.itemHolders[0]) {
            pswp.mainScroll.itemHolders[0].el.style.display = "none";
          }
          if (pswp.mainScroll.itemHolders[2]) {
            pswp.mainScroll.itemHolders[2].el.style.display = "none";
          }
          if (this._croppedZoom) {
            if (pswp.mainScroll.x !== 0) {
              pswp.mainScroll.resetPosition();
              pswp.mainScroll.resize();
            }
          }
        }
      }
      /** @private */
      _start() {
        if (this.isOpening && this._useAnimation && this._placeholder && this._placeholder.tagName === "IMG") {
          new Promise((resolve) => {
            let decoded = false;
            let isDelaying = true;
            decodeImage(
              /** @type {HTMLImageElement} */
              this._placeholder
            ).finally(() => {
              decoded = true;
              if (!isDelaying) {
                resolve(true);
              }
            });
            setTimeout(() => {
              isDelaying = false;
              if (decoded) {
                resolve(true);
              }
            }, 50);
            setTimeout(resolve, 250);
          }).finally(() => this._initiate());
        } else {
          this._initiate();
        }
      }
      /** @private */
      _initiate() {
        var _this$pswp$element, _this$pswp$element2;
        (_this$pswp$element = this.pswp.element) === null || _this$pswp$element === void 0 || _this$pswp$element.style.setProperty("--pswp-transition-duration", this._duration + "ms");
        this.pswp.dispatch(this.isOpening ? "openingAnimationStart" : "closingAnimationStart");
        this.pswp.dispatch(
          /** @type {'initialZoomIn' | 'initialZoomOut'} */
          "initialZoom" + (this.isOpening ? "In" : "Out")
        );
        (_this$pswp$element2 = this.pswp.element) === null || _this$pswp$element2 === void 0 || _this$pswp$element2.classList.toggle("pswp--ui-visible", this.isOpening);
        if (this.isOpening) {
          if (this._placeholder) {
            this._placeholder.style.opacity = "1";
          }
          this._animateToOpenState();
        } else if (this.isClosing) {
          this._animateToClosedState();
        }
        if (!this._useAnimation) {
          this._onAnimationComplete();
        }
      }
      /** @private */
      _onAnimationComplete() {
        const {
          pswp
        } = this;
        this.isOpen = this.isOpening;
        this.isClosed = this.isClosing;
        this.isOpening = false;
        this.isClosing = false;
        pswp.dispatch(this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd");
        pswp.dispatch(
          /** @type {'initialZoomInEnd' | 'initialZoomOutEnd'} */
          "initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")
        );
        if (this.isClosed) {
          pswp.destroy();
        } else if (this.isOpen) {
          var _pswp$currSlide;
          if (this._animateZoom && pswp.container) {
            pswp.container.style.overflow = "visible";
            pswp.container.style.width = "100%";
          }
          (_pswp$currSlide = pswp.currSlide) === null || _pswp$currSlide === void 0 || _pswp$currSlide.applyCurrentZoomPan();
        }
      }
      /** @private */
      _animateToOpenState() {
        const {
          pswp
        } = this;
        if (this._animateZoom) {
          if (this._croppedZoom && this._cropContainer1 && this._cropContainer2) {
            this._animateTo(this._cropContainer1, "transform", "translate3d(0,0,0)");
            this._animateTo(this._cropContainer2, "transform", "none");
          }
          if (pswp.currSlide) {
            pswp.currSlide.zoomAndPanToInitial();
            this._animateTo(pswp.currSlide.container, "transform", pswp.currSlide.getCurrentTransform());
          }
        }
        if (this._animateBgOpacity && pswp.bg) {
          this._animateTo(pswp.bg, "opacity", String(pswp.options.bgOpacity));
        }
        if (this._animateRootOpacity && pswp.element) {
          this._animateTo(pswp.element, "opacity", "1");
        }
      }
      /** @private */
      _animateToClosedState() {
        const {
          pswp
        } = this;
        if (this._animateZoom) {
          this._setClosedStateZoomPan(true);
        }
        if (this._animateBgOpacity && pswp.bgOpacity > 0.01 && pswp.bg) {
          this._animateTo(pswp.bg, "opacity", "0");
        }
        if (this._animateRootOpacity && pswp.element) {
          this._animateTo(pswp.element, "opacity", "0");
        }
      }
      /**
       * @private
       * @param {boolean} [animate]
       */
      _setClosedStateZoomPan(animate) {
        if (!this._thumbBounds) return;
        const {
          pswp
        } = this;
        const {
          innerRect
        } = this._thumbBounds;
        const {
          currSlide,
          viewportSize
        } = pswp;
        if (this._croppedZoom && innerRect && this._cropContainer1 && this._cropContainer2) {
          const containerOnePanX = -viewportSize.x + (this._thumbBounds.x - innerRect.x) + innerRect.w;
          const containerOnePanY = -viewportSize.y + (this._thumbBounds.y - innerRect.y) + innerRect.h;
          const containerTwoPanX = viewportSize.x - innerRect.w;
          const containerTwoPanY = viewportSize.y - innerRect.h;
          if (animate) {
            this._animateTo(this._cropContainer1, "transform", toTransformString2(containerOnePanX, containerOnePanY));
            this._animateTo(this._cropContainer2, "transform", toTransformString2(containerTwoPanX, containerTwoPanY));
          } else {
            setTransform(this._cropContainer1, containerOnePanX, containerOnePanY);
            setTransform(this._cropContainer2, containerTwoPanX, containerTwoPanY);
          }
        }
        if (currSlide) {
          equalizePoints(currSlide.pan, innerRect || this._thumbBounds);
          currSlide.currZoomLevel = this._thumbBounds.w / currSlide.width;
          if (animate) {
            this._animateTo(currSlide.container, "transform", currSlide.getCurrentTransform());
          } else {
            currSlide.applyCurrentZoomPan();
          }
        }
      }
      /**
       * @private
       * @param {HTMLElement} target
       * @param {'transform' | 'opacity'} prop
       * @param {string} propValue
       */
      _animateTo(target, prop, propValue) {
        if (!this._duration) {
          target.style[prop] = propValue;
          return;
        }
        const {
          animations
        } = this.pswp;
        const animProps = {
          duration: this._duration,
          easing: this.pswp.options.easing,
          onComplete: () => {
            if (!animations.activeAnimations.length) {
              this._onAnimationComplete();
            }
          },
          target
        };
        animProps[prop] = propValue;
        animations.startTransition(animProps);
      }
    };
    defaultOptions = {
      allowPanToNext: true,
      spacing: 0.1,
      loop: true,
      pinchToClose: true,
      closeOnVerticalDrag: true,
      hideAnimationDuration: 333,
      showAnimationDuration: 333,
      zoomAnimationDuration: 333,
      escKey: true,
      arrowKeys: true,
      trapFocus: true,
      returnFocus: true,
      maxWidthToAnimate: 4e3,
      clickToCloseNonZoomable: true,
      imageClickAction: "zoom-or-close",
      bgClickAction: "close",
      tapAction: "toggle-controls",
      doubleTapAction: "zoom",
      indexIndicatorSep: " / ",
      preloaderDelay: 2e3,
      bgOpacity: 0.8,
      index: 0,
      errorMsg: "The image cannot be loaded",
      preload: [1, 2],
      easing: "cubic-bezier(.4,0,.22,1)"
    };
    PhotoSwipe = class extends PhotoSwipeBase2 {
      /**
       * @param {PhotoSwipeOptions} [options]
       */
      constructor(options) {
        super();
        this.options = this._prepareOptions(options || {});
        this.offset = {
          x: 0,
          y: 0
        };
        this._prevViewportSize = {
          x: 0,
          y: 0
        };
        this.viewportSize = {
          x: 0,
          y: 0
        };
        this.bgOpacity = 1;
        this.currIndex = 0;
        this.potentialIndex = 0;
        this.isOpen = false;
        this.isDestroying = false;
        this.hasMouse = false;
        this._initialItemData = {};
        this._initialThumbBounds = void 0;
        this.topBar = void 0;
        this.element = void 0;
        this.template = void 0;
        this.container = void 0;
        this.scrollWrap = void 0;
        this.currSlide = void 0;
        this.events = new DOMEvents();
        this.animations = new Animations();
        this.mainScroll = new MainScroll(this);
        this.gestures = new Gestures(this);
        this.opener = new Opener(this);
        this.keyboard = new Keyboard(this);
        this.contentLoader = new ContentLoader(this);
      }
      /** @returns {boolean} */
      init() {
        if (this.isOpen || this.isDestroying) {
          return false;
        }
        this.isOpen = true;
        this.dispatch("init");
        this.dispatch("beforeOpen");
        this._createMainStructure();
        let rootClasses = "pswp--open";
        if (this.gestures.supportsTouch) {
          rootClasses += " pswp--touch";
        }
        if (this.options.mainClass) {
          rootClasses += " " + this.options.mainClass;
        }
        if (this.element) {
          this.element.className += " " + rootClasses;
        }
        this.currIndex = this.options.index || 0;
        this.potentialIndex = this.currIndex;
        this.dispatch("firstUpdate");
        this.scrollWheel = new ScrollWheel(this);
        if (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) {
          this.currIndex = 0;
        }
        if (!this.gestures.supportsTouch) {
          this.mouseDetected();
        }
        this.updateSize();
        this.offset.y = window.pageYOffset;
        this._initialItemData = this.getItemData(this.currIndex);
        this.dispatch("gettingData", {
          index: this.currIndex,
          data: this._initialItemData,
          slide: void 0
        });
        this._initialThumbBounds = this.getThumbBounds();
        this.dispatch("initialLayout");
        this.on("openingAnimationEnd", () => {
          const {
            itemHolders
          } = this.mainScroll;
          if (itemHolders[0]) {
            itemHolders[0].el.style.display = "block";
            this.setContent(itemHolders[0], this.currIndex - 1);
          }
          if (itemHolders[2]) {
            itemHolders[2].el.style.display = "block";
            this.setContent(itemHolders[2], this.currIndex + 1);
          }
          this.appendHeavy();
          this.contentLoader.updateLazy();
          this.events.add(window, "resize", this._handlePageResize.bind(this));
          this.events.add(window, "scroll", this._updatePageScrollOffset.bind(this));
          this.dispatch("bindEvents");
        });
        if (this.mainScroll.itemHolders[1]) {
          this.setContent(this.mainScroll.itemHolders[1], this.currIndex);
        }
        this.dispatch("change");
        this.opener.open();
        this.dispatch("afterInit");
        return true;
      }
      /**
       * Get looped slide index
       * (for example, -1 will return the last slide)
       *
       * @param {number} index
       * @returns {number}
       */
      getLoopedIndex(index) {
        const numSlides = this.getNumItems();
        if (this.options.loop) {
          if (index > numSlides - 1) {
            index -= numSlides;
          }
          if (index < 0) {
            index += numSlides;
          }
        }
        return clamp(index, 0, numSlides - 1);
      }
      appendHeavy() {
        this.mainScroll.itemHolders.forEach((itemHolder) => {
          var _itemHolder$slide;
          (_itemHolder$slide = itemHolder.slide) === null || _itemHolder$slide === void 0 || _itemHolder$slide.appendHeavy();
        });
      }
      /**
       * Change the slide
       * @param {number} index New index
       */
      goTo(index) {
        this.mainScroll.moveIndexBy(this.getLoopedIndex(index) - this.potentialIndex);
      }
      /**
       * Go to the next slide.
       */
      next() {
        this.goTo(this.potentialIndex + 1);
      }
      /**
       * Go to the previous slide.
       */
      prev() {
        this.goTo(this.potentialIndex - 1);
      }
      /**
       * @see slide/slide.js zoomTo
       *
       * @param {Parameters<Slide['zoomTo']>} args
       */
      zoomTo(...args) {
        var _this$currSlide;
        (_this$currSlide = this.currSlide) === null || _this$currSlide === void 0 || _this$currSlide.zoomTo(...args);
      }
      /**
       * @see slide/slide.js toggleZoom
       */
      toggleZoom() {
        var _this$currSlide2;
        (_this$currSlide2 = this.currSlide) === null || _this$currSlide2 === void 0 || _this$currSlide2.toggleZoom();
      }
      /**
       * Close the gallery.
       * After closing transition ends - destroy it
       */
      close() {
        if (!this.opener.isOpen || this.isDestroying) {
          return;
        }
        this.isDestroying = true;
        this.dispatch("close");
        this.events.removeAll();
        this.opener.close();
      }
      /**
       * Destroys the gallery:
       * - instantly closes the gallery
       * - unbinds events,
       * - cleans intervals and timeouts
       * - removes elements from DOM
       */
      destroy() {
        var _this$element;
        if (!this.isDestroying) {
          this.options.showHideAnimationType = "none";
          this.close();
          return;
        }
        this.dispatch("destroy");
        this._listeners = {};
        if (this.scrollWrap) {
          this.scrollWrap.ontouchmove = null;
          this.scrollWrap.ontouchend = null;
        }
        (_this$element = this.element) === null || _this$element === void 0 || _this$element.remove();
        this.mainScroll.itemHolders.forEach((itemHolder) => {
          var _itemHolder$slide2;
          (_itemHolder$slide2 = itemHolder.slide) === null || _itemHolder$slide2 === void 0 || _itemHolder$slide2.destroy();
        });
        this.contentLoader.destroy();
        this.events.removeAll();
      }
      /**
       * Refresh/reload content of a slide by its index
       *
       * @param {number} slideIndex
       */
      refreshSlideContent(slideIndex) {
        this.contentLoader.removeByIndex(slideIndex);
        this.mainScroll.itemHolders.forEach((itemHolder, i) => {
          var _this$currSlide$index, _this$currSlide3;
          let potentialHolderIndex = ((_this$currSlide$index = (_this$currSlide3 = this.currSlide) === null || _this$currSlide3 === void 0 ? void 0 : _this$currSlide3.index) !== null && _this$currSlide$index !== void 0 ? _this$currSlide$index : 0) - 1 + i;
          if (this.canLoop()) {
            potentialHolderIndex = this.getLoopedIndex(potentialHolderIndex);
          }
          if (potentialHolderIndex === slideIndex) {
            this.setContent(itemHolder, slideIndex, true);
            if (i === 1) {
              var _itemHolder$slide3;
              this.currSlide = itemHolder.slide;
              (_itemHolder$slide3 = itemHolder.slide) === null || _itemHolder$slide3 === void 0 || _itemHolder$slide3.setIsActive(true);
            }
          }
        });
        this.dispatch("change");
      }
      /**
       * Set slide content
       *
       * @param {ItemHolder} holder mainScroll.itemHolders array item
       * @param {number} index Slide index
       * @param {boolean} [force] If content should be set even if index wasn't changed
       */
      setContent(holder, index, force) {
        if (this.canLoop()) {
          index = this.getLoopedIndex(index);
        }
        if (holder.slide) {
          if (holder.slide.index === index && !force) {
            return;
          }
          holder.slide.destroy();
          holder.slide = void 0;
        }
        if (!this.canLoop() && (index < 0 || index >= this.getNumItems())) {
          return;
        }
        const itemData = this.getItemData(index);
        holder.slide = new Slide(itemData, index, this);
        if (index === this.currIndex) {
          this.currSlide = holder.slide;
        }
        holder.slide.append(holder.el);
      }
      /** @returns {Point} */
      getViewportCenterPoint() {
        return {
          x: this.viewportSize.x / 2,
          y: this.viewportSize.y / 2
        };
      }
      /**
       * Update size of all elements.
       * Executed on init and on page resize.
       *
       * @param {boolean} [force] Update size even if size of viewport was not changed.
       */
      updateSize(force) {
        if (this.isDestroying) {
          return;
        }
        const newViewportSize = getViewportSize2(this.options, this);
        if (!force && pointsEqual(newViewportSize, this._prevViewportSize)) {
          return;
        }
        equalizePoints(this._prevViewportSize, newViewportSize);
        this.dispatch("beforeResize");
        equalizePoints(this.viewportSize, this._prevViewportSize);
        this._updatePageScrollOffset();
        this.dispatch("viewportSize");
        this.mainScroll.resize(this.opener.isOpen);
        if (!this.hasMouse && window.matchMedia("(any-hover: hover)").matches) {
          this.mouseDetected();
        }
        this.dispatch("resize");
      }
      /**
       * @param {number} opacity
       */
      applyBgOpacity(opacity) {
        this.bgOpacity = Math.max(opacity, 0);
        if (this.bg) {
          this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity);
        }
      }
      /**
       * Whether mouse is detected
       */
      mouseDetected() {
        if (!this.hasMouse) {
          var _this$element2;
          this.hasMouse = true;
          (_this$element2 = this.element) === null || _this$element2 === void 0 || _this$element2.classList.add("pswp--has_mouse");
        }
      }
      /**
       * Page resize event handler
       *
       * @private
       */
      _handlePageResize() {
        this.updateSize();
        if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
          setTimeout(() => {
            this.updateSize();
          }, 500);
        }
      }
      /**
       * Page scroll offset is used
       * to get correct coordinates
       * relative to PhotoSwipe viewport.
       *
       * @private
       */
      _updatePageScrollOffset() {
        this.setScrollOffset(0, window.pageYOffset);
      }
      /**
       * @param {number} x
       * @param {number} y
       */
      setScrollOffset(x, y) {
        this.offset.x = x;
        this.offset.y = y;
        this.dispatch("updateScrollOffset");
      }
      /**
       * Create main HTML structure of PhotoSwipe,
       * and add it to DOM
       *
       * @private
       */
      _createMainStructure() {
        this.element = createElement2("pswp", "div");
        this.element.setAttribute("tabindex", "-1");
        this.element.setAttribute("role", "dialog");
        this.template = this.element;
        this.bg = createElement2("pswp__bg", "div", this.element);
        this.scrollWrap = createElement2("pswp__scroll-wrap", "section", this.element);
        this.container = createElement2("pswp__container", "div", this.scrollWrap);
        this.scrollWrap.setAttribute("aria-roledescription", "carousel");
        this.container.setAttribute("aria-live", "off");
        this.container.setAttribute("id", "pswp__items");
        this.mainScroll.appendHolders();
        this.ui = new UI(this);
        this.ui.init();
        (this.options.appendToEl || document.body).appendChild(this.element);
      }
      /**
       * Get position and dimensions of small thumbnail
       *   {x:,y:,w:}
       *
       * Height is optional (calculated based on the large image)
       *
       * @returns {Bounds | undefined}
       */
      getThumbBounds() {
        return getThumbBounds(this.currIndex, this.currSlide ? this.currSlide.data : this._initialItemData, this);
      }
      /**
       * If the PhotoSwipe can have continuous loop
       * @returns Boolean
       */
      canLoop() {
        return this.options.loop && this.getNumItems() > 2;
      }
      /**
       * @private
       * @param {PhotoSwipeOptions} options
       * @returns {PreparedPhotoSwipeOptions}
       */
      _prepareOptions(options) {
        if (window.matchMedia("(prefers-reduced-motion), (update: slow)").matches) {
          options.showHideAnimationType = "none";
          options.zoomAnimationDuration = 0;
        }
        return {
          ...defaultOptions,
          ...options
        };
      }
    };
  }
});

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module) {
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism3 = function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self2.Prism && _self2.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = /** @type {Record<string, any>} */
                {};
                visited[id] = clone;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }
                return (
                  /** @type {any} */
                  clone
                );
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;
                /** @type {Array} */
                /** @type {any} */
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return (
                  /** @type {any} */
                  clone
                );
              default:
                return o;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(element) {
            while (element) {
              var m = lang.exec(element.className);
              if (m) {
                return m[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document && 1 < 2) {
              return (
                /** @type {any} */
                document.currentScript
              );
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(inside, before, insert, root) {
            root = root || /** @type {any} */
            _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          if (!env.grammar) {
            throw new Error('The language "' + env.language + '" has no grammar.');
          }
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function(e) {
            s += stringify(e, language);
          });
          return s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    }(_self);
    if (typeof module !== "undefined" && module.exports) {
      module.exports = Prism3;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism3;
    }
    Prism3.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism3.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism3.languages.markup["entity"];
    Prism3.languages.markup["doctype"].inside["internal-subset"].inside = Prism3.languages.markup;
    Prism3.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism3.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism3.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism3.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(attrName, lang) {
        Prism3.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism3.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism3.languages.html = Prism3.languages.markup;
    Prism3.languages.mathml = Prism3.languages.markup;
    Prism3.languages.svg = Prism3.languages.markup;
    Prism3.languages.xml = Prism3.languages.extend("markup", {});
    Prism3.languages.ssml = Prism3.languages.xml;
    Prism3.languages.atom = Prism3.languages.xml;
    Prism3.languages.rss = Prism3.languages.xml;
    (function(Prism4) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism4.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
            // See rest below
          }
        },
        "url": {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism4.languages.css["atrule"].inside.rest = Prism4.languages.css;
      var markup = Prism4.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism3);
    Prism3.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism3.languages.javascript = Prism3.languages.extend("clike", {
      "class-name": [
        Prism3.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism3.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism3.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism3.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism3.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism3.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism3.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism3.languages.markup) {
      Prism3.languages.markup.tag.addInlined("script", "javascript");
      Prism3.languages.markup.tag.addAttribute(
        /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
        "javascript"
      );
    }
    Prism3.languages.js = Prism3.languages.javascript;
    (function() {
      if (typeof Prism3 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
          var start = Number(m[1]);
          var comma = m[2];
          var end = m[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism3.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism3.hooks.add("before-sanity-check", function(env) {
        var pre = (
          /** @type {HTMLPreElement} */
          env.element
        );
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism3.util.setLanguage(code, language);
          Prism3.util.setLanguage(pre, language);
          var autoloader = Prism3.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(
            src,
            function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start < 0) {
                  start += lines.length;
                }
                start = Math.max(0, Math.min(start - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start + 1));
                }
              }
              code.textContent = text;
              Prism3.highlightElement(code);
            },
            function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            }
          );
        }
      });
      Prism3.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism3.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism3.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism3.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// assets/js/demo.js
function demoOptionsPicker() {
  const demoSite = document.querySelector('[data-demo-site="true"] .site');
  const downloadIcon = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="download"> <g> <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.9 12.3 12 16.3 16.1 12.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="2.7" y2="14.2"></line> </g> </g> </g> </g> </g></svg>`;
  const gearIcon = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M19.19 3.757A1 1 0 0018.22 3h-4.44a1 1 0 00-.97.757l-.66 2.644a1 1 0 01-.47.623l-1.291.747a1 1 0 01-.776.095l-2.62-.75a1 1 0 00-1.142.462l-2.219 3.844a1 1 0 00.171 1.219l1.96 1.895a1 1 0 01.305.719v1.49a1 1 0 01-.305.72l-1.96 1.894a1 1 0 00-.17 1.22l2.218 3.843a1 1 0 001.141.461l2.61-.746a1 1 0 01.793.106l.963.584a1 1 0 01.43.54l.984 2.95a1 1 0 00.949.683h4.558a1 1 0 00.949-.684l.982-2.947a1 1 0 01.435-.542l.982-.587a1 1 0 01.79-.103l2.59.745a1 1 0 001.142-.461l2.222-3.848a1 1 0 00-.166-1.214l-1.933-1.896a1 1 0 01-.3-.713v-1.5a1 1 0 01.3-.713l1.933-1.896a1 1 0 00.166-1.214l-2.222-3.848a1 1 0 00-1.142-.46l-2.6.747a1 1 0 01-.774-.093l-1.31-.75a1 1 0 01-.474-.625l-.66-2.64z"></path> <circle cx="16" cy="16" r="5" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></circle> </g></svg>`;
  const downloadURL = `https://github.com/nickabs/transmission/releases/latest/download/transmission.zip`;
  if (!demoSite) {
    return false;
  }
  const classAlternatives = {
    // list of the custom options 
    siteWide: {
      navBarStyle: ["expanded-nav", "minified-nav"],
      navBarOption: ["fixed-navigation-bar", "scrolling-navigation-bar"],
      heroStyle: ["hero-style-plain", "hero-style-color-image", "hero-style-grayscale-image"],
      sidebarOption: ["sidebar-top", "sidebar-left", "sidebar-right", "sidebar-bottom", "sidebar-none"],
      footerOption: [
        "footer-style-all",
        "footer-style-copyright-privacy",
        "footer-style-copyright",
        "footer-style-privacy",
        "footer-style-ghost-theme",
        "footer-style-ghost",
        "footer-style-none"
      ],
      enrolOption: ["newsletter", "subscribe", "newsletter-subscribe", "enrol-none"],
      authorOption: [
        "show-author-names",
        "show-author-images",
        "show-author-names-and-images",
        "show-author-none"
      ]
    },
    homePage: {
      focusPosition: ["home-page-list", "home-page-focus-right", "home-page-focus-left"],
      ShowFeaturedArticles: ["show-featured-articles", "use-latest-articles"]
    },
    post: {
      tableOfContentsOption: ["post-toc-full", "post-toc-minified", "post-toc-none"],
      relatedPostsOption: ["show-related-posts", "hide-related-posts"],
      oneTimePaymentRequest: ["show-payment-request", "hide-payment-request"]
    }
  };
  function updateSiteClass(property, className) {
    const section = Object.values(classAlternatives).find((section2) => property in section2);
    if (!section) return false;
    const validClasses = section[property];
    if (!validClasses.includes(className)) {
      console.error(`Invalid class name: ${className} for property: ${property}`);
      return false;
    }
    validClasses.forEach((cls) => demoSite.classList.remove(cls));
    demoSite.classList.add(className);
    return true;
  }
  function createDemoOptions() {
    const demoOptions2 = document.createElement("aside");
    demoOptions2.classList.add("demo-options", "options-picker-closed");
    const demoOptionsButton = document.createElement("button");
    demoOptionsButton.innerHTML = `
            ${gearIcon}
            <div class="demo-options-button-description">Customise</div>
        `;
    demoOptionsButton.classList.add("icon", "demo-options-button");
    demoOptions2.appendChild(demoOptionsButton);
    demoOptionsButton.addEventListener("click", () => {
      console.log("click");
      demoOptions2.classList.toggle("options-picker-closed");
    });
    const optionsPickerContainer = createOptionsPickerContainer();
    demoOptions2.appendChild(optionsPickerContainer);
    const hr = document.createElement("hr");
    demoOptions2.appendChild(hr);
    const downloadLink = document.createElement("a");
    downloadLink.href = `${downloadURL}`;
    downloadLink.classList.add("icon", "download-link");
    downloadLink.innerHTML = `
            ${downloadIcon}
            <div class="download-button-description">Download</div>
        `;
    demoOptions2.appendChild(downloadLink);
    return demoOptions2;
  }
  function createOptionsPickerContainer() {
    const container = document.createElement("div");
    container.classList.add("options-picker-container");
    const form = document.createElement("form");
    form.classList = "options-picker-form";
    Object.entries(classAlternatives).forEach(([sectionName, properties]) => {
      const fieldset = document.createElement("fieldset");
      fieldset.classList.add("form-fieldset");
      const legend = document.createElement("legend");
      const pretifiedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace(/([A-Z])/g, " $1");
      legend.textContent = pretifiedSectionName + " Options";
      fieldset.appendChild(legend);
      Object.entries(properties).forEach(([property, options]) => {
        const formGroup = document.createElement("div");
        formGroup.classList.add("form-group");
        const label = document.createElement("label");
        label.setAttribute("for", property);
        label.classList.add("form-label");
        label.textContent = property.replace(/([A-Z])/g, " $1").toLowerCase();
        const select = document.createElement("select");
        select.id = property;
        select.classList.add("form-select");
        select.name = property;
        let placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.selected = true;
        placeholderOption.disabled = true;
        placeholderOption.textContent = `Select ${"aeiou".includes(label.textContent.charAt(0).toLowerCase()) ? "an" : "a"} ${label.textContent}`;
        select.appendChild(placeholderOption);
        options.forEach((optionValue) => {
          const option = document.createElement("option");
          option.value = optionValue;
          option.textContent = optionValue;
          select.appendChild(option);
        });
        select.addEventListener("change", function() {
          updateSiteClass(property, this.value);
        });
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        fieldset.appendChild(formGroup);
      });
      const details = document.createElement("details");
      details.open = false;
      const summary = document.createElement("summary");
      summary.textContent = `${pretifiedSectionName.toLowerCase()} options`;
      details.appendChild(summary);
      details.appendChild(fieldset);
      form.appendChild(details);
      details.querySelector("summary").addEventListener("click", (e) => {
        document.querySelectorAll(".demo-options details").forEach((d) => {
          if (d !== details) d.open = false;
        });
      });
    });
    container.appendChild(form);
    return container;
  }
  const demoOptions = createDemoOptions();
  demoSite.appendChild(demoOptions);
}

// assets/js/copy-link.js
function copyLink() {
  const copyLinkElement = document.querySelector(".copy-link");
  const sidebar = document.querySelector(".sidebar");
  if (!copyLinkElement || !sidebar) return;
  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = "Copied!";
      sidebar.appendChild(tooltip);
      console.log(copyLinkElement);
      setTimeout(() => tooltip.remove(), 500);
    });
  };
  copyLinkElement.addEventListener("click", handleCopyLinkClick);
}

// assets/js/dark-mode-toggle.js
function darkModeToggle() {
  const darkModeButton = document.querySelector("button.dark-mode");
  const lightModeButton = document.querySelector("button.light-mode");
  if (!darkModeButton || !lightModeButton) {
    return;
  }
  const icons = document.querySelectorAll(".internal-tags .sidebar-link-icon");
  const storedDataColorScheme = localStorage.getItem("data-color-scheme");
  const systemSchemePreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-color-scheme", storedDataColorScheme || systemSchemePreference);
  function updateIconColor() {
    const fillColor = getComputedStyle(document.documentElement).getPropertyValue("--icon-color").trim();
    if (!icons) return;
    icons.forEach((icon) => {
      const svgDoc = icon.contentDocument;
      if (!svgDoc) return;
      const elements = svgDoc.querySelectorAll("path, circle, rect, ellipse");
      elements.forEach((element) => {
        element.setAttribute("fill", fillColor);
        element.setAttribute("stroke", fillColor);
      });
    });
  }
  function onClick(event) {
    var currentScheme = document.documentElement.getAttribute("data-color-scheme");
    var targetDataColorScheme = currentScheme == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-color-scheme", targetDataColorScheme);
    localStorage.setItem("data-color-scheme", targetDataColorScheme);
    const commentsScript = document.querySelector("script[data-color-scheme]");
    if (commentsScript) {
      commentsScript.setAttribute("data-color-scheme", targetDataColorScheme);
    }
    ;
    updateIconColor();
  }
  darkModeButton.addEventListener("click", onClick);
  lightModeButton.addEventListener("click", onClick);
}

// assets/js/enrol-dialog.js
function enrolDialog() {
  const dialog = document.querySelector(".enrol-dialog");
  const closeButton2 = document.querySelector(".enrol-dialog-button");
  const form = document.querySelector("form.enrol-newsletter");
  if (dialog && closeButton2) {
    closeButton2.addEventListener("click", () => {
      dialog.close();
      dialog.style.display = "none";
    });
  }
  if (form) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class" && mutation.target.classList.contains("success")) {
          dialog.showModal();
          dialog.style.display = "flex";
          break;
        }
      }
    });
    observer.observe(form, { attributes: true, attributeFilter: ["class"] });
  }
}

// node_modules/photoswipe/dist/photoswipe-lightbox.esm.js
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName);
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  return el;
}
function toTransformString(x, y, scale) {
  let propValue = `translate3d(${x}px,${y || 0}px,0)`;
  if (scale !== void 0) {
    propValue += ` scale3d(${scale},${scale},1)`;
  }
  return propValue;
}
function setWidthHeight(el, w, h) {
  el.style.width = typeof w === "number" ? `${w}px` : w;
  el.style.height = typeof h === "number" ? `${h}px` : h;
}
var LOAD_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function specialKeyUsed(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function getElementsFromOption(option, legacySelector, parent = document) {
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === "string" ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}
function isPswpClass(fn) {
  return typeof fn === "function" && fn.prototype && fn.prototype.goTo;
}
function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
var PhotoSwipeEvent = class {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(type, details) {
    this.type = type;
    this.defaultPrevented = false;
    if (details) {
      Object.assign(this, details);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
};
var Eventable = class {
  constructor() {
    this._listeners = {};
    this._filters = {};
    this.pswp = void 0;
    this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(name, fn, priority = 100) {
    var _this$_filters$name, _this$_filters$name2, _this$pswp;
    if (!this._filters[name]) {
      this._filters[name] = [];
    }
    (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
      fn,
      priority
    });
    (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(name, fn) {
    if (this._filters[name]) {
      this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
    }
    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(name, ...args) {
    var _this$_filters$name3;
    (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach((filter) => {
      args[0] = filter.fn.apply(this, args);
    });
    return args[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(name, fn) {
    var _this$_listeners$name, _this$pswp2;
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn);
    (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(name, fn) {
    var _this$pswp3;
    if (this._listeners[name]) {
      this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
    }
    (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(name, details) {
    var _this$_listeners$name2;
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }
    const event = (
      /** @type {AugmentedEvent<T>} */
      new PhotoSwipeEvent(name, details)
    );
    (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach((listener) => {
      listener.call(this, event);
    });
    return event;
  }
};
var Placeholder = class {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(imageSrc, container) {
    this.element = createElement("pswp__img pswp__img--placeholder", imageSrc ? "img" : "div", container);
    if (imageSrc) {
      const imgEl = (
        /** @type {HTMLImageElement} */
        this.element
      );
      imgEl.decoding = "async";
      imgEl.alt = "";
      imgEl.src = imageSrc;
      imgEl.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.element.tagName === "IMG") {
      setWidthHeight(this.element, 250, "auto");
      this.element.style.transformOrigin = "0 0";
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }
  destroy() {
    var _this$element;
    if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
      this.element.remove();
    }
    this.element = null;
  }
};
var Content = class {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;
    this.element = void 0;
    this.placeholder = void 0;
    this.slide = void 0;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    this.isDecoding = false;
    this.state = LOAD_STATE.IDLE;
    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = "image";
    } else {
      this.type = "html";
    }
    this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = void 0;
        }
      }, 1e3);
    }
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(isLazy, reload) {
    if (this.slide && this.usePlaceholder()) {
      if (!this.placeholder) {
        const placeholderSrc = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
          this
        );
        this.placeholder = new Placeholder(placeholderSrc, this.slide.container);
      } else {
        const placeholderEl = this.placeholder.element;
        if (placeholderEl && !placeholderEl.parentElement) {
          this.slide.container.prepend(placeholderEl);
        }
      }
    }
    if (this.element && !reload) {
      return;
    }
    if (this.instance.dispatch("contentLoad", {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    if (this.isImageContent()) {
      this.element = createElement("pswp__img", "img");
      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement("pswp__content", "div");
      this.element.innerHTML = this.data.html || "";
    }
    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(isLazy) {
    var _this$data$src, _this$data$alt;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    const imageElement = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes();
    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }
    imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : "";
    imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : "";
    this.state = LOAD_STATE.LOADING;
    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };
      imageElement.onerror = () => {
        this.onError();
      };
    }
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = LOAD_STATE.LOADED;
    if (this.slide && this.element) {
      this.instance.dispatch("loadComplete", {
        slide: this.slide,
        content: this
      });
      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = LOAD_STATE.ERROR;
    if (this.slide) {
      this.displayError();
      this.instance.dispatch("loadComplete", {
        slide: this.slide,
        isError: true,
        content: this
      });
      this.instance.dispatch("loadError", {
        slide: this.slide,
        content: this
      });
    }
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === LOAD_STATE.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === LOAD_STATE.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }
    if (this.instance.dispatch("contentResize", {
      content: this,
      width,
      height
    }).defaultPrevented) {
      return;
    }
    setWidthHeight(this.element, width, height);
    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;
      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }
      if (this.slide) {
        this.instance.dispatch("imageSizeChange", {
          slide: this.slide,
          width,
          height,
          content: this
        });
      }
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset) {
      return;
    }
    const image = (
      /** @type HTMLImageElement */
      this.element
    );
    const sizesWidth = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
      image.sizes = sizesWidth + "px";
      image.dataset.largestUsedSize = String(sizesWidth);
    }
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    if (this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.load(true);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = false;
    this.slide = void 0;
    if (this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.remove();
    if (this.placeholder) {
      this.placeholder.destroy();
      this.placeholder = void 0;
    }
    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = void 0;
    }
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var _this$instance$option, _this$instance$option2;
      let errorMsgEl = createElement("pswp__error-msg", "div");
      errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : "";
      errorMsgEl = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", errorMsgEl, this);
      this.element = createElement("pswp__content pswp__error-msg-container", "div");
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = "";
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element) {
      return;
    }
    this.isAttached = true;
    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented) {
      return;
    }
    const supportsDecode = "decode" in this.element;
    if (this.isImageContent()) {
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true;
        this.element.decode().catch(() => {
        }).finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.slide && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    if (this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide) {
      return;
    }
    if (this.isImageContent() && this.isDecoding && !isSafari()) {
      this.appendImage();
    } else if (this.isError()) {
      this.load(false, true);
    }
    if (this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "false");
    }
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    });
    if (this.slide && this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "true");
    }
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = false;
    if (this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    if (this.placeholder && this.placeholder.element) {
      this.placeholder.element.remove();
    }
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    if (!this.isAttached) {
      return;
    }
    if (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }
};
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  let paddingValue = 0;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
    if (options[legacyPropName]) {
      paddingValue = options[legacyPropName];
    }
  }
  return Number(paddingValue) || 0;
}
function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption("left", options, viewportSize, itemData, index) - parsePaddingOption("right", options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption("top", options, viewportSize, itemData, index) - parsePaddingOption("bottom", options, viewportSize, itemData, index)
  };
}
var MAX_IMAGE_WIDTH = 4e3;
var ZoomLevel = class {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
    this.panAreaSize = null;
    this.elementSize = null;
    this.fit = 1;
    this.fill = 1;
    this.vFill = 1;
    this.initial = 1;
    this.secondary = 1;
    this.max = 1;
    this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(maxWidth, maxHeight, panAreaSize) {
    const elementSize = {
      x: maxWidth,
      y: maxHeight
    };
    this.elementSize = elementSize;
    this.panAreaSize = panAreaSize;
    const hRatio = panAreaSize.x / elementSize.x;
    const vRatio = panAreaSize.y / elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(this.initial, this.secondary, this._getMax());
    this.min = Math.min(this.fit, this.initial, this.secondary);
    if (this.pswp) {
      this.pswp.dispatch("zoomLevelsUpdate", {
        zoomLevels: this,
        slideData: this.itemData
      });
    }
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(optionPrefix) {
    const optionName = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      optionPrefix + "ZoomLevel"
    );
    const optionValue = this.options[optionName];
    if (!optionValue) {
      return;
    }
    if (typeof optionValue === "function") {
      return optionValue(this);
    }
    if (optionValue === "fill") {
      return this.fill;
    }
    if (optionValue === "fit") {
      return this.fit;
    }
    return Number(optionValue);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption("secondary");
    if (currZoomLevel) {
      return currZoomLevel;
    }
    currZoomLevel = Math.min(1, this.fit * 3);
    if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }
    return currZoomLevel;
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
};
function lazyLoadData(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  let zoomLevel;
  const {
    options
  } = instance;
  if (options) {
    zoomLevel = new ZoomLevel(options, itemData, -1);
    let viewportSize;
    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize(options, instance);
    }
    const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }
  content.lazyLoad();
  if (zoomLevel) {
    content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
  }
  return content;
}
function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch("lazyLoadSlide", {
    index,
    itemData
  }).defaultPrevented) {
    return;
  }
  return lazyLoadData(itemData, instance, index);
}
var PhotoSwipeBase = class extends Eventable {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var _this$options;
    let numItems = 0;
    const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;
    if (dataSource && "length" in dataSource) {
      numItems = dataSource.length;
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    }
    const event = this.dispatch("numItems", {
      dataSource,
      numItems
    });
    return this.applyFilters("numItems", event.numItems, dataSource);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(slideData, index) {
    return new Content(slideData, this, index);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(index) {
    var _this$options2;
    const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
    let dataSourceItem = {};
    if (Array.isArray(dataSource)) {
      dataSourceItem = dataSource[index];
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      dataSourceItem = dataSource.items[index];
    }
    let itemData = dataSourceItem;
    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    }
    const event = this.dispatch("itemData", {
      itemData: itemData || {},
      index
    });
    return this.applyFilters("itemData", event.itemData, index);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(galleryElement) {
    var _this$options3, _this$options4;
    if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
      return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];
    }
    return [galleryElement];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(element) {
    const itemData = {
      element
    };
    const linkEl = (
      /** @type {HTMLAnchorElement} */
      element.tagName === "A" ? element : element.querySelector("a")
    );
    if (linkEl) {
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }
      itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
      itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
      itemData.w = itemData.width;
      itemData.h = itemData.height;
      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }
      const thumbnailEl = element.querySelector("img");
      if (thumbnailEl) {
        var _thumbnailEl$getAttri;
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute("alt")) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : "";
      }
      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }
    return this.applyFilters("domItemData", itemData, element, linkEl);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }
};
var PhotoSwipeLightbox = class extends PhotoSwipeBase {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(options) {
    super();
    this.options = options || {};
    this._uid = 0;
    this.shouldOpen = false;
    this._preloadedContent = void 0;
    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.addEventListener("click", this.onThumbnailsClick, false);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (specialKeyUsed(e) || window.pswp) {
      return;
    }
    let initialPoint = {
      x: e.clientX,
      y: e.clientY
    };
    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }
    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters("clickedIndex", clickedIndex, e, this);
    const dataSource = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(e) {
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }
    const clickedTarget = (
      /** @type {HTMLElement} */
      e.target
    );
    const childElements = getElementsFromOption(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    );
    const clickedChildIndex = childElements.findIndex((child) => child === clickedTarget || child.contains(clickedTarget));
    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      return -1;
    }
    return 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(index, dataSource, initialPoint) {
    if (window.pswp || !this.options) {
      return false;
    }
    if (!dataSource && this.options.gallery && this.options.children) {
      const galleryElements = getElementsFromOption(this.options.gallery);
      if (galleryElements[0]) {
        dataSource = {
          gallery: galleryElements[0]
        };
      }
    }
    this.options.index = index;
    this.options.initialPointerPos = initialPoint;
    this.shouldOpen = true;
    this.preload(index, dataSource);
    return true;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(index, dataSource) {
    const {
      options
    } = this;
    if (dataSource) {
      options.dataSource = dataSource;
    }
    const promiseArray = [];
    const pswpModuleType = typeof options.pswpModule;
    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        options.pswpModule
      ));
    } else if (pswpModuleType === "string") {
      throw new Error("pswpModule as string is no longer supported");
    } else if (pswpModuleType === "function") {
      promiseArray.push(
        /** @type {() => Promise<Type<PhotoSwipe>>} */
        options.pswpModule()
      );
    } else {
      throw new Error("pswpModule is not valid");
    }
    if (typeof options.openPromise === "function") {
      promiseArray.push(options.openPromise());
    }
    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    }
    const uid = ++this._uid;
    Promise.all(promiseArray).then((iterableModules) => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];
        this._openPhotoswipe(mainModule, uid);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(module, uid) {
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }
    this.shouldOpen = false;
    if (window.pswp) {
      return;
    }
    const pswp = typeof module === "object" ? new module.default(this.options) : new module(this.options);
    this.pswp = pswp;
    window.pswp = pswp;
    Object.keys(this._listeners).forEach((name) => {
      var _this$_listeners$name;
      (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.forEach((fn) => {
        pswp.on(
          name,
          /** @type {EventCallback<typeof name>} */
          fn
        );
      });
    });
    Object.keys(this._filters).forEach((name) => {
      var _this$_filters$name;
      (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.forEach((filter) => {
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });
    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = void 0;
    }
    pswp.on("destroy", () => {
      this.pswp = void 0;
      delete window.pswp;
    });
    pswp.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var _this$pswp;
    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.destroy();
    this.shouldOpen = false;
    this._listeners = {};
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.removeEventListener("click", this.onThumbnailsClick, false);
    });
  }
};

// assets/js/lightbox.js
function lightbox() {
  const arrow = ' <svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 30" width="32" height="30">    <path d="M26.667 14.667v2.667h-16L18 24.667l-1.893 1.893L5.547 16l10.56-10.56L18 7.333l-7.333 7.333h16z">     </path> </svg>';
  const options = {
    arrowPrevSVG: arrow,
    arrowNextSVG: arrow,
    zoom: false,
    gallery: ".kg-image-card, .kg-gallery-card",
    children: "img",
    bgOpacity: 0.8,
    closeOnScroll: true,
    Xpadding: { top: 40, bottom: 40, left: 0, right: 0 },
    imageClickAction: "close",
    tapAction: "close",
    pswpModule: () => Promise.resolve().then(() => (init_photoswipe_esm(), photoswipe_esm_exports))
  };
  const lightbox2 = new PhotoSwipeLightbox(options);
  lightbox2.init();
  lightbox2.addFilter("domItemData", (itemData, element, linkEl) => {
    if (itemData) {
      itemData.w = element.getAttribute("width");
      itemData.h = element.getAttribute("height");
      if (!itemData.h || !itemData.w) {
        itemData.w = element.naturalWidth;
        itemData.h = element.naturalHeight;
      }
      itemData.src = element.getAttribute("src");
      itemData.srcset = element.getAttribute("srcset");
    }
    return itemData;
  });
}

// assets/js/navigation.js
function createMainNavMenu() {
  const menuIndentRegex = /(^-{1,})(.*)/;
  function createSubMenu(menuName) {
    const div = document.createElement("div");
    div.classList.add("submenu-links-container");
    const div1 = document.createElement("div");
    div1.classList.add("submenu-links-header");
    const p1 = document.createElement("p");
    p1.classList.add("submenu-links-title");
    p1.appendChild(document.createTextNode(menuName));
    div1.appendChild(p1);
    div.appendChild(div1);
    const ul = document.createElement("ul");
    ul.classList.add("submenu-links");
    div.appendChild(ul);
    return div;
  }
  function processMenuItems() {
    const menuItems = document.querySelectorAll(".menu-links .menu-link-item");
    let submenu = null;
    for (let i = 0; i < menuItems.length; ++i) {
      const match = menuItems[i].lastElementChild.innerText.match(menuIndentRegex);
      if (match) {
        menuItems[i].lastElementChild.innerText = menuItems[i].lastElementChild.innerText.replace(menuIndentRegex, "$2").trim();
        const menuName = menuItems[i].lastElementChild.innerText;
        if (match[1].length == 1) {
          menuItems[i].classList.add("has-submenu");
          const anchor = document.createElement("a");
          anchor.setAttribute("href", "#");
          anchor.classList.add("tabindex=0");
          anchor.appendChild(document.createTextNode(menuName));
          const sup = document.createElement("sup");
          sup.appendChild(document.createTextNode(" \u2304"));
          anchor.appendChild(sup);
          const div = createSubMenu(menuName);
          menuItems[i].replaceChildren(anchor);
          menuItems[i].appendChild(div);
          submenu = menuItems[i];
        } else if (submenu) {
          menuItems[i].classList.add("submenu-link-item");
          menuItems[i].classList.remove("menu-link-item");
          submenu.querySelector(".submenu-links").appendChild(menuItems[i]);
        }
      }
    }
    document.querySelector(".menu-links-container").classList.add("menu-links-ready");
  }
  processMenuItems();
}
function mainNavMenuToggle() {
  const nav = document.querySelector(".menu-links-container");
  const navToggle = document.querySelector(".menu-links-toggle");
  function handleDocumentClick(event) {
    let activeSubmenu = nav.querySelector(".submenu-links-active");
    let clickedItem;
    if (event.target.closest(".submenu-link-item")) {
      return;
    } else if (event.target.closest(".menu-link-item") && !event.target.closest(".submenu-links-header")) {
      clickedItem = event.target.closest(".menu-link-item");
    }
    if (clickedItem) {
      if (clickedItem.classList.contains("has-submenu")) {
        event.preventDefault();
      }
      if (activeSubmenu) {
        activeSubmenu.classList.remove("submenu-links-active");
      }
      if (!clickedItem.contains(activeSubmenu)) {
        if (clickedItem.classList.contains("has-submenu")) {
          clickedItem.querySelector(".submenu-links-container").classList.add("submenu-links-active");
        }
      }
      return;
    }
    if (event.target.closest(".menu-links-toggle")) {
      nav.classList.toggle("menu-links-active");
      return;
    }
    if (activeSubmenu) {
      activeSubmenu.classList.remove("submenu-links-active");
    } else if (nav.classList.contains("menu-links-active")) {
      nav.classList.remove("menu-links-active");
    }
  }
  document.addEventListener("click", handleDocumentClick);
}
function sidebarToggle() {
  const fillColor = getComputedStyle(document.documentElement).getPropertyValue("--icon-color").trim();
  const internalTags = document.querySelector(".internal-tags");
  const internalTagItems = internalTags.querySelectorAll(".sidebar-link-item");
  const regex = /^##[0-9]*-/;
  const containers = {
    share: document.querySelector(".share-links-container"),
    secondary: document.querySelector(".secondary-links-container"),
    sidebar: document.querySelector(".sidebar")
  };
  function toggle(container) {
    container.classList.toggle("display-item-details");
  }
  document.addEventListener("click", function(event) {
    const { share, secondary, sidebar } = containers;
    const clickedLink = event.target.closest("a");
    if (sidebar?.contains(event.target) && clickedLink) {
      return;
    }
    if (share?.contains(event.target)) {
      toggle(share);
      if (secondary?.classList.contains("display-item-details")) toggle(secondary);
      if (sidebar?.classList.contains("display-item-details")) toggle(sidebar);
      return;
    }
    if (secondary?.contains(event.target)) {
      toggle(secondary);
      if (share?.classList.contains("display-item-details")) toggle(share);
      if (sidebar?.classList.contains("display-item-details")) toggle(sidebar);
      return;
    }
    if (sidebar?.contains(event.target)) {
      toggle(sidebar);
      if (share?.classList.contains("display-item-details")) toggle(share);
      if (secondary?.classList.contains("display-item-details")) toggle(secondary);
      return;
    }
    if (share?.classList.contains("display-item-details")) toggle(share);
    if (secondary?.classList.contains("display-item-details")) toggle(secondary);
  });
  function updateInternalTagIcons(icon) {
    try {
      const svgDoc = icon.contentDocument;
      if (!svgDoc) return;
      const svgElement = svgDoc.querySelector("svg");
      if (svgElement) {
        const viewBox = svgElement.getAttribute("viewBox");
        const naturalWidth = svgElement.getAttribute("width");
        const naturalHeight = svgElement.getAttribute("height");
        if (!viewBox) {
          if (!naturalWidth || !naturalHeight) {
            const bbox = svgElement.getBBox();
            svgElement.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
          } else {
            svgElement.setAttribute("viewBox", `0 0 ${naturalWidth} ${naturalHeight}`);
          }
        }
        svgElement.setAttribute("height", "20px");
        svgElement.setAttribute("width", "20px");
        const elements = svgElement.querySelectorAll("path, circle, rect, ellipse");
        elements.forEach((element) => {
          element.setAttribute("fill", fillColor);
          element.setAttribute("stroke", fillColor);
        });
      }
    } catch (e) {
      console.error("Error adjusting SVG:", e);
    }
  }
  if (internalTagItems) {
    internalTagItems.forEach((internalTag) => {
      const firstLink = internalTag.querySelector("a");
      let sibling = firstLink.nextElementSibling;
      while (sibling) {
        const nextSibling = sibling.nextElementSibling;
        sibling.remove();
        sibling = nextSibling;
      }
      const description = firstLink.querySelector(".sidebar-link-description");
      const icon = firstLink.querySelector(".sidebar-link-icon");
      if (description) {
        if (regex.test(description.textContent)) {
          description.textContent = description.textContent.replace(regex, "");
        } else {
          internalTag.remove();
        }
      }
      const svgDoc = icon.contentDocument;
      if (svgDoc && svgDoc.querySelector("svg")) {
        updateInternalTagIcons(icon);
      } else {
        icon.addEventListener("load", () => {
          updateInternalTagIcons(icon);
        });
      }
    });
    internalTags.classList.remove("hidden");
    const secondaryLinksItems = document.querySelectorAll(".secondary-links .sidebar-link-item");
    if (secondaryLinksItems) {
      secondaryLinksItems.forEach((item) => {
        const span = document.createElement("span");
        const itemDescription = item.querySelector(".sidebar-link-description");
        if (itemDescription) {
          const words = itemDescription.textContent.replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/);
          let firstLetters = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join("");
          if (words.length === 1) {
            firstLetters = itemDescription.textContent.slice(0, 2).toUpperCase();
          }
          span.textContent = firstLetters;
          span.classList.add("sidebar-link-icon");
          const link = item.querySelector(".sidebar-link");
          if (link) {
            link.insertBefore(span, link.firstChild);
          }
        }
      });
    }
  }
}

// assets/js/pagination.js
function pagination(isInfinite, callback) {
  var buttonElement = document.querySelector(".pagination");
  var nextElement = document.querySelector("link[rel=next]");
  if (!nextElement && buttonElement) {
    buttonElement.remove();
    return;
  }
  var currentArticleList = document.querySelector(".paginated");
  if (!currentArticleList) {
    return;
  }
  var buffer = 300;
  var ticking = false;
  var loading = false;
  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = document.documentElement.scrollHeight;
  function onPageLoad() {
    if (this.status === 404) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      buttonElement.remove();
      return;
    }
    var nextPageArticleList = this.response.querySelectorAll(".article-card");
    var fragment = document.createDocumentFragment();
    var elems = [];
    nextPageArticleList.forEach(function(item) {
      var clonedItem = document.importNode(item, true);
      if (callback) {
        clonedItem.style.position = "absolute";
        clonedItem.style.visibility = "hidden";
        elems.push(clonedItem);
      }
      fragment.appendChild(clonedItem);
    });
    currentArticleList.appendChild(fragment);
    if (callback) {
      callback(elems);
    }
    var resNextElement = this.response.querySelector("link[rel=next]");
    if (resNextElement) {
      nextElement.href = resNextElement.href;
    } else {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (buttonElement) {
        buttonElement.remove();
      }
    }
    lastDocumentHeight = document.documentElement.scrollHeight;
    ticking = false;
    loading = false;
    if (isInfinite) {
      imagesLoaded(currentArticleList, function() {
        if (currentArticleList.getBoundingClientRect().bottom <= lastWindowHeight) {
          console.log(currentArticleList.getBoundingClientRect().bottom, lastWindowHeight);
          requestTick();
        }
      });
    }
  }
  function onUpdate() {
    if (loading) {
      return;
    }
    if (isInfinite && lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false;
      return;
    }
    loading = true;
    var xhr = new window.XMLHttpRequest();
    xhr.responseType = "document";
    xhr.addEventListener("load", onPageLoad);
    xhr.open("GET", nextElement.href);
    xhr.send(null);
  }
  function requestTick() {
    ticking || window.requestAnimationFrame(onUpdate);
    ticking = true;
  }
  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }
  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = document.documentElement.scrollHeight;
    requestTick();
  }
  if (isInfinite) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    requestTick();
  } else {
    buttonElement.addEventListener("click", requestTick);
  }
}

// node_modules/tocbot/src/js/build-html.js
function build_html_default(options) {
  const forEach = [].forEach;
  const some = [].some;
  const body = typeof window !== "undefined" && document.body;
  const SPACE_CHAR = " ";
  let tocElement;
  let currentlyHighlighting = true;
  function createEl(d, container) {
    const link = container.appendChild(createLink(d));
    if (d.children.length) {
      const list = createList(d.isCollapsed);
      d.children.forEach((child) => {
        createEl(child, list);
      });
      link.appendChild(list);
    }
  }
  function render(parent, data) {
    const collapsed = false;
    const container = createList(collapsed);
    data.forEach((d) => {
      createEl(d, container);
    });
    tocElement = parent || tocElement;
    if (tocElement === null) {
      return;
    }
    if (tocElement.firstChild) {
      tocElement.removeChild(tocElement.firstChild);
    }
    if (data.length === 0) {
      return tocElement;
    }
    return tocElement.appendChild(container);
  }
  function createLink(data) {
    const item = document.createElement("li");
    const a = document.createElement("a");
    if (options.listItemClass) {
      item.setAttribute("class", options.listItemClass);
    }
    if (options.onClick) {
      a.onclick = options.onClick;
    }
    if (options.includeTitleTags) {
      a.setAttribute("title", data.textContent);
    }
    if (options.includeHtml && data.childNodes.length) {
      forEach.call(data.childNodes, (node) => {
        a.appendChild(node.cloneNode(true));
      });
    } else {
      a.textContent = data.textContent;
    }
    a.setAttribute("href", `${options.basePath}#${data.id}`);
    a.setAttribute("class", `${options.linkClass + SPACE_CHAR}node-name--${data.nodeName}${SPACE_CHAR}${options.extraLinkClasses}`);
    item.appendChild(a);
    return item;
  }
  function createList(isCollapsed) {
    const listElement = options.orderedList ? "ol" : "ul";
    const list = document.createElement(listElement);
    let classes = options.listClass + SPACE_CHAR + options.extraListClasses;
    if (isCollapsed) {
      classes = classes + SPACE_CHAR + options.collapsibleClass;
      classes = classes + SPACE_CHAR + options.isCollapsedClass;
    }
    list.setAttribute("class", classes);
    return list;
  }
  function updateFixedSidebarClass() {
    const scrollTop = getScrollTop();
    const posFixedEl = document.querySelector(options.positionFixedSelector);
    if (options.fixedSidebarOffset === "auto") {
      options.fixedSidebarOffset = tocElement.offsetTop;
    }
    if (scrollTop > options.fixedSidebarOffset) {
      if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
        posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
      }
    } else {
      posFixedEl.className = posFixedEl.className.replace(SPACE_CHAR + options.positionFixedClass, "");
    }
  }
  function getHeadingTopPos(obj) {
    let position = 0;
    if (obj !== null) {
      position = obj.offsetTop;
      if (options.hasInnerContainers) {
        position += getHeadingTopPos(obj.offsetParent);
      }
    }
    return position;
  }
  function updateClassname(obj, className) {
    if (obj && obj.className !== className) {
      obj.className = className;
    }
    return obj;
  }
  function updateToc(headingsArray) {
    if (options.positionFixedSelector) {
      updateFixedSidebarClass();
    }
    const headings = headingsArray;
    if (currentlyHighlighting && !!tocElement && headings.length > 0) {
      const topHeader = getTopHeader(headings);
      const oldActiveTocLink = tocElement.querySelector(`.${options.activeLinkClass}`);
      const activeTocLink = tocElement.querySelector(`.${options.linkClass}.node-name--${topHeader.nodeName}[href="${options.basePath}#${topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1")}"]`);
      if (oldActiveTocLink === activeTocLink) {
        return;
      }
      const tocLinks = tocElement.querySelectorAll(`.${options.linkClass}`);
      forEach.call(tocLinks, (tocLink) => {
        updateClassname(tocLink, tocLink.className.replace(SPACE_CHAR + options.activeLinkClass, ""));
      });
      const tocLis = tocElement.querySelectorAll(`.${options.listItemClass}`);
      forEach.call(tocLis, (tocLi) => {
        updateClassname(tocLi, tocLi.className.replace(SPACE_CHAR + options.activeListItemClass, ""));
      });
      if (activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1) {
        activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
      }
      const li = activeTocLink?.parentNode;
      if (li && li.className.indexOf(options.activeListItemClass) === -1) {
        li.className += SPACE_CHAR + options.activeListItemClass;
      }
      const tocLists = tocElement.querySelectorAll(`.${options.listClass}.${options.collapsibleClass}`);
      forEach.call(tocLists, (list) => {
        if (list.className.indexOf(options.isCollapsedClass) === -1) {
          list.className += SPACE_CHAR + options.isCollapsedClass;
        }
      });
      if (activeTocLink?.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1) {
        updateClassname(activeTocLink.nextSibling, activeTocLink.nextSibling.className.replace(SPACE_CHAR + options.isCollapsedClass, ""));
      }
      removeCollapsedFromParents(activeTocLink?.parentNode.parentNode);
    }
  }
  function removeCollapsedFromParents(element) {
    if (element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1) {
      updateClassname(element, element.className.replace(SPACE_CHAR + options.isCollapsedClass, ""));
      return removeCollapsedFromParents(element.parentNode.parentNode);
    }
    return element;
  }
  function disableTocAnimation(event) {
    const target = event.target || event.srcElement;
    if (typeof target.className !== "string" || target.className.indexOf(options.linkClass) === -1) {
      return;
    }
    currentlyHighlighting = false;
  }
  function enableTocAnimation() {
    currentlyHighlighting = true;
  }
  function getCurrentlyHighlighting() {
    return currentlyHighlighting;
  }
  function getScrollTop() {
    let top;
    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
      top = document.querySelector(options.scrollContainer).scrollTop;
    } else {
      top = document.documentElement.scrollTop || body.scrollTop;
    }
    return top;
  }
  function getTopHeader(headings, scrollTop = getScrollTop()) {
    let topHeader;
    some.call(headings, (heading, i) => {
      if (getHeadingTopPos(heading) > scrollTop + options.headingsOffset + 10) {
        const index = i === 0 ? i : i - 1;
        topHeader = headings[index];
        return true;
      }
      if (i === headings.length - 1) {
        topHeader = headings[headings.length - 1];
        return true;
      }
    });
    return topHeader;
  }
  function updateUrlHashForHeader(headingsArray) {
    const scrollTop = getScrollTop();
    const topHeader = getTopHeader(headingsArray, scrollTop);
    if (!topHeader || scrollTop < 5) {
      if (!(window.location.hash === "#" || window.location.hash === "")) {
        window.history.pushState(null, null, "#");
      }
    } else if (topHeader) {
      const newHash = `#${topHeader.id}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, null, newHash);
      }
    }
  }
  return {
    enableTocAnimation,
    disableTocAnimation,
    render,
    updateToc,
    getCurrentlyHighlighting,
    getTopHeader,
    getScrollTop,
    updateUrlHashForHeader
  };
}

// node_modules/tocbot/src/js/default-options.js
var default_options_default = {
  // Where to render the table of contents.
  tocSelector: ".js-toc",
  // Or, you can pass in a DOM node instead
  tocElement: null,
  // Where to grab the headings to build the table of contents.
  contentSelector: ".js-toc-content",
  // Or, you can pass in a DOM node instead
  contentElement: null,
  // Which headings to grab inside of the contentSelector element.
  headingSelector: "h1, h2, h3",
  // Headings that match the ignoreSelector will be skipped.
  ignoreSelector: ".js-toc-ignore",
  // For headings inside relative or absolute positioned
  // containers within content.
  hasInnerContainers: false,
  // Main class to add to links.
  linkClass: "toc-link",
  // Extra classes to add to links.
  extraLinkClasses: "",
  // Class to add to active links,
  // the link corresponding to the top most heading on the page.
  activeLinkClass: "is-active-link",
  // Main class to add to lists.
  listClass: "toc-list",
  // Extra classes to add to lists.
  extraListClasses: "",
  // Class that gets added when a list should be collapsed.
  isCollapsedClass: "is-collapsed",
  // Class that gets added when a list should be able
  // to be collapsed but isn't necessarily collapsed.
  collapsibleClass: "is-collapsible",
  // Class to add to list items.
  listItemClass: "toc-list-item",
  // Class to add to active list items.
  activeListItemClass: "is-active-li",
  // How many heading levels should not be collapsed.
  // For example, number 6 will show everything since
  // there are only 6 heading levels and number 0 will collapse them all.
  // The sections that are hidden will open
  // and close as you scroll to headings within them.
  collapseDepth: 0,
  // Smooth scrolling enabled.
  scrollSmooth: true,
  // Smooth scroll duration.
  scrollSmoothDuration: 420,
  // Smooth scroll offset.
  scrollSmoothOffset: 0,
  // Callback for scroll end.
  scrollEndCallback: function(e) {
  },
  // Headings offset between the headings and the top of
  // the document (this is meant for minor adjustments).
  headingsOffset: 1,
  // Timeout between events firing to make sure it's
  // not too rapid (for performance reasons).
  throttleTimeout: 50,
  // Element to add the positionFixedClass to.
  positionFixedSelector: null,
  // Fixed position class to add to make sidebar fixed after scrolling
  // down past the fixedSidebarOffset.
  positionFixedClass: "is-position-fixed",
  // fixedSidebarOffset can be any number but by default is set
  // to auto which sets the fixedSidebarOffset to the sidebar
  // element's offsetTop from the top of the document on init.
  fixedSidebarOffset: "auto",
  // includeHtml can be set to true to include the HTML markup from the
  // heading node instead of just including the innerText.
  includeHtml: false,
  // includeTitleTags automatically sets the html title tag of the link
  // to match the title. This can be useful for SEO purposes or
  // when truncating titles.
  includeTitleTags: false,
  // onclick function to apply to all links in toc. will be called with
  // the event as the first parameter, and this can be used to stop,
  // propagation, prevent default or perform action
  onClick: function(e) {
  },
  // orderedList can be set to false to generate unordered lists (ul)
  // instead of ordered lists (ol)
  orderedList: true,
  // If there is a fixed article scroll container, set to calculate offset.
  scrollContainer: null,
  // prevent ToC DOM rendering if it's already rendered by an external system.
  skipRendering: false,
  // Optional callback to change heading labels.
  // For example it can be used to cut down and put ellipses on multiline headings you deem too long.
  // Called each time a heading is parsed. Expects a string and returns the modified label to display.
  // Additionally, the attribute `data-heading-label` may be used on a heading to specify
  // a shorter string to be used in the TOC.
  // function (string) => string
  headingLabelCallback: false,
  // ignore headings that are hidden in DOM
  ignoreHiddenElements: false,
  // Optional callback to modify properties of parsed headings.
  // The heading element is passed in node parameter and information
  // parsed by default parser is provided in obj parameter.
  // Function has to return the same or modified obj.
  // The heading will be excluded from TOC if nothing is returned.
  // function (object, HTMLElement) => object | void
  headingObjectCallback: null,
  // Set the base path, useful if you use a `base` tag in `head`.
  basePath: "",
  // Only takes affect when `tocSelector` is scrolling,
  // keep the toc scroll position in sync with the content.
  disableTocScrollSync: false,
  // Offset for the toc scroll (top) position when scrolling the page.
  // Only effective if `disableTocScrollSync` is false.
  tocScrollOffset: 0,
  // Enable the URL hash to update with the proper heading ID as
  // a user scrolls the page.
  enableUrlHashUpdateOnScroll: false
};

// node_modules/tocbot/src/js/parse-content.js
function parseContent(options) {
  const reduce = [].reduce;
  function getLastItem(array) {
    return array[array.length - 1];
  }
  function getHeadingLevel(heading) {
    return +heading.nodeName.toUpperCase().replace("H", "");
  }
  function isHTMLElement(maybeElement) {
    try {
      return maybeElement instanceof window.HTMLElement || maybeElement instanceof window.parent.HTMLElement;
    } catch (e) {
      return maybeElement instanceof window.HTMLElement;
    }
  }
  function getHeadingObject(heading) {
    if (!isHTMLElement(heading)) return heading;
    if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) {
      return null;
    }
    const headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.innerText)) : (heading.innerText || heading.textContent).trim());
    const obj = {
      id: heading.id,
      children: [],
      nodeName: heading.nodeName,
      headingLevel: getHeadingLevel(heading),
      textContent: headingLabel
    };
    if (options.includeHtml) {
      obj.childNodes = heading.childNodes;
    }
    if (options.headingObjectCallback) {
      return options.headingObjectCallback(obj, heading);
    }
    return obj;
  }
  function addNode(node, nest) {
    const obj = getHeadingObject(node);
    const level = obj.headingLevel;
    let array = nest;
    let lastItem = getLastItem(array);
    const lastItemLevel = lastItem ? lastItem.headingLevel : 0;
    let counter = level - lastItemLevel;
    while (counter > 0) {
      lastItem = getLastItem(array);
      if (lastItem && level === lastItem.headingLevel) {
        break;
      } else if (lastItem && lastItem.children !== void 0) {
        array = lastItem.children;
      }
      counter--;
    }
    if (level >= options.collapseDepth) {
      obj.isCollapsed = true;
    }
    array.push(obj);
    return array;
  }
  function selectHeadings(contentElement, headingSelector) {
    let selectors = headingSelector;
    if (options.ignoreSelector) {
      selectors = headingSelector.split(",").map(function mapSelectors(selector) {
        return `${selector.trim()}:not(${options.ignoreSelector})`;
      });
    }
    try {
      return contentElement.querySelectorAll(selectors);
    } catch (e) {
      console.warn(`Headers not found with selector: ${selectors}`);
      return null;
    }
  }
  function nestHeadingsArray(headingsArray) {
    return reduce.call(headingsArray, function reducer(prev, curr) {
      const currentHeading = getHeadingObject(curr);
      if (currentHeading) {
        addNode(currentHeading, prev.nest);
      }
      return prev;
    }, {
      nest: []
    });
  }
  return {
    nestHeadingsArray,
    selectHeadings
  };
}

// node_modules/tocbot/src/js/scroll-smooth/index.js
function initSmoothScrolling(options) {
  var duration = options.duration;
  var offset = options.offset;
  if (typeof window === "undefined" || typeof location === "undefined") return;
  var pageUrl = location.hash ? stripHash(location.href) : location.href;
  delegatedLinkHijacking();
  function delegatedLinkHijacking() {
    document.body.addEventListener("click", onClick, false);
    function onClick(e) {
      if (!isInPageLink(e.target) || e.target.className.indexOf("no-smooth-scroll") > -1 || e.target.href.charAt(e.target.href.length - 2) === "#" && e.target.href.charAt(e.target.href.length - 1) === "!" || e.target.className.indexOf(options.linkClass) === -1) {
        return;
      }
      jump(e.target.hash, {
        duration,
        offset,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }
  function isInPageLink(n) {
    return n.tagName.toLowerCase() === "a" && (n.hash.length > 0 || n.href.charAt(n.href.length - 1) === "#") && (stripHash(n.href) === pageUrl || stripHash(n.href) + "#" === pageUrl);
  }
  function stripHash(url) {
    return url.slice(0, url.lastIndexOf("#"));
  }
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));
    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }
      element.focus();
    }
  }
}
function jump(target, options) {
  var start = window.pageYOffset;
  var opt = {
    duration: options.duration,
    offset: options.offset || 0,
    callback: options.callback,
    easing: options.easing || easeInOutQuad
  };
  var tgt = document.querySelector('[id="' + decodeURI(target).split("#").join("") + '"]') || document.querySelector('[id="' + target.split("#").join("") + '"]');
  var distance = typeof target === "string" ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target;
  var duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
  var timeStart;
  var timeElapsed;
  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });
  function loop(time) {
    timeElapsed = time - timeStart;
    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
    if (timeElapsed < duration) {
      requestAnimationFrame(loop);
    } else {
      end();
    }
  }
  function end() {
    window.scrollTo(0, start + distance);
    if (typeof opt.callback === "function") {
      opt.callback();
    }
  }
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// node_modules/tocbot/src/js/update-toc-scroll.js
var SCROLL_LEEWAY = 30;
function updateTocScroll(options) {
  var toc = options.tocElement || document.querySelector(options.tocSelector);
  if (toc && toc.scrollHeight > toc.clientHeight) {
    var activeItem = toc.querySelector("." + options.activeListItemClass);
    if (activeItem) {
      var cTop = toc.scrollTop;
      var cBottom = cTop + toc.clientHeight;
      var eTop = activeItem.offsetTop;
      var eBottom = eTop + activeItem.clientHeight;
      if (eTop < cTop + options.tocScrollOffset) {
        toc.scrollTop -= cTop - eTop + options.tocScrollOffset;
      } else if (eBottom > cBottom - options.tocScrollOffset - SCROLL_LEEWAY) {
        toc.scrollTop += eBottom - cBottom + options.tocScrollOffset + 2 * SCROLL_LEEWAY;
      }
    }
  }
}

// node_modules/tocbot/src/js/index-esm.js
var _options = {};
var _buildHtml;
var _parseContent;
var _headingsArray;
var _scrollListener;
var clickListener;
function init(customOptions) {
  _options = extend(default_options_default, customOptions || {});
  if (_options.scrollSmooth) {
    _options.duration = _options.scrollSmoothDuration;
    _options.offset = _options.scrollSmoothOffset;
    initSmoothScrolling(_options);
  }
  _buildHtml = build_html_default(_options);
  _parseContent = parseContent(_options);
  destroy();
  const contentElement = getContentElement(_options);
  if (contentElement === null) {
    return;
  }
  const tocElement = getTocElement(_options);
  if (tocElement === null) {
    return;
  }
  _headingsArray = _parseContent.selectHeadings(
    contentElement,
    _options.headingSelector
  );
  if (_headingsArray === null) {
    return;
  }
  const nestedHeadingsObj = _parseContent.nestHeadingsArray(_headingsArray);
  const nestedHeadings = nestedHeadingsObj.nest;
  if (!_options.skipRendering) {
    _buildHtml.render(tocElement, nestedHeadings);
  } else {
    return this;
  }
  _scrollListener = throttle((e) => {
    _buildHtml.updateToc(_headingsArray);
    !_options.disableTocScrollSync && updateTocScroll(_options);
    if (_options.enableUrlHashUpdateOnScroll) {
      const enableUpdatingHash = _buildHtml.getCurrentlyHighlighting();
      enableUpdatingHash && _buildHtml.updateUrlHashForHeader(_headingsArray);
    }
    const isTop = e?.target?.scrollingElement && e.target.scrollingElement.scrollTop === 0;
    if (e && (e.eventPhase === 0 || e.currentTarget === null) || isTop) {
      _buildHtml.updateToc(_headingsArray);
      if (_options.scrollEndCallback) {
        _options.scrollEndCallback(e);
      }
    }
  }, _options.throttleTimeout);
  _scrollListener();
  if (_options.scrollContainer && document.querySelector(_options.scrollContainer)) {
    document.querySelector(_options.scrollContainer).addEventListener("scroll", _scrollListener, false);
    document.querySelector(_options.scrollContainer).addEventListener("resize", _scrollListener, false);
  } else {
    document.addEventListener("scroll", _scrollListener, false);
    document.addEventListener("resize", _scrollListener, false);
  }
  let timeout = null;
  clickListener = throttle((event) => {
    if (_options.scrollSmooth) {
      _buildHtml.disableTocAnimation(event);
    }
    _buildHtml.updateToc(_headingsArray);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      _buildHtml.enableTocAnimation();
    }, _options.scrollSmoothDuration);
  }, _options.throttleTimeout);
  if (_options.scrollContainer && document.querySelector(_options.scrollContainer)) {
    document.querySelector(_options.scrollContainer).addEventListener("click", clickListener, false);
  } else {
    document.addEventListener("click", clickListener, false);
  }
}
function destroy() {
  const tocElement = getTocElement(_options);
  if (tocElement === null) {
    return;
  }
  if (!_options.skipRendering) {
    if (tocElement) {
      tocElement.innerHTML = "";
    }
  }
  if (_options.scrollContainer && document.querySelector(_options.scrollContainer)) {
    document.querySelector(_options.scrollContainer).removeEventListener("scroll", _scrollListener, false);
    document.querySelector(_options.scrollContainer).removeEventListener("resize", _scrollListener, false);
    if (_buildHtml) {
      document.querySelector(_options.scrollContainer).removeEventListener("click", clickListener, false);
    }
  } else {
    document.removeEventListener("scroll", _scrollListener, false);
    document.removeEventListener("resize", _scrollListener, false);
    if (_buildHtml) {
      document.removeEventListener("click", clickListener, false);
    }
  }
}
function refresh(customOptions) {
  destroy();
  init(customOptions || _options);
}
var hasOwnProp = Object.prototype.hasOwnProperty;
function extend(...args) {
  const target = {};
  for (let i = 0; i < args.length; i++) {
    const source = args[i];
    for (const key in source) {
      if (hasOwnProp.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
function throttle(fn, threshold, scope) {
  threshold || (threshold = 250);
  let last;
  let deferTimer;
  return function(...args) {
    const context = scope || this;
    const now = +/* @__PURE__ */ new Date();
    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
function getContentElement(options) {
  try {
    return options.contentElement || document.querySelector(options.contentSelector);
  } catch (e) {
    console.warn(`Contents element not found: ${options.contentSelector}`);
    return null;
  }
}
function getTocElement(options) {
  try {
    return options.tocElement || document.querySelector(options.tocSelector);
  } catch (e) {
    console.warn(`TOC element not found: ${options.tocSelector}`);
    return null;
  }
}

// node_modules/tocbot/index.js
var tocbot = { destroy, init, refresh };
var tocbot_default = tocbot;

// assets/js/table-of-contents.js
function initialiseTocbot() {
  tocbot_default.init({
    tocSelector: ".toc",
    contentSelector: ".article",
    hasInnerContainers: true
  });
}
function toggleToc() {
  const tocButton = document.querySelector(".toc-toggle");
  const tableOfContents = document.querySelector(".table-of-contents");
  if (!tableOfContents) {
    return;
  }
  function toggleTableOfContents() {
    tableOfContents.classList.toggle("toc-open");
  }
  if (!tocButton) {
    return;
  }
  window.addEventListener("click", function(e) {
    let tocOpenElement = null;
    tocOpenElement = tableOfContents.querySelector(".toc-open");
    if (tocOpenElement && tocOpenElement.contains(e.target)) {
      return;
    }
    if (!tableOfContents.contains(e.target) && !tocButton.contains(e.target) && tableOfContents.classList.contains("toc-open")) {
      toggleTableOfContents();
    }
  });
  tocButton.addEventListener("click", toggleTableOfContents, false);
}
function updateTocReadingProgress() {
  const tocToggleButton = document.querySelector(".toc-toggle");
  if (!tocToggleButton) {
    return;
  }
  function updateProgress() {
    const totalHeight = document.body.clientHeight;
    const windowHeight = document.documentElement.clientHeight;
    const position = window.scrollY;
    const progress = position / (totalHeight - windowHeight) * 100;
    tocToggleButton.setAttribute("data-progress", `${progress.toFixed(0)}%`);
    tocToggleButton.style.setProperty(
      "--conic-gradient",
      `var(--reading-progress-color) 0deg 0%,  
      var(--reading-progress-color) 0deg ${progress.toFixed(3)}%,
      var(--background-color) 0deg ${1 - progress.toFixed(3)}%,
      var(--background-color) 0deg 360deg`
    );
    requestAnimationFrame(updateProgress);
  }
  requestAnimationFrame(updateProgress);
}

// assets/js/main.js
var import_prismjs = __toESM(require_prism(), 1);

// node_modules/prismjs/components/prism-javascript.min.js
Prism.languages.javascript = Prism.languages.extend("clike", { "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: true }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: true }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: true }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r
]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r
,.;:})\\]]|//))`), lookbehind: true, greedy: true, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: true, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: true, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: true, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: true, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: true, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: true, greedy: true, alias: "property" } }), Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: true, alias: "property" } }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;

// node_modules/prismjs/components/prism-nginx.js
(function(Prism3) {
  var variable = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
  Prism3.languages.nginx = {
    "comment": {
      pattern: /(^|[\s{};])#.*/,
      lookbehind: true,
      greedy: true
    },
    "directive": {
      pattern: /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
      lookbehind: true,
      greedy: true,
      inside: {
        "string": {
          pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
          lookbehind: true,
          greedy: true,
          inside: {
            "escape": {
              pattern: /\\["'\\nrt]/,
              alias: "entity"
            },
            "variable": variable
          }
        },
        "comment": {
          pattern: /(\s)#.*/,
          lookbehind: true,
          greedy: true
        },
        "keyword": {
          pattern: /^\S+/,
          greedy: true
        },
        // other patterns
        "boolean": {
          pattern: /(\s)(?:off|on)(?!\S)/,
          lookbehind: true
        },
        "number": {
          pattern: /(\s)\d+[a-z]*(?!\S)/i,
          lookbehind: true
        },
        "variable": variable
      }
    },
    "punctuation": /[{};]/
  };
})(Prism);

// node_modules/prismjs/components/prism-bash.min.js
!function(e) {
  var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", a = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: true, alias: "punctuation", inside: null }, n = { bash: a, environment: { pattern: RegExp("\\$" + t), alias: "constant" }, variable: [{ pattern: /\$?\(\([\s\S]+?\)\)/, greedy: true, inside: { variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: true }, /^\$\(\(/], number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/, operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/, punctuation: /\(\(?|\)\)?|,|;/ } }, { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: true, inside: { variable: /^\$\(|^`|\)$|`$/ } }, { pattern: /\$\{[^}]+\}/, greedy: true, inside: { operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/, punctuation: /[\[\]]/, environment: { pattern: RegExp("(\\{)" + t), lookbehind: true, alias: "constant" } } }, /\$(?:\w+|[#?*!@$])/], entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/ };
  e.languages.bash = { shebang: { pattern: /^#!\s*\/.*/, alias: "important" }, comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: true }, "function-name": [{ pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: true, alias: "function" }, { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: "function" }], "for-or-select": { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: "variable", lookbehind: true }, "assign-left": { pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/, inside: { environment: { pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t), lookbehind: true, alias: "constant" } }, alias: "variable", lookbehind: true }, parameter: { pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/, alias: "variable", lookbehind: true }, string: [{ pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: true, greedy: true, inside: n }, { pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/, lookbehind: true, greedy: true, inside: { bash: a } }, { pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/, lookbehind: true, greedy: true, inside: n }, { pattern: /(^|[^$\\])'[^']*'/, lookbehind: true, greedy: true }, { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: true, inside: { entity: n.entity } }], environment: { pattern: RegExp("\\$?" + t), alias: "constant" }, variable: n.variable, function: { pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/, lookbehind: true }, keyword: { pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/, lookbehind: true }, builtin: { pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/, lookbehind: true, alias: "class-name" }, boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/, lookbehind: true }, "file-descriptor": { pattern: /\B&\d\b/, alias: "important" }, operator: { pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/, inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } } }, punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/, number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: true } }, a.inside = e.languages.bash;
  for (var s = ["comment", "function-name", "for-or-select", "assign-left", "parameter", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], o = n.variable[1].inside, i = 0; i < s.length; i++) o[s[i]] = e.languages.bash[s[i]];
  e.languages.sh = e.languages.bash, e.languages.shell = e.languages.bash;
}(Prism);

// node_modules/prismjs/plugins/command-line/prism-command-line.js
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  var CLASS_PATTERN = /(?:^|\s)command-line(?:\s|$)/;
  var PROMPT_CLASS = "command-line-prompt";
  var startsWith = "".startsWith ? function(s, p) {
    return s.startsWith(p);
  } : function(s, p) {
    return s.indexOf(p) === 0;
  };
  var endsWith = "".endsWith ? function(str, suffix) {
    return str.endsWith(suffix);
  } : function(str, suffix) {
    var len = str.length;
    return str.substring(len - suffix.length, len) === suffix;
  };
  function hasCommandLineInfo(env) {
    var vars = env.vars = env.vars || {};
    return "command-line" in vars;
  }
  function getCommandLineInfo(env) {
    var vars = env.vars = env.vars || {};
    return vars["command-line"] = vars["command-line"] || {};
  }
  Prism.hooks.add("before-highlight", function(env) {
    var commandLine = getCommandLineInfo(env);
    if (commandLine.complete || !env.code) {
      commandLine.complete = true;
      return;
    }
    var pre = env.element.parentElement;
    if (!pre || !/pre/i.test(pre.nodeName) || // Abort only if neither the <pre> nor the <code> have the class
    !CLASS_PATTERN.test(pre.className) && !CLASS_PATTERN.test(env.element.className)) {
      commandLine.complete = true;
      return;
    }
    var existingPrompt = env.element.querySelector("." + PROMPT_CLASS);
    if (existingPrompt) {
      existingPrompt.remove();
    }
    var codeLines = env.code.split("\n");
    commandLine.numberOfLines = codeLines.length;
    var outputLines = commandLine.outputLines = [];
    var outputSections = pre.getAttribute("data-output");
    var outputFilter = pre.getAttribute("data-filter-output");
    if (outputSections !== null) {
      outputSections.split(",").forEach(function(section) {
        var range = section.split("-");
        var outputStart = parseInt(range[0], 10);
        var outputEnd = range.length === 2 ? parseInt(range[1], 10) : outputStart;
        if (!isNaN(outputStart) && !isNaN(outputEnd)) {
          if (outputStart < 1) {
            outputStart = 1;
          }
          if (outputEnd > codeLines.length) {
            outputEnd = codeLines.length;
          }
          outputStart--;
          outputEnd--;
          for (var j2 = outputStart; j2 <= outputEnd; j2++) {
            outputLines[j2] = codeLines[j2];
            codeLines[j2] = "";
          }
        }
      });
    } else if (outputFilter) {
      for (var i = 0; i < codeLines.length; i++) {
        if (startsWith(codeLines[i], outputFilter)) {
          outputLines[i] = codeLines[i].slice(outputFilter.length);
          codeLines[i] = "";
        }
      }
    }
    var continuationLineIndicies = commandLine.continuationLineIndicies = /* @__PURE__ */ new Set();
    var lineContinuationStr = pre.getAttribute("data-continuation-str");
    var continuationFilter = pre.getAttribute("data-filter-continuation");
    for (var j = 0; j < codeLines.length; j++) {
      var line = codeLines[j];
      if (!line) {
        continue;
      }
      if (lineContinuationStr && endsWith(line, lineContinuationStr)) {
        continuationLineIndicies.add(j + 1);
      }
      if (j > 0 && continuationFilter && startsWith(line, continuationFilter)) {
        codeLines[j] = line.slice(continuationFilter.length);
        continuationLineIndicies.add(j);
      }
    }
    env.code = codeLines.join("\n");
  });
  Prism.hooks.add("before-insert", function(env) {
    var commandLine = getCommandLineInfo(env);
    if (commandLine.complete) {
      return;
    }
    var codeLines = env.highlightedCode.split("\n");
    var outputLines = commandLine.outputLines || [];
    for (var i = 0, l = codeLines.length; i < l; i++) {
      if (outputLines.hasOwnProperty(i)) {
        codeLines[i] = '<span class="token output">' + Prism.util.encode(outputLines[i]) + "</span>";
      } else {
        codeLines[i] = '<span class="token command">' + codeLines[i] + "</span>";
      }
    }
    env.highlightedCode = codeLines.join("\n");
  });
  Prism.hooks.add("complete", function(env) {
    if (!hasCommandLineInfo(env)) {
      return;
    }
    var commandLine = getCommandLineInfo(env);
    if (commandLine.complete) {
      return;
    }
    var pre = env.element.parentElement;
    if (CLASS_PATTERN.test(env.element.className)) {
      env.element.className = env.element.className.replace(CLASS_PATTERN, " ");
    }
    if (!CLASS_PATTERN.test(pre.className)) {
      pre.className += " command-line";
    }
    function getAttribute(key, defaultValue) {
      return (pre.getAttribute(key) || defaultValue).replace(/"/g, "&quot");
    }
    var promptLines = "";
    var rowCount = commandLine.numberOfLines || 0;
    var promptText = getAttribute("data-prompt", "");
    var promptLine;
    if (promptText !== "") {
      promptLine = '<span data-prompt="' + promptText + '"></span>';
    } else {
      var user = getAttribute("data-user", "user");
      var host = getAttribute("data-host", "localhost");
      promptLine = '<span data-user="' + user + '" data-host="' + host + '"></span>';
    }
    var continuationLineIndicies = commandLine.continuationLineIndicies || /* @__PURE__ */ new Set();
    var continuationPromptText = getAttribute("data-continuation-prompt", ">");
    var continuationPromptLine = '<span data-continuation-prompt="' + continuationPromptText + '"></span>';
    for (var j = 0; j < rowCount; j++) {
      if (continuationLineIndicies.has(j)) {
        promptLines += continuationPromptLine;
      } else {
        promptLines += promptLine;
      }
    }
    var prompt = document.createElement("span");
    prompt.className = PROMPT_CLASS;
    prompt.innerHTML = promptLines;
    var outputLines = commandLine.outputLines || [];
    for (var i = 0, l = outputLines.length; i < l; i++) {
      if (outputLines.hasOwnProperty(i)) {
        var node = prompt.children[i];
        node.removeAttribute("data-user");
        node.removeAttribute("data-host");
        node.removeAttribute("data-prompt");
      }
    }
    env.element.insertBefore(prompt, env.element.firstChild);
    commandLine.complete = true;
  });
})();

// assets/js/main.js
demoOptionsPicker();
copyLink();
darkModeToggle();
enrolDialog();
lightbox();
createMainNavMenu();
mainNavMenuToggle();
sidebarToggle();
pagination(false);
initialiseTocbot();
toggleToc();
updateTocReadingProgress();
/*! Bundled license information:

photoswipe/dist/photoswipe.esm.js:
  (*!
    * PhotoSwipe 5.4.4 - https://photoswipe.com
    * (c) 2024 Dmytro Semenov
    *)

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)

photoswipe/dist/photoswipe-lightbox.esm.js:
  (*!
    * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
    * (c) 2024 Dmytro Semenov
    *)
*/
//# sourceMappingURL=main.js.map
