import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Theme from '../utils/theme';

const ThemeSwitch = (): JSX.Element => {
  const [theme, setTheme] = useState<Theme | string | null>(null);

  // TODO: Merge function here and _app to share same state
  // Sets the theme state when component is running on the client
  useEffect(() => {
    const userPref: string = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? Theme.DARK
      : Theme.LIGHT;

    setTheme(localStorage.getItem('themePreference') || userPref);
  }, []);

  const updateTheme = (): void => {
    if (document.body.classList.contains('theme-dark')) {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      localStorage.setItem('themePreference', Theme.LIGHT);
      setTheme(Theme.LIGHT);
    } else if (document.body.classList.contains('theme-light')) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      localStorage.setItem('themePreference', Theme.DARK);
      setTheme(Theme.DARK);
    }
  };

  return (
    <button className="navigation__theme-switch" onClick={updateTheme}>
      {theme === Theme.DARK && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M13.5446 6.45414C12.6451 5.55467 11.3753 4.97266 9.9996 4.97266C8.62394 4.97266 7.3541 5.52821 6.45463 6.45414C5.55516 7.35361 4.97314 8.62345 4.97314 9.99911C4.97314 11.3748 5.55516 12.6446 6.45463 13.5441C7.3541 14.4436 8.62394 15.0256 9.9996 15.0256C11.3753 15.0256 12.6451 14.47 13.5446 13.5441C14.444 12.6446 15.0261 11.3748 15.0261 9.99911C15.0261 8.62345 14.4705 7.35361 13.5446 6.45414Z"
              fill="#858BB2"
            />
            <path
              d="M9.99984 3.4127C10.3702 3.4127 10.6877 3.09524 10.6877 2.72487V0.68783C10.6877 0.31746 10.3702 0 9.99984 0C9.62947 0 9.31201 0.31746 9.31201 0.68783V2.72487C9.31201 3.09524 9.62947 3.4127 9.99984 3.4127Z"
              fill="#858BB2"
            />
            <path
              d="M15.6347 5.3441L17.0897 3.88908C17.3543 3.62453 17.3543 3.20124 17.0897 2.93669C16.8252 2.67214 16.4019 2.67214 16.1373 2.93669L14.6823 4.39172C14.4177 4.65627 14.4177 5.07955 14.6823 5.3441C14.9204 5.60865 15.3437 5.60865 15.6347 5.3441Z"
              fill="#858BB2"
            />
            <path
              d="M19.3123 9.3125H17.2752C16.9049 9.3125 16.5874 9.62996 16.5874 10.0003C16.5874 10.3707 16.9049 10.6882 17.2752 10.6882H19.3123C19.6826 10.6882 20.0001 10.3707 20.0001 10.0003C20.0001 9.62996 19.6826 9.3125 19.3123 9.3125Z"
              fill="#858BB2"
            />
            <path
              d="M15.6083 14.6554C15.3438 14.3909 14.9205 14.3909 14.6559 14.6554C14.3914 14.92 14.3914 15.3433 14.6559 15.6078L16.111 17.0628C16.3755 17.3274 16.7988 17.3274 17.0633 17.0628C17.3279 16.7983 17.3279 16.375 17.0633 16.1105L15.6083 14.6554Z"
              fill="#858BB2"
            />
            <path
              d="M9.99984 16.5879C9.62947 16.5879 9.31201 16.9054 9.31201 17.2757V19.3128C9.31201 19.6831 9.62947 20.0006 9.99984 20.0006C10.3702 20.0006 10.6877 19.6831 10.6877 19.3128V17.2757C10.6877 16.9054 10.3702 16.5879 9.99984 16.5879Z"
              fill="#858BB2"
            />
            <path
              d="M4.36486 14.6554L2.90984 16.1105C2.64529 16.375 2.64529 16.7983 2.90984 17.0628C3.17439 17.3274 3.59767 17.3274 3.86222 17.0628L5.31725 15.6078C5.5818 15.3433 5.5818 14.92 5.31725 14.6554C5.07915 14.3909 4.65587 14.3909 4.36486 14.6554Z"
              fill="#858BB2"
            />
            <path
              d="M3.4127 10.0003C3.4127 9.62996 3.09524 9.3125 2.72487 9.3125H0.68783C0.31746 9.3125 0 9.62996 0 10.0003C0 10.3707 0.31746 10.6882 0.68783 10.6882H2.72487C3.09524 10.6882 3.4127 10.3707 3.4127 10.0003Z"
              fill="#858BB2"
            />
            <path
              d="M4.36486 5.3441C4.62942 5.60865 5.0527 5.60865 5.31725 5.3441C5.5818 5.07955 5.5818 4.65627 5.31725 4.39172L3.86222 2.93669C3.59767 2.67214 3.17439 2.67214 2.90984 2.93669C2.64529 3.20124 2.64529 3.62453 2.90984 3.88908L4.36486 5.3441Z"
              fill="#858BB2"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {theme === Theme.LIGHT && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
            fill="#7E88C3"
          />
        </svg>
      )}
    </button>
  );
};

export const PageContainer = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <div className="page">
      <nav className="navigation">
        <div className="navigation__logo-container">
          <div className="navigation__logo-bg-shape" />
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navigation__logo"
          >
            <path
              id="Combined Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.48597 0.000311013L14 12.8995L20.514 0.000310863C24.9652 2.30918 28 6.9105 28 12.21C28 19.8261 21.732 26.0002 14 26.0002C6.26801 26.0002 0 19.8261 0 12.21C0 6.9105 3.03482 2.30918 7.48597 0.000311013Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="navigation__options">
          <ThemeSwitch />
          <div className="navigation__profile-section">
            <Image
              src="/img/image-avatar.jpg"
              alt="Profile Picture"
              width={32}
              height={32}
              className="navigation__profile-picture"
            />
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default PageContainer;
