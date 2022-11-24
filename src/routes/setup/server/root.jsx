/** @format */

import "react";

// Importing Components

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";

// Svgs
import { ReactComponent as JellyplayerLogo } from "../../../assets/logo.svg";

// SCSS
import "./server.module.scss";

export const ServerSetup = (props) => {
	// const checkServer = ({ ip: any }) => {
	// 	fetch(`${ip}/`);
	// };

	return (
		<>
			<div className="centered serverContainer">
				<JellyplayerLogo className="logo" />
				<TextField
					className="textbox"
					label="Server Address"
					variant="outlined"
				></TextField>
				<Button className="button" variant="contained">
					Add Server
				</Button>
				<div>Hello This is server</div>
			</div>
		</>
	);
};
