import '../sass/styles.scss';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Theme from '../utils/theme';
import PageContainer from '../layouts/PageContainer';
import useApplicationData from '../hooks/useApplicationData';

function MyApp({ Component, pageProps }: AppProps) {
  const [isFormOpen, isFormOpenSet] = useState<boolean>(false);
  const { state, dispatch } = useApplicationData();

  // Set Theme
  useEffect(() => {
    //Check Local Storage
    if (localStorage.getItem('themePreference') !== null) {
      const themePreference = localStorage.getItem('themePreference');
      if (themePreference === Theme.DARK) {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      } else if (themePreference === Theme.LIGHT) {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      }
    } else {
      // No local storage preference. Use OS preference and set it to local storage.
      if (typeof window !== undefined) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.classList.add('theme-dark');
          document.body.classList.remove('theme-light');
          localStorage.setItem('themePreference', Theme.DARK);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.body.classList.add('theme-light');
          document.body.classList.remove('theme-dark');
          localStorage.setItem('themePreference', Theme.LIGHT);
        }
      }
    }
  }, []);

  // Update Body Class
  useEffect(() => {
    if (isFormOpen) {
      window.scroll(0, 0);
      document.body.classList.add('form-open');
    } else {
      document.body.classList.remove('form-open');
    }
  }, [isFormOpen, isFormOpenSet]);

  return (
    <PageContainer>
      <Component
        {...pageProps}
        isFormOpen={isFormOpen}
        isFormOpenSet={isFormOpenSet}
        state={state}
        dispatch={dispatch}
      />
    </PageContainer>
  );
}
export default MyApp;
