/** @format */

import "react";

// Importing Components
// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const ServerSetup = () => {
	// const checkServer = ({ ip: any }) => {
	// 	fetch(`${ip}/`);
	// };

	return (
		<>
			<TextField label="server ip" variant="outlined"></TextField>
			<Button variant="contained">Add Server</Button>
			<div>Hello This is server</div>
		</>
	);
};
