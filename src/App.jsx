/** @format */

import { useState, Component } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { Jellyfin } from "@jellyfin/sdk";
import { v4 as uuidv4 } from "uuid";

import { version as appVer } from "../package.json";
import reactLogo from "./assets/react.svg";
import { ServerSetup as Server } from "./routes/setup/server/root";
import { Home } from "./routes/home/root";
import { version } from "react";

function App() {
	let cookie;
	const [count, setCount] = useState(0);
	const [serverlistCookies, setCookie, removeCookie] = useCookies([
		"servers",
	]);

	const serverAvailable = () => {
		try {
			serverlistCookies.servers[0];
			return true;
		} catch (error) {
			return false;
		}
	};

	const jellyfin = new Jellyfin({
		clientInfo: {
			name: "JellyPlayer",
			version: appVer,
		},
		deviceInfo: {
			name: "JellyPlayer Client",
			id: uuidv4(),
		},
	});

	return (
		<Router>
			<Routes>
				{/* Main Routes */}
				<Route path="/home" element={<Home />} />
				<Route path="/setup/server" element={<Server />}></Route>

				{/* Logical Routes */}
				<Route
					path="/"
					element={
						serverAvailable() ? (
							<Navigate to="/home" />
						) : (
							<Navigate to="/setup/server" />
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
