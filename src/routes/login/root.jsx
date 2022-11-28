/** @format */

import { useState, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";

import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import SvgIcon from "@mui/material/Icon";

import { jellyfin } from "../../jellyfin";
// import getSystemApi from "@jellyfin/sdk";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";

import "./login.module.scss";

export const UserLogin = () => {
	const [userList, setUsers] = useState([]);
	const [serverlistCookies] = useCookies(["servers"]);
	const cookies = new Cookies();

	const currentServer = cookies.get("currentServer");
	const currentServerIp = cookies.get(currentServer).ip;
	const api = jellyfin.createApi(currentServerIp);

	const getUsers = async () => {
		const users = await getUserApi(api).getPublicUsers();
		// console.log(users.data);
		return users;
	};

	useEffect(() => {
		getUsers().then((users) => {
			setUsers(users.data);
		});
	});

	// console.log(userList);

	return (
		<>
			<div className="centered">
				<h1 color="white">WIP-user login</h1>
				<div className="userList">
					{userList.map((item, index) => {
						return (
							<div
								className="userCard"
								index={index}
								key={item.Id}
							>
								{item.PrimaryImageTag ? (
									<img
										src={
											currentServerIp +
											"/Users/" +
											item.Id +
											"/Images/Primary?tag=" +
											item.PrimaryImageTag
										}
										className="userImage"
									/>
								) : (
									<div className="userImage">
										<Icon
											path={mdiAccount}
											size={1}
											horizontal
											vertical
											rotate={180}
											color="accent"
										/>
									</div>
								)}
								<div className="userName">
									{" "}
									{item.Name}{" "}
								</div>
								Item = {item.Name}
							</div>
						);
					})}
				</div>
			</div>
			{/* <h1>{...serversListCookies}</h1> */}
		</>
	);
};

export const UserLoginManual = () => {
	return (
		<>
			<div className="centered"> hello there</div>
		</>
	);
};
