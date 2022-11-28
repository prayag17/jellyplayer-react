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
import { jellyfin } from "./jellyfin";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";

// Theming
import { theme } from "./theme";
import "./App.module.scss";

// Routes
import { ServerSetup as Server } from "./routes/setup/server/root";
import { Home } from "./routes/home/root";
import { UserLogin, UserLoginManual } from "./routes/login/root";

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
	const [userCookies] = useCookies(["user"]);
	const navigate = useNavigate();
	const cookies = new Cookies();

	const serverAvailable = () => {
		try {
			let currentServer = cookies.get("currentServer");
			let currentServerIp = cookies.get(currentServer.ip);
			return true;
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
		const cookies = new Cookies();

		const currentServer = cookies.get("currentServer");
		const currentServerIp = cookies.get(currentServer).ip;
		const api = jellyfin.createApi(currentServerIp);
		const users = await getUserApi(api).getPublicUsers();
		try {
			console.log("no of users" + users.data.length);
			if (users.data.length >= 1) {
				return true;
			} else {
				console.log("no of userswfw" + users.data.length);
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const HandleLoginRoutes = () => {
		if (userSaved()) {
			navigate("/home");
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
							element={<Server />}
						/>
						<Route
							path="/login/users"
							element={<UserLogin />}
						/>
						<Route
							path="/login/manual"
							element={<UserLoginManual />}
						/>
						<Route path="/login/user/:user" />

						{/* Logical Routes */}
						<Route
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
