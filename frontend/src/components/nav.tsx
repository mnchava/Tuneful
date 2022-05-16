import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LoopIcon from '@mui/icons-material/Loop';
import MenuIcon from '@mui/icons-material/Menu';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from '../views/login';
import Signup from '../views/signup';
import Protected from './protected';
import { useQuery } from '@apollo/client';
import { GetLibraryQuery, GetLibraryQueryVariables, GetLibraryDocument } from '../models/gql';
import { ISong } from '../types';


const drawerWidth = 180;

const playerIcons = {
	play: <PlayArrowIcon fontSize="large" />,
	pause: <PauseIcon fontSize="large" />,
	rewind: <FastRewindIcon fontSize="large" />,
	forward: <FastForwardIcon fontSize="large" />,
	previous: <SkipPreviousIcon />,
	next: <SkipNextIcon />,
	loop: <LoopIcon />,
	volume: <VolumeUpIcon />,
	volumeMute: <VolumeMuteIcon />,
};

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = useState(true);

	const [currentSong, setCurrentSong] = useLocalStorage("currentSong", "{}");
	const [playlist, setPlaylist] = useState<ISong[]>([]);

	useQuery<GetLibraryQuery, GetLibraryQueryVariables>(GetLibraryDocument, {
		onCompleted: (data) => {
			setPlaylist(data.getLibrary?.songs || []);
		}
	})

	let navigate = useNavigate();

	useEffect(() => {
		const expireTime = Number.parseInt(localStorage.getItem("expiresAt") || "0");
		const currentTime = Date.now()
		if (currentTime >= expireTime && expireTime !== 0) {
			console.log("token expired", expireTime, currentTime);
			localStorage.removeItem("loggedUser");
			localStorage.removeItem("token");
			localStorage.removeItem("expiresAt");
		}
	})

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	let activeStyle = {
		textDecoration: "none",
		color: theme.palette.primary.main
	};

	let inactiveStyle = {
		textDecoration: "none",
		color: "#fff",
	};

	const Player = () => {
		return <AudioPlayer
			src={currentSong ? "http://3.218.67.164:9019/" + JSON.parse(currentSong).audioFile : ""}
			layout="stacked-reverse"
			style={{
				margin: "24px auto"
			}}
			onPlayError={err => console.log(err)}
			onError={err => console.log(err)}
			autoPlayAfterSrcChange
			showSkipControls
			showJumpControls={false}
			showFilledVolume
			autoPlay
			customIcons={playerIcons}
			customAdditionalControls={[]}
			customControlsSection={
				[
					RHAP_UI.VOLUME,
					RHAP_UI.MAIN_CONTROLS,
					RHAP_UI.CURRENT_TIME,
					<div style={{ fontWeight: "800" }}>/</div>,
					RHAP_UI.DURATION,
				]
			}
			customProgressBarSection={
				[
					RHAP_UI.PROGRESS_BAR,
				]
			}
			customVolumeControls={[]}
			onClickNext={e => {
				if (currentSong) {
					let current = playlist.filter((value) => value.id === JSON.parse(currentSong).id)[0];
					const index = playlist.indexOf(current);
					const next = index < playlist.length - 1 ? index + 1 : 0;
					setCurrentSong(JSON.stringify(playlist[next]));
				}
			}}
			onClickPrevious={e => {
				if (currentSong) {
					let current = playlist.filter((value) => value.id === JSON.parse(currentSong).id)[0];
					const index = playlist.indexOf(current);
					const next = index === 0 ? playlist.length - 1 : index - 1;
					setCurrentSong(JSON.stringify(playlist[next]));
				}
			}}
			onEnded={(e) => {
				if (currentSong) {
					let current = playlist.filter((value) => value.id === JSON.parse(currentSong).id)[0];
					const index = playlist.indexOf(current);
					const next = index < playlist.length - 1 ? index + 1 : 0;
					setCurrentSong(JSON.stringify(playlist[next]));
				}
			}}
			header={PlayerHeader(JSON.parse(currentSong))}
		/>
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					{!open ?
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
						>
							<MenuIcon />
						</IconButton>
						:
						<>
							<Typography alignSelf={"left"} variant="h5">
								Tuneful
							</Typography>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</>
					}
				</DrawerHeader>
				<Divider />
				<List>
					{routes.map((route, index) => (
						<NavLink to={route.path} key={route.key}
							style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
						>
							<ListItemButton
								key={route.key}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{<route.icon />}
								</ListItemIcon>
								<ListItemText primary={route.title} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</NavLink>
					))}
				</List>
				< Divider />
				{
					localStorage.getItem('token') != null && <List>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
							onClick={() => {
								console.log("log out");
								localStorage.removeItem("loggedUser");
								localStorage.removeItem("token");
								navigate("/login");
							}
							}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<LogoutTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary={"Log out"} sx={{ opacity: open ? 1 : 0, color: theme.palette.text.primary }} />
						</ListItemButton>
					</List>
				}
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Routes>
					{routes.map((route, index) => (
						<Route key={route.key} path={route.path} element={
							<Protected isLoggedIn={localStorage.getItem('token') != null}>
								{<route.component />}
							</Protected>
						} />
					))}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
				{localStorage.getItem('token') != null ?
					Player() : <></>}
			</Box>
		</Box >
	);
}

const PlayerHeader = (song: ISong) => {
	return <>
		<Avatar src={song.album.externalImageUrl || ""} sx={{ width: "100px", height: "100px" }} variant="square" />
	</>
}
