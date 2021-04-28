import { ApolloClient, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withApollo } from 'next-apollo';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext(async (_, previousContext) => {
  if (!previousContext.authRequired) return previousContext;

  const res = await fetch('/api/auth/accessToken');
  if (res.status !== 200) {
    const err = new Error('Missing access token');
    console.error(err.message);
    throw err;
  }

  const accessToken = await res.text();

  return {
    ...previousContext,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(previousContext.headers || {}),
    },
  };
});

export const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export default withApollo(client);
