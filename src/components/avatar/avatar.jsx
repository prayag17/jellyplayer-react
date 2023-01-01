/** @format */
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import AccountOutline from "mdi-material-ui/AccountOutline";

import "./avatar.module.scss";

export const AvatarCard = ({ userName, userId, userImageAvailable }) => {
	return (
		<ButtonBase className="card square">
			<div className="card-image-container">
				{userImageAvailable ? (
					<div
						className="card-image"
						style={{
							backgroundImage:
								"url('" +
								window.api.basePath +
								"/Users/" +
								userId +
								"/Images/Primary')",
						}}
					></div>
				) : (
					<div className="card-image empty"></div>
				)}
				<div className="card-image-icon-container">
					<AccountOutline className="card-image-icon" />
				</div>
			</div>
			<div className="card-text-container">
				<Typography variant="button" color="textPrimary">
					{userName}
				</Typography>
			</div>
		</ButtonBase>
	);
};

AvatarCard.propType = {
	userName: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	userImageAvailable: PropTypes.bool.isRequired,
};
