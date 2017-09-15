import * as components from "./src"

export default {
  install(Vue, options) {
    for (const component in components) {
      if (Object.prototype.hasOwnProperty.call(components, component)) {
        Vue.component(component, components[component])
      }
    }
  },
  name: NAME,
  version: VERSION
}
