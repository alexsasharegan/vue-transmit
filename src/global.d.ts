// Type definitions for [Vue Transmit]
// Project: [vue-transmit]
// Definitions by: [Alex Regan] <[https://github.com/alexsasharegan/]>

declare module "*.vue" {
	import Vue from "vue";
	export default Vue;
}

declare type AnyObject = { [key: string]: any };

declare type Dictionary<T> = { [key: string]: T };
