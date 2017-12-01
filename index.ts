import { VueTransmit } from "./src"

export default {
	install(Vue, _options) {
		Vue.component("VueTransmit", VueTransmit)
	},
	name: "vue-transmit",
}
