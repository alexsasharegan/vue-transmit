# Vue-Transmit

<img src="./docs/vt-logo.svg" width="200">

[![npm](https://img.shields.io/npm/v/vue-transmit.svg?style=for-the-badge)](https://img.shields.io/npm/v/vue-transmit)
[![npm downloads](https://img.shields.io/npm/dt/vue-transmit.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-transmit)
[![GitHub issues](https://img.shields.io/github/issues/alexsasharegan/vue-transmit.svg?style=for-the-badge)](https://github.com/alexsasharegan/vue-transmit/issues)
[![GitHub stars](https://img.shields.io/github/stars/alexsasharegan/vue-transmit.svg?style=for-the-badge)](https://github.com/alexsasharegan/vue-transmit/stargazers)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=for-the-badge)](https://conventionalcommits.org)

A Vue.js drag & drop uploader based on Dropzone.js (`~22KB`, `~6.5KB` gzipped).
Many thanks to [Matias Meno](https://gitlab.com/meno/dropzone/tree/master) for
paving the way with the original Dropzone.js!
[Check it out](https://gitlab.com/meno/dropzone/tree/master) for any of your
non-vue projects. 🙌

Check out the CodeSandbox here: https://codesandbox.io/s/lyzqn4m659

Have a question? Check out the [FAQ section](#faq).<br> Can't find what you're
looking for?
[Open an issue](https://github.com/alexsasharegan/vue-transmit/issues).<br> Want
to add to the docs?
[Submit a PR](https://github.com/alexsasharegan/vue-transmit/pulls).

## Table of Contents

* [Features](#features) - Vue Transmit features
* [v8.x](#v8xx) - Info for v8.x users
* [Installation](#installation) - Package install
  * [Builds](#builds) - ESM, UMD build info
* [Component Props](#props-vue-transmit) - Vue component props
* [XHR Adapter Options](#adapter-options-xhruploadadapter) - Default adapter
  options
* [Component Events](#events) - Events emitted from VueTransmit
* [Slots](#slots) - Component slots
  * [Slot: default](#default-slotsdefault) - default slot
  * [Slot: `"files"`](#files-scoped-slotsfiles) - files slot
* [VTransmitFile](#vtransmitfile) - the class that wraps the native File object
* [Usage example](#usage) - implementation example
* [FAQ](#faq) - Frequently Asked Questions
  * [Accessing the VueTransmit instance](#accessing-the-vuetransmit-component-instance)
  * [How to Remove a File](#how-to-remove-a-file)
* [Lifecycle](#lifecycle) - Basic explanation of upload lifecycle

## Features

Vue-Transmit is a fork of Dropzone.js that has been completely rewritten in
TypeScript/ES6 for Vue.js. Instead of creating a Vue wrapper component that
duplicates and proxies all of the methods and event logic between Dropzone and
the component, Vue-Transmit implements them directly from the component. This
cuts down on library size and offers a much tighter integration.

Vue-Transmit takes an event-based approach to the upload cycle. Instead of
passing callbacks to the component via an options object, use the template event
binding syntax (`<vue-transmit @event="callback" />`). All events strictly
conform to kebab-casing, including events proxied off native events (e.g.
`dragover => @drag-over`). This is for uniformity and so events can be easily
distinguished.

Vue-Transmit also has a modular upload transport. The default transport
implementation uses `XMLHttpRequest` to upload client-side files using
multi-part form data, but this could be swapped for a custom implementation for
something like Firebase or WebSockets.

In order to integrate with Vue.js reactivity, an object's properties must be
defined initially, be enumerable, and be configurable. A special File class has
been written (`VTransmitFile`) to register native browser file objects from
uploads reactively, since the native object properties are read-only. This class
also adds useful information not present in the native File object (dimensions,
upload stats, etc.).

* HTML 5 file uploads
* Emits upload lifecycle events (accepted, sending, progress, success, etc.)
* Image thumbnail previews
* Support for concurrent uploads
* Modular upload transport layer
* Completely written in Vue.js&mdash;no wrapper components
* Scoped slots allow for fully customizable styling
* Written in modern TypeScript/ES6 with modules

_\* Note: this library uses some built-ins (`Array.from`, `Promise`) that
require
[a polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill).
All other ESNext language features (arrow fns, for of, etc.) are transpiled with
TypeScript._

![upload-example](./docs/vue-transmit-10fps.gif)

## v8.x.x

[Visit the `8.x` branch here.](https://github.com/alexsasharegan/vue-transmit/tree/8.x)

Version 9 of Vue Transmit marks a new design that introduces various breaking
changes. Migrating an existing app to `>=v9.x.x` should be roughly hour of work
for most use cases (mileage may vary), but if you're using `v8.x.x` and you
don't need any `v9` features, there's no need to update. An `8.x` branch will be
maintained for LTS\* support.

\* LTS support `===` patches only.

## Installation

```sh
# npm
npm install vue-transmit

# yarn
yarn add vue-transmit
```

### Builds

The default build for ESM loaders like webpack is indicated in the `module`
field of the package, while non-esm will resolve from the `main` field. By
default, the unminified versions are specified. For most setups, importing the
lib would like either of the following:

```js
// ESM default export
import VueTransmit from "vue-transmit";
// ESM named export
import { VueTransmitPlugin } from "vue-transmit";
// Common.js (no 'default' export)
const { VueTransmitPlugin } = require("vue-transmit");
// Browser
const { VueTransmitPlugin } = window.VueTransmit;

// Installation
Vue.use(VueTransmit);
```

If you don't wish to register `VueTransmit` as a global component, you can
import the component directly.

```js
// ESM
import { VueTransmit } from "vue-transmit";
// Common.js
const { VueTransmit } = require("vue-transmit");
// Browser
const { VueTransmit } = window.VueTransmit;

// Your component using VueTransmit
const MyComponent = Vue.extend({
  name: "my-component",
  components: {
    "vue-transmit": VueTransmit,
  },
});
```

| Target | Path                                        | Minified |
| ------ | ------------------------------------------- | -------- |
| ESM    | `vue-transmit/dist/vue-transmit.esm.js`     | false    |
| ESM    | `vue-transmit/dist/vue-transmit.esm.min.js` | true     |
| UMD    | `vue-transmit/dist/vue-transmit.js`         | false    |
| UMD    | `vue-transmit/dist/vue-transmit.min.js`     | true     |

```sh
vue-transmit
└── dist
    ├── index.d.ts
    ├── vue-transmit.css
    ├── vue-transmit.esm.js
    ├── vue-transmit.esm.js.map
    ├── vue-transmit.esm.min.js
    ├── vue-transmit.esm.min.js.map
    ├── vue-transmit.js
    ├── vue-transmit.js.map
    ├── vue-transmit.min.js
    └── vue-transmit.min.js.map
```

## Props: <code>&lt;vue-transmit&gt;</code>

[**View Source**](./src/components/VueTransmit.vue#L87)

| Property               | Type                  | Default/Function Signature                                                                                                                                                                 |
| ---------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tag                    | string                | `"div"`                                                                                                                                                                                    |
| uploadAreaClasses      | array, object, string | `null`                                                                                                                                                                                     |
| uploadAreaAttrs        | object                | `{}`                                                                                                                                                                                       |
| uploadAreaListeners    | object                | `{}`                                                                                                                                                                                       |
| dragClass              | string                | `null`                                                                                                                                                                                     |
| maxConcurrentUploads   | number                | `2`                                                                                                                                                                                        |
| uploadMultiple         | boolean               | `false`                                                                                                                                                                                    |
| maxFileSize            | number                | `256`                                                                                                                                                                                      |
| fileSizeBaseInBinary   | boolean               | `false`                                                                                                                                                                                    |
| createImageThumbnails  | boolean               | `true`                                                                                                                                                                                     |
| maxThumbnailFileSize   | number                | `10`                                                                                                                                                                                       |
| thumbnailWidth         | number                | `120`                                                                                                                                                                                      |
| thumbnailHeight        | number                | `120`                                                                                                                                                                                      |
| maxFiles               | number                | `null`                                                                                                                                                                                     |
| clickable              | boolean               | `true`                                                                                                                                                                                     |
| ignoreHiddenFiles      | boolean               | `true`                                                                                                                                                                                     |
| acceptedFileTypes      | array                 | `[]`                                                                                                                                                                                       |
| autoProcessQueue       | boolean               | `true`                                                                                                                                                                                     |
| autoQueue              | boolean               | `true`                                                                                                                                                                                     |
| capture                | string                | `null`                                                                                                                                                                                     |
| errMaxFileSizeExceeded | function              | `(fileSize: number, maxFileSize: number, units: string) => string`                                                                                                                         |
| errInvalidFileType     | function              | `(type: string, acceptedTypes: string[], file: VTransmitFile) => string`                                                                                                                   |
| errMaxFilesExceeded    | function              | `(maxFiles: number) => string`                                                                                                                                                             |
| accept                 | function              | `(file: VTransmitFile, done: Function) => string`                                                                                                                                          |
| resize                 | function              | `(file: VTransmitFile, dims: { width: number; height: number; }) => { sx: number; sy: number; sWidth: number; sHeight: number; dx: number; dy: number; dWidth: number; dHeight: number; }` |
| adapterOptions         | object                | `{}`                                                                                                                                                                                       |
| uploadAdapter          | function              | `XHRUploadAdapter`                                                                                                                                                                         |

## Adapter Options: XHRUploadAdapter

[**View Source**](./src/upload-adapters/xhr.ts#L24-L79)

| Property          | Type                                                         | Default/Function Signature                        |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| url               | string                                                       | _(required)_                                      |
| method            | string                                                       | `"post"`                                          |
| withCredentials   | boolean                                                      | `false`                                           |
| timeout           | number                                                       | `0`                                               |
| paramName         | string                                                       | `"file"`                                          |
| params            | `{ [key: string]: string }`                                  | `{}`                                              |
| headers           | `{ [key: string]: string }`                                  | `{ Accept, 'Cache-Control', 'X-Requested-With' }` |
| responseType      | `"" | "arraybuffer" | "blob" | "document" | "json" | "text"` | `"json"`                                          |
| errUploadError    | function                                                     | `(xhr: XMLHttpRequest) => string`                 |
| errUploadTimeout  | function                                                     | `(xhr: XMLHttpRequest) => string`                 |
| renameFile        | function                                                     | `(name: string) => string`                        |
| responseParseFunc | function                                                     | `<T>(xhr: XMLHttpRequest) => T`                   |

## Events

| Event                   | Arguments                                                  | Description                                                                                                                                                         |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `drop`                  | `event: DragEvent`                                         | The `drop` event is fired when an data transfer is dropped on the drop target.                                                                                      |
| `drag-start`            | `event: DragEvent`                                         | The `drag-start` event is fired when the user starts dragging an element or text selection.                                                                         |
| `drag-end`              | `event: DragEvent`                                         | The `drag-end` event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).                                         |
| `drag-enter`            | `event: DragEvent`                                         | The `drag-enter` event is fired when a dragged element or text selection enters a valid drop target.                                                                |
| `drag-over`             | `event: DragEvent`                                         | The `drag-over` event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).                        |
| `drag-leave`            | `event: DragEvent`                                         | The `drag-leave` event is fired when a dragged element or text selection leaves a valid drop target.                                                                |
| `added-file`            | `file: VTransmitFile`                                      | Fired on change from the hidden file input after the Native File has been copied to file: VTransmitFile and added to the component data. _(status: 'added')_        |
| `added-files`           | `files: VTransmitFile[]`                                   | Fired on change from the hidden file input after the Native Files have been copied to VTransmitFiles and added to the component data. _(status: 'added')_           |
| `accepted-file`         | `file: VTransmitFile`                                      | Fired if the user-supplied accept function returns without error. _(status: 'added', accepted: true)_                                                               |
| `rejected-file`         | `file: VTransmitFile`                                      | Fired if the user-supplied accept function returns an error. Fired AFTER the `error` event to ensure correct file status. _(status: 'error', accepted: false)_      |
| `accept-complete`       | `file: VTransmitFile`                                      | Fired after the user-supplied accept function has returned regardless of success/failure. Fired after `accepted-file` & `rejected-file`. _(status: ?, accepted: ?)_ |
| `removed-file`          | `file: VTransmitFile`                                      | Fired on the removal of a file.                                                                                                                                     |
| `thumbnail`             | `file: VTransmitFile, data: Blob\|URL`                     | Fires on creation of a thumbnail.                                                                                                                                   |
| `error`                 | `file: VTransmitFile, message: string, data: any`          | Fired on an ajax upload error. _(status: 'error')_                                                                                                                  |
| `error-multiple`        | `files: VTransmitFile[], message: string, data: any`       | Fired on an ajax upload error. _(status: 'error')_                                                                                                                  |
| `processing`            | `file: VTransmitFile`                                      | Fired after the status is changed to `'uploading'`, right before the ajax request.                                                                                  |
| `processing-multiple`   | `files: VTransmitFile[]`                                   | Fired after the status is changed to `'uploading'`, right before the ajax request.                                                                                  |
| `upload-progress`       | `file: VTransmitFile, progress: number, bytesSent: number` | Fired on progress of the upload.                                                                                                                                    |
| `total-upload-progress` | `file: VTransmitFile, totalUploadProgress: number`         | Fired directly after `upload-progress`.                                                                                                                             |
| `sending`               | `file: VTransmitFile, xhr: XMLHttpRequest, data: FormData` | Fired right before the upload is sent.                                                                                                                              |
| `sending-multiple`      | `files: VTransmitFile[], xhr: XMLHttpRequest, FormData`    | Fired right before the upload is sent.                                                                                                                              |
| `success`               | `file: VTransmitFile, result: any`                         | Fired on load of the upload.                                                                                                                                        |
| `success-multiple`      | `files: VTransmitFile[], result: any`                      | Fired on load of the upload.                                                                                                                                        |
| `timeout`               | `file: VTransmitFile, message: string, data: any`          | Fired on timeout of the upload.                                                                                                                                     |
| `timeout-multiple`      | `files: VTransmitFile[], message: string, data: any`       | Fired on timeout of the upload.                                                                                                                                     |
| `canceled`              | `file: VTransmitFile`                                      | Fired upon cancellation of the upload. _(status: 'canceled')_                                                                                                       |
| `canceled-multiple`     | `files: VTransmitFile[]`                                   | Fired upon cancellation of the upload. _(status: 'canceled')_                                                                                                       |
| `complete`              | `file: VTransmitFile`                                      | Fired upon completion of the upload. _(whether success or failure)_                                                                                                 |
| `complete-multiple`     | `files: VTransmitFile[]`                                   | Fired upon completion of the upload. _(whether success or failure)_                                                                                                 |
| `reset`                 | `void`                                                     | Fired when all files have been removed.                                                                                                                             |
| `max-files-exceeded`    | `file: VTransmitFile`                                      | Fired if a file is added that exceeds the max files prop.                                                                                                           |
| `max-files-reached`     | `files: VTransmitFile[]`                                   | Fired when the total accepted files on the instance exceeds the max files prop.                                                                                     |
| `queue-complete`        | `file: VTransmitFile`                                      | Fired once all added files have uploaded and the queue has been flushed.                                                                                            |

## Slots

### Default (`$slots.default`)

The default slot should contain your markup for getting an upload started. This
could be a file uploader button and/or a dropzone.

### Files (Scoped, `$slots.files`)

This slot receives a number of props:

```ts
interface FilesSlotProps {
  files: VTransmitFile[];
  acceptedFiles: VTransmitFile[];
  rejectedFiles: VTransmitFile[];
  addedFiles: VTransmitFile[];
  queuedFiles: VTransmitFile[];
  uploadingFiles: VTransmitFile[];
  activeFiles: VTransmitFile[];
  isUploading: Boolean;
}
```

## `VTransmitFile`

```json
{
  "_nativeFile": {},
  "id": "v-transmit-file-1",
  "accepted": true,
  "lastModified": 1478117443000,
  "lastModifiedDate": "2016-11-02T20:10:43.000Z",
  "name": "cosmo.jpg",
  "processing": true,
  "size": 142776,
  "status": "success",
  "type": "image/jpeg",
  "upload": {
    "bytesSent": 142776,
    "progress": 100,
    "speed": {
      "kbps": 10.06,
      "mbps": 0.01
    },
    "start": 1503273157993,
    "end": 1503273158029,
    "time": 0.036,
    "total": 142776
  },
  "webkitRelativePath": "",
  "width": 700,
  "height": 700,
  "xhr": {},
  "dataUrl":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAgAElEQVR4XlS9B7RmZ3UluG/="
}
```

## Usage

If you have PHP installed on your machine, you can clone this repo and open up a
working test app by running:

```sh
npm test
```

Now navigate to [http://localhost:3030/](http://localhost:3030/).

```html
<template>
  <main id="root" class="mt-5">
    <div class="container">
      <div class="row">
        <header class="col-12 text-center">
          <h1 class="mb-5"><code>&lt;vue-transmit&gt;</code></h1>
        </header>
        <vue-transmit class="col-12"
                      tag="section"
                      v-bind="options"
                      upload-area-classes="bg-faded"
                      ref="uploader">
          <div class="d-flex align-items-center justify-content-center w-100"
                style="height:50vh; border-radius: 1rem;">
            <button class="btn btn-primary"
                    @click="triggerBrowse">Upload Files</button>
          </div>
          <!-- Scoped slot -->
          <template slot="files" slot-scope="props">
            <div v-for="(file, i) in props.files" :key="file.id" :class="{'mt-5': i === 0}">
              <div class="media">
                <img :src="file.dataUrl" class="img-fluid d-flex mr-3">
                <div class="media-body">
                  <h3>{{ file.name }}</h3>
                  <div class="progress" style="width: 50vw;">
                    <div class="progress-bar bg-success"
                        :style="{width: file.upload.progress + '%'}"></div>
                  </div>
                  <pre>{{ file | json }} </pre>
                </div>
              </div>
            </div>
          </template>
        </vue-transmit>
      </div>
    </div>
  </main>
</template>

<script>
  Vue.use(VueTransmit)
  window.app = new Vue({
    el: '#root',
    data: {
      options: {
        acceptedFileTypes: ['image/*'],
        clickable: false,
        adapterOptions: {
          url: './upload.php',
        },
      }
    },
    methods: {
      triggerBrowse() {
        this.$refs.uploader.triggerBrowseFiles()
      },
    },
    filters: {
      json(value) {
        return JSON.stringify(value, null, 2)
      }
    }
  })
</script>
```

## FAQ

### Accessing the VueTransmit component instance

It's always recommended to place a ref on your vue-transmit instance so that
your component can call methods and retrieve data directly from the instance.

```html
<vue-transmit ref="vtransmit" />
```

### How to remove a file

You can remove a single file or all files from the component instance. To remove
a single file, you'll need the file you wish to delete.

```js
// from your component
this.$refs.vtransmit.removeFile(vtFile); // single file
this.$refs.vtransmit.removeAllFiles((cancelInProgressUploads = false)); // all files
```

## Lifecycle

The upload process has many stages, each with different possible outcomes. Here
is an overview of the lifecycle of an upload with Vue Transmit:

* Trigger event
  * input on `change`: value of `input.files` is read and passed to `vm.addFile`
  * target on `drop`: value of `event.dataTransfer["files" || "items"]` is
    read/traversed and passed to `vm.addFile`
* Add File
  * instantiate `VTransmitFile` from native file object (for reactivity & extra
    info)
  * status `added`
  * pushed onto `vm.files`
  * thumbnail is enqueued
* Accept File
  * check size, type, upload limit
  * invoke `accept` function for consumer validation
  * `accept` or `reject` complete
  * if `autoQueue`, enqueue file
* Enqueue file
  * check that file status is `added` & has been accepted
  * status = `queued`
  * if `autoProcessQueue`, invoke `processQueue` async _(like node
    `setImmediate`)_
* Process queue
  * check number of uploading files against upload limit
  * invoke `processFiles` with max amount of queued files options allow
* Process files
  * do upload
* Progress updates
* Complete upload
  * status = `success || error`
  * process queue to handle buffered files
