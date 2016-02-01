var cache;

if (global.addEventListener) {
    global.addEventListener("scroll", function () {
        MiniLightbox.close();
    });

    global.addEventListener("keydown", function (e) {
        if (e.which !== 27) { return; }
        MiniLightbox.close();
    });
}

function matchesSelector(selector, element) {
    var all = document.querySelectorAll(selector);
    for (var i = 0; i < all.length; i++) {
        if (all[i] === element) {
            return true;
        }
    }
    return false;
}

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

/**
 * close
 * Closes the lightboxes.
 *
 * @name close
 * @function
 * @param {String} id The lightbox id. If not provided, it will close all the opened lightboxes.
 */
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

/**
 * open
 * Opens the lightbox. This is called internally.
 *
 * @name open
 * @function
 * @param {String} id The lightbox id.
 */
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
