"use strict";

const $ = require("elly")
    , idy = require("idy")
    , forEach = require("iterate-object")
    ;

class MiniLightbox {

    /**
     * MiniLightbox
     *
     * Initializes the lightbox according to the options.
     *
     * **Callbacks**:
     *
     * The following methods can be used to modify the default behavior:
     *
     *  - `Minilightbox.customOpen` (Function): If it's a function, it will be
     *    called then the lightbox is opened. If it returns `false`, the default
     *    behavior will be prevented.
     *  - `Minilightbox.customClose` (Function): If it's a function, it will be
     *    called then the lightbox is closed. If it returns `false`, the default
     *    behavior will be prevented.
     *
     * @name MiniLightbox
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `selector` (String): The image query selector.
     *  - `delegation` (String): The image container where to handle the delegation.
     *
     */
    constructor (options) {
        let selector = options.selector || options
          , elms = $.$$(selector)
          , clickHandler = function (e) {
                let id = this.id
                  , fCache = cache[id]
                  , box
                  , img
                  ;

                if (!id) {
                    this.setAttribute("id", id = "ml_" + idy());
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
          ;

        elms.forEach(c => new Image(c.getAttribute("data-image-opened")));

        if (options.delegation) {
            const matchesSelector = (selector, element) => {
                let all = $.$$(selector);
                for (var i = 0; i < all.length; i++) {
                    if (all[i] === element) {
                        return true;
                    }
                }
                return false;
            };

            return $(options.delegation).addEventListener("click", function(e) {
                let el = e.target
                  , parents = [el]
                  ;

                while (el) {
                    parents.push(el = el.parentNode);
                }

                for (let i = 0; i < parents.length; ++i) {
                    let cPar = parents[i];
                    if (matchesSelector(options.selector, cPar) && (el = cPar)) {
                        break;
                    }
                }

                if (!el || el.tagName !== 'IMG' || el.parentNode.classList.contains("ml_box")) { return; }
                clickHandler.call(el, e);
            });
        }

        forEach(elms, cEl => cEl.addEventListener("click", clickHandler));
    }

    /**
     * close
     * Closes the lightboxes.
     *
     * @name close
     * @function
     * @param {String} id The lightbox id. If not provided, it will close all the opened lightboxes.
     */
    close (id) {

        if (!id) {
            forEach(cache, id => MiniLightbox.close(id));
            return;
        }

        if (!cache[id].opened) {
            return;
        }

        cache[id].opened = false;

        if (typeof this.customClose === "function" && this.customClose(cache[id]) === false) {
            return;
        }

        cache[id].box.style.display = "none";
    }

    /**
     * open
     * Opens the lightbox. This is called internally.
     *
     * @name open
     * @function
     * @param {String} id The lightbox id.
     */
    open (id) {
        if (cache[id].opened) { return; }
        cache[id].opened = true;
        if (typeof this.customOpen === "function" && this.customOpen(cache[id]) === false) {
            return;
        }
        cache[id].box.style.display = "block";
    }
};

const cache = MiniLightbox._cache = {};

if (global.addEventListener) {
    global.addEventListener("scroll", function () {
        MiniLightbox.close();
    });

    global.addEventListener("keydown", function (e) {
        if (e.which !== 27) { return; }
        MiniLightbox.close();
    });
}

module.exports = MiniLightbox;
