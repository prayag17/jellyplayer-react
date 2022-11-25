/** @format */

import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

// Importing Components

// Jellyfin Api
import { JellyfinContext } from "../../../jellyfin";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Slide from "@mui/material/Slide";
import { useSnackbar } from "notistack";

// Svgs
import { ReactComponent as JellyplayerLogo } from "../../../assets/logo.svg";

// SCSS
import "./server.module.scss";

const SlideTransition = (props) => {
	return <Slide {...props} direction="up" />;
};

export const ServerSetup = (props) => {
	const [serverIp, setServerIp] = useState("");
	const [checkingServer, setServerCheckState] = useState(false);
	const [isJfServer, setIsJfServerState] = useState(false);

	const { JellyfinApi } = useContext(JellyfinContext);
	const { enqueueSnackbar } = useSnackbar();
	const [serverlistCookies, setServerList] = useCookies(["servers"]);

	const addServer = () => {
		setServerList("servers", serverIp, { path: "/" });
		setIsJfServerState(true);
	};

	const handleAddServer = () => {
		let data;
		setServerCheckState(true);
		fetch(`${serverIp}/System/Ping`, {
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data == "Jellyfin Server") {
					console.log(true);
					setServerCheckState(false);
					addServer();
					return true;
				} else {
					setServerCheckState(false);
					enqueueSnackbar(
						"The server address does not seem be a jellyfin server",
						{ variant: "error" },
					);
					return false;
				}
			})
			.catch((error) => {
				setServerCheckState(false);
				enqueueSnackbar(
					"The server address does not seem be a jellyfin server",
					{ variant: "error" },
				);
				console.error(error);
			});
	};

	return (
		<>
			{/* <jellyfin.Consumer> */}
			{checkingServer && <LinearProgress />}
			{isJfServer && <Navigate to="/login" />}
			<div
				className={
					checkingServer
						? "centered serverContainer loading"
						: "centered serverContainer"
				}
			>
				<JellyplayerLogo className="logo" />
				<TextField
					className="textbox"
					label="Server Address:"
					variant="outlined"
					// inputRef={serverIp}
					onChange={(event) => {
						setServerIp(event.target.value);
					}}
					helperText="Add your server adddress with https:// or http://"
				></TextField>
				<Button
					className="button"
					variant="contained"
					onClick={handleAddServer}
				>
					Add Server
				</Button>
			</div>
			{/* </jellyfin.Consumer> */}
		</>
	);
};
