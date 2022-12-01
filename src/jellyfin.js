/** @format */

// /** @format */
// import "react";

// import { Jellyfin } from "@jellyfin/sdk";
// import { useCookies } from "react-cookie";
// import { v4 as uuidv4 } from "uuid";
// import { version as appVer } from "../package.json";
// import { EventEmitter as event } from "./eventEmitter.cjs";

// const clientName = () => {
// 	const [jellyplayerCookies, setJellyplayerCookie] = useCookies([
// 		"jellyplayer",
// 	]);
// 	try {
// 		if (jellyplayerCookies.clientName) {
// 			return jellyplayerCookies.clientName;
// 		}
// 	} catch (error) {
// 		setJellyplayerCookie("clientName", `Jellyplayer v${appVer}`);
// 		return jellyplayerCookies.clientName;
// 	}
// };
