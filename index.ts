import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";
import { XHRUploadAdapter } from "./src/upload-adapters/xhr";

const VueTransitPlugin: PluginObject<undefined> = {
  install(Vue) {
    Vue.component("VueTransmit", VueTransmit);
  },
  name: "vue-transmit",
};

export { VueTransitPlugin, VueTransmit, XHRUploadAdapter };
