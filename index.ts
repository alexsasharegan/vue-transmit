import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";
import {
  XHRUploadAdapter,
  ParamNameStyle,
  XHRUploadOptions,
  UploadGroup,
} from "./src/upload-adapters/xhr";
import {
  UploadAdapterConstructor,
  UploadAdapterInterface,
  UploadErr,
  UploadResult,
} from "./src/core/interfaces";
import {
  Dimensions,
  DrawImageArgs,
  ErrType,
  UploadStatuses,
  VTransmitEvents,
} from "./src/core/utils";

const VueTransmitPlugin: PluginObject<undefined> = {
  install(Vue) {
    Vue.component("VueTransmit", VueTransmit);
  },
  name: "vue-transmit",
};

export {
  VueTransmitPlugin,
  VueTransmit,
  XHRUploadAdapter,
  ParamNameStyle,
  XHRUploadOptions,
  UploadGroup,
  UploadAdapterConstructor,
  UploadAdapterInterface,
  UploadErr,
  UploadResult,
  Dimensions,
  DrawImageArgs,
  ErrType,
  UploadStatuses,
  VTransmitEvents,
};

export default VueTransmitPlugin;
