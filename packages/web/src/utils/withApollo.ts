import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { withApollo } from 'next-apollo';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default withApollo(client);
