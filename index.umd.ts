import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";
import { XHRUploadAdapter } from "./src/upload-adapters/xhr";

const VueTransmitPlugin: PluginObject<undefined> = {
  install(Vue) {
    Vue.component("VueTransmit", VueTransmit);
  },
  name: "vue-transmit",
};

export { VueTransmitPlugin, VueTransmit, XHRUploadAdapter };
