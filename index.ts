import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";

const Plugin: PluginObject<undefined> = {
  install(Vue) {
    Vue.component("VueTransmit", VueTransmit);
  },
  name: "vue-transmit",
};

export default Plugin;
