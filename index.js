import VueTransmit from "./src/VueTransmit.vue"

window.VueTransmit = {
    install(Vue, options) {
        Vue.component("VueTransmit", VueTransmit)
    }
}
