import AuthProvider from '#web/providers/AuthProvider';
import MuiThemeProvider from '#web/providers/MuiThemeProvider';
import ReactQueryProvider from '#web/providers/ReactQueryProvider';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <MuiThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MuiThemeProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;
