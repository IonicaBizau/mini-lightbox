
# mini-lightbox

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/mini-lightbox.svg)](https://www.npmjs.com/package/mini-lightbox) [![Downloads](https://img.shields.io/npm/dt/mini-lightbox.svg)](https://www.npmjs.com/package/mini-lightbox) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Minimalist image lightbox

## Demo
Check out [the demo page](http://ionicabizau.github.io/mini-lightbox).

## Examples

### Simple usage

```html
<img id="myImage" src="myImage.png" alt="Some title">
<script>
    MiniLightbox("#myImage");
</script>
```

### Advanced usage
If you need more stuff (e.g. animations etc), you need to create custom handlers (`customClose` and `customOpen` handlers). Works like a charm with animate.css library. :smile:

```js
MiniLightbox.customClose = function () {
    var self = this;
    self.img.classList.add("animated", "fadeOutDown");
    setTimeout(function () {
        self.box.classList.add("animated", "fadeOut");
        setTimeout(function () {
            self.box.classList.remove("animated", "fadeOut");
            self.img.classList.remove("animated", "fadeOutDown");
            self.box.style.display = "none";
        }, 500);
    }, 500);
    // prevent default library behavior
    return false;
};

MiniLightbox.customOpen = function () {
    this.box.classList.add("animated", "fadeIn");
    this.img.classList.add("animated", "fadeInUp");
};
```

### Using `data-image-opened` attribute
If `data-image-opened` attribute is provided in `img` element, it will be used for the path of the image when the popup is opened.

```html
<img id="myImage" data-image-opened="./big.png" src="small.png" alt="Some title">
```

### Delegation
If images are added dynamically, you need to use delegation:

```js
MiniLightbox({
    selector: ".content img"
    // the common container where the images are appended
  , delegation: "html"
});
```

## :cloud: Installation


Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it from `npm` and `require` it:

```sh
$ npm i --save mini-lightbox
```


## :memo: Documentation


### `MiniLightbox(options)`

Initializes the lightbox according to the options.

**Callbacks**:

The following methods can be used to modify the default behavior:

 - `Minilightbox.customOpen` (Function): If it's a function, it will be
   called then the lightbox is opened. If it returns `false`, the default
   behavior will be prevented.
 - `Minilightbox.customClose` (Function): If it's a function, it will be
   called then the lightbox is closed. If it returns `false`, the default
   behavior will be prevented.

#### Params
- **Object** `options`: An object containing the following fields:
 - `selector` (String): The image query selector.
 - `delegation` (String): The image container where to handle the delegation.

### `close(id)`
Closes the lightboxes.

#### Params
- **String** `id`: The lightbox id. If not provided, it will close all the opened lightboxes.

### `open(id)`
Opens the lightbox. This is called internally.

#### Params
- **String** `id`: The lightbox id.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
