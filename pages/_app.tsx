import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import StoreProvider from '../store/StoreProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}

