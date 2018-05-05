import path from "path";
import ts from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import uglify from "rollup-plugin-uglify";

const is_production = process.env.NODE_ENV === `production`;
const kebab_name = "vue-transmit";
const pascal_name = "VueTransmit";
const ts_opts = { verbosity: 3, clean: true };
const vue_opts = { css: path.join(__dirname, `dist/${kebab_name}.css`) };
const plugins = [ts(ts_opts), vue(vue_opts)];

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
		plugins,
	});

	configs.push({
		external: ["vue", "firebase"],
		input,
		output: {
			...output,
			file: replaceExtension(output.file, ".min.js"),
		},
		plugins: plugins.concat(uglify()),
	});

	return configs;
}, []);

function replaceExtension(name, replacement) {
	return name.slice(0, name.lastIndexOf(".")) + replacement;
}
