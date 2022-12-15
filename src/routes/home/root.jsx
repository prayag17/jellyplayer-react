/** @format */

import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";

import { EventEmitter as event } from "../../eventEmitter.js";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import { getLibraryApi } from "@jellyfin/sdk/lib/utils/api/library-api";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";
export const Home = () => {
	const [userLibraries, setUserLibraries] = useState([]);
	const cookies = new Cookies();

	const handleLogout = async () => {
		await window.api.logout();
		console.log("logged out user");
	};

	const userLibs = async () => {
		const userLibs = await getLibraryApi(window.api).getMediaFolders();
		return userLibs;
	};

	useEffect(() => {
		userLibs().then((libs) => {
			setUserLibraries(libs.data.Items);
		});
	});

	return (
		<>
			<Drawer
				variant="permanent"
				anchor="left"
				open={true}
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 240,
					},
				}}
			>
				<List>
					{userLibraries.map((library, index) => {
						return (
							<ListItem key={index}>
								<ListItemButton>
									<ListItemText
										primary={library.Name}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Drawer>
			{/* <h1>Hey {userId} this is WIP Home</h1> */}
			<Button variant="contained" onClick={handleLogout}>
				Logout
			</Button>
		</>
	);
};
