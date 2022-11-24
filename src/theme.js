/** @format */

import { createTheme } from "@mui/material/styles";
import {
	clrAccentDefault,
	clrBackgroundDefault,
	clrSecondaryDefault,
} from "./palette.module.scss";

export const theme = createTheme({
	palette: {
		primary: {
			main: clrAccentDefault,
			background: clrBackgroundDefault,
		},
		secondary: {
			main: clrSecondaryDefault,
		},
		mode: "dark",
	},
	typography: {
		fontFamily: "Open Sans",
	},
});
