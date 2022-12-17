/** @format */

import { useState, useEffect, useContext } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
	Outlet,
	useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useCookies, Cookies } from "react-cookie";

import { EventEmitter as event } from "./eventEmitter.js";

import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";

// Theming
import { theme } from "./theme";
import "./styles/global.scss";

// Routes
import { ServerSetup, ServerList } from "./routes/setup/server/root";
import { Home } from "./routes/home/root";
import {
	UserLogin,
	LoginWithImage,
	UserLoginManual,
} from "./routes/login/root";

// Fonts
import "@fontsource/open-sans";

// Jellyfin SDK TypeScript
import { Jellyfin } from "@jellyfin/sdk";
import { version as appVer } from "../package.json";
import { v4 as uuidv4 } from "uuid";

const jellyfin = new Jellyfin({
	clientInfo: {
		name: "JellyPlayer",
		version: appVer,
	},
	deviceInfo: {
		name: "JellyPlayer",
		id: uuidv4(),
	},
});

event.on("create-jellyfin-api", (serverAddress) => {
	window.api = jellyfin.createApi(
		serverAddress,
		sessionStorage.getItem("accessToken"),
	);
	// window.api = jellyfin.createApi(serverAddress);
});
event.on("set-api-accessToken", (serverAddress) => {
	window.api = jellyfin.createApi(
		serverAddress,
		sessionStorage.getItem("accessToken"),
	);
});

function App() {
	const [userCookies] = useCookies(["user"]);
	const navigate = useNavigate();
	const cookies = new Cookies();

	const serverAvailable = () => {
		try {
			const currentServer = cookies.get("currentServer");
			const serverList = cookies.get("servers");
			let currentServerIp = "";
			serverList.map((item, index) => {
				currentServerIp = item[currentServer];
			});

			if (currentServer == undefined) {
				return false;
			} else {
				if (!window.api) {
					event.emit(
						"create-jellyfin-api",
						currentServerIp.serverAddress,
					);
				}
				return true;
			}
		} catch (error) {
			return false;
		}
	};

	const userSaved = () => {
		try {
			userCookies.user[0];
			return true;
		} catch (error) {
			return false;
		}
	};

	const userAvailable = async () => {
		const users = await getUserApi(window.api).getPublicUsers();
		try {
			if (users.data.length >= 1) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const HandleLoginRoutes = () => {
		if (userSaved()) {
			navigate("/home/:userId");
		} else {
			userAvailable().then((res) => {
				if (res) {
					navigate("/login/users");
				} else if (!res) {
					navigate("/login/manual");
				}
			});
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
				<div
					className={`${transitionStage}`}
					onAnimationEnd={() => {
						if (transitionStage === "fadeOut") {
							setTransistionStage("fadeIn");
							setDisplayLocation(location);
						}
					}}
				>
					<Routes location={location} key={location.pathname}>
						{/* Main Routes */}
						<Route path="/home" element={<Home />} />
						<Route
							path="/setup/server"
							element={<ServerSetup />}
						/>
						<Route
							path="/servers/list"
							element={<ServerList />}
						/>
						<Route
							exact
							path="/login/withImg/:userName/:userId/"
							element={<LoginWithImage />}
						/>
						<Route
							exact
							path="/login/users"
							element={<UserLogin />}
						/>
						<Route
							path="/login/manual"
							element={<UserLoginManual />}
						/>

						{/* Logical Routes */}
						<Route
							exact
							path="/login"
							element={
								<HandleLoginRoutes></HandleLoginRoutes>
							}
						/>

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
			</ThemeProvider>
		</SnackbarProvider>
	);
}

export default App;
