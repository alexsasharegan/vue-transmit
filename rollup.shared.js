const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");

const isProduction = process.env.NODE_ENV === `production`;
const kebab_name = "vue-transmit";
const pascal_name = "VueTransmit";

exports.new_conf = () => ({
  input: path.resolve(__dirname, "index.ts"),
  external: ["vue"],
  plugins: [
    typescript(),
    vue({
      css: path.join(__dirname, `dist/${kebab_name}.css`),
    }),
  ],
  output: [
    {
      format: "es",
      file: `./dist/${kebab_name}.esm.js`,
      sourcemap: true,
    },
    {
      format: "umd",
      name: pascal_name,
      file: `./dist/${kebab_name}.js`,
      sourcemap: true,
      globals: {
        vue: "Vue",
      },
    },
  ],
});
