import { ApolloProvider } from "@apollo/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import PersistentDrawerLeft from './components/nav';
import { client } from "./graphql";

const container = document.getElementById('root');
const root = createRoot(container!);

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#5893df',
		},
		secondary: {
			main: '#2ec5d3',
		},
		background: {
			default: '#192231',
			paper: '#24344d',
		},
	},
	typography: {
		h5: {
			fontFamily: 'Fredoka One',
		},
	},
});



function Main() {
	return (
		<React.StrictMode>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<PersistentDrawerLeft />
					</BrowserRouter>
				</ThemeProvider>
			</ApolloProvider>
		</React.StrictMode>
	)
}

root.render(<Main />);