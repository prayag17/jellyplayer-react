/** @format */

import Button from "@mui/material/Button";
import "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";

// import { jellyfin } from "../../jellyfin";

export const Home = () => {
	const { userId } = useParams();
	const cookies = new Cookies();

	// const currentServer = cookies.get("currentServer");
	// const serverList = cookies.get("servers");
	// let currentServerIp = "";
	// serverList.map((item, index) => {
	// 	currentServerIp = item[currentServer];
	// });

	// const api = jellyfin.createApi(currentServerIp.serverAddress);
	const handleLogout = async () => {
		await window.api.logout();
		console.log("logged out user");
	};
	return (
		<>
			<h1>Hey {userId} this is WIP Home</h1>
			<Button variant="contained" onClick={handleLogout}>
				Logout
			</Button>
		</>
	);
};
