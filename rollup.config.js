const path = require("path");
const ts = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const uglify = require("rollup-plugin-uglify");

const isProduction = process.env.NODE_ENV === `production`;
const kebab_name = "vue-transmit";
const pascal_name = "VueTransmit";
const cssOptions = { css: path.join(__dirname, `dist/${kebab_name}.css`) };

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
		plugins: [ts(), vue(cssOptions)],
	});

	configs.push({
		external: ["vue", "firebase"],
		input,
		output: {
			...output,
			file: replaceExtension(output.file, ".min.js"),
		},
		plugins: [ts(), vue(cssOptions), uglify()],
	});

	return configs;
}, []);

function replaceExtension(name, replacement) {
	return name.slice(0, name.lastIndexOf(".")) + replacement;
}
