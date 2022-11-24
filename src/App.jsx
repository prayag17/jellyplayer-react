/** @format */

import { useState, Component } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Cookies, useCookies } from "react-cookie";
import { Jellyfin } from "@jellyfin/sdk";
import { v4 as uuidv4 } from "uuid";

// Theming
import { theme } from "./theme";
import "./App.module.scss";

import { version as appVer } from "../package.json";
import { ServerSetup as Server } from "./routes/setup/server/root";
import { Home } from "./routes/home/root";

// Fonts
import "@fontsource/open-sans";

function App() {
	let cookie;
	const [count, setCount] = useState(0);
	const [serverlistCookies] = useCookies(["servers"]);

	const [jellyplayerCookies, setJellyplayerCookie] = useCookies([
		"jellyplayer",
	]);

	const clientName = () => {
		try {
			if (jellyplayerCookies.clientInfo.name) {
				return `Jellyplayer v${appVer}`;
			}
		} catch (error) {
			setJellyplayerCookie("clientName", `Jellyplayer v${appVer}`);
			return jellyplayerCookies.clientName;
		}
	};

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
			name: clientName(),
			id: uuidv4(),
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					{/* Main Routes */}
					<Route path="/home" element={<Home />} />
					<Route
						path="/setup/server"
						element={<Server />}
					></Route>

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
		</ThemeProvider>
	);
}

export default App;
