import * as components from "./src"

export default {
  install(Vue, _options) {
    for (const component in components) {
      if (Object.prototype.hasOwnProperty.call(components, component)) {
        Vue.component(component, components[component])
      }
    }
  },
  name: "vue-transmit"
}
