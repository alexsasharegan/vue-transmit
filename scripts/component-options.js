const { VueTransmit, XHRUploadAdapter } = require("../dist/vue-transmit");
const { format } = require("util");

let { props } = VueTransmit.options;
let data = Object.keys(props)
  .map(k => new_comp_desc(k, props[k]))
  .map(d => `|${d.Property}|${d.Type}|${(d.Default || "").toString()}|`)
  .join("\n");

console.log(data);

props = new XHRUploadAdapter({}, { url: "" });
data = Object.keys(props)
  .map(k => new_class_desc(k, props))
  .map(d => `|${d.Property}|${d.Type}|${(d.Default || "").toString()}|`)
  .join("\n");

console.log(data);

function new_comp_desc(prop, descriptor) {
  let desc = Object.create(null);

  desc.Property = prop;
  desc.Type = resolve_type(descriptor.type);
  desc.Default = fmt(descriptor.default);
  if (descriptor.required) {
    desc.Required = "✓";
  }

  return desc;
}

function new_class_desc(prop, instance) {
  let desc = Object.create(null);

  desc.Property = prop;
  desc.Type = typeof instance[prop];
  desc.Default = fmt(instance[prop]);

  return desc;
}

function resolve_type(t) {
  if (Array.isArray(t)) {
    return t.map(resolve_type).join(", ");
  }

  if (typeof t !== "function") {
    throw new TypeError();
  }

  return t.name;
}

function fmt(x) {
  if (x === null) {
    return "null";
  }
  switch (typeof x) {
    case "number":
      return format("%d", x);
    case "object":
    case "symbol":
    case "function":
      return format("%O", x);
    case "string":
    case "boolean":
    case "undefined":
    default:
      return format("%s", x);
  }
}
