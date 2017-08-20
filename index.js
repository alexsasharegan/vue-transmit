import * as components from "@"

export default {
  install(Vue, options) {
    for (const component in components) {
      if (Object.prototype.hasOwnProperty.call(components, component)) {
        Vue.component(component, components[component])
      }
    }
  }
}
