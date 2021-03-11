import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as StoreProvider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Pern Template</title>
        <meta
          name='viewport'
          content='width=device-width, viewport-fit=cover, initial-scale=1'
        />
        <meta name='description' content='Pern Template' />
      </Head>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
};

export default App;
