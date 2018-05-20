import VueTransmit from "./components/VueTransmit.vue";
import { PluginObject } from "vue";
import {
	XHRDriver,
	ParamNameStyle,
	XHRDriverOptions,
	XHRUploadGroup,
} from "./upload-drivers/xhr";
import {
	FirebaseDriver,
	FirebaseUploadOptions,
} from "./upload-drivers/firebase";
import {
	DriverConstructor,
	DriverInterface,
	UploadErr,
	UploadResult,
} from "./core/interfaces";
import {
	Dimensions,
	DrawImageArgs,
	ErrType,
	UploadStatuses,
	VTransmitEvents,
} from "./core/utils";

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
