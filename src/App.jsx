/** @format */

import { useState, useEffect, useContext } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Outlet,
	useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { motion, AnimatePresence } from "framer-motion";

import { Cookies, useCookies } from "react-cookie";
import { JellyfinContext } from "./jellyfin";
import { Jellyfin } from "@jellyfin/sdk";
import { v4 as uuidv4 } from "uuid";

// Theming
import { theme } from "./theme";
import "./App.module.scss";

import { version as appVer } from "../package.json";

// Routes
import { ServerSetup as Server } from "./routes/setup/server/root";
import { Home } from "./routes/home/root";
import { UserLogin } from "./routes/login/root";

// Fonts
import "@fontsource/open-sans";

const PageLayout = ({ children }) => children;

const pageVariants = {
	initial: {
		x: -100,
		opacity: 0,
	},
	in: {
		x: 0,
		opacity: 1,
	},
	out: {
		x: 100,
		opacity: 0,
	},
};

const pageTransition = {
	type: "tween",
	ease: "linear",
	duration: 2,
};

function App() {
	const [serverlistCookies] = useCookies(["servers"]);

	const [jellyplayerCookies, setJellyplayerCookie] = useCookies([
		"jellyplayer",
	]);

	const { JellyfinApi } = useContext(JellyfinContext);

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

	JellyfinApi(appVer, clientName, uuidv4);

	const serverAvailable = () => {
		try {
			serverlistCookies.servers[0];
			return true;
		} catch (error) {
			return false;
		}
	};

	const location = useLocation();

	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransistionStage] = useState("fadeIn");

	useEffect(() => {
		if (location !== displayLocation) setTransistionStage("fadeOut");
	}, [location, displayLocation]);

	return (
		<SnackbarProvider maxSnack={5}>
			<ThemeProvider theme={theme}>
				<JellyfinContext.Provider value={{ JellyfinApi }}>
					<div
						className={`${transitionStage}`}
						onAnimationEnd={() => {
							if (transitionStage === "fadeOut") {
								setTransistionStage("fadeIn");
								setDisplayLocation(location);
							}
						}}
					>
						<Routes
							location={location}
							key={location.pathname}
						>
							{/* Main Routes */}
							<Route path="/home" element={<Home />} />
							<Route
								path="/setup/server"
								element={<Server />}
							></Route>
							<Route
								path="/login"
								element={<UserLogin />}
							/>

							{/* Logical Routes */}
							<Route
								path="/"
								element={
									serverAvailable() ? (
										<Navigate to="/login" />
									) : (
										<Navigate to="/setup/server" />
									)
								}
							/>
						</Routes>
					</div>
				</JellyfinContext.Provider>
			</ThemeProvider>
		</SnackbarProvider>
	);
}

export default App;
