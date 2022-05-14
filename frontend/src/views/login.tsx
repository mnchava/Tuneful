import { useMutation } from '@apollo/client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Alert, AlertTitle, Button, CircularProgress, Grid, IconButton, InputAdornment, Paper, TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginDocument, LoginMutation, LoginMutationVariables } from '../models/generated';

interface LoginState {
	username: string;
	password: string;
	showPassword: boolean;
}

export default function Login() {

	const [values, setValues] = useState({
		username: "",
		password: "",
		showPassword: false,
	});

	let navigate = useNavigate();

	const [login, { loading, error, reset }] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
		variables: {
			username: values.username,
			password: values.password,
		},
		onCompleted: ({ tokenAuth }) => {
			if (tokenAuth) {
				localStorage.setItem("loggedUser", tokenAuth.payload.username);
				localStorage.setItem("token", tokenAuth.token);
				localStorage.setItem("expiresAt", `${tokenAuth.payload.exp * 1000}`);
				// console.log('token will expire at', new Date(tokenAuth.payload.exp * 1000).toISOString(), new Date(Date.now()).toISOString())
				navigate('/');
			}
		},
	});

	const handleChange =
		(prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value });
			reset();
		};

	const handleShowPassword = () => {
		console.log("show toggled", values.showPassword)
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const LoginButton = () => {
		if (loading) return <CircularProgress color='primary' />

		if (error) return <Alert severity="error">
			<AlertTitle>Error</AlertTitle>
			{error.message}
		</Alert>

		return (
			<Button fullWidth variant="contained" color="primary" onClick={() => login()} >
				Login
			</Button>
		);
	}

	return (
		<div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
			<Paper sx={{ width: 300, padding: "30px" }}>
				{
					localStorage.getItem("token") != null ?
						<Grid
							container
							spacing={3}
							direction="column"
							justifyContent="center"
							alignItems="center"
							columns={1}
						>
							<Grid item xs={1}>
								<Alert severity='success'>Logged in as {localStorage.getItem("loggedUser")}.</Alert>
							</Grid>
							<Grid item xs={1}>
								<Button fullWidth variant="contained" color="primary" onClick={() => navigate("/library")}>
									Go to my library
								</Button>
							</Grid>
							<Grid item xs={1}>
								<Button fullWidth variant="outlined" color="secondary" onClick={() => {
									console.log("log out");
									localStorage.removeItem("loggedUser");
									localStorage.removeItem("token");
									navigate("/");
								}}>
									Log out
								</Button>
							</Grid>
						</Grid>
						:
						<Grid
							container
							spacing={3}
							direction="column"
							justifyContent="center"
							alignItems="center"
							columns={1}
						>
							<Grid item xs={1}>
								<TextField
									label={"Username"}
									required
									type={'text'}
									value={values.username}
									onChange={handleChange('username')}
									sx={{ width: "240px" }}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									label={"Password"}
									required
									fullWidth
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handleChange('password')}
									sx={{ width: "240px" }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="show password"
													// onClick={handleShowPassword}
													onMouseDown={() => handleShowPassword()}
													edge="end"
												>
													{values.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							<Grid item xs={1}>
								<LoginButton />
							</Grid>
							<Grid item xs={1}>
								<Button fullWidth variant="outlined" color="secondary" onClick={() => navigate("/signup")}>
									Create account
								</Button>
							</Grid>
						</Grid>
				}
			</Paper>
		</div >
	);
};
