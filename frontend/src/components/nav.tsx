import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
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
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import Login from '../views/login';
import Signup from '../views/signup';
import Protected from './protected';

const drawerWidth = 180;

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
	const [open, setOpen] = useState(false);

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
						<Link to={route.path} key={route.key} style={{ textDecoration: "none" }}>
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
								<ListItemText primary={route.title} sx={{ opacity: open ? 1 : 0, color: theme.palette.text.primary }} />
							</ListItemButton>
						</Link>
					))}
				</List>
				<Divider />
				{localStorage.getItem('token') != null && <List>
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
				</List>}
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
			</Box>
		</Box>
	);
}
