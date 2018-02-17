# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="9.0.0-alpha.7"></a>
# [9.0.0-alpha.7](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.6...v9.0.0-alpha.7) (2018-02-17)


### Features

* improving XHR adapter ([82baf15](https://github.com/alexsasharegan/vue-transmit/commit/82baf15))



<a name="9.0.0-alpha.6"></a>
# [9.0.0-alpha.6](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.5...v9.0.0-alpha.6) (2018-02-09)


### Bug Fixes

* correct bad spelling of plugin named export ([3f2f0dd](https://github.com/alexsasharegan/vue-transmit/commit/3f2f0dd))



<a name="9.0.0-alpha.5"></a>
# [9.0.0-alpha.5](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.4...v9.0.0-alpha.5) (2018-02-09)


### Bug Fixes

* use named exports and update props in docs ([2150854](https://github.com/alexsasharegan/vue-transmit/commit/2150854))



<a name="9.0.0-alpha.4"></a>
# [9.0.0-alpha.4](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.3...v9.0.0-alpha.4) (2018-02-09)


### Bug Fixes

* error handling improved by passing error data ([b042e63](https://github.com/alexsasharegan/vue-transmit/commit/b042e63))



<a name="9.0.0-alpha.3"></a>
# [9.0.0-alpha.3](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.2...v9.0.0-alpha.3) (2018-02-09)



<a name="9.0.0-alpha.2"></a>
# [9.0.0-alpha.2](https://github.com/alexsasharegan/vue-transmit/compare/v8.0.0...v9.0.0-alpha.2) (2018-02-09)


### Features

* abstract upload transport into adapter ([#27](https://github.com/alexsasharegan/vue-transmit/issues/27)) ([6cf71cf](https://github.com/alexsasharegan/vue-transmit/commit/6cf71cf))



<a name="9.0.0-alpha.1"></a>
# [9.0.0-alpha.1](https://github.com/alexsasharegan/vue-transmit/compare/v9.0.0-alpha.0...v9.0.0-alpha.1) (2018-02-09)


### Bug Fixes

* correct constructor prop for adapter ([e1807fc](https://github.com/alexsasharegan/vue-transmit/commit/e1807fc))



<a name="9.0.0-alpha.0"></a>
# [9.0.0-alpha.0](https://github.com/alexsasharegan/vue-transmit/compare/v8.0.0...v9.0.0-alpha.0) (2018-02-09)


### Bug Fixes

* removing vue-class-component for smaller bundles ([9bf830c](https://github.com/alexsasharegan/vue-transmit/commit/9bf830c))


### Code Refactoring

* **classes:** use named export for VTransmitFile ([78004dc](https://github.com/alexsasharegan/vue-transmit/commit/78004dc))


### Features

* **build:** use rollup for smaller build ([8f64477](https://github.com/alexsasharegan/vue-transmit/commit/8f64477))
* **xhr-transport:** initial adapter complete ([93e16a8](https://github.com/alexsasharegan/vue-transmit/commit/93e16a8))


### BREAKING CHANGES

* **build:** browser bundle & commonjs bundle
* **classes:** switch to named export of VTransmitFile class



<a name="8.0.0"></a>
# [8.0.0](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.7...v8.0.0) (2018-01-12)


### Bug Fixes

* **#25:** use form element to reset input after files added to vue-transmit ([#28](https://github.com/alexsasharegan/vue-transmit/issues/28)) ([bee472e](https://github.com/alexsasharegan/vue-transmit/commit/bee472e)), closes [#25](https://github.com/alexsasharegan/vue-transmit/issues/25) [#25](https://github.com/alexsasharegan/vue-transmit/issues/25)


### BREAKING CHANGES

* **#25:** The hidden file input is now wrapped in a form element (potentially breaking some more custom layouts if the file input was used in a way apart from the default). The `fileInputStyles` data attr is renamed to `formStyles` and placed on the form wrapper element instead of the file input.
- Use a form wrapper element to reliably reset the file input after adding files. This will allow browsers to upload the same file twice, where previously the `change` event would not fire due to the filename not changing.

* feat: enhanced xhr response error

"Error during upload: {{ statusText }} [{{ statusCode }}]"

* chore(docs): add info on using test app

* chore(test): updates to test app

* chore: build



<a name="7.1.7"></a>
## [7.1.7](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.6...v7.1.7) (2018-01-08)


### Bug Fixes

* rebuild for issue [#24](https://github.com/alexsasharegan/vue-transmit/issues/24) ([3186db3](https://github.com/alexsasharegan/vue-transmit/commit/3186db3))



<a name="7.1.6"></a>
## [7.1.6](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.5...v7.1.6) (2018-01-08)



<a name="7.1.5"></a>
## [7.1.5](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.4...v7.1.5) (2017-12-26)


### Bug Fixes

* **dependencies:** vue as dev dep to fix issue [#19](https://github.com/alexsasharegan/vue-transmit/issues/19) ([e951d1e](https://github.com/alexsasharegan/vue-transmit/commit/e951d1e))



<a name="7.1.4"></a>
## [7.1.4](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.3...v7.1.4) (2017-12-26)


### Bug Fixes

* **xhr:** corrects IE11 "InvalidState" issue. ([#18](https://github.com/alexsasharegan/vue-transmit/issues/18)) ([6c05941](https://github.com/alexsasharegan/vue-transmit/commit/6c05941))



<a name="7.1.3"></a>
## [7.1.3](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.2...v7.1.3) (2017-12-14)


### Bug Fixes

* **#17:** prefer `DataTransferItem.getAsFile` so file type is populated ([f1105e5](https://github.com/alexsasharegan/vue-transmit/commit/f1105e5)), closes [#17](https://github.com/alexsasharegan/vue-transmit/issues/17)



<a name="7.1.2"></a>
## [7.1.2](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.1...v7.1.2) (2017-12-01)


### Bug Fixes

* **build:** transpile entry point file properly ([9387b06](https://github.com/alexsasharegan/vue-transmit/commit/9387b06))



<a name="7.1.1"></a>
## [7.1.1](https://github.com/alexsasharegan/vue-transmit/compare/v7.1.0...v7.1.1) (2017-11-28)


### Bug Fixes

* handle response parsing when responseType given ([c66300d](https://github.com/alexsasharegan/vue-transmit/commit/c66300d))



<a name="7.1.0"></a>
# [7.1.0](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.6...v7.1.0) (2017-11-28)


### Features

* added responseType prop to set on XHR ([d205128](https://github.com/alexsasharegan/vue-transmit/commit/d205128))



<a name="7.0.6"></a>
## [7.0.6](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.5...v7.0.6) (2017-11-28)



<a name="7.0.5"></a>
## [7.0.5](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.4...v7.0.5) (2017-11-28)



<a name="7.0.4"></a>
## [7.0.4](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.3...v7.0.4) (2017-11-17)



<a name="7.0.3"></a>
## [7.0.3](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.2...v7.0.3) (2017-11-14)


### Bug Fixes

* guard calling `isFile` on null/undefined webkit entry objects ([dbe0ad2](https://github.com/alexsasharegan/vue-transmit/commit/dbe0ad2))



<a name="7.0.2"></a>
## [7.0.2](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.1...v7.0.2) (2017-11-07)


### Bug Fixes

* avoid Array.prototype.includes altogether ([a1cbe9b](https://github.com/alexsasharegan/vue-transmit/commit/a1cbe9b))



<a name="7.0.1"></a>
## [7.0.1](https://github.com/alexsasharegan/vue-transmit/compare/v7.0.0...v7.0.1) (2017-11-06)



<a name="7.0.0"></a>
# [7.0.0](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.8...v7.0.0) (2017-10-18)


### Chores

* update deps to Vue 2.5 compatibility ([5f891be](https://github.com/alexsasharegan/vue-transmit/commit/5f891be))


### Features

* **VTransmitFile:** make dataUrl prop non-enumerable ([9e51905](https://github.com/alexsasharegan/vue-transmit/commit/9e51905))


### BREAKING CHANGES

* dep updates are major semver upgrades.
* **VTransmitFile:** a non-enumerable dataUrl prop will not serialize in JSON or appear in the result of Object.keys. This should be beneficial since dataUrl's are mostly expensive payloads that should be avoided.



<a name="6.0.8"></a>
## [6.0.8](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.7...v6.0.8) (2017-10-17)


### Bug Fixes

* improve typings and ensure removeFile returns void ([0a3f686](https://github.com/alexsasharegan/vue-transmit/commit/0a3f686))



<a name="6.0.7"></a>
## [6.0.7](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.6...v6.0.7) (2017-10-09)


### Bug Fixes

* **drag+drop:** fix for webkit ([caa4683](https://github.com/alexsasharegan/vue-transmit/commit/caa4683))



<a name="6.0.6"></a>
## [6.0.6](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.5...v6.0.6) (2017-10-08)



<a name="6.0.5"></a>
## [6.0.5](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.4...v6.0.5) (2017-10-08)


### Bug Fixes

* add component name ([5d739f6](https://github.com/alexsasharegan/vue-transmit/commit/5d739f6))



<a name="6.0.4"></a>
## [6.0.4](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.3...v6.0.4) (2017-10-04)



<a name="6.0.3"></a>
## [6.0.3](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.2...v6.0.3) (2017-10-04)



<a name="6.0.2"></a>
## [6.0.2](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.1...v6.0.2) (2017-10-04)


### Bug Fixes

* browser bundle & thumbnail generation ([7cd3357](https://github.com/alexsasharegan/vue-transmit/commit/7cd3357))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/alexsasharegan/vue-transmit/compare/v6.0.0...v6.0.1) (2017-10-02)


### Bug Fixes

* **deps:** fix external Vue dep resolution ([ae90cbe](https://github.com/alexsasharegan/vue-transmit/commit/ae90cbe))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/alexsasharegan/vue-transmit/compare/v5.4.0...v6.0.0) (2017-10-02)


### Code Refactoring

* rewrite component in typescript ([#3](https://github.com/alexsasharegan/vue-transmit/issues/3)) ([7af5b17](https://github.com/alexsasharegan/vue-transmit/commit/7af5b17))


### BREAKING CHANGES

* remove check mark component from plugin
* the resize callback prop's call signature and return signature has been revised to conform to interfaces

* fix(utils): correct return signature for resizeImg

* chore(component): add access modifiers to data members

* chore: remove old props

* chore(test): more exhaustive test app

* chore: remove all old code

* chore: config files

* chore: improve clean script to rm -Rf



<a name="5.4.0"></a>
# [5.4.0](https://github.com/alexsasharegan/vue-transmit/compare/v5.3.2...v5.4.0) (2017-10-01)


### Features

* **css:** css now optional ([395f212](https://github.com/alexsasharegan/vue-transmit/commit/395f212))
* **events:** adds file acceptance hooks & typescript integration ([#2](https://github.com/alexsasharegan/vue-transmit/issues/2)) ([3dad7ec](https://github.com/alexsasharegan/vue-transmit/commit/3dad7ec))



<a name="5.3.2"></a>
## [5.3.2](https://github.com/alexsasharegan/vue-transmit/compare/v5.3.1...v5.3.2) (2017-09-29)


### Bug Fixes

* **build:** added .babelrc to appease babel ([543e8d5](https://github.com/alexsasharegan/vue-transmit/commit/543e8d5))



<a name="5.3.1"></a>
## [5.3.1](https://github.com/alexsasharegan/vue-transmit/compare/v5.3.0...v5.3.1) (2017-09-29)


### Bug Fixes

* **webpack:** correct config to ignore .babelrc ([d7506dc](https://github.com/alexsasharegan/vue-transmit/commit/d7506dc))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/alexsasharegan/vue-transmit/compare/v5.2.0...v5.3.0) (2017-09-29)


### Features

* **build:** commonjs is now ES5 build ([1cab5c2](https://github.com/alexsasharegan/vue-transmit/commit/1cab5c2))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.5...v5.2.0) (2017-09-25)


### Features

* added upload-area attribute/listener bindings ([58432c6](https://github.com/alexsasharegan/vue-transmit/commit/58432c6))



<a name="5.1.5"></a>
## [5.1.5](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.4...v5.1.5) (2017-09-18)


### Bug Fixes

* **drag-class:** update drag class to apply styles on drag ([ab28130](https://github.com/alexsasharegan/vue-transmit/commit/ab28130))



<a name="5.1.4"></a>
## [5.1.4](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.3...v5.1.4) (2017-09-18)


### Bug Fixes

* **package.json:** point main to commonjs ([58bcb71](https://github.com/alexsasharegan/vue-transmit/commit/58bcb71))



<a name="5.1.3"></a>
## [5.1.3](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.2...v5.1.3) (2017-09-18)


### Bug Fixes

* **build:** fixing esm build + commonjs build ([73a53a6](https://github.com/alexsasharegan/vue-transmit/commit/73a53a6))



<a name="5.1.2"></a>
## [5.1.2](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.1...v5.1.2) (2017-09-18)


### Bug Fixes

* duplicate class name prop and computed prop ([79a9f44](https://github.com/alexsasharegan/vue-transmit/commit/79a9f44))



<a name="5.1.1"></a>
## [5.1.1](https://github.com/alexsasharegan/vue-transmit/compare/v5.1.0...v5.1.1) (2017-09-16)


### Bug Fixes

* **build:** include built dist ([9a33262](https://github.com/alexsasharegan/vue-transmit/commit/9a33262))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/alexsasharegan/vue-transmit/compare/v5.0.1...v5.1.0) (2017-09-16)


### Features

* add customizeable class names for dragging ([715b70b](https://github.com/alexsasharegan/vue-transmit/commit/715b70b))



<a name="5.0.1"></a>
## [5.0.1](https://github.com/alexsasharegan/vue-transmit/compare/v5.0.0...v5.0.1) (2017-09-16)


### Bug Fixes

* **build:** bundles the entry point default export ([e1dcaa0](https://github.com/alexsasharegan/vue-transmit/commit/e1dcaa0))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/alexsasharegan/vue-transmit/compare/v1.0.12...v5.0.0) (2017-09-16)


### Features

* **docs:** quick slots explanation ([1947dd1](https://github.com/alexsasharegan/vue-transmit/commit/1947dd1))
* add isUploading computed prop to VTransmit ([f4ec3bb](https://github.com/alexsasharegan/vue-transmit/commit/f4ec3bb))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/alexsasharegan/vue-transmit/compare/v1.0.12...v1.1.0) (2017-09-16)


### Features

* **docs:** quick slots explanation ([1947dd1](https://github.com/alexsasharegan/vue-transmit/commit/1947dd1))
* add isUploading computed prop to VTransmit ([f4ec3bb](https://github.com/alexsasharegan/vue-transmit/commit/f4ec3bb))



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
