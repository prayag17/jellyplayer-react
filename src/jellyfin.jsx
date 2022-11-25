/** @format */

import { createContext } from "react";
import { Jellyfin } from "@jellyfin/sdk";

export const JellyfinContext = createContext({
	JellyfinApi: (appVersion, clientName, id) => {
		const jellyfin = new Jellyfin({
			clientInfo: {
				name: "JellyPlayer",
				version: appVersion,
			},
			deviceInfo: {
				name: clientName,
				id: id,
			},
		});
	},
});
