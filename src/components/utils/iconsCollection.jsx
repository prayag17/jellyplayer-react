/** @format */

import MovieOutline from "mdi-material-ui/MovieOutline";
import MusicBoxMultipleOutline from "mdi-material-ui/MusicBoxMultipleOutline";
import PlaylistMusicOutline from "mdi-material-ui/PlaylistMusicOutline";
import Television from "mdi-material-ui/Television";
import FolderOutline from "mdi-material-ui/FolderOutline";
import FolderMusicOutline from "mdi-material-ui/FolderMusicOutline";
import Youtube from "mdi-material-ui/Youtube";
import MultiMedia from "mdi-material-ui/Multimedia";
import BookMultiple from "mdi-material-ui/BookMultiple";
import ImageMultiple from "mdi-material-ui/ImageMultiple";
import TelevisionClassic from "mdi-material-ui/TelevisionClassic";
import Filmstrip from "mdi-material-ui/Filmstrip";
import Microphone from "mdi-material-ui/Microphone";
import Image from "mdi-material-ui/Image";
import Book from "mdi-material-ui/Book";

export const MediaCollectionTypeIconCollection = {
	universal: <MultiMedia />,
	movies: <MovieOutline />,
	music: <MusicBoxMultipleOutline />,
	playlists: <PlaylistMusicOutline />,
	tvshows: <Television />,
	boxsets: <MovieOutline />,
	musicvideos: <FolderMusicOutline />,
	trailers: <Youtube />,
	books: <BookMultiple />,
	photos: <ImageMultiple />,
	livetv: <TelevisionClassic />,
	folder: <FolderOutline />,
};

export const MediaTypeIconCollection = {
	Video: <Filmstrip className="hero-carousel-background-icon" />,
	Audio: <Microphone className="hero-carousel-background-icon" />,
	Photo: <Image className="hero-carousel-background-icon" />,
	Book: <Book className="hero-carousel-background-icon" />,
};
