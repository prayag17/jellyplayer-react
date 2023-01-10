/** @format */

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ChevronLeft from "mdi-material-ui/ChevronLeft";
import ChevronRight from "mdi-material-ui/ChevronRight";

import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

import "./cardScroller.module.scss";

const SliderButtons = ({ next, previous, goToSlide, ...rest }) => {
	const {
		carouselState: { currentSlide },
	} = rest;
	return (
		<div className="carousel-button-group">
			{" "}
			<IconButton
				onClick={() => previous()}
				className="card-scroller-button"
			>
				<ChevronLeft />
			</IconButton>
			<IconButton
				onClick={() => next()}
				className="card-scroller-button"
			>
				<ChevronRight />
			</IconButton>
		</div>
	);
};

export const CardScroller = ({ children, displayCards }) => {
	const cardScrollerSlide = useRef(null);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	return (
		<Carousel
			swipeable={false}
			draggable={false}
			responsive={responsive}
			arrows={false}
			renderButtonGroupOutside={true}
			customButtonGroup={<SliderButtons />}
			slidesToSlide={4}
			className="card-scroller"
		>
			{/* <ButtonGroup className="card-scroller-button-container">
				<IconButton className="card-scroller-button">
					<ChevronLeft />
				</IconButton>
				
			</ButtonGroup>
			<div className="card-slider-container">
				<div
					className="card-scroller-slide"
					ref={cardScrollerSlide}
				>
				</div>
			</div> */}
			{children}
		</Carousel>
	);
};
