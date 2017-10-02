<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible"
        content="ie=edge">
  <title>Vue Dropzone Test</title>
  <script src="https://unpkg.com/vue"></script>
  <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
        integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
        crossorigin="anonymous">
  <link rel="stylesheet" href="https://unpkg.com/vue-flex@2.0.2/dist/vue-flex.css">
  <script>
    <?= file_get_contents(__DIR__. "/../dist/vue-transmit.browser.js" ); ?>
  </script>
  <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }

    .img--logo {
      height: 10vh;
    }

    .vh-20 {
      height: 20vh;
    }

    .btn {
      cursor: pointer;
    }
    .card-body {
      max-height: 300px;
      overflow-y: scroll;
    }
    [v-cloak] { display: none; }
    <?= file_get_contents(__DIR__. "/../dist/vue-transmit.css" ); ?>
  </style>
</head>

<body>
  <b-container fluid
               tag="main"
               id="app"
               v-cloak>
    <b-navbar toggleable="md"
              class="mb-3"
              type="light"
              variant="light">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-collapse is-nav
                  id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#"
                      disabled>Disabled</b-nav-item>
        </b-nav>
        <!-- Right aligned nav items -->
        <b-nav is-nav-bar
              class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm"
                          class="mr-sm-2"
                          type="text"
                          placeholder="Search" />
            <b-button size="sm"
                      class="my-2 my-sm-0"
                      type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown text="Lang"
                              right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <header class="text-center">
      <a href="https://github.com/alexsasharegan/vue-transmit"
         target="_blank">
        <img class="img--logo"
             src="/assets/logo.png">
      </a>
      <h1 class="mb-5"><code>&lt;vue-transmit&gt;</code></h1>
    </header>
    <b-container tag="main">
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <vue-transmit ref="uploader"
                        upload-area-classes="vh-20"
                        drag-class="dragging"
                        url="/upload.php"
                        @success="onUploadSuccess"
                        @error="onError">
            <flex-col align-v="center"
                      class="h-100">
              <flex-row align-h="center">
                <b-btn variant="primary"
                       class="w-50">
                  Upload Files
                </b-btn>
              </flex-row>
            </flex-col>
            <template scope="{ uploadingFiles }"
                      slot="files">
              <flex-row v-for="file in uploadingFiles"
                        :key="file.id"
                        align-v="center"
                        no-wrap
                        class="w-100 my-5"
                        style="height: 100px;">
                <img v-show="file.dataUrl"
                    :src="file.dataUrl"
                    :alt="file.name"
                    class="img-fluid w-25">
                <b-progress :value="file.upload.progress"
                            show-progress
                            :precision="2"
                            :variant="file.upload.progress === 100 ? 'success' : 'warning'"
                            :animated="file.upload.progress === 100"
                            class="ml-2 w-100"></b-progress>
              </flex-row>
            </template>
          </vue-transmit>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col v-for="file in files"
               :key="file.id"
               cols="4">
          <b-card :title="file.name"
                  :sub-title="file.type"
                  :img-src="file.src"
                  :img-alt="file.name"
                  img-top>
            <pre>{{ file | json }}</pre>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal v-model="showModal"
             title="File Upload: Error">
      <p class="bg-danger text-white p-3 my-2"
         v-html="error"></p>
    </b-modal>
  </b-container>

  <script src="https://unpkg.com/bootstrap-vue@1.0.0-beta.9/dist/bootstrap-vue.js"></script>
  <script src="https://unpkg.com/vue-flex@2.0.2/dist/vue-flex.js"></script>
  <script>
    Vue.use(VueTransmit)
    Vue.use(vueFlex)
    window.app = new Vue({
      el: '#app',
      data: {
        options: {
          acceptedFileTypes: ['image/*'],
          url: './upload.php',
          clickable: false,
        },
        files: [],
        showModal: false,
        error: ""
      },
      methods: {
        triggerBrowse() {
          this.$refs.uploader.triggerBrowseFiles()
        },
        onUploadSuccess(file, res) {
          console.log(res)
          file.src = res.url
          this.files.push(file)
        },
        onError(file, errorMsg) {
          this.error = errorMsg
          this.showModal = true
        },
        listen(event) {
          this.$refs.uploader.$on(event, function() {
            console.log(event, ...arguments)
          })
        },
      },
      filters: {
        json(value) {
          return JSON.stringify(value, null, 2)
        }
      },
      mounted() {
        [
          "drop",
          "drag-start",
          "drag-end",
          "drag-enter",
          "drag-over",
          "drag-leave",
          "accepted-file",
          "rejected-file",
          "accept-complete",
          "added-file",
          "added-files",
          "removed-file",
          "thumbnail",
          "error",
          "error-multiple",
          "processing",
          "processing-multiple",
          "upload-progress",
          "total-upload-progress",
          "sending",
          "sending-multiple",
          "success",
          "success-multiple",
          "canceled",
          "canceled-multiple",
          "complete",
          "complete-multiple",
          "reset",
          "max-files-exceeded",
          "max-files-reached",
          "queue-complete"
        ].forEach(this.listen)
      },
    })
  </script>
</body>
</html>
