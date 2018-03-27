const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const uglify = require("rollup-plugin-uglify");

const isProduction = process.env.NODE_ENV === `production`;
const kebab_name = "vue-transmit";
const pascal_name = "VueTransmit";

module.exports = [
  {
    input: "index.umd.ts",
    output: {
      format: "umd",
      name: pascal_name,
      file: `./dist/${kebab_name}.js`,
      sourcemap: true,
      globals: {
        vue: "Vue",
        firebase: "firebase",
      },
    },
  },
  {
    input: path.resolve(__dirname, "index.ts"),
    output: {
      format: "es",
      file: `./dist/${kebab_name}.esm.js`,
      sourcemap: true,
    },
  },
].reduce((configs, { input, output }) => {
  configs.push({
    external: ["vue", "firebase"],
    input,
    output: { ...output },
    plugins: [
      typescript(),
      vue({ css: path.join(__dirname, `dist/${kebab_name}.css`) }),
    ],
  });

  configs.push({
    external: ["vue", "firebase"],
    input,
    output: {
      ...output,
      file: output.file.slice(0, output.file.lastIndexOf(".js")) + ".min.js",
    },
    plugins: [
      typescript(),
      vue({ css: path.join(__dirname, `dist/${kebab_name}.css`) }),
      uglify(),
    ],
  });

  return configs;
}, []);
