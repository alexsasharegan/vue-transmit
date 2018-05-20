import path from "path";
import TS from "rollup-plugin-typescript2";
import VuePlugin from "rollup-plugin-vue";
import { uglify as UglifyPlugin } from "rollup-plugin-uglify";
import { minify } from "uglify-es";

const is_production = process.env.NODE_ENV === `production`;
const vtKebab = "vue-transmit";
const vtPascal = "VueTransmit";
const cssOut = path.join(__dirname, `dist/${vtKebab}.css`);
const vue_opts = { css: cssOut };
const ts_opts = { include: ["*.ts+(|x)", "**/*.ts+(|x)", RegExp(".*.ts?.*")] };
const plugins = [VuePlugin(vue_opts), TS()];

export default [
	{
		input: "src/index.umd.ts",
		output: {
			format: "umd",
			name: vtPascal,
			file: `./dist/${vtKebab}.js`,
			sourcemap: true,
			globals: {
				vue: "Vue",
				firebase: "firebase",
			},
		},
	},
	{
		input: path.resolve(__dirname, "src/index.ts"),
		output: {
			format: "es",
			file: `./dist/${vtKebab}.esm.js`,
			sourcemap: true,
		},
	},
].reduce((configs, { input, output }) => {
	configs.push({
		external: ["vue", "firebase"],
		input,
		output: { ...output },
		plugins: plugins,
	});

	configs.push({
		external: ["vue", "firebase"],
		input,
		output: {
			...output,
			file: replaceExtension(output.file, ".min.js"),
		},
		plugins: [...plugins, UglifyPlugin({}, minify)],
	});

	return configs;
}, []);

function replaceExtension(name, replacement) {
	return name.slice(0, name.lastIndexOf(".")) + replacement;
}
