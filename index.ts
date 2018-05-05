import { PluginObject } from "vue";
import { VueTransmit } from "./src/index";
import {
	XHRDriver,
	ParamNameStyle,
	XHRDriverOptions,
	XHRUploadGroup,
} from "./src/upload-adapters/xhr";
import {
	FirebaseDriver,
	FirebaseUploadOptions,
} from "./src/upload-adapters/firebase";
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
	XHRUploadGroup,
	FirebaseDriver,
	FirebaseUploadOptions,
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
