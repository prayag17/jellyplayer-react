/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react(), svgr()],
	css: {
		modules: {
			scopeBehaviour: "global",
		},
		preprocessorOptions: {
			scss: {
				additionalData: '@use "./src/styles/variables.scss" as *;',
			},
		},
	},
});
