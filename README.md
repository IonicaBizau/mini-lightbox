# MiniLightbox
Minimalist image lightbox

## Installation
Run the following commands to download and install the application:

```sh
$ git clone https://github.com/ionicabizau/mini-lightbox mini-lightbox
$ cd mini-lightbox
$ npm install
```

## Demo
Checkout [the demo page](http://ionicabizau.github.io/mini-lightbox).

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

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
