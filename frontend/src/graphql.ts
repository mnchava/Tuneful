import {
	ApolloClient, createHttpLink, InMemoryCache
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'http://3.218.67.164:9019/graphql/',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : "",
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	uri: 'http://3.218.67.164:9019/graphql/',
	cache: new InMemoryCache()
});

export { client };
