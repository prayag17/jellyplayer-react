/** @format */

import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";

import { EventEmitter as event } from "../../eventEmitter.js";

import { theme } from "../../theme";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import MenuIcon from "mdi-material-ui/Menu";
import Close from "mdi-material-ui/Close";
import MovieOutline from "mdi-material-ui/MovieOutline";
import MusicBoxMultipleOutline from "mdi-material-ui/MusicBoxMultipleOutline";
import PlaylistMusicOutline from "mdi-material-ui/PlaylistMusicOutline";
import Television from "mdi-material-ui/Television";
import FolderOutline from "mdi-material-ui/FolderOutline";

import { getLibraryApi } from "@jellyfin/sdk/lib/utils/api/library-api";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";
import { Typography } from "@mui/material";

const drawerWidth = 320;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	backgroundColor: theme.palette.primary.background.dark,
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: theme.palette.primary.background.dark,
	backgroundImage: "none",
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const MediaTypeIconCollection = {
	movies: <MovieOutline />,
	music: <MusicBoxMultipleOutline />,
	playlists: <PlaylistMusicOutline />,
	tvshows: <Television />,
	boxsets: <FolderOutline />,
};

export const Home = () => {
	const [userLibraries, setUserLibraries] = useState([]);
	const [user, setUser] = useState({
		Name: "",
	});
	const [drawerState, setDrawerState] = useState(false);
	const cookies = new Cookies();

	const handleDrawerOpen = () => {
		setDrawerState(true);
	};

	const handleDrawerClose = () => {
		setDrawerState(false);
	};

	const handleLogout = async () => {
		await window.api.logout();
		console.log("logged out user");
	};

	const userLibs = async () => {
		const userLibs = await getLibraryApi(window.api).getMediaFolders();
		return userLibs;
	};

	const currentUser = async () => {
		const user = await getUserApi(window.api).getCurrentUser();
		return user;
	};

	useEffect(() => {
		currentUser().then((usr) => {
			setUser(usr.data);
		});
		userLibs().then((libs) => {
			setUserLibraries(libs.data.Items);
		});
	});

	return (
		<>
			<Box
				sx={{
					display: "flex",
				}}
			>
				<AppBar
					position="fixed"
					open={drawerState}
					color="primary"
					elevation={0}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(drawerState && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="permanent"
					open={drawerState}
					PaperProps={{
						sx: {
							backgroundColor: "inherit",
							border: "none",
						},
					}}
				>
					<DrawerHeader
						className="Mui-DrawerHeader"
						sx={{ position: "relative", height: "20vh" }}
					>
						{/* <div>
						<Avatar src={""}/>
						<Typography variant="h3">
							{user["Name"]}
						</Typography>
						</div> */}
						<IconButton
							onClick={handleDrawerClose}
							sx={{
								position: "absolute",
								top: "10%",
								right: "5%",
							}}
						>
							<Close />
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List sx={{ border: "none" }}>
						{userLibraries.map((library, index) => {
							return (
								<ListItem disablePadding key={index}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent:
												drawerState
													? "initial"
													: "center",
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: drawerState
													? 3
													: "auto",
												justifyContent:
													"center",
											}}
										>
											{
												MediaTypeIconCollection[
													library
														.CollectionType
												]
											}
										</ListItemIcon>
										<ListItemText
											primary={library.Name}
											sx={{
												opacity: drawerState
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</Drawer>
				{/* <h1>Hey {userId} this is WIP Home</h1> */}
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					<Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
				</Box>
			</Box>
		</>
	);
};
