(function (window) {

    window.onscroll = function () {
        MiniLightbox.close();
    };

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
                          , opened: true
                        };

                        document.body.appendChild(box);
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
        cache[id].box.style.display = "none";
        cache[id].opened = false;
    };

    MiniLightbox.open = function (id) {
        if (cache[id].opened) { return; }
        cache[id].box.style.display = "block";
        cache[id].opened = true;
    };

    var cache = MiniLightbox._cache = {};

    window.MiniLightbox = MiniLightbox;
})(window);
