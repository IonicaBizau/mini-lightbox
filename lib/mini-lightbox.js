(function (window) {

     function MiniLightbox(options) {

        var selector = options.selector || options
          , elms = document.querySelectorAll(selector)
          ;

        for (var i = 0; i < elms.length; ++i) {
            (function (cEl) {
                cEl.addEventListener("click", function () {
                    debugger;
                });
            })(elms[i]);
        }
    };

    window.MiniLightbox = MiniLightbox;
})(window);
