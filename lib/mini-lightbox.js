(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MiniLightbox = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var cache;

global.addEventListener("scroll", function () {
    MiniLightbox.close();
});

global.addEventListener("keydown", function (e) {
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
                , box
                , img
                ;

            if (!id) {
                this.setAttribute("id", id = "ml_" + Math.random().toString(36));
            }

            if (fCache) {
                MiniLightbox.open(id);
            } else {
                box = document.createElement("div");
                box.setAttribute("class", "ml_box");
                img = document.createElement("img");
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
        , i
        ;

    for (i = 0; i < elms.length; ++i) {
        new Image(elms[i].getAttribute("data-image-opened"));
    }

    if (options.delegation) {
        return document.querySelector(options.delegation).addEventListener("click", function(e) {
            var el = e.target;
            var parents = [el];
            while (el) { parents.push(el = el.parentNode); }
            for (i = 0; i < parents.length; ++i) {
                var cPar = parents[i];
                if (matchesSelector(options.selector, cPar) && (el = cPar)) {
                    break;
                }
            }

            if (!el || el.tagName !== 'IMG' || el.parentNode.classList.contains("ml_box")) { return; }
            clickHandler.call(el, e);
        });
    }

    for (i = 0; i < elms.length; ++i) {
        (function (cEl) {
            cEl.addEventListener("click", clickHandler);
        })(elms[i]);
    }
}

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

cache = MiniLightbox._cache = {};

module.exports = MiniLightbox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});