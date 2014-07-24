(function (window) {

    window.addEventListener("scroll", function () {
        MiniLightbox.close();
    });

    window.addEventListener("keydown", function (e) {
        if (e.which !== 27) { return; }
        MiniLightbox.close();
    });

     function MiniLightbox(options) {

        var selector = options.selector || options
          , elms = document.querySelectorAll(selector)
          ;

        for (var i = 0; i < elms.length; ++i) {
            (function (cEl) {
                cEl.addEventListener("click", function (e) {
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
                });
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

    window.MiniLightbox = MiniLightbox;
})(window);
