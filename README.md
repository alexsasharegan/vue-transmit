# Vue-Transmit

A Vue.js drag & drop uploader based on Dropzone.js.

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
                      drop-zone-classes="bg-faded"
                      ref="uploader"
                      >
          <div class="d-flex align-items-center justify-content-center w-100"
                style="height:50vh; border-radius: 1rem;">
            <button class="btn btn-primary"
                    @click="triggerBrowse">Upload Files</button>
          </div>
          <template slot="files" scope="props">
            <div v-for="file in props.files">
              <pre>{{ file | json }}</pre>
              <img :src="file.dataUrl" class="img-fluid">
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
        url: './upload.php',
        clickable: false
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
