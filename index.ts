import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";
import {
  XHRDriver,
  ParamNameStyle,
  XHRDriverOptions,
  UploadGroup,
} from "./src/upload-adapters/xhr";
import {
  DriverConstructor,
  DriverInterface,
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
  XHRDriver,
  ParamNameStyle,
  XHRDriverOptions,
  UploadGroup,
  DriverConstructor,
  DriverInterface,
  UploadErr,
  UploadResult,
  Dimensions,
  DrawImageArgs,
  ErrType,
  UploadStatuses,
  VTransmitEvents,
};

export default VueTransmitPlugin;
