import { useQuery } from '@apollo/client';
import { Alert, AlertTitle, Avatar, Chip, Divider, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { UserInfoDocument, UserInfoQuery, UserInfoQueryVariables } from '../models/generated';
import { IUser } from '../types';

export default function Profile() {
	const [user, setUser] = useState<IUser | null>()

	var loggedUser = localStorage.getItem('loggedUser') || "";

	const response = useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, {
		variables: {
			username: loggedUser
		},
		onCompleted: ({ getUser }) => {
			setUser(getUser)
		}
	})

	if (response.error) return <Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		{response.error?.message}
	</Alert>

	if (response.loading) return <div style={{ padding: 30 }}>
		<Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ margin: "4px" }} />
		<Skeleton animation="wave" variant="rectangular" width={300} height={118} sx={{ margin: "4px" }} />
		<Skeleton animation="wave" variant="text" width={280} sx={{ margin: "4px" }} />
		<Skeleton animation="wave" variant="rectangular" width={300} height={100} sx={{ margin: "4px" }} />
	</div>

	const public_playlists = user?.playlistSet.filter(p => p?.public).length || 0
	const private_playlists = user?.playlistSet.filter(p => !p?.public).length || 0

	return (
		<div style={{ padding: 30, display: "flex", justifyContent: "flex-start" }}>
			<Paper sx={{ padding: "30px", flexGrow: 1 }}>
				<Grid container
					flexGrow={1}
					spacing={2}
					justifyContent="flex-start"
					alignItems="flex-start"
				>
					<Grid item xs={10}>
						<Stack direction="row"
							justifyContent="flex-start"
							alignItems="center"
							spacing={2}>
							<Avatar src={user?.image} sx={{ width: 56, height: 56 }} />
							<Divider orientation="vertical" />
							<Typography fontFamily='Fredoka One' variant='h6'>
								{user?.username}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={2}>
						{user?.isSuperuser && <Chip label="Admin" color="primary" variant="outlined" />}
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='body1'>Email: {user?.email}</Typography>
						<Typography variant='body1'>{private_playlists} private playlists</Typography>
						<Typography variant='body1'>{public_playlists} public playlists</Typography>
					</Grid>
					{
						user?.dateJoined &&
						<Grid item xs={6}>
							<Typography variant='body1'>Joined on {new Date(user?.dateJoined).toDateString().slice(4)}</Typography>
						</Grid>
					}
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</Grid>
			</Paper>
		</div >
	);
};
