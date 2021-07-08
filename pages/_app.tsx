import '../sass/styles.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //       document.body.classList.remove('theme-light');
  //       document.body.classList.add('theme-dark');
  //     } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  //       document.body.classList.remove('theme-dark');
  //       document.body.classList.add('theme-light');
  //     }
  //   }
  // }, []);

  return <Component {...pageProps} />;
}
export default MyApp;
