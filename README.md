# mini-lightbox [![Support this project][donate-now]][paypal-donations]

Minimalist image lightbox

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
"selector": ".content img"
// or the common parent where the images are appended
, delegation: "html"
});
```

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md