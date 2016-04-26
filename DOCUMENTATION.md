## Documentation

You can see below the API reference of this module.

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

