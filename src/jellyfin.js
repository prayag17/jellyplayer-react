/** @format */
import "react";

import { Jellyfin } from "@jellyfin/sdk";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { version as appVer } from "../package.json";

const clientName = () => {
	const [jellyplayerCookies, setJellyplayerCookie] = useCookies([
		"jellyplayer",
	]);
	try {
		if (jellyplayerCookies.clientInfo.name) {
			return `Jellyplayer v${appVer}`;
		}
	} catch (error) {
		setJellyplayerCookie("clientName", `Jellyplayer v${appVer}`);
		return jellyplayerCookies.clientName;
	}
};

export const jellyfin = new Jellyfin({
	clientInfo: {
		name: "JellyPlayer",
		version: appVer,
	},
	deviceInfo: {
		name: clientName,
		id: uuidv4,
	},
});
