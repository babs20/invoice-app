import '../sass/styles.scss';

export const customViewports = {
  small: {
    name: 'small',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  large: {
    name: 'large',
    styles: {
      width: '1440px',
      height: '800px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    list: [
      {
        name: 'dark',
        class: 'theme-dark',
        color: '#141625',
      },
      {
        name: 'light',
        class: 'theme-light',
        color: '#fff',
      },
    ],
  },
  viewport: {
    viewports: customViewports,
    defaultViewport: 'small',
  },
};
