// MiniLightbox
// </> with <3 by Ionică Bizău
(function () {
    
    /**
     * Detect module loader and set the 'root' variable accordingly.
     * 
     * This code has been adapted from the awesome guys developing the lodash module.
     * (https://github.com/lodash/lodash/blob/master/dist/lodash.js)
     */
    
    /** Used to determine if values are of the language type `Object`. */
    var objectTypes = {
        'function': true,
        'object': true
    };
    
    /** Detect free variable `exports`. */
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    
    /** Detect free variable `module`. */
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    
    /** Detect free variable `global` from Node.js. */
    var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
    
    /** Detect free variable `self`. */
    var freeSelf = objectTypes[typeof self] && self && self.Object && self;
    
    /** Detect free variable `window`. */
    var freeWindow = objectTypes[typeof window] && window && window.Object && window;
    
    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    
    /**
    * Used as a reference to the global object.
    *
    * The `this` value is used if it's the global object to avoid Greasemonkey's
    * restricted `window` object, otherwise the `window` object is used.
    */
    var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

    root.addEventListener("scroll", function () {
        MiniLightbox.close();
    });

    root.addEventListener("keydown", function (e) {
        if (e.which !== 27) { return; }
        MiniLightbox.close();
    });

    function matchesSelector(selector, element) {
        var all = document.querySelectorAll(selector);
        for (var i = 0; i < all.length; i++) {
            if (all[i] === element) {
                return true;
            }
        }
        return false;
    }

     function MiniLightbox(options) {

        var selector = options.selector || options
          , elms = document.querySelectorAll(selector)
          , clickHandler = function (e) {
                var id = this.id
                  , fCache = cache[id]
                  ;

                if (!id) {
                    this.setAttribute("id", id = "ml_" + Math.random().toString(36));
                }

                if (fCache) {
                    MiniLightbox.open(id);
                } else {
                    var box = document.createElement("div");
                    box.setAttribute("class", "ml_box");
                    var img = document.createElement("img");
                    img.setAttribute("src", this.getAttribute("data-image-opened") || this.src);
                    box.appendChild(img);

                    box.addEventListener("click", function () {
                        MiniLightbox.close(id);
                    });

                    cache[id] = {
                        el: this
                      , box: box
                      , img: img
                      , opened: false
                    };

                    document.body.appendChild(box);
                    MiniLightbox.open(id);
                }

                e.preventDefault();
            }
          ;

        for (var i = 0; i < elms.length; ++i) {
            new Image(elms[i].getAttribute("data-image-opened"));
        }

        if (options.delegation) {
            return document.querySelector(options.delegation).addEventListener("click", function(e) {
                var el = e.target;
                var parents = [el];
                while (el) { parents.push(el = el.parentNode); }
                for (var i = 0; i < parents.length; ++i) {
                    var cPar = parents[i];
                    if (matchesSelector(options.selector, cPar) && (el = cPar)) {
                        break;
                    }
                }

                if (!el || el.tagName !== 'IMG' || el.parentNode.classList.contains("ml_box")) { return; }
                clickHandler.call(el, e);
            });
        }

        for (var i = 0; i < elms.length; ++i) {
            (function (cEl) {
                cEl.addEventListener("click", clickHandler);
            })(elms[i]);
        }
    };

    MiniLightbox.close = function (id) {
        if (!id) {
            var ids = Object.keys(cache);
            for (var i = 0; i < ids.length; ++i) {
                MiniLightbox.close(ids[i]);
            }
            return;
        }
        if (!cache[id].opened) {
            return;
        }
        cache[id].opened = false;

        if (typeof MiniLightbox.customClose === "function" && MiniLightbox.customClose.call(cache[id]) === false) {
            return;
        }

        cache[id].box.style.display = "none";
    };

    MiniLightbox.open = function (id) {
        if (cache[id].opened) { return; }
        cache[id].opened = true;
        if (typeof MiniLightbox.customOpen === "function" && MiniLightbox.customOpen.call(cache[id]) === false) {
            return;
        }
        cache[id].box.style.display = "block";
    };

    var cache = MiniLightbox._cache = {};
    
    /**
     * Export the MiniLightbox module in different module loader formats.
     * 
     * This code has been adapted from the awesome guys developing the lodash module.
     * (https://github.com/lodash/lodash/blob/master/dist/lodash.js)
     */
    
    // Some AMD build optimizers like r.js check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Expose MiniLightbox to the global object when an AMD loader is present to avoid
        // errors in cases where MiniLightbox is loaded by a script tag and not intended
        // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
        // more details.
        root.MiniLightbox = MiniLightbox;
        
        // Define as an anonymous module so, through path mapping, it can be
        // referenced as the "MiniLightbox" module.
        define(function() {
          return MiniLightbox;
        });
    
    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    } else if (freeExports && freeModule) {
        // Export for Node.js or RingoJS.
        if (moduleExports) {
            freeModule.exports = MiniLightbox;
        }
        // Export for Rhino with CommonJS support.
        else {
            freeExports.MiniLightbox = MiniLightbox;
        }
    } else {
        // Export for a browser or Rhino.
        root.MiniLightbox = MiniLightbox;
    }
})(this);
