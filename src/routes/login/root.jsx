/** @format */

import { useState, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";
import { EventEmitter as event } from "../../eventEmitter.cjs";

// import Icon from "mdi-material-ui";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import EyeOutline from "mdi-material-ui/EyeOutline";
import ChevronRight from "mdi-material-ui/ChevronRight";

import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";

// import { jellyfin } from "../../jellyfin";
// import getSystemApi from "@jellyfin/sdk";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";

import "./login.module.scss";

export const LoginWithImage = () => {
	const { userName, userId } = useParams();
	const [password, setPassword] = useState({
		showpass: false,
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const cookies = new Cookies();

	const currentServer = cookies.get("currentServer");
	const serverList = cookies.get("servers");
	let currentServerIp = "";
	serverList.map((item, index) => {
		currentServerIp = item[currentServer];
	});

	const handlePassword = (prop) => (event) => {
		setPassword({
			...password,
			[prop]: event.target.value,
		});
		console.log(password);
	};

	const handleShowPassword = () => {
		setPassword({
			...password,
			showpass: !password.showpass,
		});
	};

	const authUser = async () => {
		try {
			console.log(userName, password.password);

			const auth = await window.api.authenticateUserByName(
				userName,
				password.password,
			);
			return auth;
		} catch (error) {
			enqueueSnackbar("Incorrect Password!", { variant: "error" });
			console.error(error);
		}
	};

	const handleLogin = async () => {
		setLoading(true);
		const auth = await authUser();
		console.log("Auth => ", auth);
		setLoading(false);
		navigate(`/home/${auth.data.User.Id}`);
	};

	return (
		<>
			<div className="centered">
				<Typography variant="h3" color="textPrimary">
					Login as
					<br />
				</Typography>
				<Avatar
					src={
						currentServerIp.serverAddress +
						"/Users/" +
						userId +
						"/Images/Primary"
					}
					className="userImage"
					sx={{
						width: 128,
						height: 128,
					}}
				/>
				<Typography color="textPrimary" variant="h4">
					{userName}
				</Typography>
				<br />
				<FormControl variant="outlined">
					<InputLabel htmlFor="user-password">
						Password:
					</InputLabel>
					<OutlinedInput
						id="user-password"
						type={password.showpass ? "text" : "password"}
						variant="outlined"
						onChange={handlePassword("password")}
						label="Password:"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleShowPassword}
									aria-label="toggle password visibility"
								>
									{password.showpass ? (
										<EyeOffOutline />
									) : (
										<EyeOutline />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<LoadingButton
					variant="contained"
					endIcon={<ChevronRight />}
					onClick={handleLogin}
					loading={loading}
					loadingPosition="end"
				>
					Login
				</LoadingButton>
			</div>
		</>
	);
};

export const UserLogin = () => {
	const [userList, setUsers] = useState([]);
	const navigate = useNavigate();
	const cookies = new Cookies();

	const currentServer = cookies.get("currentServer");
	const serverList = cookies.get("servers");
	let currentServerIp = "";
	serverList.map((item, index) => {
		currentServerIp = item[currentServer];
		// console.log(item);
	});

	const handleChangeServer = () => {
		navigate("/servers/list");
	};
	const getUsers = async () => {
		const users = await getUserApi(window.api).getPublicUsers();
		// console.log(users.data);
		return users;
		// return {};
	};
	useEffect(() => {
		getUsers().then((users) => {
			setUsers(users.data);
		});
	});

	return (
		<>
			<div className="centered">
				<h1 color="white">WIP-user login</h1>
				<div className="userList">
					{userList.map((item, index) => {
						return (
							//
							<Link
								to={`/login/withImg/${item.Name}/${item.Id}/`}
								key={item.Id}
								className="userCard"
								index={index}
							>
								<Avatar
									src={
										currentServerIp.serverAddress +
										"/Users/" +
										item.Id +
										"/Images/Primary?tag=" +
										item.PrimaryImageTag
									}
									className="userImage"
									sx={{
										width: 128,
										height: 128,
									}}
								/>
								<Typography
									variant="button"
									className="userName"
									color="textPrimary"
								>
									{item.Name}
								</Typography>
							</Link>
						);
					})}
				</div>
				<div className="buttons">
					<Button
						color="secondary"
						variant="contained"
						className="userEventButton"
						onClick={handleChangeServer}
					>
						Change Server
					</Button>
					<Button
						variant="contained"
						className="userEventButton"
					>
						Manual Login
					</Button>
				</div>
			</div>
			{/* <h1>{...serversListCookies}</h1> */}
		</>
	);
};

export const UserLoginManual = () => {
	return (
		<>
			<div className="centered">
				{" "}
				<h1>Hello There!</h1>
				<h1>Your are a bit early</h1>
				<h1>WIP Manual Login</h1>
			</div>
		</>
	);
};
