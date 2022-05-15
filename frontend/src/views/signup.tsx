import { useMutation } from '@apollo/client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Alert,
	AlertTitle,
	Button, CircularProgress, Grid, IconButton, InputAdornment, Paper, TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateUserDocument, CreateUserMutation, CreateUserMutationVariables } from '../models/gql';

interface State {
	username: string;
	password: string;
	email: string;
	showPassword: boolean;
}

export default function Signup() {

	let navigate = useNavigate();

	const [values, setValues] = React.useState({
		username: "",
		password: "",
		email: "",
		showPassword: false,
	});

	const [signup, { loading, error, reset }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, {
		variables: {
			username: values.username,
			email: values.email,
			password: values.password
		},
		onCompleted: (data) => {
			console.log(data)
			navigate('/login');
		},
	});

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value });
			reset();
		};

	const handleShowPassword = () => {
		console.log("show toggled", values.showPassword)
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const storedJwt = localStorage.getItem('token');
	useEffect(() => {
		if (storedJwt) navigate("/login")
	})

	const SignupButton = () => {

		if (loading) return <CircularProgress color="inherit" />;
		if (error) {
			return <Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				{error.message}
			</Alert>;
		}

		return (
			<Button fullWidth variant="contained" color="primary" onClick={() => signup()} >
				Sign up
			</Button>
		);
	}

	return (
		<div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
			<Paper sx={{ width: 300, paddingTop: "30px", paddingBottom: "20px" }}>
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
							fullWidth
							type={'text'}
							value={values.username}
							onChange={handleChange('username')}
							sx={{ width: "240px" }}
						/>
					</Grid>
					<Grid item xs={1}>
						<TextField label="Email"
							required
							fullWidth
							type={'text'}
							value={values.email}
							onChange={handleChange('email')}
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
						<SignupButton />
					</Grid>
					<Grid item xs={1}>
						<Link to={"/login"} style={{ textDecoration: "none" }}>
							<Button fullWidth variant="outlined" color="secondary">
								Log in
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};