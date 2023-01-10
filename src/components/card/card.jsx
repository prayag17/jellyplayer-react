/** @format */
import React from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";

import {
	MediaCollectionTypeIconCollection,
	MediaTypeIconCollection,
} from "../utils/iconsCollection";

import "./card.module.scss";

export const CardLandscape = ({ itemName, itemId, imageTags }) => {
	const imageAvailable = () => {
		console.log(imageTags);
		if (imageTags == undefined) {
			console.log("hee");
			return false;
		} else {
			return true;
		}
	};

	// const { name } = props;
	// let imageAvailable = true;
	return (
		<div className="card">
			{/* <img
		className="card-image card-image-landscape"
		src={props.src}
	/> */}
			<div className="card-image-container">
				{imageAvailable ? (
					<div
						className="card-image"
						style={{
							backgroundImage:
								"url('" +
								window.api.basePath +
								"/Items/" +
								itemId +
								"/Images/Primary')",
						}}
					></div>
				) : (
					<div className="card-image empty"></div>
				)}
			</div>

			<div className="card-text-container">
				<Typography variant="button" color="white">
					{itemName}
				</Typography>
			</div>
		</div>
	);
};

CardLandscape.propTypes = {
	itemName: PropTypes.string.isRequired,
	itemId: PropTypes.string.isRequired,
	imageTags: PropTypes.object,
};
